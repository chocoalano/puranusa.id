<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class AdsGuide extends Model
{
    protected $table = 'zenner_ads_guides';

    protected $fillable = [
        'title',
        'content',
        'image',
        'platform',
        'budget_range',
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
