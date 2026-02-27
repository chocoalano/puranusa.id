<?php

namespace Database\Seeders;

use App\Models\CustomerAddress;
use App\Models\CustomerPackage;
use App\Models\Manage\Customer;
use App\Models\Manage\CustomerBonus;
use App\Models\Manage\CustomerBonusCashback;
use App\Models\Manage\CustomerBonusMatching;
use App\Models\Manage\CustomerBonusPairing;
use App\Models\Manage\CustomerBonusSponsor;
use App\Models\Manage\CustomerNetwork;
use App\Models\Manage\CustomerNetworkMatrix;
use App\Models\Manage\CustomerWalletTransaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Creating customers...');
        $customers = $this->seedCustomers();

        $this->command->info('Creating customer addresses...');
        $this->seedCustomerAddresses($customers);

        $this->command->info('Creating customer network (Binary Tree)...');
        $this->seedCustomerNetwork($customers);

        $this->command->info('Creating customer network matrix (Sponsor Tree)...');
        $this->seedCustomerNetworkMatrix($customers);

        $this->command->info('Creating customer bonuses...');
        $this->seedCustomerBonuses($customers);

        $this->command->info('Creating wallet transactions...');
        $this->seedWalletTransactions($customers);
    }

    /**
     * Seed customers with MLM data.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, Customer>
     */
    protected function seedCustomers(): \Illuminate\Database\Eloquent\Collection
    {
        $packages = CustomerPackage::all();

        // Create root/admin customer (no upline, no sponsor)
        $rootCustomer = Customer::updateOrCreate(
            ['email' => 'owner@puranusa.id'],
            [
                'name' => 'Puranusa Owner',
                'phone' => '081234567890',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'ref_code' => 'PNOWNER',
                'ewallet_id' => 'EW-OWNER-'.Str::random(8),
                'ewallet_saldo' => 50000000,
                'status' => 3, // Aktif
                'package_id' => $packages->where('alias', 'PLATINUM')->first()?->id,
                'sponsor_id' => null,
                'upline_id' => null,
                'position' => null,
                'omzet' => 100000000,
            ]
        );

        $customers = collect([$rootCustomer]);

        // Create level 1 customers (direct downline of root)
        $level1Customers = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@member.puranusa.id',
                'phone' => '081234567891',
                'ref_code' => 'PNBUDI01',
                'position' => 'left',
                'package_alias' => 'GOLD',
            ],
            [
                'name' => 'Siti Rahayu',
                'email' => 'siti@member.puranusa.id',
                'phone' => '081234567892',
                'ref_code' => 'PNSITI01',
                'position' => 'right',
                'package_alias' => 'GOLD',
            ],
        ];

        foreach ($level1Customers as $data) {
            $customer = Customer::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'phone' => $data['phone'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'ref_code' => $data['ref_code'],
                    'ewallet_id' => 'EW-'.strtoupper(Str::random(10)),
                    'ewallet_saldo' => fake()->randomFloat(2, 100000, 5000000),
                    'status' => 3, // Aktif
                    'package_id' => $packages->where('alias', $data['package_alias'])->first()?->id,
                    'sponsor_id' => $rootCustomer->id,
                    'upline_id' => $rootCustomer->id,
                    'position' => $data['position'],
                    'omzet' => fake()->randomFloat(2, 1000000, 10000000),
                ]
            );
            $customers->push($customer);
        }

        // Create level 2 customers
        $budiCustomer = $customers->where('email', 'budi@member.puranusa.id')->first();
        $sitiCustomer = $customers->where('email', 'siti@member.puranusa.id')->first();

        $level2Customers = [
            // Budi's downlines
            [
                'name' => 'Ahmad Wijaya',
                'email' => 'ahmad@member.puranusa.id',
                'phone' => '081234567893',
                'ref_code' => 'PNAHMAD',
                'position' => 'left',
                'package_alias' => 'SILVER',
                'upline' => $budiCustomer,
                'sponsor' => $budiCustomer,
            ],
            [
                'name' => 'Dewi Lestari',
                'email' => 'dewi@member.puranusa.id',
                'phone' => '081234567894',
                'ref_code' => 'PNDEWI1',
                'position' => 'right',
                'package_alias' => 'SILVER',
                'upline' => $budiCustomer,
                'sponsor' => $budiCustomer,
            ],
            // Siti's downlines
            [
                'name' => 'Eko Prasetyo',
                'email' => 'eko@member.puranusa.id',
                'phone' => '081234567895',
                'ref_code' => 'PNEKO01',
                'position' => 'left',
                'package_alias' => 'SILVER',
                'upline' => $sitiCustomer,
                'sponsor' => $sitiCustomer,
            ],
            [
                'name' => 'Fitri Handayani',
                'email' => 'fitri@member.puranusa.id',
                'phone' => '081234567896',
                'ref_code' => 'PNFITRI',
                'position' => 'right',
                'package_alias' => 'BRONZE',
                'upline' => $sitiCustomer,
                'sponsor' => $sitiCustomer,
            ],
        ];

        foreach ($level2Customers as $data) {
            $customer = Customer::updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'phone' => $data['phone'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'ref_code' => $data['ref_code'],
                    'ewallet_id' => 'EW-'.strtoupper(Str::random(10)),
                    'ewallet_saldo' => fake()->randomFloat(2, 50000, 2000000),
                    'status' => 3,
                    'package_id' => $packages->where('alias', $data['package_alias'])->first()?->id,
                    'sponsor_id' => $data['sponsor']->id,
                    'upline_id' => $data['upline']->id,
                    'position' => $data['position'],
                    'omzet' => fake()->randomFloat(2, 500000, 5000000),
                ]
            );
            $customers->push($customer);
        }

        // Create more random customers using factory
        $existingCustomers = $customers->toArray();
        $additionalCustomers = Customer::factory(14)->create()->each(function ($customer) use ($customers, $packages) {
            $randomUpline = $customers->random();
            $customer->update([
                'sponsor_id' => $randomUpline->id,
                'upline_id' => $randomUpline->id,
                'position' => fake()->randomElement(['left', 'right']),
                'package_id' => $packages->random()->id,
                'status' => fake()->randomElement([1, 2, 3]),
            ]);
        });

        return Customer::all();
    }

    /**
     * Seed customer addresses.
     */
    protected function seedCustomerAddresses(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        $provinces = [
            ['id' => 6, 'name' => 'DKI Jakarta'],
            ['id' => 9, 'name' => 'Jawa Barat'],
            ['id' => 10, 'name' => 'Jawa Tengah'],
            ['id' => 11, 'name' => 'Jawa Timur'],
            ['id' => 5, 'name' => 'DI Yogyakarta'],
        ];

        $cities = [
            6 => [
                ['id' => 151, 'name' => 'Jakarta Pusat', 'postal' => '10110'],
                ['id' => 152, 'name' => 'Jakarta Utara', 'postal' => '14110'],
                ['id' => 153, 'name' => 'Jakarta Barat', 'postal' => '11110'],
                ['id' => 154, 'name' => 'Jakarta Selatan', 'postal' => '12110'],
                ['id' => 155, 'name' => 'Jakarta Timur', 'postal' => '13110'],
            ],
            9 => [
                ['id' => 22, 'name' => 'Bandung', 'postal' => '40111'],
                ['id' => 23, 'name' => 'Bekasi', 'postal' => '17111'],
                ['id' => 54, 'name' => 'Bogor', 'postal' => '16111'],
                ['id' => 115, 'name' => 'Depok', 'postal' => '16411'],
            ],
            10 => [
                ['id' => 398, 'name' => 'Semarang', 'postal' => '50111'],
                ['id' => 445, 'name' => 'Solo', 'postal' => '57111'],
            ],
            11 => [
                ['id' => 444, 'name' => 'Surabaya', 'postal' => '60111'],
                ['id' => 255, 'name' => 'Malang', 'postal' => '65111'],
            ],
            5 => [
                ['id' => 501, 'name' => 'Yogyakarta', 'postal' => '55111'],
                ['id' => 419, 'name' => 'Sleman', 'postal' => '55511'],
            ],
        ];

        foreach ($customers as $customer) {
            // Create 1-3 addresses per customer
            $addressCount = fake()->numberBetween(1, 3);

            for ($i = 0; $i < $addressCount; $i++) {
                $province = fake()->randomElement($provinces);
                $city = fake()->randomElement($cities[$province['id']]);

                CustomerAddress::create([
                    'customer_id' => $customer->id,
                    'label' => fake()->randomElement(['Rumah', 'Kantor', 'Toko', 'Gudang']),
                    'is_default' => $i === 0,
                    'recipient_name' => $i === 0 ? $customer->name : fake()->name(),
                    'recipient_phone' => $i === 0 ? $customer->phone : fake()->numerify('08##########'),
                    'address_line1' => fake()->streetAddress(),
                    'address_line2' => fake()->boolean(30) ? 'RT '.fake()->numerify('##').'/RW '.fake()->numerify('##') : null,
                    'province_label' => $province['name'],
                    'province_id' => $province['id'],
                    'city_label' => $city['name'],
                    'city_id' => $city['id'],
                    'postal_code' => $city['postal'],
                    'country' => 'Indonesia',
                    'description' => fake()->boolean(20) ? fake()->sentence() : null,
                ]);
            }
        }
    }

    /**
     * Seed customer network (Binary Tree structure).
     */
    protected function seedCustomerNetwork(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        foreach ($customers as $customer) {
            if ($customer->upline_id) {
                $uplineNetwork = CustomerNetwork::where('member_id', $customer->upline_id)->first();
                $level = $uplineNetwork ? $uplineNetwork->level + 1 : 1;

                CustomerNetwork::updateOrCreate(
                    ['member_id' => $customer->id],
                    [
                        'upline_id' => $customer->upline_id,
                        'position' => $customer->position ?? 'left',
                        'status' => $customer->status >= 2 ? 1 : 0,
                        'level' => $level,
                    ]
                );
            } else {
                // Root customer
                CustomerNetwork::updateOrCreate(
                    ['member_id' => $customer->id],
                    [
                        'upline_id' => $customer->id, // Self reference for root
                        'position' => 'left',
                        'status' => 1,
                        'level' => 1,
                    ]
                );
            }
        }

        // Update foot_left and foot_right for each customer
        foreach ($customers as $customer) {
            $leftChild = Customer::where('upline_id', $customer->id)->where('position', 'left')->first();
            $rightChild = Customer::where('upline_id', $customer->id)->where('position', 'right')->first();

            $customer->update([
                'foot_left' => $leftChild?->id ?? 0,
                'foot_right' => $rightChild?->id ?? 0,
                'total_left' => Customer::where('upline_id', $customer->id)->where('position', 'left')->count(),
                'total_right' => Customer::where('upline_id', $customer->id)->where('position', 'right')->count(),
                'sponsor_left' => Customer::where('sponsor_id', $customer->id)->where('position', 'left')->count(),
                'sponsor_right' => Customer::where('sponsor_id', $customer->id)->where('position', 'right')->count(),
            ]);
        }
    }

    /**
     * Seed customer network matrix (Sponsor Tree).
     */
    protected function seedCustomerNetworkMatrix(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        foreach ($customers as $customer) {
            if ($customer->sponsor_id) {
                // Find sponsor's level in matrix
                $sponsorMatrix = CustomerNetworkMatrix::where('member_id', $customer->sponsor_id)->first();
                $level = $sponsorMatrix ? $sponsorMatrix->level + 1 : 1;

                CustomerNetworkMatrix::updateOrCreate(
                    ['member_id' => $customer->id, 'sponsor_id' => $customer->sponsor_id],
                    [
                        'level' => $level,
                        'description' => 'Direct sponsor relationship',
                    ]
                );

                // Also create matrix entries for upline chain (for matching bonus calculation)
                $currentSponsor = Customer::find($customer->sponsor_id);
                $currentLevel = 2;
                while ($currentSponsor && $currentSponsor->sponsor_id && $currentLevel <= 10) {
                    CustomerNetworkMatrix::updateOrCreate(
                        ['member_id' => $customer->id, 'sponsor_id' => $currentSponsor->sponsor_id],
                        [
                            'level' => $currentLevel,
                            'description' => "Level {$currentLevel} sponsor chain",
                        ]
                    );
                    $currentSponsor = Customer::find($currentSponsor->sponsor_id);
                    $currentLevel++;
                }
            }
        }
    }

    /**
     * Seed customer bonuses.
     */
    protected function seedCustomerBonuses(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        $activeCustomers = $customers->where('status', 3);

        foreach ($activeCustomers as $customer) {
            // Sponsor Bonus (from direct downlines)
            $directDownlines = $customers->where('sponsor_id', $customer->id);
            foreach ($directDownlines as $downline) {
                if (fake()->boolean(70)) {
                    CustomerBonusSponsor::create([
                        'member_id' => $customer->id,
                        'from_member_id' => $downline->id,
                        'amount' => fake()->randomFloat(2, 50000, 250000),
                        'index_value' => fake()->randomFloat(2, 25, 125),
                        'status' => fake()->randomElement([0, 1]),
                        'description' => 'Bonus sponsor dari '.$downline->name,
                    ]);
                }
            }

            // Pairing Bonus
            if ($customer->total_left > 0 && $customer->total_right > 0) {
                $pairs = min($customer->total_left, $customer->total_right);
                for ($i = 0; $i < min($pairs, 3); $i++) {
                    CustomerBonusPairing::create([
                        'member_id' => $customer->id,
                        'source_member_id' => $customer->id,
                        'pairing_count' => $i + 1,
                        'amount' => fake()->randomFloat(2, 25000, 125000),
                        'index_value' => fake()->randomFloat(2, 12.5, 62.5),
                        'status' => fake()->randomElement([0, 1]),
                        'pairing_date' => fake()->date(),
                        'description' => 'Bonus pairing pair ke-'.($i + 1),
                    ]);
                }
            }

            // Matching Bonus (from sponsor tree)
            $matrixEntries = CustomerNetworkMatrix::where('sponsor_id', $customer->id)->get();
            foreach ($matrixEntries->take(5) as $entry) {
                if (fake()->boolean(50)) {
                    CustomerBonusMatching::create([
                        'member_id' => $customer->id,
                        'from_member_id' => $entry->member_id,
                        'level' => $entry->level,
                        'amount' => fake()->randomFloat(2, 10000, 50000),
                        'index_value' => fake()->randomFloat(2, 5, 25),
                        'status' => fake()->randomElement([0, 1]),
                        'description' => 'Bonus matching level '.$entry->level,
                    ]);
                }
            }

            // Cashback Bonus
            if (fake()->boolean(40)) {
                CustomerBonusCashback::create([
                    'member_id' => $customer->id,
                    'order_id' => null,
                    'amount' => fake()->randomFloat(2, 10000, 100000),
                    'index_value' => fake()->randomFloat(2, 5, 50),
                    'status' => fake()->randomElement([0, 1]),
                    'description' => 'Bonus cashback belanja',
                ]);
            }

            // Aggregate Bonus Summary
            $totalBonus = CustomerBonusSponsor::where('member_id', $customer->id)->sum('amount')
                + CustomerBonusPairing::where('member_id', $customer->id)->sum('amount')
                + CustomerBonusMatching::where('member_id', $customer->id)->sum('amount')
                + CustomerBonusCashback::where('member_id', $customer->id)->sum('amount');

            if ($totalBonus > 0) {
                $taxPercent = 5;
                $taxValue = $totalBonus * ($taxPercent / 100);

                CustomerBonus::create([
                    'member_id' => $customer->id,
                    'amount' => $totalBonus,
                    'index_value' => $totalBonus / 2000,
                    'tax_percent' => $taxPercent,
                    'tax_value' => $taxValue,
                    'tax_netto' => $totalBonus - $taxValue,
                    'status' => fake()->randomElement([0, 1]),
                    'description' => 'Total bonus periode '.now()->format('F Y'),
                ]);
            }
        }
    }

    /**
     * Seed wallet transactions.
     */
    protected function seedWalletTransactions(\Illuminate\Database\Eloquent\Collection $customers): void
    {
        foreach ($customers->take(10) as $customer) {
            $balance = 0;

            // Initial topup
            $topupAmount = fake()->randomFloat(2, 100000, 1000000);
            CustomerWalletTransaction::create([
                'customer_id' => $customer->id,
                'type' => 'topup',
                'amount' => $topupAmount,
                'balance_before' => $balance,
                'balance_after' => $balance + $topupAmount,
                'status' => 'completed',
                'payment_method' => fake()->randomElement(['bank_transfer', 'gopay', 'ovo']),
                'transaction_ref' => 'TXN-'.strtoupper(Str::random(12)),
                'notes' => 'Top up saldo awal',
                'completed_at' => now()->subDays(fake()->numberBetween(1, 30)),
            ]);
            $balance += $topupAmount;

            // Bonus credit
            $bonusAmount = fake()->randomFloat(2, 50000, 500000);
            CustomerWalletTransaction::create([
                'customer_id' => $customer->id,
                'type' => 'bonus',
                'amount' => $bonusAmount,
                'balance_before' => $balance,
                'balance_after' => $balance + $bonusAmount,
                'status' => 'completed',
                'transaction_ref' => 'TXN-'.strtoupper(Str::random(12)),
                'notes' => 'Pencairan bonus MLM',
                'completed_at' => now()->subDays(fake()->numberBetween(1, 15)),
            ]);
            $balance += $bonusAmount;

            // Purchase debit
            if (fake()->boolean(70)) {
                $purchaseAmount = fake()->randomFloat(2, 50000, min(300000, $balance));
                CustomerWalletTransaction::create([
                    'customer_id' => $customer->id,
                    'type' => 'purchase',
                    'amount' => -$purchaseAmount,
                    'balance_before' => $balance,
                    'balance_after' => $balance - $purchaseAmount,
                    'status' => 'completed',
                    'transaction_ref' => 'TXN-'.strtoupper(Str::random(12)),
                    'notes' => 'Pembelian produk',
                    'completed_at' => now()->subDays(fake()->numberBetween(1, 7)),
                ]);
                $balance -= $purchaseAmount;
            }

            // Update customer wallet balance
            $customer->update(['ewallet_saldo' => $balance]);
        }
    }
}
