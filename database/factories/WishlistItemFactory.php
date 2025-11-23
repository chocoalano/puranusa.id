<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WishlistItem>
 */
class WishlistItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'wishlist_id' => \App\Models\Wishlist::factory(),
            'product_id' => \App\Models\Product::factory(),
            'product_name' => $this->faker->words(3, true),
            'product_sku' => 'PRD-'.strtoupper($this->faker->bothify('???###')),
            'meta_json' => $this->faker->optional()->randomElement([
                ['added_at' => now()->toDateTimeString(), 'note' => 'Untuk hadiah'],
                ['added_at' => now()->toDateTimeString()],
                null,
            ]),
        ];
    }
}
