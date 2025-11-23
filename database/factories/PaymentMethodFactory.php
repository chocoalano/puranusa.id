<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentMethod>
 */
class PaymentMethodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $methods = [
            ['code' => 'bank_transfer', 'name' => 'Transfer Bank'],
            ['code' => 'bca', 'name' => 'BCA Virtual Account'],
            ['code' => 'mandiri', 'name' => 'Mandiri Virtual Account'],
            ['code' => 'bni', 'name' => 'BNI Virtual Account'],
            ['code' => 'bri', 'name' => 'BRI Virtual Account'],
            ['code' => 'gopay', 'name' => 'GoPay'],
            ['code' => 'ovo', 'name' => 'OVO'],
            ['code' => 'dana', 'name' => 'DANA'],
            ['code' => 'shopeepay', 'name' => 'ShopeePay'],
            ['code' => 'qris', 'name' => 'QRIS'],
            ['code' => 'credit_card', 'name' => 'Kartu Kredit'],
            ['code' => 'cod', 'name' => 'Cash on Delivery'],
        ];

        $method = $this->faker->randomElement($methods);

        return [
            'code' => $method['code'],
            'name' => $method['name'],
            'is_active' => $this->faker->boolean(90),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }
}
