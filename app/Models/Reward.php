<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    protected $table = 'rewards';
    public const UPDATED_AT = null;
    protected $guarded = ['id'];

    protected $casts = [
        'value'      => 'decimal:2',
        'bv'         => 'decimal:2',
        'start'      => 'date',
        'end'        => 'date',
        'type'       => 'integer',
        'status'     => 'integer',
        'created_at' => 'datetime',
    ];
}
