<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    /**
     * Display a listing of newsletter subscribers for admin.
     */
    public function adminIndex(Request $request)
    {
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $query = NewsletterSubscriber::query()
            ->when($search, function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%");
            })
            ->orderBy($sortBy, $sortOrder);

        $newsletters = $query->paginate(15);

        $statistics = [
            'total_subscribers' => NewsletterSubscriber::count(),
            'total_today' => NewsletterSubscriber::whereDate('created_at', today())->count(),
            'total_this_month' => NewsletterSubscriber::whereMonth('created_at', now()->month)->count(),
        ];

        return inertia('Admin/Newsletters/Index', [
            'newsletters' => $newsletters,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function subscribe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak valid',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = $request->input('email');

        // Check if email already exists
        $existing = NewsletterSubscriber::where('email', $email)->first();

        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'Email ini sudah terdaftar',
            ], 409);
        }

        // Create new subscriber
        NewsletterSubscriber::create([
            'email' => $email,
            'subscribed_at' => now(),
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih! Anda telah berhasil berlangganan newsletter kami',
        ]);
    }
}
