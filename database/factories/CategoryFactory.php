<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Referensi data asli (hanya untuk dokumentasi)
     *
     * (id, parent_id, slug, name, description, sort_order, is_active, image, created_at, updated_at)
     * (1, NULL, 'officia-sint-6bt6jb', 'Health Therapy', 'Puranusa', 1, 1, 'images/category-products/01K8NCS0E3H5C7C4WEP1ZXE6FK.png', '2025-10-08 11:38:32', '2025-10-29 02:30:37'),
     * (2, NULL, 'aut-totam-Yhec7L', 'Beauty Care', 'Puranusa', 1, 1, 'images/category-products/01K8NCW90F80Q7W4WR84R50XK6.jpg', '2025-10-08 11:38:32', '2025-10-29 02:32:24'),
     * (3, NULL, 'sed-nulla-UXJGib', 'Health Care', 'Puranusa', 2, 1, 'images/category-products/01K8METSTFYZHAVWSMBQ39EGQR.jpg', '2025-10-08 11:38:32', '2025-10-28 17:47:18'),
     * (4, NULL, 'voluptatem-et-wyKKu2', 'Fashion', 'Puranusa', 4, 1, 'images/category-products/01K8ND4299C9FEH9P4YTJRV6DM.png', '2025-10-08 11:38:32', '2025-10-29 02:36:39');
     */

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Data referensi kategori
        $referenceCategories = [
            [
                'name'       => 'Health Therapy',
                'sort_order' => 1,
                'image'      => 'images/category-products/01K8NCS0E3H5C7C4WEP1ZXE6FK.png',
            ],
            [
                'name'       => 'Beauty Care',
                'sort_order' => 1,
                'image'      => 'images/category-products/01K8NCW90F80Q7W4WR84R50XK6.jpg',
            ],
            [
                'name'       => 'Health Care',
                'sort_order' => 2,
                'image'      => 'images/category-products/01K8METSTFYZHAVWSMBQ39EGQR.jpg',
            ],
            [
                'name'       => 'Fashion',
                'sort_order' => 4,
                'image'      => 'images/category-products/01K8ND4299C9FEH9P4YTJRV6DM.png',
            ],
        ];

        // Ambil salah satu kategori dari referensi di atas
        $category = $this->faker->randomElement($referenceCategories);

        // Slug dinamis: slug nama + 6 karakter acak (mirip contoh: "officia-sint-6bt6jb")
        $slug = Str::slug($category['name']) . '-' . $this->faker->unique()->regexify('[A-Za-z0-9]{6}');

        return [
            'parent_id'   => null,
            'slug'        => $slug,
            'name'        => $category['name'],
            'description' => 'Puranusa', // sesuai data referensi
            'sort_order'  => $category['sort_order'],
            'is_active'   => true,
            'image'       => $category['image'],
        ];
    }

    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    public function withParent(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => Category::factory(),
        ]);
    }
}
