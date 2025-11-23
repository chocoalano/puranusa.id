<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->randomElement([
            'Tips Menjaga Kesehatan di Musim Hujan',
            'Manfaat Vitamin C untuk Daya Tahan Tubuh',
            'Cara Memilih Suplemen yang Tepat',
            'Rahasia Kulit Glowing dengan Produk Natural',
            'Pentingnya Omega 3 untuk Kesehatan Jantung',
            '10 Kebiasaan Sehat untuk Hidup Lebih Baik',
            'Manfaat Propolis untuk Sistem Imun',
            'Perawatan Kulit Wajah yang Benar',
        ]);
        $publishedAt = $this->faker->optional(0.8)->dateTimeBetween('-6 months', 'now');

        return [
            'title' => $title,
            'slug' => \Illuminate\Support\Str::slug($title).'-'.$this->faker->unique()->numberBetween(1000, 9999),
            'seo_title' => $this->faker->optional()->sentence(8),
            'seo_description' => $this->faker->optional()->sentence(15),
            'is_published' => $publishedAt !== null,
            'published_at' => $publishedAt,
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => true,
            'published_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_published' => false,
            'published_at' => null,
        ]);
    }
}
