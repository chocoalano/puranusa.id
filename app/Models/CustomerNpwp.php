<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerNpwp extends Model
{
    protected $table = 'customer_npwp';

    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'nama',
        'npwp',
        'jk',
        'npwp_date',
        'alamat',
        'menikah',
        'anak',
        'kerja',
        'office',
        'created',
        'createdby',
        'updated',
        'updatedby',
    ];

    protected function casts(): array
    {
        return [
            'member_id' => 'integer',
            'jk' => 'integer',
            'npwp_date' => 'date',
            'created' => 'datetime',
            'updated' => 'datetime',
        ];
    }
}
