<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cart>
 */
class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 100000, 5000000);
        $discount = $this->faker->randomFloat(2, 0, $subtotal * 0.2);
        $shipping = $this->faker->randomFloat(2, 10000, 100000);
        $tax = $this->faker->randomFloat(2, 0, $subtotal * 0.11);
        $grandTotal = $subtotal - $discount + $shipping + $tax;

        return [
            'customer_id' => \App\Models\Manage\Customer::factory(),
            'session_id' => $this->faker->optional()->uuid(),
            'currency' => 'IDR',
            'subtotal_amount' => $subtotal,
            'discount_amount' => $discount,
            'shipping_amount' => $shipping,
            'tax_amount' => $tax,
            'grand_total' => $grandTotal,
            'applied_promos' => $this->faker->optional()->randomElements(['PROMO10', 'DISCOUNT20', 'FLASH50'], $this->faker->numberBetween(0, 2)),
        ];
    }
}
