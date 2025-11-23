<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Promotion>
 */
class PromotionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startAt = $this->faker->dateTimeBetween('-30 days', '+10 days');
        $endAt = $this->faker->dateTimeBetween($startAt, '+90 days');
        $name = $this->faker->randomElement([
            'Flash Sale Hari Ini',
            'Diskon Spesial Weekend',
            'Promo Akhir Bulan',
            'Mega Sale Kesehatan',
            'Promo Member Baru',
            'Bundling Hemat',
        ]);

        return [
            'code' => strtoupper($this->faker->bothify('PROMO###??')),
            'name' => $name,
            'type' => $this->faker->randomElement(['discount', 'bundle', 'cashback', 'voucher']),
            'landing_slug' => $this->faker->optional()->slug(3),
            'description' => $this->faker->optional()->paragraph(2),
            'image' => $this->faker->optional()->imageUrl(800, 400, 'promotion', true),
            'start_at' => $startAt,
            'end_at' => $endAt,
            'is_active' => $this->faker->boolean(80),
            'priority' => $this->faker->numberBetween(1, 10),
            'max_redemption' => $this->faker->optional()->numberBetween(10, 1000),
            'per_user_limit' => $this->faker->optional()->numberBetween(1, 5),
            'conditions_json' => $this->faker->optional()->randomElement([
                ['min_purchase' => 100000, 'max_discount' => 50000],
                ['category' => 'vitamin', 'min_qty' => 2],
                null,
            ]),
            'show_on' => $this->faker->optional()->randomElement(['homepage', 'category', 'product', 'cart']),
            'custom_html' => $this->faker->optional()->randomElement([
                '<div class="promo-banner">Spesial Promo!</div>',
                null,
            ]),
            'page' => $this->faker->optional()->randomElement(['home', 'shop', 'checkout']),
        ];
    }

    public function active(): static
    {
        return $this->state(function (array $attributes) {
            $startAt = $this->faker->dateTimeBetween('-10 days', 'now');

            return [
                'is_active' => true,
                'start_at' => $startAt,
                'end_at' => $this->faker->dateTimeBetween('now', '+30 days'),
            ];
        });
    }
}
