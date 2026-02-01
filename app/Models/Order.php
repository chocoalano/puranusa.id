<?php

namespace App\Models;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $order_no
 * @property int $customer_id
 * @property string|null $type
 * @property string $currency
 * @property string $status
 * @property float $subtotal_amount
 * @property float $discount_amount
 * @property float $shipping_amount
 * @property float $tax_amount
 * @property float $grand_total
 * @property int|null $shipping_address_id
 * @property int|null $billing_address_id
 * @property array|null $applied_promos
 * @property string|null $notes
 * @property float|null $bv_amount
 * @property float|null $sponsor_amount
 * @property float|null $match_amount
 * @property float|null $pairing_amount
 * @property float|null $cashback_amount
 * @property \Illuminate\Support\Carbon|null $placed_at
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $payment_status
 * @property-read Customer $customer
 * @property-read CustomerAddress|null $shippingAddress
 * @property-read CustomerAddress|null $billingAddress
 * @property-read \Illuminate\Database\Eloquent\Collection<int, OrderItem> $items
 */
class Order extends Model
{
    use HasFactory;

    protected $appends = ['payment_status'];

    protected $fillable = [
        'order_no',
        'customer_id',
        'type',
        'currency',
        'status',
        'subtotal_amount',
        'discount_amount',
        'shipping_amount',
        'tax_amount',
        'grand_total',
        'shipping_address_id',
        'billing_address_id',
        'applied_promos',
        'notes',
        'bv_amount', 'sponsor_amount', 'match_amount', 'pairing_amount', 'cashback_amount',
        'placed_at',
        'paid_at',
    ];

    protected function casts(): array
    {
        return [
            'subtotal_amount' => 'decimal:2',
            'discount_amount' => 'decimal:2',
            'shipping_amount' => 'decimal:2',
            'bv_amount' => 'decimal:2',
            'sponsor_amount' => 'decimal:2',
            'match_amount' => 'decimal:2',
            'pairing_amount' => 'decimal:2',
            'cashback_amount' => 'decimal:2',
            'tax_amount' => 'decimal:2',
            'grand_total' => 'decimal:2',
            'applied_promos' => 'array',
            'placed_at' => 'datetime',
            'paid_at' => 'datetime',
        ];
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function shippingAddress()
    {
        return $this->belongsTo(CustomerAddress::class, 'shipping_address_id');
    }

    public function billingAddress()
    {
        return $this->belongsTo(CustomerAddress::class, 'billing_address_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function shipments()
    {
        return $this->hasMany(Shipment::class);
    }

    public function returns()
    {
        return $this->hasMany(ProductReturn::class);
    }

    public function refunds()
    {
        return $this->hasMany(Refund::class);
    }

    /**
     * Get payment status attribute
     */
    public function getPaymentStatusAttribute(): string
    {
        if ($this->paid_at) {
            return 'PAID';
        }

        if (in_array(strtoupper($this->status), ['CANCELLED', 'CANCELED'])) {
            return 'CANCELLED';
        }

        return 'PENDING';
    }
}
