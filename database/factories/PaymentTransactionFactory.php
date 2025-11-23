<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentTransaction>
 */
class PaymentTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'payment_id' => \App\Models\Payment::factory(),
            'status' => $this->faker->randomElement(['pending', 'success', 'failed', 'expired']),
            'amount' => $this->faker->randomFloat(2, 100000, 10000000),
            'raw_json' => [
                'transaction_id' => $this->faker->uuid(),
                'transaction_time' => $this->faker->dateTimeThisMonth()->format('Y-m-d H:i:s'),
                'transaction_status' => $this->faker->randomElement(['capture', 'settlement', 'pending', 'deny', 'cancel', 'expire']),
                'status_code' => $this->faker->randomElement(['200', '201', '202', '400', '404', '500']),
                'signature_key' => $this->faker->sha256(),
            ],
        ];
    }
}
