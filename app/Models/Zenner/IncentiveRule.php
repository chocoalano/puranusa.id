<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class IncentiveRule extends Model
{
    protected $table = 'zenner_incentive_rules';

    protected $fillable = [
        'title',
        'description',
        'type',
        'conditions',
        'rewards',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'conditions' => 'array',
            'rewards' => 'array',
            'sort_order' => 'integer',
        ];
    }
}
