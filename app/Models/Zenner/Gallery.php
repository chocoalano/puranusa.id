<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $table = 'zenner_galleries';

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
