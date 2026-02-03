<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaderboardEntry extends Model
{
    protected $table = 'zenner_leaderboard_entries';

    protected $fillable = [
        'config_id',
        'customer_id',
        'customer_name',
        'score',
        'rank',
        'period_label',
    ];

    protected function casts(): array
    {
        return [
            'score' => 'decimal:2',
            'rank' => 'integer',
        ];
    }

    public function config(): BelongsTo
    {
        return $this->belongsTo(LeaderboardConfig::class, 'config_id');
    }
}
