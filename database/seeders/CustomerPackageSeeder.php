<?php

namespace Database\Seeders;

use App\Models\CustomerPackage;
use Illuminate\Database\Seeder;

class CustomerPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Paket Bronze',
                'alias' => 'BRONZE',
                'price' => 500000.00,
                'pv' => 100,
                'pr' => 50,
                'sponsor' => 50000.00,
                'pairing' => 25000.00,
                'matching' => 25000.00,
                'flush_out' => 10000.00,
            ],
            [
                'name' => 'Paket Silver',
                'alias' => 'SILVER',
                'price' => 1000000.00,
                'pv' => 250,
                'pr' => 125,
                'sponsor' => 100000.00,
                'pairing' => 50000.00,
                'matching' => 50000.00,
                'flush_out' => 25000.00,
            ],
            [
                'name' => 'Paket Gold',
                'alias' => 'GOLD',
                'price' => 2500000.00,
                'pv' => 500,
                'pr' => 250,
                'sponsor' => 250000.00,
                'pairing' => 125000.00,
                'matching' => 125000.00,
                'flush_out' => 50000.00,
            ],
            [
                'name' => 'Paket Platinum',
                'alias' => 'PLATINUM',
                'price' => 5000000.00,
                'pv' => 1000,
                'pr' => 500,
                'sponsor' => 500000.00,
                'pairing' => 250000.00,
                'matching' => 250000.00,
                'flush_out' => 100000.00,
            ],
            [
                'name' => 'Paket Diamond',
                'alias' => 'DIAMOND',
                'price' => 10000000.00,
                'pv' => 2000,
                'pr' => 1000,
                'sponsor' => 1000000.00,
                'pairing' => 500000.00,
                'matching' => 500000.00,
                'flush_out' => 250000.00,
            ],
        ];

        foreach ($packages as $package) {
            CustomerPackage::create($package);
        }
    }
}
