<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Cache stats for 5 minutes to reduce database load
        $stats = $this->getStats();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
        ]);
    }

    private function getStats(): array
    {
        // Combine multiple order statistics into single query
        $orderStats = DB::table('orders')
            ->selectRaw('COUNT(*) as total_orders')
            ->selectRaw('SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending_orders')
            ->selectRaw(
        'COALESCE(SUM(CASE WHEN status IN (?, ?) THEN COALESCE(subtotal_amount, 0) ELSE 0 END), 0) as total_revenue',
        ['PAID', 'PROCESSING']
            )
            ->selectRaw(
                'COALESCE(SUM(CASE WHEN status IN (?, ?) THEN COALESCE(bv_amount, 0) ELSE 0 END), 0) as total_bv',
                ['PAID', 'PROCESSING']
            )
            ->first();
        $totalBonuses = DB::query()
            ->fromSub(function ($q) {
                $q->selectRaw('SUM(amount) as sub_total FROM customer_bonus_sponsors')
                ->unionAll(DB::table('customer_bonus_pairings')->selectRaw('SUM(amount) as sub_total'))
                ->unionAll(DB::table('customer_bonus_matchings')->selectRaw('SUM(amount) as sub_total'))
                ->unionAll(DB::table('customer_bonus_retails')->selectRaw('SUM(amount) as sub_total'))
                ->unionAll(DB::table('customer_bonus_cashbacks')->selectRaw('SUM(amount) as sub_total'));
            }, 'total')
            ->selectRaw('COALESCE(SUM(sub_total), 0) as total_bonuses')
            ->value('total_bonuses');

        $widthrawal = DB::table('customer_wallet_transactions')
            ->where([
                'type' => 'withdrawal',
                'status' => 'pending',
            ])
            ->sum('amount');

        $totalOrders = (int) ($orderStats->total_orders ?? 0);
        $pendingOrders = (int) ($orderStats->pending_orders ?? 0);
        $totalRevenue = (float) ($orderStats->total_revenue ?? 0);
        $totalBV = (float) ($orderStats->total_bv ?? 0);

        // Basic counts using raw queries for speed
        $totalCustomers = DB::table('customers')->count();
        $totalProducts = DB::table('products')->where('is_active', true)->count();

        // MLM Statistics
        $totalNetworkMembers = DB::table('customer_networks')->distinct()->count('member_id');

        // Active customers
        $activeCustomers = DB::table('orders')
            ->whereNotNull('paid_at')
            ->distinct()
            ->count('customer_id');

        // Recent orders with customer info
        $recentOrders = DB::table('orders')
            ->leftJoin('customers', 'orders.customer_id', '=', 'customers.id')
            ->select('orders.order_no', 'customers.name as customer_name', 'orders.grand_total', 'orders.status', 'orders.created_at')
            ->orderBy('orders.created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'order_no' => $order->order_no,
                    'customer_name' => $order->customer_name ?? 'Unknown',
                    'grand_total' => (float) $order->grand_total,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                ];
            });
        // Top products by revenue
        $topProducts = DB::table('order_items')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->select(
                DB::raw('MAX(order_items.name) as name'),
                DB::raw('SUM(order_items.qty) as total_sold'),
                DB::raw('SUM(order_items.row_total) as total_revenue')
            )
            ->groupBy('order_items.product_id')
            ->orderByDesc('total_sold') // = total_terjual
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
        $monthlyRevenue = DB::table('orders')
            ->whereNotNull('paid_at')
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
        $orderStatusDistribution = DB::table('orders')
            ->select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->whereBetween('created_at', [now()->subMonths(6), now()])
            ->get()
            ->map(function ($item) {
                return [
                    'status' => ucfirst(strtolower($item->status)),
                    'count' => (int) $item->count,
                ];
            });

        // Daily sales for last 7 days
        $dailySales = DB::table('orders')
            ->whereNotNull('paid_at')
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

        return [
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'totalCustomers' => $totalCustomers,
            'totalProducts' => $totalProducts,
            'totalBV' => $totalBV,
            'totalBonuses' => $totalBonuses,
            'totalNetworkMembers' => $totalNetworkMembers,
            'pendingOrders' => $pendingOrders,
            'widthrawal' => $widthrawal,
            'activeCustomers' => $activeCustomers,
            'recentOrders' => $recentOrders,
            'topProducts' => $topProducts,
            'monthlyRevenue' => $monthlyRevenue,
            'orderStatusDistribution' => $orderStatusDistribution,
            'dailySales' => $dailySales,
        ];
    }
}
