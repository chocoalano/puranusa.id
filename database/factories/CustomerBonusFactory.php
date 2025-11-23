<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manage\CustomerBonus>
 */
class CustomerBonusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $amount = $this->faker->randomFloat(2, 50000, 1000000);
        $taxPercent = $this->faker->randomElement([5, 10, 15]);
        $taxValue = ($amount * $taxPercent) / 100;
        $taxNetto = $amount - $taxValue;

        return [
            'member_id' => \App\Models\Manage\Customer::factory(),
            'amount' => $amount,
            'index_value' => $this->faker->optional()->randomFloat(2, 100, 5000),
            'tax_netto' => $taxNetto,
            'tax_percent' => $taxPercent,
            'tax_value' => $taxValue,
            'status' => $this->faker->randomElement([0, 1]),
            'description' => $this->faker->optional()->randomElement([
                'Bonus penjualan',
                'Bonus rekrutmen',
                'Bonus achievement',
                'Bonus bulanan',
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
