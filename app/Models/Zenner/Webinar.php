<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class Webinar extends Model
{
    protected $table = 'zenner_webinars';

    protected $fillable = [
        'title',
        'description',
        'speaker',
        'scheduled_at',
        'duration_minutes',
        'meeting_url',
        'status',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'scheduled_at' => 'datetime',
            'duration_minutes' => 'integer',
        ];
    }
}
