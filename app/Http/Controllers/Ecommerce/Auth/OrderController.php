<?php

namespace App\Http\Controllers\Ecommerce\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Shipment;
use App\Models\ShipmentItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource for admin.
     */
    public function adminIndex(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $paymentMethod = $request->input('payment_method');
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        // Get all payment methods for filter
        $paymentMethods = \App\Models\PaymentMethod::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);
        [$ewalletMethodIds, $ewalletName] = $this->resolveEwalletData($paymentMethods);

        $query = Order::with(['customer', 'payments.method'])
        ->when($search, function ($q) use ($search) {
            $q->where(function ($qq) use ($search) {
                $qq->where('order_no', 'like', "%{$search}%")
                ->orWhereHas('customer', function ($qc) use ($search) {
                    $qc->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            });
        })
        ->when($status, fn ($q) => $q->where('status', $status))
        ->when($paymentMethod, function ($q) use ($paymentMethod, $ewalletMethodIds) {
            if ($this->isEwalletFilter($paymentMethod, $ewalletMethodIds)) {
                return $q->doesntHave('payments');
            }

            return $q->whereHas('payments', function ($qp) use ($paymentMethod) {
                $qp->where('method_id', $paymentMethod);
            });
        })
        ->orderBy($sortBy, $sortOrder);

        $orders = $query->paginate(15);
        $this->attachEwalletPayments($orders, $ewalletName);

        $statistics = [
            'total_orders' => Order::count(),
            'total_revenue' => Order::whereNotNull('paid_at')->sum('grand_total'),
            'total_bv' => Order::whereNotNull('paid_at')->sum('bv_amount'),
            'total_bonuses' => Order::whereNotNull('paid_at')->sum(DB::raw('sponsor_amount + match_amount + pairing_amount + cashback_amount')),
            'total_pending' => Order::where('status', 'pending')->count(),
            'total_completed' => Order::where('status', 'completed')->count(),
        ];

        return inertia('Admin/Orders/Index', [
            'orders' => $orders,
            'statistics' => $statistics,
            'paymentMethods' => $paymentMethods,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'payment_method' => $paymentMethod,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    /**
     * Display pending orders for admin.
     */
    public function adminPending(Request $request)
    {
        $search = $request->input('search');
        $paymentMethod = $request->input('payment_method');

        // Get all payment methods for filter
        $paymentMethods = \App\Models\PaymentMethod::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);
        [$ewalletMethodIds, $ewalletName] = $this->resolveEwalletData($paymentMethods);

        $query = Order::with(['customer', 'payments.method'])
            ->where('status', 'pending')
            ->when($search, function ($q) use ($search) {
                $q->where('order_no', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            })
            ->when($paymentMethod, function ($q) use ($paymentMethod, $ewalletMethodIds) {
                if ($this->isEwalletFilter($paymentMethod, $ewalletMethodIds)) {
                    return $q->doesntHave('payments');
                }

                return $q->whereHas('payments', function ($qp) use ($paymentMethod) {
                    $qp->where('method_id', $paymentMethod);
                });
            })
            ->orderBy('created_at', 'desc');

        $orders = $query->paginate(15);
        $this->attachEwalletPayments($orders, $ewalletName);

        $statistics = [
            'total_pending' => Order::where('status', 'pending')->count(),
            'total_amount' => Order::where('status', 'pending')->sum('grand_total'),
        ];

        return inertia('Admin/Orders/Pending', [
            'orders' => $orders,
            'statistics' => $statistics,
            'paymentMethods' => $paymentMethods,
            'filters' => [
                'search' => $search,
                'payment_method' => $paymentMethod,
            ],
        ]);
    }

    /**
     * Display paid orders for admin.
     */
    public function adminPaid(Request $request)
    {
        $search = $request->input('search');
        $paymentMethod = $request->input('payment_method');

        // Get all payment methods for filter
        $paymentMethods = \App\Models\PaymentMethod::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'code']);
        [$ewalletMethodIds, $ewalletName] = $this->resolveEwalletData($paymentMethods);

        $query = Order::with(['customer', 'payments.method'])
            ->where('status', 'paid')
            ->when($search, function ($q) use ($search) {
                $q->where('order_no', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            })
            ->when($paymentMethod, function ($q) use ($paymentMethod, $ewalletMethodIds) {
                if ($this->isEwalletFilter($paymentMethod, $ewalletMethodIds)) {
                    return $q->doesntHave('payments');
                }

                return $q->whereHas('payments', function ($qp) use ($paymentMethod) {
                    $qp->where('method_id', $paymentMethod);
                });
            })
            ->orderBy('paid_at', 'desc');

        $orders = $query->paginate(15);
        $this->attachEwalletPayments($orders, $ewalletName);

        $statistics = [
            'total_paid' => Order::where('status', 'paid')->count(),
            'total_amount' => Order::where('status', 'paid')->sum('grand_total'),
        ];

        return inertia('Admin/Orders/Paid', [
            'orders' => $orders,
            'statistics' => $statistics,
            'paymentMethods' => $paymentMethods,
            'filters' => [
                'search' => $search,
                'payment_method' => $paymentMethod,
            ],
        ]);
    }

    /**
     * Display completed orders for admin.
     */
    public function adminCompleted(Request $request)
    {
        $search = $request->input('search');

        $query = Order::with(['customer', 'payments.method'])
            ->where('status', 'completed')
            ->when($search, function ($q) use ($search) {
                $q->where('order_no', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                    });
            })
            ->orderBy('created_at', 'desc');

        $orders = $query->paginate(15);

        $statistics = [
            'total_completed' => Order::where('status', 'completed')->count(),
            'total_revenue' => Order::where('status', 'completed')->sum('grand_total'),
        ];

        return inertia('Admin/Orders/Completed', [
            'orders' => $orders,
            'statistics' => $statistics,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Display the specified order for admin.
     */
    public function adminShow(Order $order)
    {
        $order->load([
            'customer',
            'items.product',
            'shippingAddress',
            'billingAddress',
            'shipments',
        ]);

        // Calculate total bonuses
        $order->total_bonuses = (
            (float) $order->sponsor_amount +
            (float) $order->match_amount +
            (float) $order->pairing_amount +
            (float) $order->cashback_amount
        );

        return inertia('Admin/Orders/Show', [
            'order' => $order,
        ]);
    }

    /**
     * Get order invoice data for admin.
     */
    public function adminInvoice(Order $order): JsonResponse
    {
        $order->load([
            'customer',
            'items.product',
            'shippingAddress',
            'billingAddress',
            'payments.method', // Load payment method relation
        ]);

        // Calculate total bonuses
        $order->total_bonuses = (
            (float) $order->sponsor_amount +
            (float) $order->match_amount +
            (float) $order->pairing_amount +
            (float) $order->cashback_amount
        );

        return response()->json([
            'data' => $order,
        ]);
    }

    /**
     * Cancel order by admin.
     */
    public function adminCancel(Request $request, Order $order)
    {
        if (! in_array(strtoupper($order->status), ['PENDING', 'PAID', 'PROCESSING'])) {
            return response()->json([
                'message' => 'Order can only be cancelled when status is pending, paid, or processing',
            ], 422);
        }

        $order->update([
            'status' => 'CANCELLED',
        ]);

        return redirect()->back();
    }

    /**
     * Setup shipment for order by admin.
     */
    public function adminSetupShipment(Request $request, Order $order)
    {
        if (! in_array(strtoupper($order->status), ['PAID', 'PROCESSING'])) {
            return back()->with('error', 'Order must be in paid or processing status to setup shipment');
        }

        $validated = $request->validate([
            'tracking_no' => 'required|string|max:255',
            'courier_id' => 'nullable|integer',
            'shipping_fee' => 'nullable|numeric|min:0',
            'items' => 'required|array',
            'items.*.order_item_id' => 'required|exists:order_items,id',
            'items.*.qty' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            // Create shipment
            $shipment = Shipment::create([
                'order_id' => $order->id,
                'courier_id' => $validated['courier_id'] ?? null,
                'tracking_no' => $validated['tracking_no'],
                'status' => 'READY_TO_SHIP',
                'shipping_fee' => $validated['shipping_fee'] ?? $order->shipping_amount,
            ]);

            // Create shipment items
            foreach ($validated['items'] as $item) {
                ShipmentItem::create([
                    'shipment_id' => $shipment->id,
                    'order_item_id' => $item['order_item_id'],
                    'qty' => $item['qty'],
                ]);
            }

            // Update order status to processing if it was paid
            if (strtoupper($order->status) === 'PAID') {
                $order->update(['status' => 'PROCESSING']);
            }

            DB::commit();

            Log::info('Shipment created for order', [
                'order_no' => $order->order_no,
                'shipment_id' => $shipment->id,
                'tracking_no' => $validated['tracking_no'],
            ]);

            return back()->with('success', 'Shipment setup successfully');
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to setup shipment', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to setup shipment: '.$e->getMessage());
        }
    }

    /**
     * Mark shipment as shipped by admin.
     */
    public function adminShipOrder(Request $request, Order $order)
    {
        $validated = $request->validate([
            'shipment_id' => 'required|exists:shipments,id',
        ]);

        $shipment = Shipment::where('id', $validated['shipment_id'])
            ->where('order_id', $order->id)
            ->first();

        if (! $shipment) {
            return back()->with('error', 'Shipment not found for this order');
        }

        if ($shipment->status !== 'READY_TO_SHIP') {
            return back()->with('error', 'Shipment can only be marked as shipped when status is READY_TO_SHIP');
        }

        try {
            DB::beginTransaction();

            $shipment->update([
                'status' => 'IN_TRANSIT',
                'shipped_at' => now(),
            ]);

            // Update order status to shipped
            $order->update(['status' => 'SHIPPED']);

            DB::commit();

            Log::info('Order marked as shipped', [
                'order_no' => $order->order_no,
                'shipment_id' => $shipment->id,
                'tracking_no' => $shipment->tracking_no,
            ]);

            return back()->with('success', 'Order marked as shipped successfully');
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to mark order as shipped', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to mark order as shipped: '.$e->getMessage());
        }
    }

    /**
     * Mark shipment as delivered by admin.
     */
    public function adminDeliverOrder(Request $request, Order $order)
    {
        $validated = $request->validate([
            'shipment_id' => 'required|exists:shipments,id',
        ]);

        $shipment = Shipment::where('id', $validated['shipment_id'])
            ->where('order_id', $order->id)
            ->first();

        if (! $shipment) {
            return back()->with('error', 'Shipment not found for this order');
        }

        if ($shipment->status !== 'IN_TRANSIT') {
            return back()->with('error', 'Shipment can only be marked as delivered when status is IN_TRANSIT');
        }

        try {
            DB::beginTransaction();

            $shipment->update([
                'status' => 'DELIVERED',
                'delivered_at' => now(),
            ]);

            // Update order status to completed
            $order->update(['status' => 'COMPLETED']);

            DB::commit();

            Log::info('Order marked as delivered', [
                'order_no' => $order->order_no,
                'shipment_id' => $shipment->id,
                'tracking_no' => $shipment->tracking_no,
            ]);

            return back()->with('success', 'Order marked as delivered successfully');
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to mark order as delivered', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Failed to mark order as delivered: '.$e->getMessage());
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): JsonResponse
    {
        // Ensure the order belongs to the authenticated user
        if ($order->customer_id !== auth('client')->id()) {
            abort(403, 'Unauthorized access to this order');
        }

        $order->load([
            'items',
            'shippingAddress',
            'billingAddress',
        ]);

        // Add computed total bonuses
        $order->total_bonuses = (
            (float) $order->sponsor_amount +
            (float) $order->match_amount +
            (float) $order->pairing_amount +
            (float) $order->cashback_amount
        );

        return response()->json([
            'data' => $order,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Resolve ewallet identifiers and display name from payment methods list.
     *
     * @param  \Illuminate\Support\Collection<int, \App\Models\PaymentMethod>  $paymentMethods
     * @return array{0: array<int, string>, 1: string}
     */
    protected function resolveEwalletData($paymentMethods): array
    {
        $ewalletMethods = $paymentMethods->whereIn('code', ['wallet', 'ewallet']);
        $ewalletMethodIds = $ewalletMethods
            ->pluck('id')
            ->map(fn ($id) => (string) $id)
            ->all();

        $ewalletName = $ewalletMethods->first()?->name ?? 'E-Wallet';

        return [$ewalletMethodIds, $ewalletName];
    }

    /**
     * Determine if the payment method filter represents ewallet.
     *
     * @param  string|null  $paymentMethod
     * @param  array<int, string>  $ewalletMethodIds
     */
    protected function isEwalletFilter(?string $paymentMethod, array $ewalletMethodIds): bool
    {
        if (! $paymentMethod) {
            return false;
        }

        $normalized = strtolower((string) $paymentMethod);
        if (in_array($normalized, ['wallet', 'ewallet'], true)) {
            return true;
        }

        return in_array((string) $paymentMethod, $ewalletMethodIds, true);
    }

    /**
     * Attach a display-only ewallet payment method for orders without payments.
     *
     * @param  \Illuminate\Pagination\LengthAwarePaginator  $orders
     */
    protected function attachEwalletPayments($orders, string $ewalletName): void
    {
        $orders->getCollection()->transform(function ($order) use ($ewalletName) {
            if (! $order->relationLoaded('payments') || $order->payments->isNotEmpty()) {
                return $order;
            }

            $order->setRelation('payments', collect([[
                'method' => [
                    'name' => $ewalletName,
                ],
            ]]));

            return $order;
        });
    }

    /**
     * Mark order as completed (only if currently shipped).
     */
    public function complete(Order $order): JsonResponse
    {
        // Ensure the order belongs to the authenticated user
        if ($order->customer_id !== auth('client')->id()) {
            abort(403, 'Unauthorized access to this order');
        }

        // Only allow completion if order is currently shipped
        if (strtoupper($order->status) !== 'SHIPPED') {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan hanya dapat ditandai sebagai selesai jika dalam status dikirim',
            ], 422);
        }

        $order->update([
            'status' => 'completed',
        ]);

        if (auth('client')->user()->status === 1) {
            auth('client')->user()->update(['status' => 2]);
        }

        // Load items for review
        $order->load('items.product.media');

        return response()->json([
            'success' => true,
            'message' => 'Pesanan berhasil ditandai sebagai diterima',
            'data' => $order,
            'items' => $order->items->map(function ($item) {
                $imageUrl = null;
                if ($item->product && $item->product->primaryImage) {
                    $imageUrl = '/storage/'.$item->product->primaryImage->url;
                }

                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->name,
                    'product_image' => $imageUrl,
                ];
            }),
        ]);
    }

    /**
     * Submit product review for order item.
     */
    public function submitReview(Request $request, Order $order): JsonResponse
    {
        // Ensure the order belongs to the authenticated user
        if ($order->customer_id !== auth('client')->id()) {
            abort(403, 'Unauthorized access to this order');
        }

        // Only allow reviews for completed orders
        if (strtoupper($order->status) !== 'COMPLETED') {
            return response()->json([
                'success' => false,
                'message' => 'Review hanya dapat diberikan untuk pesanan yang sudah selesai',
            ], 422);
        }

        $validated = $request->validate([
            'order_item_id' => ['required', 'exists:order_items,id'],
            'product_id' => ['required', 'exists:products,id'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'title' => ['nullable', 'string', 'max:100'],
            'comment' => ['nullable', 'string', 'max:500'],
        ]);

        // Verify order item belongs to this order
        $orderItem = $order->items()->find($validated['order_item_id']);
        if (! $orderItem) {
            return response()->json([
                'success' => false,
                'message' => 'Item tidak ditemukan dalam pesanan ini',
            ], 404);
        }

        // Check if review already exists
        $existingReview = \App\Models\ProductReview::where('order_item_id', $validated['order_item_id'])
            ->where('customer_id', auth('client')->id())
            ->first();

        if ($existingReview) {
            return response()->json([
                'success' => false,
                'message' => 'Anda sudah memberikan review untuk produk ini',
            ], 422);
        }

        // Create review
        $review = \App\Models\ProductReview::create([
            'customer_id' => auth('client')->id(),
            'product_id' => $validated['product_id'],
            'order_item_id' => $validated['order_item_id'],
            'rating' => $validated['rating'],
            'title' => $validated['title'] ?? null,
            'comment' => $validated['comment'] ?? null,
            'is_verified_purchase' => true,
            'is_approved' => false, // Pending approval
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Review berhasil dikirim dan menunggu persetujuan',
            'data' => $review,
        ]);
    }

    /**
     * Check payment status from Midtrans and update order
     */
    public function checkPaymentStatus(Order $order): JsonResponse
    {
        // Ensure the order belongs to the authenticated user
        if ($order->customer_id !== auth('client')->id()) {
            abort(403, 'Unauthorized access to this order');
        }

        // Only check if order is pending and not paid yet
        if ($order->paid_at) {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan sudah dibayar',
                'status' => $order->status,
            ]);
        }

        try {
            // Get transaction_id from applied_promos
            $appliedPromos = $order->applied_promos ?? [];
            $transactionId = $appliedPromos['payment']['transaction_id'] ?? null;

            if (! $transactionId) {
                Log::error('Transaction ID not found in order', [
                    'order_no' => $order->order_no,
                    'order_id' => $order->id,
                ]);

                return response()->json([
                    'success' => false,
                    'message' => 'Transaction ID tidak ditemukan',
                ], 404);
            }

            // Configure Midtrans
            \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
            \Midtrans\Config::$isProduction = config('services.midtrans.is_production');

            // Get status from Midtrans using transaction_id (not order_no)
            $statusResponse = \Midtrans\Transaction::status($transactionId);
            // Convert object to array if needed
            // $statusData = is_object($statusResponse) ? (array) $statusResponse : $statusResponse;
            $statusData = (array) $statusResponse;

            $transactionStatus = $statusData['transaction_status'] ?? null;
            $fraudStatus = $statusData['fraud_status'] ?? 'accept';

            Log::info('Order payment status check', [
                'order_id' => $order->id,
                'order_no' => $order->order_no,
                'transaction_id' => $transactionId,
                'midtrans_status' => $transactionStatus,
                'fraud_status' => $fraudStatus,
            ]);

            if (! $transactionStatus) {
                return response()->json([
                    'success' => false,
                    'message' => 'Status pembayaran tidak ditemukan di Midtrans',
                ], 404);
            }

            DB::beginTransaction();

            // Handle transaction status
            if (($transactionStatus == 'capture' || $transactionStatus == 'settlement') && $fraudStatus == 'accept') {
                $order->update([
                    'status' => 'PAID',
                    'paid_at' => now(),
                ]);

                // Clear customer cart
                $this->clearCustomerCart($order->customer_id);

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Pembayaran berhasil! Pesanan Anda akan segera diproses.',
                    'status' => 'PAID',
                    'paid_at' => $order->paid_at,
                ]);
            } elseif ($transactionStatus == 'pending') {
                DB::commit();

                return response()->json([
                    'success' => false,
                    'message' => 'Pembayaran masih menunggu.',
                    'status' => 'pending',
                ]);
            } elseif ($transactionStatus == 'deny' || $transactionStatus == 'expire' || $transactionStatus == 'cancel') {
                $order->update([
                    'status' => 'CANCELLED',
                ]);

                DB::commit();

                return response()->json([
                    'success' => false,
                    'message' => 'Pembayaran gagal atau dibatalkan.',
                    'status' => 'CANCELLED',
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
            Log::error('Check Order Payment Status Error: '.$e->getMessage(), [
                'order_id' => $order->id,
                'order_no' => $order->order_no,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memeriksa status: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /**
     * Clear customer cart after successful payment
     */
    protected function clearCustomerCart(int $customerId): void
    {
        $cart = Cart::where('customer_id', $customerId)->first();

        if (! $cart) {
            return;
        }

        $cart->items()->delete();

        $cart->update([
            'subtotal_amount' => 0,
            'discount_amount' => 0,
            'shipping_amount' => 0,
            'tax_amount' => 0,
            'grand_total' => 0,
        ]);
    }

    /**
     * Get new Snap token for pending order payment
     */
    public function pay(Order $order): JsonResponse
    {
        // Ensure the order belongs to the authenticated user
        if ($order->customer_id !== auth('client')->id()) {
            abort(403, 'Unauthorized access to this order');
        }

        // Only allow payment for pending orders
        if (strtoupper($order->status) !== 'PENDING') {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan tidak dalam status menunggu pembayaran',
            ], 400);
        }

        // Only allow if not yet paid
        if ($order->paid_at) {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan sudah dibayar',
            ], 400);
        }

        try {
            $customer = auth('client')->user();

            // Generate new transaction ID
            $transactionId = $order->order_no.'-'.time();

            // Configure Midtrans
            \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
            \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
            \Midtrans\Config::$isSanitized = true;
            \Midtrans\Config::$is3ds = true;

            // Get order items for Midtrans
            $items = [];
            foreach ($order->items as $item) {
                $items[] = [
                    'id' => $item->product_id,
                    'price' => (int) $item->unit_price,
                    'quantity' => $item->qty,
                    'name' => substr($item->name, 0, 50),
                ];
            }

            // Add shipping cost as item
            if ($order->shipping_amount > 0) {
                $items[] = [
                    'id' => 'SHIPPING',
                    'price' => (int) $order->shipping_amount,
                    'quantity' => 1,
                    'name' => 'Ongkos Kirim',
                ];
            }

            // Build Midtrans transaction data
            $params = [
                'transaction_details' => [
                    'order_id' => $transactionId,
                    'gross_amount' => (int) $order->grand_total,
                ],
                'customer_details' => [
                    'first_name' => $customer->name,
                    'email' => $customer->email,
                    'phone' => $customer->phone ?? '',
                ],
                'item_details' => $items,
                'callbacks' => [
                    'finish' => route('checkout.finish').'?order_no='.$order->order_no,
                ],
            ];

            $snapToken = \Midtrans\Snap::getSnapToken($params);

            // Update applied_promos with new transaction_id
            $appliedPromos = $order->applied_promos ?? [];
            $appliedPromos['payment'] = [
                'transaction_id' => $transactionId,
                'method' => 'midtrans',
            ];

            $order->update([
                'applied_promos' => $appliedPromos,
            ]);

            Log::info('New Snap token generated for order payment', [
                'order_id' => $order->id,
                'order_no' => $order->order_no,
                'transaction_id' => $transactionId,
            ]);

            return response()->json([
                'success' => true,
                'snap_token' => $snapToken,
                'order_no' => $order->order_no,
                'transaction_id' => $transactionId,
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to generate Snap token for order payment', [
                'order_id' => $order->id,
                'order_no' => $order->order_no,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses pembayaran: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Pay order with E-Wallet
     */
    public function payWithWallet(Order $order): JsonResponse
    {
        // Ensure the order belongs to the authenticated user
        if ($order->customer_id !== auth('client')->id()) {
            abort(403, 'Unauthorized access to this order');
        }

        // Only allow payment for pending orders
        if (strtoupper($order->status) !== 'PENDING') {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan tidak dalam status menunggu pembayaran',
            ], 400);
        }

        // Only allow if not yet paid
        if ($order->paid_at) {
            return response()->json([
                'success' => false,
                'message' => 'Pesanan sudah dibayar',
            ], 400);
        }

        $customer = auth('client')->user();
        $total = $order->grand_total;

        // Check wallet balance
        if ($customer->ewallet_saldo < $total) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo e-wallet tidak mencukupi. Saldo Anda: Rp '.number_format($customer->ewallet_saldo, 0, ',', '.'),
            ], 400);
        }

        try {
            DB::beginTransaction();

            // Deduct from wallet
            $customer->decrement('ewallet_saldo', $total);

            // Update order status
            $order->update([
                'status' => 'paid',
                'paid_at' => now(),
                'applied_promos' => array_merge($order->applied_promos ?? [], [
                    'payment' => [
                        'method' => 'wallet',
                        'paid_at' => now()->toDateTimeString(),
                    ],
                ]),
            ]);

            // Reduce product stock
            foreach ($order->items as $item) {
                $product = \App\Models\Product::find($item->product_id);
                if ($product) {
                    $product->decrement('stock', $item->qty);
                }
            }

            // Clear cart
            $this->clearCustomerCart($customer->id);

            DB::commit();

            Log::info('Order paid with wallet', [
                'order_id' => $order->id,
                'order_no' => $order->order_no,
                'customer_id' => $customer->id,
                'amount' => $total,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil! Pesanan Anda akan segera diproses.',
                'order_no' => $order->order_no,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            Log::error('Failed to pay order with wallet', [
                'order_id' => $order->id,
                'order_no' => $order->order_no,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses pembayaran: '.$e->getMessage(),
            ], 500);
        }
    }
}
