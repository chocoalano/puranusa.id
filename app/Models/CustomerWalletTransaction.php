<?php

namespace App\Models;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $customer_id
 * @property string $type
 * @property float $amount
 * @property float|null $balance_before
 * @property float|null $balance_after
 * @property string $status
 * @property string|null $payment_method
 * @property string|null $transaction_ref
 * @property string|null $midtrans_transaction_id
 * @property string|null $midtrans_signature_key
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $customer
 */
class CustomerWalletTransaction extends Model
{
    protected $fillable = [
        'customer_id',
        'type',
        'amount',
        'balance_before',
        'balance_after',
        'status',
        'payment_method',
        'transaction_ref',
        'midtrans_transaction_id',
        'notes',
        'completed_at',
        'midtrans_signature_key'
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'balance_before' => 'decimal:2',
            'balance_after' => 'decimal:2',
            'completed_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
