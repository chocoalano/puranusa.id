<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class TopAffiliate extends Model
{
    protected $table = 'zenner_top_affiliates';

    protected $fillable = [
        'customer_id',
        'customer_name',
        'period',
        'rank',
        'score',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
            'rank' => 'integer',
        ];
    }
}
