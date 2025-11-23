<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductReview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewManagementController extends Controller
{
    public function index(Request $request)
    {
        $reviews = ProductReview::query()
            ->with(['customer', 'product'])
            ->when($request->search, function ($query, $search) {
                $query->whereHas('product', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                })->orWhereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->rating, function ($query, $rating) {
                $query->where('rating', $rating);
            })
            ->when($request->approved !== null, function ($query) use ($request) {
                $query->where('is_approved', $request->approved);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $statistics = [
            'total' => ProductReview::count(),
            'approved' => ProductReview::where('is_approved', true)->count(),
            'pending' => ProductReview::where('is_approved', false)->count(),
            'average_rating' => ProductReview::avg('rating') ?? 0,
        ];

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'statistics' => $statistics,
            'filters' => $request->only(['search', 'rating', 'approved']),
        ]);
    }

    public function approve(ProductReview $review)
    {
        $review->update(['is_approved' => true]);

        return back()->with('success', 'Review berhasil disetujui');
    }

    public function reject(ProductReview $review)
    {
        $review->update(['is_approved' => false]);

        return back()->with('success', 'Review berhasil ditolak');
    }

    public function destroy(ProductReview $review)
    {
        $review->delete();

        return back()->with('success', 'Review berhasil dihapus');
    }
}
