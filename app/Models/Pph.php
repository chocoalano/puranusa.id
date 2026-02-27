<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pph extends Model
{
    protected $table = 'pph';

    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'nama',
        'jk',
        'alamat',
        'npwp',
        'krj',
        'kantor',
        'status',
        'kid',
        'bonus',
        'periode',
        'ptkp',
        'pkp',
        'sum_of_pkp',
        'sum_of_pkp_temp',
        'akumulasi_bruto_temp',
        'akumulasi_ptkp',
        'akumulasi_bruto',
        'tarif',
        'tarif_npwp',
        'pph21',
        'buffer',
        'created',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'member_id' => 'integer',
            'jk' => 'integer',
            'kid' => 'integer',
            'bonus' => 'decimal:2',
            'periode' => 'date',
            'ptkp' => 'float',
            'pkp' => 'float',
            'sum_of_pkp' => 'float',
            'sum_of_pkp_temp' => 'float',
            'akumulasi_bruto_temp' => 'float',
            'akumulasi_ptkp' => 'float',
            'akumulasi_bruto' => 'float',
            'tarif' => 'float',
            'tarif_npwp' => 'float',
            'pph21' => 'float',
            'buffer' => 'float',
            'created' => 'datetime',
        ];
    }
}
