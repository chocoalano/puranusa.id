<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Returns>
 */
class ReturnsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $requestedAt = $this->faker->dateTimeBetween('-60 days', 'now');
        $processedAt = $this->faker->optional()->dateTimeBetween($requestedAt, 'now');

        return [
            'order_id' => \App\Models\Order::factory(),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected', 'completed', 'cancelled']),
            'reason' => $this->faker->randomElement([
                'Produk rusak',
                'Produk tidak sesuai',
                'Salah kirim',
                'Produk cacat',
                'Tidak sesuai deskripsi',
                'Berubah pikiran',
            ]),
            'requested_at' => $requestedAt,
            'processed_at' => $processedAt,
        ];
    }

    public function approved(): static
    {
        return $this->state(function (array $attributes) {
            $requestedAt = $this->faker->dateTimeBetween('-30 days', '-5 days');

            return [
                'status' => 'approved',
                'requested_at' => $requestedAt,
                'processed_at' => $this->faker->dateTimeBetween($requestedAt, 'now'),
            ];
        });
    }
}
