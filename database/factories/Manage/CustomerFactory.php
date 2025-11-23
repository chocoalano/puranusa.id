<?php

namespace Database\Factories\Manage;

use App\Models\Manage\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Manage\Customer>
 */
class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('08##########'),
            'password' => Hash::make('password'),
            'email_verified_at' => fake()->boolean(80) ? now() : null,
            'ewallet_saldo' => fake()->randomFloat(2, 0, 10000000),
            'description' => fake()->boolean(30) ? fake()->sentence() : null,
        ];
    }

    /**
     * Indicate that the customer is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => now(),
        ]);
    }

    /**
     * Indicate that the customer is unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Customer dengan saldo ewallet tertentu
     */
    public function withBalance(float $balance): static
    {
        return $this->state(fn (array $attributes) => [
            'ewallet_saldo' => $balance,
        ]);
    }

    /**
     * Customer tanpa saldo
     */
    public function withoutBalance(): static
    {
        return $this->state(fn (array $attributes) => [
            'ewallet_saldo' => 0,
        ]);
    }
}
