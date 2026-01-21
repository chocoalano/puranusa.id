<?php

namespace App\Http\Controllers\Ecommerce;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Manage\Customer;
use App\Models\Product;
use App\Models\ProductReview;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BerandaController extends Controller
{
    public function index(Request $request): Response
    {
        if ($request->filled('ref')) {
            $customer = Customer::where('username', $request->ref)->first();

            if ($customer) {
                session(['referral' => $customer->ref_code]);
            }
        }
        $seoData = $this->getSeoMetaData();
        $banners = $this->getBanners();
        $categories = $this->getFeaturedCategories();
        $featuredProducts = $this->getFeaturedProducts();
        $testimonials = $this->getTestimonials();
        $statistics = $this->getStatistics();
        $structuredData = $this->buildStructuredData($seoData, $featuredProducts);

        return Inertia::render('ecommerce/Beranda', [
            'banners' => $banners,
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'flashSaleProducts' => [],
            'testimonials' => $testimonials,
            'statistics' => $statistics,
            'seo' => [
                'title' => $seoData['title'],
                'description' => $seoData['description'],
                'keywords' => $seoData['keywords'],
                'image' => $seoData['image'],
                'canonical' => $seoData['canonical'],
                'og' => [
                    'type' => 'website',
                    'title' => $seoData['title'],
                    'description' => $seoData['description'],
                    'image' => $seoData['image'],
                    'url' => $seoData['canonical'],
                    'site_name' => 'Puranusa',
                    'locale' => 'id_ID',
                ],
                'twitter' => [
                    'card' => 'summary_large_image',
                    'title' => $seoData['title'],
                    'description' => $seoData['description'],
                    'image' => $seoData['image'],
                    'site' => '@puranusa',
                ],
                'structuredData' => $structuredData,
            ],
        ]);
    }

    /**
     * Get SEO meta data.
     *
     * @return array<string, string>
     */
    protected function getSeoMetaData(): array
    {
        return [
            'title' => 'Puranusa - Toko Online Terpercaya dengan Produk Berkualitas | Belanja Fashion, Elektronik & Lebih',
            'description' => 'Belanja online di Puranusa, toko terpercaya dengan 10,000+ produk berkualitas. Fashion pria & wanita, elektronik, rumah tangga, olahraga dengan harga terbaik. Gratis ongkir & pengiriman 24 jam!',
            'keywords' => 'toko online, belanja online, fashion pria, fashion wanita, elektronik, smartphone, tas, sepatu, jam tangan, headphone, belanja murah, promo diskon',
            'image' => url('/favicon.ico'),
            'canonical' => url('/beranda'),
        ];
    }

    /**
     * Get homepage banners from promotions.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getBanners(): array
    {
        $banners = Promotion::where('is_active', true)
            ->where('show_on', 'homepage')
            ->where('start_at', '<=', now())
            ->where(function ($query) {
                $query->whereNull('end_at')
                    ->orWhere('end_at', '>=', now());
            })
            ->orderBy('priority', 'desc')
            ->take(5)
            ->get()
            ->map(function ($promo) {
                return [
                    'id' => $promo->id,
                    'title' => $promo->name,
                    'subtitle' => $promo->description,
                    'image' => $promo->image ? Storage::url($promo->image) : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
                    'cta_text' => 'Belanja Sekarang',
                    'cta_link' => $promo->landing_slug ? "/promo/{$promo->landing_slug}" : '/produk',
                ];
            })
            ->toArray();

        if (empty($banners)) {
            return [
                [
                    'id' => 1,
                    'title' => 'Koleksi Terbaru 2025',
                    'subtitle' => 'Dapatkan diskon hingga 50% untuk produk pilihan',
                    'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
                    'cta_text' => 'Belanja Sekarang',
                    'cta_link' => '/toko',
                ],
            ];
        }

        return $banners;
    }

    /**
     * Get featured categories.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getFeaturedCategories(): array
    {
        return Category::where('is_active', true)
            ->whereNull('parent_id')
            ->withCount('products')
            ->orderBy('sort_order')
            ->take(6)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'icon' => '📦',
                    'image' => Storage::url($category->image) ?? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
                    'product_count' => $category->products_count,
                ];
            })
            ->toArray();
    }

    /**
     * Get featured products with reviews.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getFeaturedProducts(): array
    {
        return Product::with(['media' => function ($query) {
            $query->where('is_primary', true)->orWhere('sort_order', 0);
        }])
            ->where('is_active', true)
            ->where('stock', '>', 0)
            ->withAvg('reviews as rating', 'rating')
            ->withCount('reviews as review_count')
            ->orderBy('created_at', 'desc')
            ->take(8)
            ->get()
            ->map(function ($product) {
                $primaryMedia = $product->media->first();

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'description' => $product->short_desc,
                    'price' => (float) $product->base_price,
                    'original_price' => null,
                    'discount_percentage' => 0,
                    'image' => Storage::url($primaryMedia?->url) ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                    'rating' => round((float) $product->rating, 1) ?: 0,
                    'review_count' => $product->review_count ?: 0,
                    'stock' => $product->stock,
                    'is_new' => $product->created_at->isAfter(now()->subDays(30)),
                    'badge' => $product->stock < 10 ? 'Limited' : null,
                ];
            })
            ->toArray();
    }

    /**
     * Get customer testimonials.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getTestimonials(): array
    {
        return ProductReview::with(['customer', 'product'])
            ->where('is_approved', true)
            ->where('rating', '>=', 4)
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get()
            ->map(function ($review) {
                return [
                    'id' => $review->id,
                    'name' => $review->customer?->name ?? 'Customer',
                    'avatar' => 'https://ui-avatars.com/api/?name='.urlencode($review->customer?->name ?? 'Customer'),
                    'rating' => $review->rating,
                    'comment' => $review->comment,
                    'product' => $review->product?->name ?? '',
                    'date' => $review->created_at->diffForHumans(),
                ];
            })
            ->toArray();
    }

    /**
     * Get statistics data.
     *
     * @return array<int, array<string, string>>
     */
    protected function getStatistics(): array
    {
        $totalProducts = Product::where('is_active', true)->count();
        $totalCustomers = DB::table('customers')->count();
        $averageRating = ProductReview::where('is_approved', true)->avg('rating');

        return [
            [
                'label' => 'Produk Tersedia',
                'value' => number_format($totalProducts).'+',
                'icon' => 'package',
            ],
            [
                'label' => 'Pelanggan Puas',
                'value' => number_format($totalCustomers).'+',
                'icon' => 'users',
            ],
            [
                'label' => 'Rating Toko',
                'value' => round($averageRating, 1).'/5',
                'icon' => 'star',
            ],
            [
                'label' => 'Pengiriman Cepat',
                'value' => '24 Jam',
                'icon' => 'truck',
            ],
        ];
    }

    /**
     * Build structured data for SEO.
     *
     * @param  array<string, string>  $seoData
     * @param  array<int, array<string, mixed>>  $featuredProducts
     * @return array<string, mixed>
     */
    protected function buildStructuredData(array $seoData, array $featuredProducts): array
    {
        return [
            '@context' => 'https://schema.org',
            '@graph' => [
                $this->getOrganizationSchema(),
                $this->getWebSiteSchema(),
                $this->getWebPageSchema($seoData),
                $this->getProductListSchema($featuredProducts),
            ],
        ];
    }

    /**
     * Get organization schema.
     *
     * @return array<string, mixed>
     */
    protected function getOrganizationSchema(): array
    {
        return [
            '@type' => 'Organization',
            'name' => 'Puranusa',
            'url' => url('/'),
            'logo' => url('/favicon.ico'),
            'description' => 'Toko online terpercaya dengan 10,000+ produk berkualitas',
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => '+62-812-3456-7890',
                'contactType' => 'Customer Service',
                'areaServed' => 'ID',
                'availableLanguage' => 'Indonesian',
            ],
            'sameAs' => [
                'https://facebook.com/puranusa',
                'https://twitter.com/puranusa',
                'https://instagram.com/puranusa',
                'https://youtube.com/puranusa',
            ],
        ];
    }

    /**
     * Get website schema.
     *
     * @return array<string, mixed>
     */
    protected function getWebSiteSchema(): array
    {
        return [
            '@type' => 'WebSite',
            'name' => 'Puranusa',
            'url' => url('/'),
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => url('/produk?q={search_term_string}'),
                'query-input' => 'required name=search_term_string',
            ],
        ];
    }

    /**
     * Get webpage schema.
     *
     * @param  array<string, string>  $seoData
     * @return array<string, mixed>
     */
    protected function getWebPageSchema(array $seoData): array
    {
        return [
            '@type' => 'WebPage',
            'name' => $seoData['title'],
            'description' => $seoData['description'],
            'url' => $seoData['canonical'],
            'inLanguage' => 'id-ID',
            'isPartOf' => [
                '@type' => 'WebSite',
                'url' => url('/'),
            ],
        ];
    }

    /**
     * Get product list schema.
     *
     * @param  array<int, array<string, mixed>>  $featuredProducts
     * @return array<string, mixed>
     */
    protected function getProductListSchema(array $featuredProducts): array
    {
        return [
            '@type' => 'ItemList',
            'name' => 'Produk Pilihan',
            'itemListElement' => collect($featuredProducts)->take(8)->map(function ($product, $index) {
                return [
                    '@type' => 'ListItem',
                    'position' => $index + 1,
                    'item' => [
                        '@type' => 'Product',
                        'name' => $product['name'],
                        'description' => $product['description'] ?? '',
                        'image' => $product['image'],
                        'url' => url('/produk/'.$product['slug']),
                        'offers' => [
                            '@type' => 'Offer',
                            'price' => $product['price'],
                            'priceCurrency' => 'IDR',
                            'availability' => $product['stock'] > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
                            'url' => url('/produk/'.$product['slug']),
                        ],
                        'aggregateRating' => isset($product['rating']) && $product['rating'] > 0 ? [
                            '@type' => 'AggregateRating',
                            'ratingValue' => $product['rating'],
                            'reviewCount' => $product['review_count'] ?? 0,
                            'bestRating' => 5,
                            'worstRating' => 1,
                        ] : null,
                    ],
                ];
            })->toArray(),
        ];
    }
}
