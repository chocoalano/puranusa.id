<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaxReport extends Model
{
    protected $table = 'tax_report';

    public $timestamps = false;

    protected $fillable = [
        'member_id',
        'tgl',
        'masapajak',
        'tahunpajak',
        'pembetulan',
        'nomorbuktipotong',
        'npwp',
        'nik',
        'nama',
        'alamat',
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
            'member_id' => 'integer',
            'tgl' => 'date',
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
