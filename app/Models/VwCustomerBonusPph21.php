<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwCustomerBonusPph21 extends Model
{
    protected $table = 'vw_customer_bonus_pph21';

    public $timestamps = false;

    public $incrementing = false;

    protected $fillable = [
        'tanggal',
        'username',
        'name',
        'email',
        'no_telepon',
        'npwp',
        'tahun_pajak',
        'nik',
        'fullname',
        'alamat',
        'jumlah_bruto',
        'tarif',
        'pph21',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'tahun_pajak' => 'integer',
            'jumlah_bruto' => 'decimal:2',
            'tarif' => 'integer',
            'pph21' => 'decimal:2',
        ];
    }
}
