<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProdukController extends Controller
{
    /**
     * Display the specified product.
     */
    public function show(string $slug): Response
    {
        $product = Product::with(['categories', 'media', 'reviews.customer'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $averageRating = $product->reviews()->avg('rating');
        $reviewCount = $product->reviews()->count();
        $relatedProducts = $this->getRelatedProducts($product);
        $productData = $this->formatProductData($product, $averageRating, $reviewCount);
        return Inertia::render('ecommerce/Produk', [
            'product' => $productData,
            'relatedProducts' => $relatedProducts,
        ]);
    }

    /**
     * Get related products based on same categories.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getRelatedProducts(Product $product): array
    {
        return Product::with(['categories', 'media'])
            ->where('is_active', true)
            ->where('id', '!=', $product->id)
            ->whereHas('categories', function ($query) use ($product) {
                $query->whereIn('categories.id', $product->categories->pluck('id'));
            })
            ->inRandomOrder()
            ->limit(8)
            ->get()
            ->map(fn ($item) => $this->formatRelatedProductData($item))
            ->toArray();
    }

    /**
     * Format related product data.
     *
     * @return array<string, mixed>
     */
    protected function formatRelatedProductData(Product $item): array
    {
        $mainImage = $item->media->where('is_primary', true)->first();
        $promotion = $this->getActivePromotion($item);
        $pricing = $this->calculatePricing((float) $item->base_price, $promotion);

        return [
            'id' => $item->id,
            'name' => $item->name,
            'slug' => $item->slug,
            'description' => $item->short_desc,
            'price' => (float) $pricing['final_price'],
            'original_price' => $pricing['original_price'] ? (float) $pricing['original_price'] : null,
            'discount_percentage' => $pricing['discount_percent'],
            'image' => $mainImage ? Storage::url($mainImage->url) : url('images/placeholder.jpg'),
            'rating' => $item->reviews()->avg('rating'),
            'review_count' => $item->reviews()->count(),
            'stock' => $item->stock,
            'is_new' => $item->created_at->diffInDays(now()) <= 30,
            'badge' => $promotion?->name,
        ];
    }

    /**
     * Format complete product data.
     *
     * @return array<string, mixed>
     */
    protected function formatProductData(Product $product, ?float $averageRating, int $reviewCount): array
    {
        $mainImage = $product->media->where('is_primary', true)->first();
        $images = $this->formatProductImages($product);
        $promotion = $this->getActivePromotion($product);
        $pricing = $this->calculatePricing((float) $product->base_price, $promotion);

        return [
            'id' => $product->id,
            'sku' => $product->sku,
            'name' => $product->name,
            'slug' => $product->slug,
            'short_description' => $product->short_desc,
            'long_description' => $product->long_desc,
            'brand' => $product->brand,
            'price' => (float) $pricing['final_price'],
            'original_price' => $pricing['original_price'] ? (float) $pricing['original_price'] : null,
            'discount_percentage' => $pricing['discount_percent'],
            'stock' => $product->stock,
            'warranty_months' => $product->warranty_months,
            'weight_gram' => $product->weight_gram,
            'dimensions' => [
                'length' => $product->length_mm,
                'width' => $product->width_mm,
                'height' => $product->height_mm,
            ],
            'images' => $images->pluck('url'),
            'main_image' => $mainImage ? Storage::url($mainImage->url) : url('images/placeholder.jpg'),
            'categories' => $product->categories->map(fn ($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
            ]),
            'rating' => round($averageRating ?? 0, 1),
            'review_count' => $reviewCount,
            'reviews' => $this->formatReviews($product),
            'is_new' => $product->created_at->diffInDays(now()) <= 30,
            'promotion' => $promotion ? [
                'name' => $promotion->name,
                'end_date' => $promotion->end_at,
            ] : null,
        ];
    }

    /**
     * Format product images.
     *
     * @return \Illuminate\Support\Collection<int, array<string, mixed>>
     */
    protected function formatProductImages(Product $product): \Illuminate\Support\Collection
    {
        return $product->media->map(fn ($media) => [
            'id' => $media->id,
            'url' => Storage::url($media->url),
            'alt' => $media->alt_text ?? $product->name,
            'is_primary' => $media->is_primary,
        ]);
    }

    /**
     * Format product reviews.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function formatReviews(Product $product): array
    {
        return $product->reviews()
            ->with('customer')
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn ($review) => [
                'id' => $review->id,
                'customer_name' => $review->customer->name,
                'rating' => $review->rating,
                'comment' => $review->comment,
                'created_at' => $review->created_at->diffForHumans(),
            ])
            ->toArray();
    }

    /**
     * Get active promotion for product.
     */
    protected function getActivePromotion(Product $product): mixed
    {
        return $product->promotions()
            ->where('is_active', true)
            ->where('start_at', '<=', now())
            ->where('end_at', '>=', now())
            ->first();
    }

    /**
     * Calculate pricing with promotion.
     *
     * @return array<string, float|int|null>
     */
    protected function calculatePricing(float $basePrice, mixed $promotion): array
    {
        $discountPercent = 0;
        $finalPrice = $basePrice;
        $originalPrice = null;

        if ($promotion) {
            if ($promotion->pivot->discount_percent > 0) {
                $discountPercent = $promotion->pivot->discount_percent;
                $finalPrice = $basePrice * (1 - $discountPercent / 100);
                $originalPrice = $basePrice;
            } elseif ($promotion->pivot->discount_value > 0) {
                $finalPrice = max(0, $basePrice - $promotion->pivot->discount_value);
                $originalPrice = $basePrice;
                $discountPercent = round((($basePrice - $finalPrice) / $basePrice) * 100);
            }
        }

        return [
            'final_price' => $finalPrice,
            'original_price' => $originalPrice,
            'discount_percent' => $discountPercent,
        ];
    }
}
