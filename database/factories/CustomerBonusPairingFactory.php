<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manage\CustomerBonusPairing>
 */
class CustomerBonusPairingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $pairs = $this->faker->numberBetween(1, 50);
        $bonusPerPair = 100000;
        $amount = $pairs * $bonusPerPair;

        return [
            'member_id' => \App\Models\Manage\Customer::factory(),
            'source_member_id' => \App\Models\Manage\Customer::factory(),
            'pairing_count' => $pairs,
            'amount' => $amount,
            'index_value' => $this->faker->optional()->randomFloat(2, 100000, 10000000),
            'status' => $this->faker->randomElement([0, 1]),
            'pairing_date' => $this->faker->optional()->date(),
            'description' => $this->faker->optional()->randomElement([
                "Bonus pairing untuk {$pairs} pasangan",
                'Pairing bonus periode '.now()->format('F Y'),
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
