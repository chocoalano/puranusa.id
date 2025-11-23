<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentTransaction extends Model
{
    use HasFactory;

    public const UPDATED_AT = null;

    protected $fillable = [
        'payment_id',
        'status',
        'amount',
        'raw_json',
    ];

    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'raw_json' => 'array',
        ];
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
