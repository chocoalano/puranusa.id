<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ArticleContent>
 */
class ArticleContentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'article_id' => \App\Models\Article::factory(),
            'content' => $this->faker->paragraphs(8, true),
            'tags' => $this->faker->optional()->randomElements([
                'kesehatan', 'suplemen', 'vitamin', 'kecantikan', 'tips',
                'herbal', 'natural', 'lifestyle', 'wellness', 'skincare',
            ], $this->faker->numberBetween(2, 5)),
        ];
    }
}
