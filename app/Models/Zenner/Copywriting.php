<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class Copywriting extends Model
{
    protected $table = 'zenner_copywritings';

    protected $fillable = [
        'title',
        'content',
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
