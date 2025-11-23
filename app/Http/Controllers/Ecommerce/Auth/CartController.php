<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Display a listing of carts for admin.
     */
    public function adminIndex(Request $request)
    {
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $query = CartItem::with(['cart.customer', 'product'])
            ->whereHas('cart.customer')
            ->when($search, function ($q) use ($search) {
                $q->whereHas('cart.customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhereHas('product', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            })
            ->orderBy($sortBy, $sortOrder);

        $carts = $query->paginate(15);

        $statistics = [
            'total_carts' => Cart::whereHas('customer')->count(),
            'total_items' => CartItem::whereHas('cart.customer')->sum('qty'),
            'total_value' => CartItem::whereHas('cart.customer')->sum('row_total'),
        ];

        return inertia('Admin/Carts/Index', [
            'carts' => $carts,
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
            'quantity' => 'integer|min:1',
        ]);

        $productId = $validated['product_id'];
        $quantity = $validated['quantity'] ?? 1;

        // Ensure user is authenticated
        if (! auth('client')->check()) {
            return back()->with('error', 'Silakan login terlebih dahulu');
        }

        $customerId = auth('client')->id();

        // Get product with stock check
        $product = Product::findOrFail($productId);

        if ($product->stock < $quantity) {
            return back()->with('error', 'Stok tidak mencukupi');
        }

        DB::beginTransaction();

        try {
            // Find or create cart for customer
            $cart = Cart::firstOrCreate(
                ['customer_id' => $customerId],
                [
                    'currency' => 'IDR',
                    'subtotal_amount' => 0,
                    'discount_amount' => 0,
                    'shipping_amount' => 0,
                    'tax_amount' => 0,
                    'grand_total' => 0,
                ]
            );

            // Check if product already in cart
            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $productId)
                ->first();

            if ($cartItem) {
                // Update quantity
                $newQuantity = $cartItem->qty + $quantity;

                if ($product->stock < $newQuantity) {
                    DB::rollBack();

                    return back()->with('error', 'Stok tidak mencukupi');
                }

                $cartItem->qty = $newQuantity;
                $cartItem->row_total = $cartItem->unit_price * $newQuantity;
                $cartItem->save();
            } else {
                // Create new cart item
                CartItem::create([
                    'cart_id' => $cart->id,
                    'product_id' => $productId,
                    'qty' => $quantity,
                    'unit_price' => $product->base_price,
                    'currency' => 'IDR',
                    'product_sku' => $product->sku,
                    'product_name' => $product->name,
                    'row_total' => $product->base_price * $quantity,
                ]);
            }

            // Update cart totals
            $this->updateCartTotals($cart);

            DB::commit();

            return back()->with('success', 'Produk berhasil ditambahkan ke keranjang');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Gagal menambahkan produk ke keranjang');
        }
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItemId = $validated['cart_id'];
        $quantity = $validated['quantity'];

        // Ensure user is authenticated
        if (! auth('client')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan login terlebih dahulu',
            ], 401);
        }

        $customerId = auth('client')->id();

        DB::beginTransaction();

        try {
            // Find cart item and verify ownership
            $cartItem = CartItem::with(['cart', 'product'])
                ->whereHas('cart', function ($query) use ($customerId) {
                    $query->where('customer_id', $customerId);
                })
                ->findOrFail($cartItemId);

            // Check stock availability
            if ($cartItem->product->stock < $quantity) {
                DB::rollBack();

                return response()->json([
                    'success' => false,
                    'message' => 'Stok tidak mencukupi',
                ], 400);
            }

            // Update quantity
            $cartItem->qty = $quantity;
            $cartItem->row_total = $cartItem->unit_price * $quantity;
            $cartItem->save();

            // Update cart totals
            $this->updateCartTotals($cartItem->cart);

            DB::commit();

            // Refresh cart data
            $cart = $cartItem->cart->fresh(['items.product.media' => function ($query) {
                $query->where('is_primary', true)->orWhere('sort_order', 0);
            }]);

            return response()->json([
                'success' => true,
                'message' => 'Jumlah produk berhasil diperbarui',
                'cart' => [
                    'subtotal' => (float) $cart->subtotal_amount,
                    'total' => (float) $cart->grand_total,
                ],
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui jumlah produk',
            ], 500);
        }
    }

    public function remove(Request $request)
    {
        $validated = $request->validate([
            'cart_id' => 'required|exists:cart_items,id',
        ]);

        $cartItemId = $validated['cart_id'];

        // Ensure user is authenticated
        if (! auth('client')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan login terlebih dahulu',
            ], 401);
        }

        $customerId = auth('client')->id();

        DB::beginTransaction();

        try {
            // Find cart item and verify ownership
            $cartItem = CartItem::with('cart')
                ->whereHas('cart', function ($query) use ($customerId) {
                    $query->where('customer_id', $customerId);
                })
                ->findOrFail($cartItemId);

            $cart = $cartItem->cart;

            // Delete cart item
            $cartItem->delete();

            // Update cart totals
            $this->updateCartTotals($cart);

            DB::commit();

            // Refresh cart data
            $cart = $cart->fresh(['items.product.media' => function ($query) {
                $query->where('is_primary', true)->orWhere('sort_order', 0);
            }]);

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil dihapus dari keranjang',
                'cart' => [
                    'subtotal' => (float) $cart->subtotal_amount,
                    'total' => (float) $cart->grand_total,
                ],
            ]);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus produk dari keranjang',
            ], 500);
        }
    }

    /**
     * Update cart totals based on items
     */
    private function updateCartTotals(Cart $cart): void
    {
        $subtotal = $cart->items()->sum('row_total');

        $cart->update([
            'subtotal_amount' => $subtotal,
            'grand_total' => $subtotal + $cart->shipping_amount + $cart->tax_amount - $cart->discount_amount,
        ]);
    }
}
