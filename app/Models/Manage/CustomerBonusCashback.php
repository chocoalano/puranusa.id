<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $member_id
 * @property int|null $order_id
 * @property float $amount
 * @property float|null $index_value
 * @property int $status
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read Customer $member
 */
class CustomerBonusCashback extends Model
{
    use HasFactory;

    protected $table = 'customer_bonus_cashbacks';

    protected $fillable = [
        'member_id',
        'order_id',
        'amount',
        'index_value',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'float',
            'index_value' => 'float',
            'status' => 'integer',
            'order_id' => 'integer',
        ];
    }

    /**
     * Relasi ke member penerima bonus
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Buat bonus cashback
     */
    public static function createCashback(int $memberId, float $amount, ?int $orderId = null, ?string $description = null): self
    {
        return self::create([
            'member_id' => $memberId,
            'order_id' => $orderId,
            'amount' => $amount,
            'index_value' => $amount,
            'status' => 0,
            'description' => $description ?? 'Bonus cashback',
        ]);
    }

    /**
     * Release bonus ke ewallet
     */
    public function release(): bool
    {
        if ($this->status === 1) {
            throw new \Exception('Bonus cashback sudah dirilis sebelumnya');
        }

        $member = $this->member;
        if (! $member) {
            throw new \Exception('Member tidak ditemukan');
        }

        $member->addBalance($this->amount, "Bonus Cashback: {$this->description}");

        $this->status = 1;

        return $this->save();
    }

    /**
     * Scope untuk bonus yang belum dirilis
     */
    public function scopePending($query)
    {
        return $query->where('status', 0);
    }

    /**
     * Scope untuk bonus yang sudah dirilis
     */
    public function scopeReleased($query)
    {
        return $query->where('status', 1);
    }
}
