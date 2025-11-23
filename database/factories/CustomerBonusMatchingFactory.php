<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manage\CustomerBonusMatching>
 */
class CustomerBonusMatchingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'member_id' => \App\Models\Manage\Customer::factory(),
            'from_member_id' => \App\Models\Manage\Customer::factory(),
            'level' => $this->faker->numberBetween(1, 5),
            'amount' => $this->faker->randomFloat(2, 10000, 500000),
            'index_value' => $this->faker->optional()->randomFloat(2, 100000, 5000000),
            'status' => $this->faker->randomElement([0, 1]),
            'description' => $this->faker->optional()->sentence(8),
        ];
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 0,
        ]);
    }

    public function released(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 1,
        ]);
    }
}
