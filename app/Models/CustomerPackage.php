<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $name
 * @property string $alias
 * @property float $price
 * @property int $pv
 * @property int $pr
 * @property float $sponsor
 * @property float $pairing
 * @property float $matching
 * @property float $flush_out
 */
class CustomerPackage extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'customer_packages';

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'alias',
        'price',
        'pv',
        'pr',
        'sponsor',
        'pairing',
        'matching',
        'flush_out',
    ];

    /**
     * The attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'pv' => 'integer',
            'pr' => 'integer',
            'sponsor' => 'decimal:2',
            'pairing' => 'decimal:2',
            'matching' => 'decimal:2',
            'flush_out' => 'decimal:2',
        ];
    }
}
