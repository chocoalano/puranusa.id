<?php

namespace App\Services;

use App\Models\Product;
use App\Models\ProductMedia;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ImageService
{
    protected ImageManager $imageManager;

    protected array $sizes = [
        'thumbnail' => 150,
        'small' => 300,
        'medium' => 600,
        'large' => 1200,
    ];

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver);
    }

    /**
     * Upload and process multiple product images
     *
     * @param  array  $images  Array of UploadedFile
     * @return array Array of created ProductMedia models
     */
    public function uploadProductImages(int $productId, array $images): array
    {
        $product = Product::findOrFail($productId);
        $createdMedia = [];

        // Check if this is the first image for the product
        $isFirstImage = $product->media()->count() === 0;

        foreach ($images as $index => $image) {
            $sortOrder = $product->media()->max('sort_order') + 1 + $index;
            $isPrimary = $isFirstImage && $index === 0;

            $mediaRecord = $this->processAndSaveImage($product, $image, $sortOrder, $isPrimary);
            $createdMedia[] = $mediaRecord;
        }

        return $createdMedia;
    }

    /**
     * Process single image: generate all sizes and save to storage
     */
    protected function processAndSaveImage(
        Product $product,
        UploadedFile $file,
        int $sortOrder,
        bool $isPrimary
    ): ProductMedia {
        $filename = time().'_'.uniqid().'.webp';
        $basePath = "products/{$product->id}";

        // Save original image
        $originalPath = "{$basePath}/original/{$filename}";
        $originalImage = $this->imageManager->read($file);

        // Convert to WebP and save original
        $originalEncoded = $originalImage->toWebp(85);
        Storage::disk('public')->put($originalPath, (string) $originalEncoded);

        // Generate responsive sizes
        foreach ($this->sizes as $sizeName => $dimension) {
            $resizedPath = "{$basePath}/{$sizeName}/{$filename}";
            $resizedImage = $this->imageManager->read($file);

            // Resize maintaining aspect ratio
            $resizedImage->scale(width: $dimension);

            // Convert to WebP
            $resizedEncoded = $resizedImage->toWebp(85);
            Storage::disk('public')->put($resizedPath, (string) $resizedEncoded);
        }

        // Store only the original path in database
        // Other sizes can be derived by replacing 'original' with size name
        return ProductMedia::create([
            'product_id' => $product->id,
            'url' => $originalPath,
            'type' => 'image',
            'alt_text' => $file->getClientOriginalName(),
            'sort_order' => $sortOrder,
            'is_primary' => $isPrimary,
        ]);
    }

    /**
     * Delete all images for a product
     */
    public function deleteProductImages(int $productId): void
    {
        $product = Product::findOrFail($productId);

        foreach ($product->media as $media) {
            $this->deleteImageFile($media);
        }

        $product->media()->delete();
    }

    /**
     * Delete a single image
     */
    public function deleteImage(ProductMedia $media): void
    {
        $this->deleteImageFile($media);
        $media->delete();
    }

    /**
     * Delete image file and all its variants from storage
     */
    protected function deleteImageFile(ProductMedia $media): void
    {
        // Delete original
        if (Storage::disk('public')->exists($media->url)) {
            Storage::disk('public')->delete($media->url);
        }

        // Delete all size variants
        foreach (array_keys($this->sizes) as $sizeName) {
            $variantPath = str_replace('/original/', "/{$sizeName}/", $media->url);
            if (Storage::disk('public')->exists($variantPath)) {
                Storage::disk('public')->delete($variantPath);
            }
        }
    }

    /**
     * Set an image as primary
     */
    public function setImageAsPrimary(int $productId, int $mediaId): void
    {
        $product = Product::findOrFail($productId);

        // Remove primary flag from all images
        $product->media()->update(['is_primary' => false]);

        // Set the specified image as primary
        ProductMedia::where('id', $mediaId)
            ->where('product_id', $productId)
            ->update(['is_primary' => true]);
    }

    /**
     * Update sort order for images
     *
     * @param  array  $orderedIds  Array of media IDs in desired order
     */
    public function reorderImages(int $productId, array $orderedIds): void
    {
        foreach ($orderedIds as $index => $mediaId) {
            ProductMedia::where('id', $mediaId)
                ->where('product_id', $productId)
                ->update(['sort_order' => $index]);
        }
    }

    /**
     * Get image URL for specific size
     *
     * @param  string  $size  (thumbnail|small|medium|large|original)
     */
    public function getImageUrl(string $originalUrl, string $size = 'original'): string
    {
        if ($size === 'original' || ! isset($this->sizes[$size])) {
            return Storage::url($originalUrl);
        }

        $variantPath = str_replace('/original/', "/{$size}/", $originalUrl);

        return Storage::url($variantPath);
    }
}
