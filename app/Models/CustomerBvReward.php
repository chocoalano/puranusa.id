<?php

namespace App\Models;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerBvReward extends Model
{
    protected $table = 'customer_bv_rewards';

    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'reward_id',
        'omzet_left',
        'omzet_right',
        'status',
        'created_on',
    ];

    protected function casts(): array
    {
        return [
            'omzet_left' => 'decimal:2',
            'omzet_right' => 'decimal:2',
            'status' => 'integer',
            'created_on' => 'datetime',
        ];
    }

    /**
     * Relasi ke member
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Relasi ke reward
     */
    public function reward(): BelongsTo
    {
        return $this->belongsTo(Reward::class, 'reward_id');
    }
}
