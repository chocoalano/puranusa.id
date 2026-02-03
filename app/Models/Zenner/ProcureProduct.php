<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class ProcureProduct extends Model
{
    protected $table = 'zenner_procure_products';

    protected $fillable = [
        'title',
        'description',
        'image',
        'price',
        'points',
        'category',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'price' => 'decimal:2',
            'points' => 'integer',
            'sort_order' => 'integer',
        ];
    }
}
