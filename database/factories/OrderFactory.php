<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->randomFloat(2, 100, 1000);
        $discount = fake()->randomFloat(2, 0, 50);
        $shipping = fake()->randomFloat(2, 10, 50);
        $tax = 0;
        $grandTotal = $subtotal - $discount + $shipping + $tax;

        return [
            'order_no' => 'ORD-'.strtoupper(fake()->bothify('??##??##')),
            'customer_id' => User::factory(),
            'currency' => 'IDR',
            'status' => 'pending',
            'subtotal_amount' => $subtotal,
            'discount_amount' => $discount,
            'shipping_amount' => $shipping,
            'tax_amount' => $tax,
            'grand_total' => $grandTotal,
            'shipping_address_id' => null,
            'billing_address_id' => null,
            'applied_promos' => null,
            'notes' => fake()->optional()->sentence(),
            'placed_at' => now(),
            'paid_at' => null,
        ];
    }

    /**
     * Indicate that the order is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    /**
     * Indicate that the order is shipped.
     */
    public function shipped(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'shipped',
            'paid_at' => now(),
        ]);
    }

    /**
     * Indicate that the order is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'paid_at' => now(),
        ]);
    }
}
