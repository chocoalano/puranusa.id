<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipment extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'courier_id',
        'tracking_no',
        'status',
        'shipped_at',
        'delivered_at',
        'shipping_fee',
    ];

    protected $appends = ['courier'];

    protected function casts(): array
    {
        return [
            'shipping_fee' => 'decimal:2',
            'shipped_at' => 'datetime',
            'delivered_at' => 'datetime',
        ];
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function items()
    {
        return $this->hasMany(ShipmentItem::class);
    }

    /**
     * Get courier data from courier_id
     */
    public function getCourierAttribute()
    {
        if (! $this->courier_id) {
            return null;
        }

        $couriers = [
            'jne' => 'JNE',
            'pos' => 'POS Indonesia',
            'tiki' => 'TIKI',
            'jnt' => 'J&T Express',
            'sicepat' => 'SiCepat',
            'anteraja' => 'AnterAja',
        ];

        return [
            'code' => $this->courier_id,
            'name' => $couriers[$this->courier_id] ?? strtoupper($this->courier_id),
        ];
    }
}
