<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => \App\Models\Order::factory(),
            'method_id' => \App\Models\PaymentMethod::factory(),
            'status' => $this->faker->randomElement(['pending', 'paid', 'failed', 'expired', 'cancelled']),
            'amount' => $this->faker->randomFloat(2, 100000, 10000000),
            'currency' => 'IDR',
            'provider_txn_id' => $this->faker->optional()->bothify('TXN-################'),
            'metadata_json' => $this->faker->optional()->randomElement([
                ['payment_type' => 'bank_transfer', 'bank' => 'bca', 'va_number' => '8808'.$this->faker->numerify('##########')],
                ['payment_type' => 'gopay', 'deep_link' => 'gojek://gopay/merchanttransfer?id='.$this->faker->uuid()],
                ['payment_type' => 'qris', 'qr_string' => $this->faker->uuid()],
                null,
            ]),
        ];
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'provider_txn_id' => 'TXN-'.$this->faker->bothify('################'),
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }
}
