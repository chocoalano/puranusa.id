<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class ProductKnowledge extends Model
{
    protected $table = 'zenner_product_knowledges';

    protected $fillable = [
        'title',
        'content',
        'image',
        'category',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }
}
