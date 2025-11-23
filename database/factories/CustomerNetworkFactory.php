<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manage\CustomerNetwork>
 */
class CustomerNetworkFactory extends Factory
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
            'upline_id' => $this->faker->optional()->randomElement([null, \App\Models\Manage\Customer::factory()]),
            'position' => $this->faker->randomElement(['left', 'right']),
            'status' => $this->faker->boolean(90),
            'level' => $this->faker->numberBetween(1, 10),
            'description' => $this->faker->optional()->sentence(10),
        ];
    }

    public function root(): static
    {
        return $this->state(fn (array $attributes) => [
            'upline_id' => null,
            'level' => 1,
            'status' => true,
        ]);
    }

    public function leftPosition(): static
    {
        return $this->state(fn (array $attributes) => [
            'position' => 'left',
        ]);
    }

    public function rightPosition(): static
    {
        return $this->state(fn (array $attributes) => [
            'position' => 'right',
        ]);
    }
}
