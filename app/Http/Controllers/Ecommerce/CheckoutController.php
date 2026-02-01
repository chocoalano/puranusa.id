<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CustomerAddress;
use App\Models\CustomerWalletTransaction;
use App\Models\Manage\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Product;
use App\Services\MLMService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Midtrans\Config;
use Midtrans\Snap;

class CheckoutController extends Controller
{
    public function __construct(protected MLMService $mlmService) {}

    /**
     * Process checkout from cart
     */
    public function processFromCart(Request $request): JsonResponse
    {
        // Check if shipping method is pickup
        $isPickup = $request->input('shipping.courier') === 'pickup';

        // Base validation rules
        $rules = [
            'shipping' => 'required|array',
            'shipping.recipient_name' => 'required|string|max:255',
            'shipping.recipient_phone' => 'required|string|max:20',
            'shipping.courier' => 'required|string',
            'shipping.service' => 'required|string',
            'shipping.cost' => 'required|numeric|min:0',
            'shipping.etd' => 'required|string',
            'notes' => 'nullable|string|max:500',
            'subtotal' => 'required|numeric|min:0',
            'shipping_cost' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'required|in:wallet,midtrans',
            'transaction_type' => 'nullable|in:planA,planB',
        ];

        // Add address validation rules only for non-pickup shipping
        if (! $isPickup) {
            $rules['shipping.address_line1'] = 'required|string';
            $rules['shipping.province_label'] = 'required|string';
            $rules['shipping.province_id'] = 'required|string';
            $rules['shipping.city_label'] = 'required|string';
            $rules['shipping.city_id'] = 'required|string';
            $rules['shipping.postal_code'] = 'required|string|max:10';
        } else {
            $rules['shipping.address_line1'] = 'nullable|string';
            $rules['shipping.province_label'] = 'nullable|string';
            $rules['shipping.province_id'] = 'nullable|string';
            $rules['shipping.city_label'] = 'nullable|string';
            $rules['shipping.city_id'] = 'nullable|string';
            $rules['shipping.postal_code'] = 'nullable|string|max:10';
        }

        $validated = $request->validate($rules);

        if (! Auth::guard('client')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan login terlebih dahulu',
            ], 401);
        }

        $customer = Auth::guard('client')->user();
        $cart = Cart::with('items.product')->where('customer_id', $customer->id)->first();

        if (! $cart || $cart->items->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Keranjang belanja kosong',
            ], 400);
        }

        $stockValidation = $this->validateCartStock($cart);
        if ($stockValidation !== null) {
            return $stockValidation;
        }

        if ($validated['payment_method'] === 'wallet' && $customer->ewallet_saldo < $validated['total']) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo e-wallet tidak mencukupi. Saldo Anda: Rp '.number_format($customer->ewallet_saldo, 0, ',', '.'),
            ], 400);
        }

        try {
            $orderNo = 'ORD-'.date('Ymd').'-'.strtoupper(Str::random(6));
            $transactionId = $orderNo.'-'.time();

            DB::beginTransaction();

            // Handle shipping address based on pickup or delivery
            if ($isPickup) {
                $shippingAddress = $this->createPickupAddress($customer->id, $validated['shipping']);
            } else {
                $shippingAddress = $this->createOrUpdateShippingAddress($customer->id, $validated['shipping']);
            }

            $bonusAmounts = $this->calculateCartBonusAmounts($cart);
            $order = $this->createCartOrder($customer->id, $orderNo, $validated, $shippingAddress->id, $bonusAmounts);
            $this->createCartOrderItems($order->id, $cart);

            if ($validated['payment_method'] === 'wallet') {
                $result = $this->processCartWalletPayment($customer, $order, $cart, $validated, $orderNo);

                // Commit the transaction first before returning
                // (SP bonus engine may have already committed implicitly)
                try {
                    DB::commit();
                } catch (\Exception $e) {
                    // Transaction may already be committed by stored procedure
                    Log::info('Transaction already committed (likely by stored procedure)', [
                        'order_no' => $orderNo,
                    ]);
                }

                return response()->json($result);
            }

            $snapToken = $this->createCartMidtransPayment($customer, $order, $cart, $validated, $orderNo, $transactionId);

            // Commit the transaction
            try {
                DB::commit();
            } catch (\Exception $e) {
                Log::info('Transaction already committed', ['order_no' => $orderNo]);
            }

            Log::info('Cart checkout order created successfully', [
                'order_id' => $order->id,
                'order_no' => $orderNo,
                'snap_token' => $snapToken,
                'items_count' => $cart->items->count(),
            ]);

            return response()->json([
                'success' => true,
                'snap_token' => $snapToken,
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'message' => 'Silakan selesaikan pembayaran',
            ]);
        } catch (\Exception $e) {
            // Try to rollback, but it might already be committed by SP
            try {
                DB::rollBack();
            } catch (\Exception $rollbackException) {
                Log::info('Rollback skipped in cart checkout - no active transaction');
            }

            Log::error('Cart checkout process error', [
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses checkout: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Validate cart stock availability.
     */
    protected function validateCartStock(Cart $cart): ?JsonResponse
    {
        foreach ($cart->items as $item) {
            if (! $item->product) {
                return response()->json([
                    'success' => false,
                    'message' => "Produk {$item->product_name} tidak ditemukan",
                ], 400);
            }

            if ($item->product->stock < $item->qty) {
                return response()->json([
                    'success' => false,
                    'message' => "Stok {$item->product->name} tidak mencukupi",
                ], 400);
            }
        }

        return null;
    }

    /**
     * Calculate total bonus amounts from cart items.
     *
     * @return array<string, float>
     */
    protected function calculateCartBonusAmounts(Cart $cart): array
    {
        $totals = [
            'bv' => 0.0,
            'sponsor' => 0.0,
            'match' => 0.0,
            'pairing' => 0.0,
            'cashback' => 0.0,
        ];

        foreach ($cart->items as $item) {
            $product = $item->product;
            $totals['bv'] += ((float) ($product->bv ?? 0)) * $item->qty;
            $totals['sponsor'] += ((float) ($product->b_sponsor ?? 0)) * $item->qty;
            $totals['match'] += ((float) ($product->b_matching ?? 0)) * $item->qty;
            $totals['pairing'] += ((float) ($product->b_pairing ?? 0)) * $item->qty;
            $totals['cashback'] += ((float) ($product->b_cashback ?? 0)) * $item->qty;
        }

        return $totals;
    }

    /**
     * Create order from cart.
     *
     * @param  array<string, float>  $bonusAmounts
     */
    protected function createCartOrder(int $customerId, string $orderNo, array $validated, int $shippingAddressId, array $bonusAmounts): Order
    {
        return Order::create([
            'order_no' => $orderNo,
            'customer_id' => $customerId,
            'type' => $validated['transaction_type'] ?? 'planA',
            'currency' => 'IDR',
            'status' => 'PENDING',
            'subtotal_amount' => $validated['subtotal'],
            'discount_amount' => 0,
            'shipping_amount' => $validated['shipping_cost'],
            'tax_amount' => 0,
            'grand_total' => $validated['total'],
            'bv_amount' => $bonusAmounts['bv'],
            'sponsor_amount' => $bonusAmounts['sponsor'],
            'match_amount' => $bonusAmounts['match'],
            'pairing_amount' => $bonusAmounts['pairing'],
            'cashback_amount' => $bonusAmounts['cashback'],
            'shipping_address_id' => $shippingAddressId,
            'billing_address_id' => $shippingAddressId,
            'notes' => $validated['notes'] ?? null,
            'applied_promos' => [
                'shipping' => [
                    'courier' => strtoupper($validated['shipping']['courier']),
                    'service' => $validated['shipping']['service'],
                    'etd' => $validated['shipping']['etd'],
                    'cost' => $validated['shipping_cost'],
                ],
            ],
        ]);
    }

    /**
     * Create order items from cart.
     */
    protected function createCartOrderItems(int $orderId, Cart $cart): void
    {
        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $orderId,
                'product_id' => $item->product_id,
                'name' => $item->product_name,
                'sku' => $item->product_sku ?? 'N/A',
                'qty' => $item->qty,
                'unit_price' => $item->unit_price,
                'discount_amount' => 0,
                'row_total' => $item->row_total,
                'weight_gram' => $item->product->weight_gram ?? 0,
                'meta_json' => $item->meta_json,
            ]);
        }
    }

    /**
     * Process wallet payment for cart checkout.
     *
     * @return array<string, mixed>
     */
    protected function processCartWalletPayment($customer, Order $order, Cart $cart, array $validated, string $orderNo): array
    {
        $customer->deductBalance($validated['total'], 'Pembayaran order '.$orderNo);

        $appliedPromos = $order->applied_promos ?? [];
        $appliedPromos['payment'] = [
            'gateway' => 'wallet',
            'method' => 'e-wallet',
            'paid_at' => now()->toIso8601String(),
        ];

        $order->update([
            'status' => 'PAID',
            'paid_at' => now(),
            'applied_promos' => $appliedPromos,
        ]);



        // Execute bonus engine stored procedure only if member is active
        if ($customer->status == 3 && strtoupper($order->status) === 'PAID') {
            $generate = DB::statement('CALL sp_bonus_engine_run(?)', [$order->id]);
            Log::info('Executed bonus engine stored procedure for wallet payment', [
                'customer_id' => $customer->id,
                'order_no' => $orderNo,
                'order_id' => $order->id,
                'result' => $generate,
            ]);
        }

        foreach ($cart->items as $item) {
            $item->product->decrement('stock', $item->qty);
        }

        // Update customer omzet
        $customerRecord = Customer::find($customer->id);
        if ($customerRecord) {
            $newOmzet = $customerRecord->omzet + $validated['total'];
            $customerRecord->update(['omzet' => $newOmzet]);

            Log::info('Customer omzet updated after wallet payment', [
                'customer_id' => $customer->id,
                'order_no' => $orderNo,
                'order_amount' => $validated['total'],
                'new_omzet' => $newOmzet,
            ]);
        }
        $this->clearCustomerCart($customer->id);

        Log::info('Cart checkout with wallet completed', [
            'order_no' => $orderNo,
            'customer_id' => $customer->id,
            'amount' => $validated['total'],
            'items_count' => $cart->items->count(),
        ]);

        return [
            'success' => true,
            'order_no' => $orderNo,
            'message' => 'Pembayaran berhasil menggunakan e-wallet',
        ];
    }

    /**
     * Create Midtrans payment for cart checkout.
     */
    protected function createCartMidtransPayment($customer, Order $order, Cart $cart, array $validated, string $orderNo, string $transactionId): string
    {
        try {
            Config::$serverKey = config('services.midtrans.server_key');
            Config::$clientKey = config('services.midtrans.client_key');
            Config::$isProduction = (bool) config('services.midtrans.is_production');
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $splitName = explode(' ', trim($customer->name));
            $firstName = $splitName[0] ?? 'Customer';
            $lastName = count($splitName) > 1 ? implode(' ', array_slice($splitName, 1)) : '';

            $itemDetails = $this->buildCartMidtransItemDetails($cart, $validated);

            $params = [
                'transaction_details' => [
                    'order_id' => $transactionId,
                    'gross_amount' => (int) $validated['total'],
                ],
                'customer_details' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $customer->email,
                    'phone' => $validated['shipping']['recipient_phone'],
                    'billing_address' => $this->formatMidtransAddress($validated['shipping']),
                    'shipping_address' => $this->formatMidtransAddress($validated['shipping']),
                ],
                'item_details' => $itemDetails,
                'callbacks' => [
                    'finish' => url('/checkout/finish?order_no='.$orderNo),
                ],
                'expiry' => [
                    'start_time' => now()->format('Y-m-d H:i:s O'),
                    'unit' => 'hours',
                    'duration' => 24,
                ],
                'custom_field1' => 'ORDER',
                'custom_field2' => $orderNo,
            ];

            Log::info('Creating Midtrans Snap token for cart checkout', [
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'total' => $validated['total'],
                'customer_id' => $customer->id,
                'items_count' => $cart->items->count(),
            ]);

            $snapToken = Snap::getSnapToken($params);

            $order->refresh();
            $appliedPromos = $order->applied_promos ?? [];

            if (! is_array($appliedPromos)) {
                $appliedPromos = [];
            }

            $appliedPromos['payment'] = [
                'gateway' => 'midtrans',
                'snap_token' => $snapToken,
                'transaction_id' => $transactionId,
                'created_at' => now()->toIso8601String(),
            ];

            $order->update(['applied_promos' => $appliedPromos]);

            return $snapToken;
        } catch (\Exception $e) {
            Log::error('Midtrans Snap token creation failed for cart checkout', [
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
                'error_class' => get_class($e),
                'trace' => $e->getTraceAsString(),
            ]);

            throw new \Exception('Gagal menghubungi payment gateway. Silakan coba lagi nanti. ('.$e->getMessage().')', 503);
        }
    }

    /**
     * Build Midtrans item details for cart.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function buildCartMidtransItemDetails(Cart $cart, array $validated): array
    {
        $itemDetails = [];

        foreach ($cart->items as $item) {
            $itemDetails[] = [
                'id' => $item->product_id,
                'price' => (int) $item->unit_price,
                'quantity' => $item->qty,
                'name' => Str::limit($item->product_name, 50),
                'brand' => $item->product->brand ?? 'Puranusa',
                'category' => $item->product->categories->first()->name ?? 'Product',
            ];
        }

        $itemDetails[] = [
            'id' => 'SHIPPING',
            'price' => (int) $validated['shipping_cost'],
            'quantity' => 1,
            'name' => 'Ongkos Kirim ('.strtoupper($validated['shipping']['courier']).' - '.$validated['shipping']['service'].')',
        ];

        return $itemDetails;
    }

    /**
     * Process direct checkout (buy now)
     */
    public function process(Request $request): JsonResponse
    {
        // Debug: Log incoming request data
        Log::info('Checkout process - incoming request', [
            'all_data' => $request->all(),
            'items' => $request->input('items'),
            'items_count' => is_array($request->input('items')) ? count($request->input('items')) : 'not_array',
        ]);

        // Check if shipping method is pickup
        $isPickup = $request->input('shipping.courier') === 'pickup';

        // Base validation rules
        $rules = [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.product_name' => 'required|string',
            'items.*.product_price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.weight' => 'required|integer|min:1',
            'items.*.product_image' => 'required|string',
            'shipping' => 'required|array',
            'shipping.recipient_name' => 'required|string|max:255',
            'shipping.recipient_phone' => 'required|string|max:20',
            'shipping.courier' => 'required|string',
            'shipping.service' => 'required|string',
            'shipping.cost' => 'required|numeric|min:0',
            'shipping.etd' => 'required|string',
            'notes' => 'nullable|string|max:500',
            'subtotal' => 'required|numeric|min:0',
            'shipping_cost' => 'required|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'required|in:wallet,midtrans',
            'transaction_type' => 'nullable|in:planA,planB',
        ];

        // Add address validation rules only for non-pickup shipping
        if (! $isPickup) {
            $rules['shipping.address_line1'] = 'required|string';
            $rules['shipping.province_label'] = 'required|string';
            $rules['shipping.province_id'] = 'required|string';
            $rules['shipping.city_label'] = 'required|string';
            $rules['shipping.city_id'] = 'required|string';
            $rules['shipping.postal_code'] = 'required|string|max:10';
        } else {
            $rules['shipping.address_line1'] = 'nullable|string';
            $rules['shipping.province_label'] = 'nullable|string';
            $rules['shipping.province_id'] = 'nullable|string';
            $rules['shipping.city_label'] = 'nullable|string';
            $rules['shipping.city_id'] = 'nullable|string';
            $rules['shipping.postal_code'] = 'nullable|string|max:10';
        }

        $validated = $request->validate($rules);
        if (! Auth::guard('client')->check()) {
            return response()->json([
                'success' => false,
                'message' => 'Silakan login terlebih dahulu',
            ], 401);
        }

        $customer = Auth::guard('client')->user();

        // Verify all products availability
        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            if ($product->stock < $item['quantity']) {
                return response()->json([
                    'success' => false,
                    'message' => "Stok produk {$product->name} tidak mencukupi",
                ], 400);
            }
        }

        // Check wallet balance if payment method is wallet
        if ($validated['payment_method'] === 'wallet' && $customer->ewallet_saldo < $validated['total']) {
            return response()->json([
                'success' => false,
                'message' => 'Saldo e-wallet tidak mencukupi. Saldo Anda: Rp '.number_format($customer->ewallet_saldo, 0, ',', '.'),
            ], 400);
        }

        try {
            $orderNo = 'ORD-'.date('Ymd').'-'.strtoupper(Str::random(6));
            $transactionId = $orderNo.'-'.time();

            DB::beginTransaction();

            // Handle shipping address based on pickup or delivery
            $shippingAddressId = null;
            if ($isPickup) {
                // For pickup, create a minimal address record or use null
                $shippingAddress = $this->createPickupAddress($customer->id, $validated['shipping']);
                $shippingAddressId = $shippingAddress->id;
            } else {
                $shippingAddress = $this->createOrUpdateShippingAddress($customer->id, $validated['shipping']);
                $shippingAddressId = $shippingAddress->id;
            }

            $order = $this->createMultiItemOrder($customer->id, $orderNo, $validated, $shippingAddressId);
            $this->createMultiOrderItems($order->id, $validated['items']);
            DB::statement('CALL sp_accumulation_stockist_retail_amount_orders(?)', [$order->id]);
            if ($validated['payment_method'] === 'wallet') {
                $result = $this->processMultiItemWalletPayment($customer, $order, $validated, $orderNo);

                // Commit the transaction first before returning
                // (SP bonus engine may have already committed implicitly)
                try {
                    DB::commit();
                } catch (\Exception $e) {
                    // Transaction may already be committed by stored procedure
                    Log::info('Transaction already committed (likely by stored procedure)', [
                        'order_no' => $orderNo,
                    ]);
                }

                return response()->json($result);
            }
            if ($validated['payment_method'] === 'midtrans') {
                $snapToken = $this->createMultiItemMidtransPayment($customer, $order, $validated, $orderNo, $transactionId);

                // Commit the transaction before returning
                try {
                    DB::commit();
                } catch (\Exception $e) {
                    Log::info('Transaction already committed', [
                        'order_no' => $orderNo,
                    ]);
                }

                Log::info('Order created successfully', [
                    'order_id' => $order->id,
                    'order_no' => $orderNo,
                    'snap_token' => $snapToken,
                ]);

                return response()->json([
                    'success' => true,
                    'snap_token' => $snapToken,
                    'order_no' => $orderNo,
                    'transaction_id' => $transactionId,
                    'message' => 'Silakan selesaikan pembayaran',
                ]);
            }
        } catch (\Exception $e) {
            try {
                DB::rollBack();
            } catch (\Exception $rollbackException) {
                Log::info('Rollback skipped in multi-item checkout - no active transaction');
            }

            Log::error('Checkout process error', [
                'customer_id' => $customer->id,
                'items' => array_map(fn ($item) => $item['product_id'], $validated['items']),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Gagal memproses checkout: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create or update shipping address.
     */
    protected function createOrUpdateShippingAddress(int $customerId, array $shippingData): CustomerAddress
    {
        return CustomerAddress::updateOrCreate(
            [
                'customer_id' => $customerId,
                'address_line1' => $shippingData['address_line1'],
                'city_id' => $shippingData['city_id'],
            ],
            [
                'label' => 'Alamat Pengiriman',
                'recipient_name' => $shippingData['recipient_name'],
                'recipient_phone' => $shippingData['recipient_phone'],
                'province_label' => $shippingData['province_label'],
                'province_id' => (int) $shippingData['province_id'],
                'city_label' => $shippingData['city_label'],
                'city_id' => (int) $shippingData['city_id'],
                'postal_code' => $shippingData['postal_code'],
                'country' => 'Indonesia',
                'is_default' => false,
            ]
        );
    }

    /**
     * Create pickup address record (minimal info for pickup orders).
     */
    protected function createPickupAddress(int $customerId, array $shippingData): CustomerAddress
    {
        return CustomerAddress::updateOrCreate(
            [
                'customer_id' => $customerId,
                'address_line1' => 'PICKUP',
                'city_id' => 0,
            ],
            [
                'label' => 'Pick Up',
                'recipient_name' => $shippingData['recipient_name'],
                'recipient_phone' => $shippingData['recipient_phone'],
                'address_line1' => 'PICKUP - Ambil di tempat',
                'province_label' => '-',
                'province_id' => 0,
                'city_label' => '-',
                'city_id' => 0,
                'postal_code' => '-',
                'country' => 'Indonesia',
                'is_default' => false,
            ]
        );
    }

    /**
     * Create direct checkout order.
     */
    protected function createDirectOrder(int $customerId, string $orderNo, Product $product, array $validated, int $shippingAddressId): Order
    {
        $bonusAmounts = $this->calculateBonusAmounts($product, $validated['quantity']);

        return Order::create([
            'order_no' => $orderNo,
            'customer_id' => $customerId,
            'currency' => 'IDR',
            'status' => 'PENDING',
            'subtotal_amount' => $validated['subtotal'],
            'discount_amount' => 0,
            'shipping_amount' => $validated['shipping_cost'],
            'tax_amount' => 0,
            'grand_total' => $validated['total'],
            'bv_amount' => $bonusAmounts['bv'],
            'sponsor_amount' => $bonusAmounts['sponsor'],
            'match_amount' => $bonusAmounts['match'],
            'pairing_amount' => $bonusAmounts['pairing'],
            'cashback_amount' => $bonusAmounts['cashback'],
            'shipping_address_id' => $shippingAddressId,
            'billing_address_id' => $shippingAddressId,
            'notes' => $validated['notes'] ?? null,
            'applied_promos' => [
                'shipping' => [
                    'courier' => strtoupper($validated['shipping']['courier']),
                    'service' => $validated['shipping']['service'],
                    'etd' => $validated['shipping']['etd'],
                    'cost' => $validated['shipping_cost'],
                ],
            ],
        ]);
    }

    /**
     * Calculate bonus amounts from product.
     *
     * @return array<string, float>
     */
    protected function calculateBonusAmounts(Product $product, int $quantity): array
    {
        return [
            'bv' => ((float) ($product->bv ?? 0)) * $quantity,
            'sponsor' => ((float) ($product->b_sponsor ?? 0)) * $quantity,
            'match' => ((float) ($product->b_matching ?? 0)) * $quantity,
            'pairing' => ((float) ($product->b_pairing ?? 0)) * $quantity,
            'cashback' => ((float) ($product->b_cashback ?? 0)) * $quantity,
        ];
    }

    /**
     * Create order item for direct checkout.
     */
    protected function createDirectOrderItem(int $orderId, Product $product, array $validated): OrderItem
    {
        return OrderItem::create([
            'order_id' => $orderId,
            'product_id' => $validated['product_id'],
            'name' => $validated['product_name'],
            'sku' => $product->sku ?? 'N/A',
            'qty' => $validated['quantity'],
            'unit_price' => $validated['product_price'],
            'discount_amount' => 0,
            'row_total' => $validated['subtotal'],
            'weight_gram' => $validated['weight'],
            'meta_json' => json_encode([
                'image' => $validated['product_image'],
            ]),
        ]);
    }

    /**
     * Process wallet payment.
     *
     * @return array<string, mixed>
     */
    protected function processWalletPayment($customer, Order $order, Product $product, array $validated, string $orderNo): array
    {
        $customer->deductBalance($validated['total'], 'Pembayaran order '.$orderNo);

        $appliedPromos = $order->applied_promos ?? [];
        $appliedPromos['payment'] = [
            'gateway' => 'wallet',
            'method' => 'e-wallet',
            'paid_at' => now()->toIso8601String(),
        ];

        $order->update([
            'status' => 'PAID',
            'paid_at' => now(),
            'applied_promos' => $appliedPromos,
        ]);

        // Execute bonus engine stored procedure only if member is active
        if ($customer->status == 3 && strtoupper($order->status) === 'PAID') {
            DB::statement('CALL sp_bonus_engine_run(?)', [$order->id]);
        }

        $product->decrement('stock', $validated['quantity']);

        // Update customer omzet
        $customerRecord = Customer::find($customer->id);
        if ($customerRecord) {
            $newOmzet = $customerRecord->omzet + $validated['total'];
            $customerRecord->update(['omzet' => $newOmzet]);

            Log::info('Customer omzet updated after wallet payment', [
                'customer_id' => $customer->id,
                'order_no' => $orderNo,
                'order_amount' => $validated['total'],
                'new_omzet' => $newOmzet,
            ]);
        }
        $this->clearCustomerCart($customer->id);

        Log::info('Wallet payment completed', [
            'order_no' => $orderNo,
            'customer_id' => $customer->id,
            'amount' => $validated['total'],
        ]);

        return [
            'success' => true,
            'order_no' => $orderNo,
            'message' => 'Pembayaran berhasil menggunakan e-wallet',
        ];
    }

    /**
     * Create Midtrans payment.
     */
    protected function createMidtransPayment($customer, Order $order, Product $product, array $validated, string $orderNo, string $transactionId): string
    {
        try {
            Config::$serverKey = config('services.midtrans.server_key');
            Config::$clientKey = config('services.midtrans.client_key');
            Config::$isProduction = (bool) config('services.midtrans.is_production');
            Config::$isSanitized = true;
            Config::$is3ds = true;

            $splitName = explode(' ', trim($customer->name));
            $firstName = $splitName[0] ?? 'Customer';
            $lastName = count($splitName) > 1 ? implode(' ', array_slice($splitName, 1)) : '';

            $params = [
                'transaction_details' => [
                    'order_id' => $transactionId,
                    'gross_amount' => (int) $validated['total'],
                ],
                'customer_details' => [
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $customer->email,
                    'phone' => $validated['shipping']['recipient_phone'],
                    'billing_address' => $this->formatMidtransAddress($validated['shipping']),
                    'shipping_address' => $this->formatMidtransAddress($validated['shipping']),
                ],
                'item_details' => $this->buildMidtransItemDetails($validated, $product),
                'callbacks' => [
                    'finish' => url('/checkout/finish?order_no='.$orderNo),
                ],
                'expiry' => [
                    'start_time' => now()->format('Y-m-d H:i:s O'),
                    'unit' => 'hours',
                    'duration' => 24,
                ],
                'custom_field1' => 'ORDER',
                'custom_field2' => $orderNo,
            ];

            Log::info('Creating Midtrans Snap token for order', [
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'total' => $validated['total'],
                'customer_id' => $customer->id,
            ]);

            $snapToken = Snap::getSnapToken($params);

            $order->refresh();
            $appliedPromos = $order->applied_promos ?? [];

            if (! is_array($appliedPromos)) {
                $appliedPromos = [];
            }

            $appliedPromos['payment'] = [
                'gateway' => 'midtrans',
                'snap_token' => $snapToken,
                'transaction_id' => $transactionId,
                'created_at' => now()->toIso8601String(),
            ];

            $order->update(['applied_promos' => $appliedPromos]);

            return $snapToken;
        } catch (\Exception $e) {
            Log::error('Midtrans Snap token creation failed for single item order', [
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'customer_id' => $customer->id,
                'product_id' => $product->id,
                'error' => $e->getMessage(),
                'error_class' => get_class($e),
                'trace' => $e->getTraceAsString(),
            ]);

            throw new \Exception('Gagal menghubungi payment gateway. Silakan coba lagi nanti. ('.$e->getMessage().')', 503);
        }
    }

    /**
     * Format Midtrans address.
     *
     * @return array<string, string>
     */
    protected function formatMidtransAddress(array $shippingData): array
    {
        return [
            'first_name' => $shippingData['recipient_name'],
            'phone' => $shippingData['recipient_phone'],
            'address' => $shippingData['address_line1'],
            'city' => $shippingData['city_label'],
            'postal_code' => $shippingData['postal_code'],
            'country_code' => 'IDN',
        ];
    }

    /**
     * Build Midtrans item details.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function buildMidtransItemDetails(array $validated, Product $product): array
    {
        return [
            [
                'id' => $validated['product_id'],
                'price' => (int) $validated['product_price'],
                'quantity' => $validated['quantity'],
                'name' => Str::limit($validated['product_name'], 50),
                'brand' => $product->brand ?? 'Puranusa',
                'category' => $product->categories->first()->name ?? 'Product',
            ],
            [
                'id' => 'SHIPPING',
                'price' => (int) $validated['shipping_cost'],
                'quantity' => 1,
                'name' => 'Ongkos Kirim ('.strtoupper($validated['shipping']['courier']).' - '.$validated['shipping']['service'].')',
            ],
        ];
    }

    /**
     * Handle Midtrans callback/notification
     */
    public function callback(Request $request): JsonResponse
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = (bool) config('services.midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $payload = $request->all();

        // Minimal fields yang biasanya ada di notification
        $orderId = $payload['order_id'] ?? null;
        $statusCode = $payload['status_code'] ?? null;
        $grossAmount = $payload['gross_amount'] ?? null;
        $signatureKey = $payload['signature_key'] ?? null;
        $transactionStatus = $payload['transaction_status'] ?? null;
        $fraudStatus = $payload['fraud_status'] ?? null;
        $paymentType = $payload['payment_type'] ?? null;
        $transactionId = $payload['transaction_id'] ?? null;

        // $statusResponse = \Midtrans\Transaction::status($payload['transaction_id']);
        // dd($statusResponse);
        // Log::info('Midtrans callback received (raw)', $statusResponse);

        // 1) Signature validation (WAJIB)
        if (! $orderId || ! $statusCode || ! $grossAmount || ! $signatureKey) {
            Log::warning('Midtrans callback missing required fields', ['payload' => $payload]);

            return response()->json(['status' => 'error', 'message' => 'Invalid payload'], 400);
        }

        $localSignature = hash('sha512', $orderId.$statusCode.$grossAmount.config('services.midtrans.server_key'));

        if (! hash_equals($localSignature, (string) $signatureKey)) {
            Log::warning('Midtrans callback invalid signature', [
                'order_id' => $orderId,
                'expected' => $localSignature,
                'given' => $signatureKey,
            ]);
            return response()->json(['status' => 'error', 'message' => 'Invalid signature'], 403);
        }

        // 2) Resolve Order (prioritas: Payment.transaction_id/provider_txn_id = order_id)
        $payment = Payment::with('order')
            ->where('transaction_id', $orderId)
            ->orWhere('provider_txn_id', $orderId)
            ->first();

        $order = $payment?->order;
        // Fallback kalau struktur order_id kamu memang mengandung order_no
        if (! $order) {
            $orderNo = $orderId;
            if (preg_match('/^(ORD-\d{8}-[A-Z0-9]{6})-\d+$/', $orderId, $matches)) {
                $orderNo = $matches[1];
            }
            $order = Order::where('order_no', $orderNo)->first();
        }

        // Supaya Midtrans tidak retry berkali-kali kalau order tidak ketemu
        if (! $order) {
            $statusResponse = \Midtrans\Transaction::status($orderId);
            if ($statusResponse) {
                $topup = CustomerWalletTransaction::where([
                    'transaction_ref' => $orderId,
                    'type' => 'topup',
                ])->first();
                if ($topup) {
                    switch ($transactionStatus) {
                        case 'settlement':
                            $topup->update([
                                'balance_before' => $topup->customer->ewallet_saldo,
                                'balance_after' => $topup->customer->ewallet_saldo + $topup->amount,
                                'status' => 'completed',
                                'midtrans_transaction_id' => $transactionId,
                                'midtrans_signature_key' => $signatureKey,
                                'completed_at' => now(),
                            ]);
                            $topup->customer->increment('ewallet_saldo', $topup->amount);
                            break;
                        case 'capture':
                            $topup->update([
                                'balance_before' => $topup->customer->ewallet_saldo,
                                'balance_after' => $topup->customer->ewallet_saldo + $topup->amount,
                                'status' => 'completed',
                                'midtrans_transaction_id' => $transactionId,
                                'midtrans_signature_key' => $signatureKey,
                                'completed_at' => now(),
                            ]);
                            $topup->customer->increment('ewallet_saldo', $topup->amount);
                            break;
                        case 'deny':
                            $topup->update(['status' => 'failed']);
                            break;
                        case 'cancel':
                            $topup->update(['status' => 'failed']);
                            break;
                        case 'expire':
                            $topup->update(['status' => 'failed']);
                            break;
                    }
                    Log::info('Midtrans callback topup processed', [
                        'transaction_ref' => $orderId,
                        'status_response' => $statusResponse,
                    ]);

                    return response()->json(['status' => 'success'], 200);
                }
                Log::warning('Midtrans callback order not found', [
                    'order_id' => $orderId,
                    'status_response' => $statusResponse,
                ]);
            }else{
                return response()->json(['status' => 'Midtrans callback order not found and status check failed'], 404);
                Log::warning('Midtrans callback order not found and status check failed', [
                    'order_id' => $orderId,
                ]);
            }
        }

        $wasPaid = (strtoupper($order->status) === 'PAID');

        // 3) Simpan jejak notifikasi ke applied_promos (seperti punyamu)
        $appliedPromos = $order->applied_promos ?? [];
        if (! is_array($appliedPromos)) {
            $appliedPromos = [];
        }

        $appliedPromos['payment'] = $appliedPromos['payment'] ?? [];
        $appliedPromos['payment']['midtrans_notifications'] = $appliedPromos['payment']['midtrans_notifications'] ?? [];
        $appliedPromos['payment']['midtrans_notifications'][] = [
            'timestamp' => now()->toIso8601String(),
            'status' => $transactionStatus,
            'fraud_status' => $fraudStatus,
            'payment_type' => $paymentType,
            'payload' => $payload, // opsional: kalau terlalu besar, boleh hapus
        ];

        // 4) Tentukan status order/payment internal
        $newOrderStatus = $order->status;
        $newPaymentStatus = $payment?->status ?? null;

        $isPaidNow = false;

        switch ($transactionStatus) {
            case 'settlement':
                $newOrderStatus = 'PAID';
                $newPaymentStatus = 'paid';
                $isPaidNow = true;
                break;

            case 'capture':
                if ($fraudStatus === 'accept') {
                    $newOrderStatus = 'PAID';
                    $newPaymentStatus = 'paid';
                    $isPaidNow = true;
                } elseif ($fraudStatus === 'challenge') {
                    // bisa kamu ubah ke status khusus, mis. 'CHALLENGE'
                    $newOrderStatus = 'PENDING';
                    $newPaymentStatus = 'challenge';
                } else {
                    $newOrderStatus = 'PENDING';
                    $newPaymentStatus = 'pending';
                }
                break;

            case 'pending':
                $newOrderStatus = 'PENDING';
                $newPaymentStatus = 'pending';
                break;

            case 'deny':
            case 'cancel':
            case 'expire':
                $newOrderStatus = 'CANCELLED';
                $newPaymentStatus = 'failed';
                break;

            case 'refund':
            case 'partial_refund':
                $newOrderStatus = 'REFUNDED';
                $newPaymentStatus = 'refunded';
                break;

            default:
                // biarkan, tapi catat
                Log::info('Midtrans callback unhandled transaction_status', [
                    'order_id' => $orderId,
                    'transaction_status' => $transactionStatus,
                ]);
                break;
        }

        // 5) Update DB (idempotent untuk side effects)
        $runSideEffects = (! $wasPaid && $isPaidNow);

        try {
            DB::transaction(function () use (
                $order, $payment, $newOrderStatus, $newPaymentStatus, $appliedPromos, $runSideEffects, $payload
            ) {
                // Update order
                $orderUpdate = [
                    'status' => $newOrderStatus,
                    'applied_promos' => $appliedPromos,
                ];
                if ($newOrderStatus === 'PAID' && empty($order->paid_at)) {
                    $orderUpdate['paid_at'] = now();
                }
                $order->update($orderUpdate);

                // Update payment kalau ada
                if ($payment) {
                    $payment->update([
                        'status' => $newPaymentStatus ?? $payment->status,
                        'signature_key' => $payload['signature_key'] ?? $payment->signature_key,
                        'metadata_json' => json_encode($payload),
                    ]);
                }

                if (! $runSideEffects) {
                    return;
                }

                // Reduce product stock
                foreach ($order->items as $item) {
                    $product = Product::find($item->product_id);
                    if ($product) {
                        $product->decrement('stock', $item->qty);
                    }
                }

                // Update customer omzet
                $customer = Customer::find($order->customer_id);
                if ($customer) {
                    $customer->update(['omzet' => $customer->omzet + $order->grand_total]);
                }
            });

            // 6) Jalankan SP bonus engine DI LUAR transaction (menghindari commit implisit)
            if ($runSideEffects) {
                $customerForBonus = Customer::find($order->customer_id);
                if ($customerForBonus && (int) $customerForBonus->status === 3) {
                    DB::statement('CALL sp_bonus_engine_run(?)', [$order->id]);
                }

                $this->clearCustomerCart($order->customer_id);
            }

            Log::info('Midtrans callback processed', [
                'order_no' => $order->order_no,
                'order_id' => $orderId,
                'new_status' => $newOrderStatus,
                'side_effects_ran' => $runSideEffects,
            ]);

            return response()->json(['status' => 'success'], 200);

        } catch (\Throwable $e) {
            Log::error('Midtrans callback error', [
                'order_id' => $orderId,
                'order_no' => $order->order_no ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            // 500 bikin Midtrans retry. Kalau kamu takut dobel, idempotency di atas sudah mengurangi risiko.
            return response()->json(['status' => 'error', 'message' => 'Server error'], 500);
        }
    }

    /**
     * Checkout finish page (after payment)
     */
    public function finish(Request $request)
    {
        $orderNo = $request->query('order_no');

        if (! $orderNo) {
            return redirect()->route('ecommerce.beranda')->with('error', 'Order tidak ditemukan');
        }

        $customerId = Auth::guard('client')->id();
        $order = Order::with(['items.product', 'shippingAddress'])
            ->where('order_no', $orderNo)
            ->where('customer_id', $customerId)
            ->first();

        if (! $order) {
            return redirect()->route('ecommerce.beranda')->with('error', 'Order tidak ditemukan');
        }

        // Update customer omzet and status if order is paid
        if (strtoupper($order->status) === 'PAID') {
            $customer = Customer::find($customerId);

            if ($customer) {
                // Update omzet (tambahkan grand_total order ke omzet customer)
                $newOmzet = $customer->omzet + $order->grand_total;
                $customer->update(['omzet' => $newOmzet]);

                Log::info('Customer omzet updated after paid order', [
                    'customer_id' => $customerId,
                    'order_no' => $orderNo,
                    'order_amount' => $order->grand_total,
                    'old_omzet' => $customer->omzet,
                    'new_omzet' => $newOmzet,
                ]);
            }
        }

        // Redirect to profile page with orders tab open
        return redirect()->to('/client/profile?tab=orders&order='.$orderNo)
            ->with('success', 'Terima kasih! Pesanan Anda telah diterima. Nomor order: '.$orderNo);
    }

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
            'applied_promos' => [],
        ]);
    }

    /**
     * Create order for multi-item checkout.
     */
    protected function createMultiItemOrder(int $customerId, string $orderNo, array $validated, int $shippingAddressId): Order
    {
        // Calculate total bonus amounts from all items
        $totalBonuses = [
            'bv' => 0,
            'sponsor' => 0,
            'match' => 0,
            'pairing' => 0,
            'cashback' => 0,
        ];

        foreach ($validated['items'] as $item) {
            $product = Product::find($item['product_id']);
            if ($product) {
                $bonusAmounts = $this->calculateBonusAmounts($product, $item['quantity']);
                foreach ($bonusAmounts as $key => $value) {
                    $totalBonuses[$key] += $value;
                }
            }
        }

        return Order::create([
            'order_no' => $orderNo,
            'customer_id' => $customerId,
            'type' => $validated['transaction_type'] ?? 'planA',
            'currency' => 'IDR',
            'status' => 'PENDING',
            'subtotal_amount' => $validated['subtotal'],
            'discount_amount' => 0,
            'shipping_amount' => $validated['shipping_cost'],
            'tax_amount' => 0,
            'grand_total' => $validated['total'],
            'bv_amount' => $totalBonuses['bv'],
            'sponsor_amount' => $totalBonuses['sponsor'],
            'match_amount' => $totalBonuses['match'],
            'pairing_amount' => $totalBonuses['pairing'],
            'cashback_amount' => $totalBonuses['cashback'],
            'shipping_address_id' => $shippingAddressId,
            'billing_address_id' => $shippingAddressId,
            'notes' => $validated['notes'] ?? null,
            'applied_promos' => [
                'shipping' => [
                    'courier' => strtoupper($validated['shipping']['courier']),
                    'service' => $validated['shipping']['service'],
                    'etd' => $validated['shipping']['etd'],
                    'cost' => $validated['shipping_cost'],
                ],
            ],
        ]);
    }

    /**
     * Create order items for multi-item checkout.
     */
    protected function createMultiOrderItems(int $orderId, array $items): void
    {
        foreach ($items as $item) {
            $product = Product::find($item['product_id']);

            OrderItem::create([
                'order_id' => $orderId,
                'product_id' => $item['product_id'],
                'name' => $item['product_name'],
                'sku' => $product->sku ?? 'N/A',
                'qty' => $item['quantity'],
                'unit_price' => $item['product_price'],
                'discount_amount' => 0,
                'row_total' => $item['product_price'] * $item['quantity'],
                'weight_gram' => $item['weight'],
                'meta_json' => json_encode([
                    'image' => $item['product_image'],
                ]),
            ]);

            // Reduce stock
            if ($product) {
                $product->decrement('stock', $item['quantity']);
            }
        }
    }

    /**
     * Process wallet payment for multi-item checkout.
     *
     * @return array<string, mixed>
     */
    protected function processMultiItemWalletPayment($customer, Order $order, array $validated, string $orderNo): array
    {
        $customer->deductBalance($validated['total'], 'Pembayaran order '.$orderNo);

        $appliedPromos = $order->applied_promos ?? [];
        $appliedPromos['payment'] = [
            'gateway' => 'wallet',
            'paid_at' => now()->toIso8601String(),
        ];

        $order->update([
            'status' => 'PAID',
            'applied_promos' => $appliedPromos,
        ]);

        // Execute bonus engine stored procedure only if member is active
        if ($customer->status == 3 && strtoupper($order->status) === 'PAID') {
            DB::statement('CALL sp_bonus_engine_run(?)', [$order->id]);
        }

        // Update customer omzet
        $customerRecord = Customer::find($customer->id);
        if ($customerRecord) {
            $newOmzet = $customerRecord->omzet + $validated['total'];
            $customerRecord->update(['omzet' => $newOmzet]);

            Log::info('Customer omzet updated after multi-item wallet payment', [
                'customer_id' => $customer->id,
                'order_no' => $orderNo,
                'order_amount' => $validated['total'],
                'new_omzet' => $newOmzet,
            ]);
        }

        // Clear cart after successful payment
        $this->clearCustomerCart($customer->id);

        return [
            'success' => true,
            'message' => 'Pembayaran berhasil menggunakan e-wallet',
            'order_no' => $orderNo,
        ];
    }

    /**
     * Create Midtrans payment for multi-item checkout.
     */
    protected function createMultiItemMidtransPayment($customer, Order $order, array $validated, string $orderNo, string $transactionId): string
    {
        try {
            Config::$serverKey = config('services.midtrans.server_key');
            Config::$isProduction = (bool) config('services.midtrans.is_production');
            Config::$isSanitized = true;
            Config::$is3ds = true;

            // Build item details for all products
            $itemDetails = [];
            foreach ($validated['items'] as $item) {
                $product = Product::find($item['product_id']);
                $itemDetails[] = [
                    'id' => $item['product_id'],
                    'price' => (int) $item['product_price'],
                    'quantity' => $item['quantity'],
                    'name' => Str::limit($item['product_name'], 50),
                    'brand' => $product->brand ?? 'Puranusa',
                    'category' => $product->categories->first()->name ?? 'Product',
                ];
            }

            // Add shipping cost
            $itemDetails[] = [
                'id' => 'SHIPPING',
                'price' => (int) $validated['shipping_cost'],
                'quantity' => 1,
                'name' => 'Ongkos Kirim ('.strtoupper($validated['shipping']['courier']).' - '.$validated['shipping']['service'].')',
            ];

            $params = [
                'transaction_details' => [
                    'order_id' => $transactionId,
                    'gross_amount' => (int) $validated['total'],
                ],
                'item_details' => $itemDetails,
                'customer_details' => [
                    'first_name' => $customer->name,
                    'email' => $customer->email,
                    'phone' => $customer->phone,
                    'billing_address' => $this->formatMidtransAddress($validated['shipping']),
                    'shipping_address' => $this->formatMidtransAddress($validated['shipping']),
                ],
            ];

            Log::info('Creating Midtrans Snap token for multi-item order', [
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'total' => $validated['total'],
                'items_count' => count($validated['items']),
                'customer_id' => $customer->id,
            ]);

            $snapToken = Snap::getSnapToken($params);
            $order->refresh();
            $appliedPromos = $order->applied_promos ?? [];

            if (! is_array($appliedPromos)) {
                $appliedPromos = [];
            }

            $appliedPromos['payment'] = [
                'gateway' => 'midtrans',
                'snap_token' => $snapToken,
                'transaction_id' => $transactionId,
                'created_at' => now()->toIso8601String(),
            ];
            $order->update(['applied_promos' => $appliedPromos]);
            $order->payments()->create([
                'order_id' => $order->id,
                'method_id' => 1,
                'status' => 'PENDING',
                'amount' => $validated['total'],
                'currency' => 'IDR',
                'provider_txn_id' => $transactionId,
                'metadata_json' => json_encode(['snap_token' => $snapToken]),
                'transaction_id' => $transactionId,
                'signature_key' => null,
            ]);

            return $snapToken;
        } catch (\Exception $e) {
            Log::error('Midtrans Snap token creation failed', [
                'order_no' => $orderNo,
                'transaction_id' => $transactionId,
                'customer_id' => $customer->id,
                'error' => $e->getMessage(),
                'error_class' => get_class($e),
                'trace' => $e->getTraceAsString(),
            ]);

            throw new \Exception('Gagal menghubungi payment gateway. Silakan coba lagi nanti. ('.$e->getMessage().')', 503);
        }
    }
}
