<?php

namespace App\Models\Manage;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerBonusRetail extends Model
{
    protected $table = 'customer_bonus_retails';

    protected $fillable = [
        'member_id',
        'from_member_id',
        'amount',
        'index_value',
        'status',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'index_value' => 'decimal:2',
            'status' => 'integer',
        ];
    }

    /**
     * Get the member who receives the retail bonus.
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Get the member who generated the retail commission (buyer).
     */
    public function fromMember(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'from_member_id');
    }
}
