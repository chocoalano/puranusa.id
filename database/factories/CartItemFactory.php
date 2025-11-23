<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $qty = $this->faker->numberBetween(1, 5);
        $unitPrice = $this->faker->randomFloat(2, 50000, 1000000);
        $rowTotal = $qty * $unitPrice;

        return [
            'cart_id' => \App\Models\Cart::factory(),
            'product_id' => \App\Models\Product::factory(),
            'qty' => $qty,
            'unit_price' => $unitPrice,
            'currency' => 'IDR',
            'product_sku' => 'PRD-'.strtoupper($this->faker->bothify('???###')),
            'product_name' => $this->faker->words(3, true),
            'row_total' => $rowTotal,
            'meta_json' => $this->faker->optional()->randomElement([
                ['variant' => 'Regular', 'size' => '100ml'],
                ['variant' => 'Premium', 'size' => '250ml'],
                null,
            ]),
        ];
    }
}
