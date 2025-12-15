<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentMethods = [
            ['code' => 'midtrans', 'name' => 'Midtrans Payment Gateway', 'is_active' => true],
            ['code' => 'wallet', 'name' => 'E-Wallet Puranusa', 'is_active' => true],
            ['code' => 'bank_transfer', 'name' => 'Transfer Bank Manual', 'is_active' => true],
            ['code' => 'bca_va', 'name' => 'BCA Virtual Account', 'is_active' => true],
            ['code' => 'bni_va', 'name' => 'BNI Virtual Account', 'is_active' => true],
            ['code' => 'mandiri_va', 'name' => 'Mandiri Virtual Account', 'is_active' => true],
            ['code' => 'bri_va', 'name' => 'BRI Virtual Account', 'is_active' => true],
            ['code' => 'gopay', 'name' => 'GoPay', 'is_active' => true],
            ['code' => 'shopeepay', 'name' => 'ShopeePay', 'is_active' => true],
            ['code' => 'qris', 'name' => 'QRIS', 'is_active' => true],
            ['code' => 'credit_card', 'name' => 'Kartu Kredit/Debit', 'is_active' => true],
            ['code' => 'cod', 'name' => 'Cash on Delivery (COD)', 'is_active' => false],
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::updateOrCreate(
                ['code' => $method['code']],
                $method
            );
        }
    }
}
