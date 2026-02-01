<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CustomerWalletTransaction;
use App\Services\MidtransService;
use App\Services\QontakService;
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

    public function approve(CustomerWalletTransaction $withdrawal)
    {
        if ($withdrawal->type !== 'withdrawal' || $withdrawal->status !== 'pending') {
            return back()->with('error', 'Withdrawal tidak dapat disetujui');
        }

        try {
            // (Opsional) cepat fail di level aplikasi (SP juga akan validasi)
            $bankInfo = json_decode($withdrawal->notes, true);
            if (! $bankInfo || ! isset($bankInfo['bank_name'], $bankInfo['bank_account'], $bankInfo['bank_holder'])) {
                return back()->with('error', 'Informasi rekening bank tidak lengkap');
            }
            $payoutReference = 'MANUAL-' . now()->format('YmdHis') . '-' . strtoupper(str()->random(6));
            $payoutStatus    = 'manual_approved';
            $simulated       = 0;
            $midtransTxnId   = null;

            $pdo = DB::connection()->getPdo();

            // reset session vars (opsional tapi bagus)
            $pdo->exec("SET @ok = 0, @msg = NULL, @newbal = NULL");

            // CALL SP
            $stmt = $pdo->prepare("CALL sp_approve_withdrawal(?, ?, ?, ?, ?, @ok, @msg, @newbal)");
            $stmt->execute([
                $withdrawal->id,
                $payoutReference,
                $payoutStatus,
                $simulated,
                $midtransTxnId,
            ]);
            $stmt->closeCursor(); // penting agar bisa query lagi setelah CALL

            // Ambil output dari koneksi PDO yang sama
            $outStmt = $pdo->query("SELECT @ok AS success, @msg AS message, @newbal AS new_balance");
            $out = $outStmt->fetch(\PDO::FETCH_ASSOC);
            $success = (int)($out['success'] ?? 0) === 1;
            $message = (string)($out['message'] ?? 'Gagal menyetujui withdrawal');
            $newBal  = $out['new_balance'] ?? null;

            if (! $success) {
                Log::warning('Withdrawal approve failed (SP)', [
                    'withdrawal_id' => $withdrawal->id,
                    'sp_message' => $message,
                    'sp_new_balance' => $newBal,
                ]);
                return back()->withErrors('error', $message);
            }

            Log::info('Withdrawal approved (SP)', [
                'withdrawal_id' => $withdrawal->id,
                'payout_reference' => $payoutReference,
                'payout_status' => $payoutStatus,
                'new_balance' => $newBal,
            ]);

            // Kirim notifikasi WhatsApp ke member
            $withdrawal->load('customer');
            $customer = $withdrawal->customer;

            if ($customer && $customer->phone) {
                app(QontakService::class)->sendWithdrawalApproved(
                    $customer->name,
                    $customer->phone,
                    number_format((float) $withdrawal->amount, 0, ',', '.')
                );
            }

            return back()->with('success', $message);
        } catch (\Throwable $e) {
            Log::error('Withdrawal approval error (controller)', [
                'withdrawal_id' => $withdrawal->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return back()->withErrors('error', 'Gagal menyetujui withdrawal: ' . $e->getMessage());
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
