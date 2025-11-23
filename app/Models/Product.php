<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $sku
 * @property string $slug
 * @property string $name
 * @property string|null $short_desc
 * @property string|null $long_desc
 * @property string|null $brand
 * @property int|null $warranty_months
 * @property float $base_price
 * @property string $currency
 * @property int $stock
 * @property int|null $weight_gram
 * @property int|null $length_mm
 * @property int|null $width_mm
 * @property int|null $height_mm
 * @property float|null $bv
 * @property float|null $b_sponsor
 * @property float|null $b_matching
 * @property float|null $b_pairing
 * @property float|null $b_cashback
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ProductMedia> $media
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Category> $categories
 * @property-read \Illuminate\Database\Eloquent\Collection<int, ProductReview> $reviews
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'sku',
        'slug',
        'name',
        'short_desc',
        'long_desc',
        'brand',
        'warranty_months',
        'base_price',
        'currency',
        'stock',
        'weight_gram',
        'length_mm',
        'width_mm',
        'height_mm',
        'bv', 'b_sponsor', 'b_matching', 'b_pairing', 'b_cashback',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'base_price' => 'decimal:2',
            'warranty_months' => 'integer',
            'stock' => 'integer',
            'weight_gram' => 'integer',
            'length_mm' => 'integer',
            'width_mm' => 'integer',
            'height_mm' => 'integer',
            'bv' => 'decimal:2',
            'b_sponsor' => 'decimal:2',
            'b_matching' => 'decimal:2',
            'b_pairing' => 'decimal:2',
            'b_cashback' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function media()
    {
        return $this->hasMany(ProductMedia::class);
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function wishlistItems()
    {
        return $this->hasMany(WishlistItem::class);
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotion_products')
            ->withPivot('min_qty', 'discount_value', 'discount_percent', 'bundle_price')
            ->withTimestamps();
    }

    /**
     * Get the primary image for the product
     */
    public function getPrimaryImageAttribute(): ?ProductMedia
    {
        return $this->media()->where('is_primary', true)->first()
            ?? $this->media()->orderBy('sort_order')->first();
    }

    /**
     * Get image URL for a specific size
     *
     * @param  string  $size  (thumbnail|small|medium|large|original)
     */
    public function getImageUrl(string $size = 'medium'): ?string
    {
        $primaryImage = $this->primaryImage;

        if (! $primaryImage) {
            return null;
        }

        $imageService = new \App\Services\ImageService;

        return $imageService->getImageUrl($primaryImage->url, $size);
    }

    /**
     * Get all image URLs for a specific size
     *
     * @param  string  $size  (thumbnail|small|medium|large|original)
     */
    public function getAllImageUrls(string $size = 'medium'): array
    {
        $imageService = new \App\Services\ImageService;

        return $this->media()
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($media) => $imageService->getImageUrl($media->url, $size))
            ->toArray();
    }
}
