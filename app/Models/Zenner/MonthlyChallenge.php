<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class MonthlyChallenge extends Model
{
    protected $table = 'zenner_monthly_challenges';

    protected $fillable = [
        'title',
        'description',
        'image',
        'start_date',
        'end_date',
        'reward',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'start_date' => 'date',
            'end_date' => 'date',
        ];
    }
}
