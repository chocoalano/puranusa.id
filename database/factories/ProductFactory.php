<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'Suplemen Omega 3', 'Vitamin C 1000mg', 'Collagen Beauty Drink',
            'Green Coffee Extract', 'Propolis Premium', 'Spirulina Tablet',
            'Madu Murni Premium', 'Ekstrak Temulawak', 'Serum Wajah Glowing',
            'Skincare Set Complete', 'Hair Tonic Growth', 'Essential Oil Lavender',
        ]);
        $basePrice = $this->faker->randomFloat(2, 50000, 2000000);

        return [
            'sku' => 'PRD-'.strtoupper($this->faker->unique()->bothify('???###')),
            'slug' => \Illuminate\Support\Str::slug($name).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'name' => $name,
            'short_desc' => $this->faker->sentence(12),
            'long_desc' => $this->faker->paragraphs(3, true),
            'brand' => $this->faker->optional()->randomElement(['PuraNusa', 'HealthPlus', 'BeautyNatural', 'VitaLife']),
            'warranty_months' => $this->faker->optional()->randomElement([3, 6, 12, 24]),
            'base_price' => $basePrice,
            'currency' => 'IDR',
            'stock' => $this->faker->numberBetween(0, 500),
            'weight_gram' => $this->faker->numberBetween(50, 2000),
            'length_mm' => $this->faker->numberBetween(50, 300),
            'width_mm' => $this->faker->numberBetween(50, 200),
            'height_mm' => $this->faker->numberBetween(30, 150),
            'bv' => $this->faker->randomFloat(2, 10, 500),
            'b_sponsor' => $this->faker->randomFloat(2, 5000, 100000),
            'b_matching' => $this->faker->randomFloat(2, 3000, 80000),
            'b_pairing' => $this->faker->randomFloat(2, 2000, 50000),
            'b_cashback' => $this->faker->randomFloat(2, 1000, 30000),
            'is_active' => $this->faker->boolean(85),
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    public function inStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => $this->faker->numberBetween(50, 500),
        ]);
    }

    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }
}
