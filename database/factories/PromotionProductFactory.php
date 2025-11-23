<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PromotionProduct>
 */
class PromotionProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'promotion_id' => \App\Models\Promotion::factory(),
            'product_id' => \App\Models\Product::factory(),
            'min_qty' => $this->faker->numberBetween(1, 5),
            'discount_value' => $this->faker->optional()->randomFloat(2, 5000, 100000),
            'discount_percent' => $this->faker->optional()->randomFloat(2, 5, 50),
            'bundle_price' => $this->faker->optional()->randomFloat(2, 150000, 1000000),
        ];
    }
}
