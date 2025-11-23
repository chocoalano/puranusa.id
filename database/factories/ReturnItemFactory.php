<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReturnItem>
 */
class ReturnItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'return_id' => \App\Models\Returns::factory(),
            'order_item_id' => \App\Models\OrderItem::factory(),
            'qty' => $this->faker->numberBetween(1, 5),
            'condition_note' => $this->faker->optional()->randomElement([
                'Kemasan rusak',
                'Produk cacat',
                'Segel terbuka',
                'Tidak lengkap',
                'Kondisi baik',
                null,
            ]),
        ];
    }
}
