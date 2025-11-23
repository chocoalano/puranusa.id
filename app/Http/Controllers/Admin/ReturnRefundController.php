<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Refund;
use App\Models\Returns;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnRefundController extends Controller
{
    public function indexReturns(Request $request)
    {
        $request->validate([
            'per_page' => ['nullable', 'integer', 'in:10,25,50,100'],
            'sort_by' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'in:asc,desc'],
        ]);

        $perPage = $request->integer('per_page', 15);
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $query = Returns::query()->with(['order.customer']);

        // Handle search
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('order', function ($orderQuery) use ($search) {
                    $orderQuery->where('order_number', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($customerQuery) use ($search) {
                            $customerQuery->where('name', 'like', "%{$search}%");
                        });
                });
            });
        }

        // Handle status filter
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Handle sorting
        if ($sortBy === 'order.order_number') {
            $query->join('orders', 'returns.order_id', '=', 'orders.id')
                ->select('returns.*')
                ->orderBy('orders.order_number', $sortOrder);
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $returns = $query->paginate($perPage)->withQueryString();

        $statistics = [
            'total_pending' => Returns::where('status', 'pending')->count(),
            'total_approved' => Returns::where('status', 'approved')->count(),
            'total_rejected' => Returns::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/Returns/Index', [
            'returns' => $returns,
            'statistics' => $statistics,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function approveReturn(Returns $return)
    {
        $return->update([
            'status' => 'approved',
            'processed_at' => now(),
        ]);

        return back()->with('success', 'Retur berhasil disetujui');
    }

    public function rejectReturn(Returns $return)
    {
        $return->update([
            'status' => 'rejected',
            'processed_at' => now(),
        ]);

        return back()->with('success', 'Retur berhasil ditolak');
    }

    public function indexRefunds(Request $request)
    {
        $request->validate([
            'per_page' => ['nullable', 'integer', 'in:10,25,50,100'],
            'sort_by' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'in:asc,desc'],
        ]);

        $perPage = $request->integer('per_page', 15);
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $query = Refund::query()->with(['order.customer', 'payment']);

        // Handle search
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->whereHas('order', function ($orderQuery) use ($search) {
                    $orderQuery->where('order_number', 'like', "%{$search}%")
                        ->orWhereHas('customer', function ($customerQuery) use ($search) {
                            $customerQuery->where('name', 'like', "%{$search}%");
                        });
                });
            });
        }

        // Handle status filter
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Handle sorting
        if ($sortBy === 'order.order_no') {
            $query->join('orders', 'refunds.order_id', '=', 'orders.id')
                ->select('refunds.*')
                ->orderBy('orders.order_number', $sortOrder);
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        $refunds = $query->paginate($perPage)->withQueryString();

        $statistics = [
            'total_pending' => Refund::where('status', 'pending')->count(),
            'total_processing' => Refund::where('status', 'processing')->count(),
            'total_completed' => Refund::where('status', 'completed')->count(),
        ];

        return Inertia::render('Admin/Refunds/Index', [
            'refunds' => $refunds,
            'statistics' => $statistics,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function processRefund(Refund $refund)
    {
        $refund->update(['status' => 'completed']);

        return back()->with('success', 'Refund berhasil diproses');
    }
}
