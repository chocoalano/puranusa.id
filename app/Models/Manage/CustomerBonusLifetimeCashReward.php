<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerBonusLifetimeCashReward extends Model
{
    protected $table = 'customer_bonus_lifetime_cash_rewards';

    protected $fillable = [
        'member_id',
        'reward_name',
        'reward',
        'amount',
        'bv',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'bv' => 'decimal:2',
            'status' => 'integer',
        ];
    }

    /**
     * Get the member who earned this lifetime cash reward.
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Get status label.
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            0 => 'Pending',
            1 => 'Claimed',
            2 => 'Expired',
            default => 'Unknown',
        };
    }
}
