<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CustomerPackage>
 */
class CustomerPackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'alias' => fake()->word(),
            'price' => fake()->randomFloat(2, 100000, 10000000),
            'pv' => fake()->numberBetween(100, 1000),
            'pr' => fake()->numberBetween(50, 500),
            'sponsor' => fake()->randomFloat(2, 10000, 500000),
            'pairing' => fake()->randomFloat(2, 5000, 100000),
            'matching' => fake()->randomFloat(2, 5000, 100000),
            'flush_out' => fake()->randomFloat(2, 5000, 100000),
        ];
    }
}
