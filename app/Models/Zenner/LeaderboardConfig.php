<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeaderboardConfig extends Model
{
    protected $table = 'zenner_leaderboard_configs';

    protected $fillable = [
        'title',
        'type',
        'period',
        'calculation_field',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public function entries(): HasMany
    {
        return $this->hasMany(LeaderboardEntry::class, 'config_id');
    }
}
