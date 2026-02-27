<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwCustomerTaxReport extends Model
{
    protected $table = 'vw_customer_tax_report';

    public $timestamps = false;

    public $incrementing = false;

    protected $fillable = [
        'tanggal',
        'username',
        'fullname',
        'email',
        'no_telepon',
        'masapajak',
        'tahunpajak',
        'pembetulan',
        'nomorbuktipotong',
        'npwp',
        'nik',
        'name',
        'address',
        'wpluarnegri',
        'kodenegara',
        'kodepajak',
        'jumlahbruto',
        'jumlahdpp',
        'tanpanpwp',
        'tarif',
        'pph21',
        'npwppemotong',
        'namapemotong',
    ];

    protected function casts(): array
    {
        return [
            'tanggal' => 'date',
            'masapajak' => 'integer',
            'tahunpajak' => 'integer',
            'pembetulan' => 'integer',
            'jumlahbruto' => 'float',
            'jumlahdpp' => 'float',
            'tarif' => 'decimal:2',
            'pph21' => 'float',
        ];
    }
}
