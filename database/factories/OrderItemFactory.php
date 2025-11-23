<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $qty = $this->faker->numberBetween(1, 10);
        $unitPrice = $this->faker->randomFloat(2, 50000, 1500000);
        $discount = $this->faker->randomFloat(2, 0, $unitPrice * 0.3);
        $rowTotal = ($unitPrice - $discount) * $qty;

        return [
            'order_id' => \App\Models\Order::factory(),
            'product_id' => \App\Models\Product::factory(),
            'name' => $this->faker->words(3, true),
            'sku' => 'PRD-'.strtoupper($this->faker->bothify('???###')),
            'qty' => $qty,
            'unit_price' => $unitPrice,
            'discount_amount' => $discount,
            'row_total' => $rowTotal,
            'weight_gram' => $this->faker->numberBetween(50, 2000),
            'length_mm' => $this->faker->numberBetween(50, 300),
            'width_mm' => $this->faker->numberBetween(50, 200),
            'height_mm' => $this->faker->numberBetween(30, 150),
            'meta_json' => $this->faker->optional()->randomElement([
                ['variant' => 'Regular'],
                ['variant' => 'Premium', 'notes' => 'Gift wrapped'],
                null,
            ]),
        ];
    }
}
