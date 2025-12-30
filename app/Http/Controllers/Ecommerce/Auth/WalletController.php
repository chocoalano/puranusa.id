<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Models\CustomerWalletTransaction;
use App\Models\Manage\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Midtrans\Config;
use Midtrans\Snap;

class WalletController extends Controller
{
    /**
     * Display a listing of wallets for admin.
     */
    public function adminIndex(Request $request)
    {
        $search = $request->input('search');
        $sortBy = $request->input('sort_by', 'ewallet_saldo');
        $sortOrder = $request->input('sort_order', 'desc');
        $perPage = $request->integer('per_page', 10);

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $query = Customer::query()
            ->when($search, function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('ewallet_id', 'like', "%{$search}%");
            })
            ->orderBy($sortBy, $sortOrder);

        $customers = $query->paginate($perPage)->withQueryString();

        $statistics = [
            'total_customers' => Customer::count(),
            'total_balance' => Customer::sum('ewallet_saldo'),
            'avg_balance' => Customer::avg('ewallet_saldo'),
        ];

        return inertia('Admin/Wallets/Index', [
            'customers' => $customers,
            'statistics' => $statistics,
            'search' => $search,
        ]);
    }

    /**
     * Display wallet transaction history for admin.
     */
    public function adminTransactions(Request $request)
    {
        $search = $request->input('search');
        $type = $request->input('type');
        $status = $request->input('status');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');
        $perPage = $request->integer('per_page', 10);

        if (! in_array($perPage, [10, 25, 50, 100])) {
            $perPage = 10;
        }

        $query = CustomerWalletTransaction::with(['customer'])
            ->when($search, function ($q) use ($search) {
                $q->whereHas('customer', function ($subQ) use ($search) {
                    $subQ->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })->orWhere('transaction_ref', 'like', "%{$search}%");
            })
            ->when($type, fn ($q) => $q->where('type', $type))
            ->when($status, fn ($q) => $q->where('status', $status))
            ->orderBy($sortBy, $sortOrder);

        $transactions = $query->paginate($perPage)->withQueryString();

        $statistics = [
            'total_transactions' => CustomerWalletTransaction::count(),
            'total_amount' => CustomerWalletTransaction::where('status', 'completed')->sum('amount'),
            'total_pending' => CustomerWalletTransaction::where('status', 'pending')->count(),
            'total_completed' => CustomerWalletTransaction::where('status', 'completed')->count(),
        ];

        return inertia('Admin/Wallets/Transactions', [
            'transactions' => $transactions,
            'statistics' => $statistics,
            'filters' => [
                'search' => $search,
                'type' => $type,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Initiate top-up transaction
     */
    public function topup(Request $request): JsonResponse
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:10000', 'max:10000000'],
            'payment_method' => ['required', 'string', 'in:midtrans'],
            'force_payment' => ['nullable', 'string', 'in:bca_va,bni_va,bri_va,permata_va,echannel,other_va,qris,gopay,shopeepay,credit_card'],
        ]);

        $customer = Auth::guard('client')->user();

        try {
            // Configure Midtrans
            Config::$serverKey = config('services.midtrans.server_key');
            Config::$clientKey = config('services.midtrans.client_key');
            Config::$isProduction = (bool) config('services.midtrans.is_production');
            Config::$isSanitized = true;
            Config::$is3ds = true;

            Log::info('Midtrans Configuration', [
                'is_production' => Config::$isProduction,
                'server_key_prefix' => substr(Config::$serverKey, 0, 15).'...',
            ]);

            // Generate unique transaction reference with microseconds for uniqueness
            $transactionRef = 'TOPUP-'.date('YmdHis').'-'.uniqid().'-'.strtoupper(Str::random(4));

            $forcePayment = $request->input('force_payment');

            // Prepare transaction details for Midtrans Sandbox (include VA-specific and expiry configuration)
            $splitName = explode(' ', trim($customer->name));
            $firstName = $splitName[0] ?? 'Customer';
            $lastName = count($splitName) > 1 ? implode(' ', array_slice($splitName, 1)) : '';

            // Randomize test data slightly to avoid repetitive sandbox denial heuristics
            $randomAddress = 'Jl. Sandbox No '.random_int(10, 999);
            $randomPhone = $customer->phone ?? '0812'.random_int(1000000, 9999999);

            // Enforce higher minimum for forced VA / Mandiri Bill to reduce sandbox denial frequency
            if ($forcePayment && (str_contains($forcePayment, '_va') || $forcePayment === 'echannel')) {
                if ((int) $request->amount < 15000) {
                    throw ValidationException::withMessages([
                        'amount' => 'Minimal untuk VA/Mandiri Bill disarankan Rp 15.000 (sandbox).',
                    ]);
                }
            }

            // Do not force a specific channel; let Midtrans show default options

            $params = [
                'transaction_details' => [
                    'order_id' => $transactionRef,
                    'gross_amount' => (int) $request->amount,
                ],
                'customer_details' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $customer->email,
                    'phone' => $randomPhone,
                    // Use proper ISO 3166-1 alpha-3 code IDN (Midtrans expects length 3)
                    'billing_address' => [
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                        'phone' => $randomPhone,
                        'address' => $randomAddress,
                        'city' => 'Jakarta',
                        'postal_code' => '10220',
                        'country_code' => 'IDN',
                    ],
                    'shipping_address' => [
                        'first_name' => $firstName,
                        'last_name' => $lastName,
                        'phone' => $randomPhone,
                        'address' => $randomAddress,
                        'city' => 'Jakarta',
                        'postal_code' => '10220',
                        'country_code' => 'IDN',
                    ],
                ],
                'item_details' => [
                    [
                        'id' => 'TOPUP-WALLET',
                        'price' => (int) $request->amount,
                        'quantity' => 1,
                        'name' => 'Top Up Saldo E-Wallet',
                    ],
                ],
                // Redirect user back to wallet after finishing payment flow (popup/redirect)
                'callbacks' => [
                    'finish' => route('client.wallet.callback'),
                ],
                // Credit card settings (kept minimal)
                'credit_card' => [
                    'secure' => true,
                ],
                // Expiry (1 hour) to ensure VA can be generated timely
                'expiry' => [
                    'start_time' => now()->format('Y-m-d H:i:s O'),
                    'unit' => 'minutes',
                    'duration' => 60,
                ],
                // Custom fields for easier tracing in Midtrans dashboard
                'custom_field1' => 'TOPUP',
            ];

            if ($forcePayment) {
                $params['enabled_payments'] = [$forcePayment];
            }

            Log::info('Attempting to get Snap token', [
                'transaction_ref' => $transactionRef,
                'amount' => $request->amount,
                'customer_email' => $customer->email,
                'params' => $params,
                'force_payment' => $forcePayment,
            ]);

            // Get Snap token from Midtrans (call API first before creating DB record)
            $snapToken = Snap::getSnapToken($params);

            Log::info('Snap token received successfully', [
                'transaction_ref' => $transactionRef,
                'snap_token' => $snapToken,
                'enabled_payments' => $forcePayment ? [$forcePayment] : 'default',
                'force_payment' => $forcePayment,
            ]);

            // Only create transaction record after successfully getting snap token
            DB::beginTransaction();

            $transaction = CustomerWalletTransaction::create([
                'customer_id' => $customer->id,
                'type' => 'topup',
                'amount' => $request->amount,
                'balance_before' => $customer->ewallet_saldo,
                'balance_after' => $customer->ewallet_saldo, // Will be updated after payment
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'transaction_ref' => $transactionRef,
                'midtrans_transaction_id' => $snapToken,
            ]);

            DB::commit();

            Log::info('Top-up transaction created', [
                'transaction_id' => $transaction->id,
                'transaction_ref' => $transactionRef,
                'snap_token' => $snapToken,
                'amount' => $request->amount,
            ]);

            // Return JSON response with snap token
            return response()->json([
                'success' => true,
                'snap_token' => $snapToken,
                'transaction_ref' => $transactionRef,
                'message' => 'Silakan selesaikan pembayaran',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Midtrans Top-up Error: '.$e->getMessage(), [
                'customer_id' => $customer->id,
                'amount' => $request->amount,
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat membuat transaksi: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Request withdrawal
     */
    public function withdrawal(Request $request): RedirectResponse
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:50000'],
            'bank_name' => ['required', 'string', 'max:100'],
            'bank_account' => ['required', 'string', 'max:50'],
            'bank_holder' => ['required', 'string', 'max:100'],
        ]);

        $customer = Auth::guard('client')->user();

        // Check if balance is sufficient
        if ($customer->ewallet_saldo < $request->amount) {
            throw ValidationException::withMessages([
                'amount' => 'Saldo tidak mencukupi. Saldo Anda: '.number_format($customer->ewallet_saldo, 0, ',', '.'),
            ]);
        }

        try {
            DB::beginTransaction();

            // Create withdrawal transaction
            $transaction = CustomerWalletTransaction::create([
                'customer_id' => $customer->id,
                'type' => 'withdrawal',
                'amount' => $request->amount,
                'balance_before' => $customer->ewallet_saldo,
                'balance_after' => $customer->ewallet_saldo - $request->amount,
                'status' => 'pending',
                'transaction_ref' => 'WD-'.date('YmdHis').'-'.strtoupper(Str::random(6)),
                'notes' => json_encode([
                    'bank_name' => $request->bank_name,
                    'bank_account' => $request->bank_account,
                    'bank_holder' => $request->bank_holder,
                ]),
            ]);

            // Deduct balance (will be processed by admin)
            $customer->deductBalance($request->amount, 'Withdrawal request: '.$transaction->transaction_ref, 'withdrawal');

            DB::commit();

            return redirect()->back()->with('success', 'Permintaan penarikan berhasil dibuat. Akan diproses dalam 1-3 hari kerja.');
        } catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->with('error', 'Terjadi kesalahan: '.$e->getMessage());
        }
    }

    /**
     * Get transaction history
     */
    public function history(Request $request)
    {
        $customer = Auth::guard('client')->user();

        $transactions = CustomerWalletTransaction::where('customer_id', $customer->id)
            ->when($request->type, fn ($q) => $q->where('type', $request->type))
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->latest()
            ->paginate(20);

        return response()->json($transactions);
    }

    /**
     * Check transaction status manually from Midtrans
     */
    public function checkStatus(Request $request): JsonResponse
    {
        $request->validate([
            'transaction_ref' => 'required|string',
        ]);

        $customer = Auth::guard('client')->user();

        // Find transaction
        $transaction = CustomerWalletTransaction::where('transaction_ref', $request->transaction_ref)
            ->where('customer_id', $customer->id)
            ->firstOrFail();

        if ($transaction->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Transaksi sudah diproses dengan status: '.$transaction->status,
                'status' => $transaction->status,
            ]);
        }

        try {
            // Configure Midtrans
            Config::$serverKey = config('services.midtrans.server_key');
            Config::$isProduction = config('services.midtrans.is_production');

            // Get status from Midtrans
            $statusResponse = \Midtrans\Transaction::status($request->transaction_ref);

            // Convert object to array if needed
            $statusData = is_object($statusResponse) ? (array) $statusResponse : $statusResponse;

            $transactionStatus = $statusData['transaction_status'] ?? null;
            $fraudStatus = $statusData['fraud_status'] ?? 'accept';

            Log::info('Manual status check', [
                'transaction_ref' => $request->transaction_ref,
                'midtrans_status' => $transactionStatus,
                'fraud_status' => $fraudStatus,
                'full_response' => $statusData,
            ]);

            if (! $transactionStatus) {
                return response()->json([
                    'success' => false,
                    'message' => 'Status transaksi tidak ditemukan di Midtrans',
                ], 404);
            }

            DB::beginTransaction();

            // Handle transaction status same as callback
            if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
                if ($fraudStatus == 'accept') {
                    $transaction->update([
                        'status' => 'completed',
                        'completed_at' => now(),
                    ]);

                    $newBalance = $customer->ewallet_saldo + $transaction->amount;

                    $customer->update(['ewallet_saldo' => $newBalance]);
                    $transaction->update(['balance_after' => $newBalance]);

                    DB::commit();

                    Log::info('Top-up completed via manual check', [
                        'transaction_ref' => $request->transaction_ref,
                        'amount' => $transaction->amount,
                        'new_balance' => $newBalance,
                    ]);

                    return response()->json([
                        'success' => true,
                        'message' => 'Pembayaran berhasil! Saldo Anda telah ditambahkan.',
                        'status' => 'completed',
                        'new_balance' => $newBalance,
                    ]);
                }
            } elseif ($transactionStatus == 'pending') {
                $transaction->update(['status' => 'pending']);
                DB::commit();

                return response()->json([
                    'success' => false,
                    'message' => 'Pembayaran masih menunggu.',
                    'status' => 'pending',
                ]);
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
                $transaction->update([
                    'status' => $transactionStatus == 'cancel' ? 'cancelled' : 'failed',
                ]);
                DB::commit();

                return response()->json([
                    'success' => false,
                    'message' => 'Pembayaran gagal atau dibatalkan.',
                    'status' => $transaction->status,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => false,
                'message' => 'Status tidak dikenali: '.$transactionStatus,
                'status' => $transactionStatus,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Check Status Error: '.$e->getMessage(), [
                'transaction_ref' => $request->transaction_ref,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memeriksa status: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Handle Midtrans notification callback
     */
    public function callback(Request $request)
    {
        // Configure Midtrans
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = config('services.midtrans.is_production');

        try {
            // Finish redirect from Snap (GET)
            if ($request->isMethod('get')) {
                Log::info('Midtrans Finish Redirect', [
                    'order_id' => $request->query('order_id'),
                    'status_code' => $request->query('status_code'),
                    'transaction_status' => $request->query('transaction_status'),
                ]);

                return redirect()->route('client.profile', ['tab' => 'wallet'])
                    ->with('success', 'Terima kasih! Status pembayaran Anda sedang diproses.');
            }

            // Server-to-server notification (POST)
            $notification = new \Midtrans\Notification;

            $transactionStatus = $notification->transaction_status;
            $orderID = $notification->order_id;
            $fraudStatus = $notification->fraud_status ?? 'accept';

            Log::info('Midtrans Notification', [
                'order_id' => $orderID,
                'status' => $transactionStatus,
                'fraud' => $fraudStatus,
            ]);

            // Find transaction
            $transaction = CustomerWalletTransaction::where('transaction_ref', $orderID)->firstOrFail();

            DB::beginTransaction();

            // Handle transaction status
            if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
                if ($fraudStatus == 'accept') {
                    $transaction->update([
                        'status' => 'completed',
                        'completed_at' => now(),
                    ]);

                    $customer = $transaction->customer;
                    $newBalance = $customer->ewallet_saldo + $transaction->amount;

                    $customer->update(['ewallet_saldo' => $newBalance]);
                    $transaction->update(['balance_after' => $newBalance]);

                    Log::info('Top-up completed', [
                        'transaction_ref' => $orderID,
                        'amount' => $transaction->amount,
                        'new_balance' => $newBalance,
                    ]);
                }
            } elseif ($transactionStatus == 'pending') {
                $transaction->update(['status' => 'pending']);
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
                $transaction->update([
                    'status' => $transactionStatus == 'cancel' ? 'cancelled' : 'failed',
                ]);

                Log::info('Top-up failed', [
                    'transaction_ref' => $orderID,
                    'status' => $transactionStatus,
                ]);
            }

            DB::commit();

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Midtrans Callback Error: '.$e->getMessage());

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
