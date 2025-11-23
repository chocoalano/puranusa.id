<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Manage\CustomerNetwork;
use App\Models\Manage\Customer;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic statistics
        $totalRevenue = Order::whereNotNull('paid_at')->sum('grand_total');
        $totalOrders = Order::count();
        $totalCustomers = Customer::count();
        $totalProducts = Product::where('is_active', true)->count();

        // MLM Statistics
        $totalBV = Order::whereNotNull('paid_at')->sum('bv_amount');
        $totalBonuses = Order::whereNotNull('paid_at')
            ->sum(DB::raw('sponsor_amount + match_amount + pairing_amount + cashback_amount'));
        $totalNetworkMembers = CustomerNetwork::distinct('member_id')->count();

        // Order statistics
        $pendingOrders = Order::where('status', 'pending')->count();
        $completedOrders = Order::where('status', 'completed')->count();
        $activeCustomers = Customer::whereHas('orders', function ($q) {
            $q->whereNotNull('paid_at');
        })->count();

        // Recent orders with customer info
        $recentOrders = Order::with('customer')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'order_no' => $order->order_no,
                    'customer_name' => $order->customer->name,
                    'grand_total' => (float) $order->grand_total,
                    'status' => $order->status,
                    'created_at' => $order->created_at->toISOString(),
                ];
            });

        // Top products by revenue
        $topProducts = Order::join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->whereNotNull('orders.paid_at')
            ->select(
                'order_items.name',
                DB::raw('SUM(order_items.qty) as total_sold'),
                DB::raw('SUM(order_items.row_total) as total_revenue')
            )
            ->groupBy('order_items.name')
            ->orderByDesc('total_revenue')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->name,
                    'total_sold' => (int) $item->total_sold,
                    'total_revenue' => (float) $item->total_revenue,
                ];
            });

        // Monthly revenue for last 6 months
        $monthlyRevenue = Order::whereNotNull('paid_at')
            ->where('paid_at', '>=', now()->subMonths(6))
            ->select(
                DB::raw("DATE_FORMAT(paid_at, '%Y-%m') as month"),
                DB::raw('SUM(grand_total) as revenue'),
                DB::raw('COUNT(*) as orders')
            )
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => date('M Y', strtotime($item->month.'-01')),
                    'revenue' => (float) $item->revenue,
                    'orders' => (int) $item->orders,
                ];
            });

        // Order status distribution for pie chart
        $orderStatusDistribution = Order::select(
            'status',
            DB::raw('COUNT(*) as count')
        )
            ->groupBy('status')
            ->get()
            ->map(function ($item) {
                return [
                    'status' => ucfirst(strtolower($item->status)),
                    'count' => (int) $item->count,
                ];
            });

        // Daily sales for last 7 days
        $dailySales = Order::whereNotNull('paid_at')
            ->where('paid_at', '>=', now()->subDays(7))
            ->select(
                DB::raw('DATE(paid_at) as date'),
                DB::raw('COUNT(*) as orders'),
                DB::raw('SUM(grand_total) as revenue')
            )
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'date' => date('D, M d', strtotime($item->date)),
                    'orders' => (int) $item->orders,
                    'revenue' => (float) $item->revenue,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'totalOrders' => $totalOrders,
                'totalCustomers' => $totalCustomers,
                'totalProducts' => $totalProducts,
                'totalBV' => $totalBV,
                'totalBonuses' => $totalBonuses,
                'totalNetworkMembers' => $totalNetworkMembers,
                'pendingOrders' => $pendingOrders,
                'completedOrders' => $completedOrders,
                'activeCustomers' => $activeCustomers,
                'recentOrders' => $recentOrders,
                'topProducts' => $topProducts,
                'monthlyRevenue' => $monthlyRevenue,
                'orderStatusDistribution' => $orderStatusDistribution,
                'dailySales' => $dailySales,
            ],
        ]);
    }
}
