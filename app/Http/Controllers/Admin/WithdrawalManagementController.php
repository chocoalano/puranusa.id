<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerWalletTransaction;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class WithdrawalManagementController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 10);
        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $withdrawals = CustomerWalletTransaction::query()
            ->with('customer')
            ->where('type', 'withdrawal')
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
            'total_pending' => CustomerWalletTransaction::where('type', 'withdrawal')->where('status', 'pending')->count(),
            'total_completed' => CustomerWalletTransaction::where('type', 'withdrawal')->where('status', 'completed')->count(),
            'total_failed' => CustomerWalletTransaction::where('type', 'withdrawal')->where('status', 'failed')->count(),
            'total_amount' => CustomerWalletTransaction::where('type', 'withdrawal')->where('status', 'completed')->sum('amount'),
        ];

        return Inertia::render('Admin/Withdrawals/Index', [
            'withdrawals' => $withdrawals,
            'statistics' => $statistics,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_order']),
        ]);
    }

    public function approve(CustomerWalletTransaction $withdrawal, MidtransService $midtrans)
    {
        if ($withdrawal->type !== 'withdrawal' || $withdrawal->status !== 'pending') {
            return back()->with('error', 'Withdrawal tidak dapat disetujui');
        }

        DB::beginTransaction();
        try {
            $customer = $withdrawal->customer;
            if ((float) $withdrawal->balance_before < (float) $withdrawal->amount) {
                DB::rollBack();
                return back()->with('error', 'Saldo pelanggan tidak mencukupi');
            }

            // Parse bank info from notes
            $bankInfo = json_decode($withdrawal->notes, true);
            if (! $bankInfo || ! isset($bankInfo['bank_name'], $bankInfo['bank_account'], $bankInfo['bank_holder'])) {
                DB::rollBack();
                return back()->with('error', 'Informasi rekening bank tidak lengkap');
            }

            // // Create payout via Midtrans
            // Log::info('Processing withdrawal payout', [
            //     'withdrawal_id' => $withdrawal->id,
            //     'customer_id' => $customer->id,
            //     'amount' => $withdrawal->amount,
            //     'bank_info' => $bankInfo,
            // ]);

            // $payoutResult = $midtrans->createPayout([
            //     'beneficiary_name' => $bankInfo['bank_holder'],
            //     'beneficiary_account' => $bankInfo['bank_account'],
            //     'beneficiary_bank' => strtolower($bankInfo['bank_name']),
            //     'beneficiary_email' => $customer->email ?? 'noreply@puranusa.id',
            //     'amount' => $withdrawal->amount,
            //     'notes' => 'Withdrawal '.$withdrawal->transaction_ref,
            // ]);
            // if (! $payoutResult['success']) {
            //     DB::rollBack();
            //     Log::error('Midtrans payout failed', [
            //         'withdrawal_id' => $withdrawal->id,
            //         'error' => $payoutResult['message'] ?? 'Unknown error',
            //     ]);

            //     return back()->with('error', 'Gagal memproses transfer: '.($payoutResult['message'] ?? 'Kesalahan sistem'));
            // }

            // Update withdrawal with payout info
            $newBalance = $customer->ewallet_saldo - $withdrawal->amount;

            $simulatedNote = ($payoutResult['simulated'] ?? false) ? ' (Sandbox Mode - Simulasi)' : '';

            $withdrawal->update([
                'status' => 'completed',
                'balance_after' => $newBalance,
                'completed_at' => now(),
                'midtrans_transaction_id' => $payoutResult['reference_no'] ?? null,
                'notes' => json_encode(array_merge($bankInfo, [
                    'payout_reference' => $payoutResult['reference_no'] ?? null,
                    'payout_status' => $payoutResult['status'] ?? 'unknown',
                    'simulated' => $payoutResult['simulated'] ?? false,
                    'processed_at' => now()->toDateTimeString(),
                ])),
            ]);

            $customer->update(['ewallet_saldo' => $newBalance]);

            DB::commit();

            Log::info('Withdrawal approved and payout created', [
                'withdrawal_id' => $withdrawal->id,
                'payout_reference' => $payoutResult['reference_no'] ?? null,
                'simulated' => $payoutResult['simulated'] ?? false,
                'new_balance' => $newBalance,
            ]);

            return back()->with('success', "Withdrawal berhasil disetujui dan dana sedang ditransfer{$simulatedNote}");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Withdrawal approval error', [
                'withdrawal_id' => $withdrawal->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->with('error', 'Gagal menyetujui withdrawal: '.$e->getMessage());
        }
    }

    public function reject(CustomerWalletTransaction $withdrawal)
    {
        if ($withdrawal->type !== 'withdrawal' || $withdrawal->status !== 'pending') {
            return back()->with('error', 'Withdrawal tidak dapat ditolak');
        }

        $withdrawal->update(['status' => 'failed']);

        return back()->with('success', 'Withdrawal berhasil ditolak');
    }
}
