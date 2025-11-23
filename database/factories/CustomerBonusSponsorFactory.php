<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manage\CustomerBonusSponsor>
 */
class CustomerBonusSponsorFactory extends Factory
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
            'amount' => $this->faker->randomFloat(2, 20000, 800000),
            'index_value' => $this->faker->optional()->randomFloat(2, 200000, 8000000),
            'status' => $this->faker->randomElement([0, 1]),
            'description' => $this->faker->optional()->randomElement([
                'Bonus sponsor dari registrasi member baru',
                'Bonus sponsor dari transaksi downline',
                'Bonus rekrutmen member',
                null,
            ]),
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
