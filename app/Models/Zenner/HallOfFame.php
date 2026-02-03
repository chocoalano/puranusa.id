<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class HallOfFame extends Model
{
    protected $table = 'zenner_hall_of_fames';

    protected $fillable = [
        'customer_name',
        'title',
        'description',
        'image',
        'achievement',
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
