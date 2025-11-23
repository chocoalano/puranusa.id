<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shipment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentManagementController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $shipments = Shipment::query()
            ->with(['order.customer'])
            ->when($request->search, function ($query, $search) {
                $query->where('tracking_no', 'like', "%{$search}%")
                    ->orWhereHas('order', function ($q) use ($search) {
                        $q->where('order_no', 'like', "%{$search}%")
                            ->orWhereHas('customer', function ($q2) use ($search) {
                                $q2->where('name', 'like', "%{$search}%");
                            });
                    });
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($sortBy === 'order.order_number', function ($query) use ($sortOrder) {
                $query->join('orders', 'shipments.order_id', '=', 'orders.id')
                    ->orderBy('orders.order_no', $sortOrder)
                    ->select('shipments.*');
            }, function ($query) use ($sortBy, $sortOrder) {
                $query->orderBy($sortBy, $sortOrder);
            })
            ->paginate($perPage)
            ->withQueryString();

        $statistics = [
            'total_pending' => Shipment::where('status', 'pending')->count(),
            'total_shipped' => Shipment::where('status', 'shipped')->count(),
            'total_delivered' => Shipment::where('status', 'delivered')->count(),
        ];

        return Inertia::render('Admin/Shipments/Index', [
            'shipments' => $shipments,
            'statistics' => $statistics,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    public function update(Request $request, Shipment $shipment)
    {
        $validated = $request->validate([
            'tracking_no' => 'required|max:255',
            'status' => 'required|in:pending,shipped,in_transit,delivered,failed',
            'shipped_at' => 'nullable|date',
            'delivered_at' => 'nullable|date',
        ]);

        $shipment->update($validated);

        return back()->with('success', 'Pengiriman berhasil diperbarui');
    }
}
