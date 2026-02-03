<?php

namespace App\Models\Zenner;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $table = 'zenner_certificates';

    protected $fillable = [
        'title',
        'description',
        'template_image',
        'type',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
