<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShipmentItem>
 */
class ShipmentItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'shipment_id' => \App\Models\Shipment::factory(),
            'order_item_id' => \App\Models\OrderItem::factory(),
            'qty' => $this->faker->numberBetween(1, 10),
        ];
    }
}
