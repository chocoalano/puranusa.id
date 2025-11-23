<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->words(3, true);

        return [
            'title' => ucwords($title),
            'slug' => \Illuminate\Support\Str::slug($title),
            'content' => $this->faker->paragraphs(5, true),
            'seo_title' => $this->faker->optional()->sentence(),
            'seo_description' => $this->faker->optional()->text(160),
            'is_published' => $this->faker->boolean(80),
            'template' => $this->faker->randomElement(['default', 'full-width', 'narrow']),
            'order' => $this->faker->numberBetween(0, 100),
        ];
    }
}
