<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerWalletTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TopupManagementController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $topups = CustomerWalletTransaction::query()
            ->with('customer')
            ->where('type', 'topup')
            ->when($request->search, function ($query, $search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhere('transaction_ref', 'like', "%{$search}%");
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($sortBy === 'customer.name', function ($query) use ($sortOrder) {
                $query->join('customers', 'customer_wallet_transactions.customer_id', '=', 'customers.id')
                    ->orderBy('customers.name', $sortOrder)
                    ->select('customer_wallet_transactions.*');
            }, function ($query) use ($sortBy, $sortOrder) {
                $query->orderBy($sortBy, $sortOrder);
            })
            ->paginate($perPage)
            ->withQueryString();

        $statistics = [
            'total_pending' => CustomerWalletTransaction::where('type', 'topup')->where('status', 'pending')->count(),
            'total_completed' => CustomerWalletTransaction::where('type', 'topup')->where('status', 'completed')->count(),
            'total_failed' => CustomerWalletTransaction::where('type', 'topup')->where('status', 'failed')->count(),
            'total_amount' => CustomerWalletTransaction::where('type', 'topup')->where('status', 'completed')->sum('amount'),
        ];

        return Inertia::render('Admin/Topups/Index', [
            'topups' => $topups,
            'statistics' => $statistics,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    public function approve(CustomerWalletTransaction $topup)
    {
        if ($topup->type !== 'topup' || $topup->status !== 'pending') {
            return back()->with('error', 'Topup tidak dapat disetujui');
        }

        DB::beginTransaction();
        try {
            $customer = $topup->customer;
            $newBalance = $customer->ewallet_saldo + $topup->amount;

            $topup->update([
                'status' => 'completed',
                'balance_after' => $newBalance,
                'completed_at' => now(),
            ]);

            $customer->update(['ewallet_saldo' => $newBalance]);

            DB::commit();

            return back()->with('success', 'Topup berhasil disetujui');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('error', 'Gagal menyetujui topup');
        }
    }

    public function reject(CustomerWalletTransaction $topup)
    {
        if ($topup->type !== 'topup' || $topup->status !== 'pending') {
            return back()->with('error', 'Topup tidak dapat ditolak');
        }

        $topup->update(['status' => 'failed']);

        return back()->with('success', 'Topup berhasil ditolak');
    }
}
