<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $table = 'zenner_testimonials';

    protected $fillable = [
        'customer_name',
        'content',
        'image',
        'rating',
        'product_name',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'rating' => 'integer',
            'sort_order' => 'integer',
        ];
    }
}
