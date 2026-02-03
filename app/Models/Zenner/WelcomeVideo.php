<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class WelcomeVideo extends Model
{
    protected $table = 'zenner_welcome_videos';

    protected $fillable = [
        'title',
        'video_url',
        'description',
        'thumbnail',
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
