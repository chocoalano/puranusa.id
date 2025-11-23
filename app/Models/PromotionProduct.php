<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromotionProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'promotion_id',
        'product_id',
        'min_qty',
        'discount_value',
        'discount_percent',
        'bundle_price',
    ];

    protected function casts(): array
    {
        return [
            'min_qty' => 'integer',
            'discount_value' => 'decimal:2',
            'discount_percent' => 'decimal:2',
            'bundle_price' => 'decimal:2',
        ];
    }

    public function promotion()
    {
        return $this->belongsTo(Promotion::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
