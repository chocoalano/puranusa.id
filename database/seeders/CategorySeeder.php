<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Health Therapy',
                'slug' => 'health-therapy',
                'description' => 'Produk terapi kesehatan untuk meningkatkan kualitas hidup Anda',
                'sort_order' => 1,
                'is_active' => true,
                'image' => 'images/category-products/01K8NCS0E3H5C7C4WEP1ZXE6FK.png',
            ],
            [
                'id' => 2,
                'name' => 'Beauty Care',
                'slug' => 'beauty-care',
                'description' => 'Produk perawatan kecantikan alami dengan formula terbaik',
                'sort_order' => 2,
                'is_active' => true,
                'image' => 'images/category-products/01K8NCW90F80Q7W4WR84R50XK6.jpg',
            ],
            [
                'id' => 3,
                'name' => 'Health Care',
                'slug' => 'health-care',
                'description' => 'Produk kesehatan harian untuk menjaga stamina dan vitalitas',
                'sort_order' => 3,
                'is_active' => true,
                'image' => 'images/category-products/01K8METSTFYZHAVWSMBQ39EGQR.jpg',
            ],
            [
                'id' => 4,
                'name' => 'Fashion',
                'slug' => 'fashion',
                'description' => 'Produk fashion kesehatan dengan teknologi terkini',
                'sort_order' => 4,
                'is_active' => true,
                'image' => 'images/category-products/01K8ND4299C9FEH9P4YTJRV6DM.png',
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['id' => $categoryData['id']],
                $categoryData
            );
        }
    }
}
