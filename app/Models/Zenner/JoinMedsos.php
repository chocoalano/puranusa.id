<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class JoinMedsos extends Model
{
    protected $table = 'zenner_join_medsos';

    protected $fillable = [
        'platform',
        'url',
        'icon',
        'description',
        'followers_count',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'followers_count' => 'integer',
            'sort_order' => 'integer',
        ];
    }
}
