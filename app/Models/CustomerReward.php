<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerReward extends Model
{
    protected $table = 'customers_rewards';

    public const UPDATED_AT = null;

    protected $fillable = [
        'member_id',
        'reward_id',
        'reward',
        'total_bv_achieved',
        'type',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'member_id' => 'integer',
            'reward_id' => 'integer',
            'total_bv_achieved' => 'decimal:2',
            'type' => 'integer',
            'status' => 'boolean',
            'created_at' => 'datetime',
        ];
    }
}
