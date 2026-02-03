<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class MarketingKit extends Model
{
    protected $table = 'zenner_marketing_kits';

    protected $fillable = [
        'title',
        'description',
        'file_path',
        'file_type',
        'thumbnail',
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
