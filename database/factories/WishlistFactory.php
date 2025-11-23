<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Wishlist>
 */
class WishlistFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => \App\Models\Manage\Customer::factory(),
            'name' => $this->faker->randomElement(['Wishlist Saya', 'Favorit', 'Belanja Nanti', 'Hadiah', 'Wishlist']),
        ];
    }
}
