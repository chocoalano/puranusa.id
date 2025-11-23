<?php

namespace App\Models;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerNetworkMatrix extends Model
{
    use HasFactory;

    protected $table = 'customer_network_matrixes';

    protected $fillable = [
        'member_id',
        'sponsor_id',
        'level',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'level' => 'integer',
        ];
    }

    public function member()
    {
        return $this->belongsTo(Customer::class, 'member_id');
    }

    public function sponsor()
    {
        return $this->belongsTo(Customer::class, 'sponsor_id');
    }
}
