<?php

namespace App\Models;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomerNetwork extends Model
{
    protected $fillable = [
        'member_id',
        'upline_id',
        'position',
        'status',
        'level',
        'description',
    ];

    protected $casts = [
        'status' => 'boolean',
        'level' => 'integer',
    ];

    /**
     * Get the member (customer) for this network node.
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    /**
     * Get the upline (customer) for this network node.
     */
    public function upline(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'upline_id');
    }
}
