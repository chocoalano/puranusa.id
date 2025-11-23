<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CourierManagementController extends Controller
{
    public function index()
    {
        // Data kurir dari RajaOngkir atau data statis
        $couriers = [
            ['code' => 'jne', 'name' => 'JNE', 'is_active' => true],
            ['code' => 'pos', 'name' => 'POS Indonesia', 'is_active' => true],
            ['code' => 'tiki', 'name' => 'TIKI', 'is_active' => true],
            ['code' => 'jnt', 'name' => 'J&T Express', 'is_active' => true],
            ['code' => 'sicepat', 'name' => 'SiCepat', 'is_active' => true],
            ['code' => 'anteraja', 'name' => 'AnterAja', 'is_active' => false],
        ];

        $statistics = [
            'total_couriers' => count($couriers),
            'total_active' => count(array_filter($couriers, fn ($c) => $c['is_active'])),
            'total_inactive' => count(array_filter($couriers, fn ($c) => ! $c['is_active'])),
        ];

        return Inertia::render('Admin/Couriers/Index', [
            'couriers' => $couriers,
            'statistics' => $statistics,
        ]);
    }
}
