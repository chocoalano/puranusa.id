<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shipment>
 */
class ShipmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $shippedAt = $this->faker->optional()->dateTimeBetween('-30 days', 'now');
        $deliveredAt = $shippedAt ? $this->faker->optional()->dateTimeBetween($shippedAt, 'now') : null;

        return [
            'order_id' => \App\Models\Order::factory(),
            'courier_id' => $this->faker->numberBetween(1, 10),
            'tracking_no' => $this->faker->bothify('##??########'),
            'status' => $this->faker->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
            'shipped_at' => $shippedAt,
            'delivered_at' => $deliveredAt,
            'shipping_fee' => $this->faker->randomFloat(2, 10000, 150000),
        ];
    }

    public function delivered(): static
    {
        return $this->state(function (array $attributes) {
            $shippedAt = $this->faker->dateTimeBetween('-20 days', '-5 days');

            return [
                'status' => 'delivered',
                'shipped_at' => $shippedAt,
                'delivered_at' => $this->faker->dateTimeBetween($shippedAt, 'now'),
            ];
        });
    }

    public function shipped(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'shipped',
            'shipped_at' => $this->faker->dateTimeBetween('-10 days', 'now'),
            'delivered_at' => null,
        ]);
    }
}
