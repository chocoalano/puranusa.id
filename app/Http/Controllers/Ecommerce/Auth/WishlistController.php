<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WishlistController extends Controller
{
    /**
     * Display a listing of wishlists for admin.
     */
    public function adminIndex(Request $request)
    {
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $perPage = $request->integer('per_page', 10);

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $query = WishlistItem::with(['wishlist.customer', 'product'])
            ->whereHas('wishlist.customer')
            ->when($search, function ($q) use ($search) {
                $q->whereHas('wishlist.customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhereHas('product', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->when($sortBy === 'customer.name', function ($q) use ($sortOrder) {
                $q->join('wishlists', 'wishlist_items.wishlist_id', '=', 'wishlists.id')
                    ->join('customers', 'wishlists.customer_id', '=', 'customers.id')
                    ->orderBy('customers.name', $sortOrder)
                    ->select('wishlist_items.*');
            }, function ($q) use ($sortBy, $sortOrder) {
                $q->orderBy($sortBy, $sortOrder);
            });

        $wishlists = $query->paginate($perPage)->withQueryString();

        $statistics = [
            'total_wishlists' => Wishlist::whereHas('customer')->count(),
            'total_items' => WishlistItem::whereHas('wishlist.customer')->count(),
            'total_value' => WishlistItem::whereHas('wishlist.customer')
                ->with('product')
                ->get()
                ->sum(function ($item) {
                    return $item->product->base_price ?? 0;
                }),
        ];

        return inertia('Admin/Wishlists/Index', [
            'wishlists' => $wishlists,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $productId = $validated['product_id'];

        // Ensure user is authenticated
        if (! auth('client')->check()) {
            return back()->with('error', 'Silakan login terlebih dahulu');
        }

        $customerId = auth('client')->id();

        // Get product
        $product = Product::findOrFail($productId);

        DB::beginTransaction();

        try {
            // Find or create wishlist for customer
            $wishlist = Wishlist::firstOrCreate(
                ['customer_id' => $customerId],
                ['name' => 'My Wishlist']
            );

            // Check if product already in wishlist
            $exists = WishlistItem::where('wishlist_id', $wishlist->id)
                ->where('product_id', $productId)
                ->exists();

            if ($exists) {
                DB::rollBack();

                return back()->with('info', 'Produk sudah ada di wishlist');
            }

            // Add product to wishlist
            WishlistItem::create([
                'wishlist_id' => $wishlist->id,
                'product_id' => $productId,
                'product_name' => $product->name,
                'product_sku' => $product->sku,
            ]);

            DB::commit();

            return back()->with('success', 'Produk ditambahkan ke wishlist');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Gagal menambahkan ke wishlist');
        }
    }

    public function remove(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $productId = $validated['product_id'];

        // Ensure user is authenticated
        if (! auth('client')->check()) {
            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Silakan login terlebih dahulu'], 401);
            }

            return back()->with('error', 'Silakan login terlebih dahulu');
        }

        $customerId = auth('client')->id();

        DB::beginTransaction();

        try {
            // Find wishlist for customer
            $wishlist = Wishlist::where('customer_id', $customerId)->first();

            if (! $wishlist) {
                DB::rollBack();

                if ($request->expectsJson()) {
                    return response()->json(['success' => false, 'message' => 'Wishlist tidak ditemukan'], 404);
                }

                return back()->with('error', 'Wishlist tidak ditemukan');
            }

            // Remove product from wishlist
            $deleted = WishlistItem::where('wishlist_id', $wishlist->id)
                ->where('product_id', $productId)
                ->delete();

            if (! $deleted) {
                DB::rollBack();

                if ($request->expectsJson()) {
                    return response()->json(['success' => false, 'message' => 'Produk tidak ada di wishlist'], 404);
                }

                return back()->with('error', 'Produk tidak ada di wishlist');
            }

            DB::commit();

            if ($request->expectsJson()) {
                return response()->json(['success' => true, 'message' => 'Produk dihapus dari wishlist']);
            }

            return back()->with('success', 'Produk dihapus dari wishlist');

        } catch (\Exception $e) {
            DB::rollBack();

            if ($request->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Gagal menghapus dari wishlist'], 500);
            }

            return back()->with('error', 'Gagal menghapus dari wishlist');
        }
    }
}
