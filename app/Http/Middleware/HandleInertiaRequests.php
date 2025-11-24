<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Page;
use App\Models\Setting;
use App\Models\Wishlist;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $customerId = $request->user('client')?->id;
        $cartData = $this->getCartData($customerId);
        $wishlistData = $this->getWishlistData($customerId);
        $categories = $this->getCategories();
        $pages = $this->getPages();
        $footerMenus = $this->buildFooterMenus($categories, $pages);
        $settings = Setting::getAllSettings();
        $socialLinks = $this->buildSocialLinks($settings);

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'settings' => $settings,
            'auth' => [
                'user' => $this->getAuthUser($request),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'ecommerce' => [
                'cart' => $cartData,
                'wishlist' => $wishlistData,
                'categories' => $categories,
                'footerMenus' => $footerMenus,
                'socialLinks' => $socialLinks,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'impersonating' => $request->session()->get('impersonating'),
        ];
    }

    /**
     * Get cart data for authenticated customer.
     *
     * @return array<string, mixed>|null
     */
    protected function getCartData(?int $customerId): ?array
    {
        if (! $customerId) {
            return null;
        }

        $cart = Cart::with(['items.product.media' => function ($query) {
            $query->where('is_primary', true)->orWhere('sort_order', 0);
        }])
            ->where('customer_id', $customerId)
            ->first();

        if (! $cart || $cart->items->isEmpty()) {
            return null;
        }

        return [
            'items' => $cart->items->map(function ($item) {
                $primaryMedia = $item->product->media->first();

                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'name' => $item->product->name,
                    'slug' => $item->product->slug,
                    'image' => Storage::url($primaryMedia?->url) ?? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
                    'price' => (float) $item->unit_price,
                    'quantity' => $item->qty,
                    'weight' => (float) ($item->product->weight ?? 500),
                ];
            })->toArray(),
            'subtotal' => (float) $cart->subtotal_amount,
            'total' => (float) $cart->grand_total,
        ];
    }

    /**
     * Get wishlist data for authenticated customer.
     *
     * @return array<string, mixed>|null
     */
    protected function getWishlistData(?int $customerId): ?array
    {
        if (! $customerId) {
            return null;
        }

        $wishlist = Wishlist::with(['items.product.media' => function ($query) {
            $query->where('is_primary', true)->orWhere('sort_order', 0);
        }])
            ->where('customer_id', $customerId)
            ->first();

        if (! $wishlist || $wishlist->items->isEmpty()) {
            return null;
        }

        return [
            'items' => $wishlist->items->map(function ($item) {
                $primaryMedia = $item->product->media->first();

                return [
                    'id' => $item->id,
                    'product_id' => $item->product_id,
                    'name' => $item->product->name,
                    'slug' => $item->product->slug,
                    'image' => Storage::url($primaryMedia?->url) ?? 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&h=100&fit=crop',
                    'price' => (float) $item->product->base_price,
                ];
            })->toArray(),
        ];
    }

    /**
     * Get categories for navigation menu.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getCategories(): array
    {
        return Category::where('is_active', true)
            ->whereNull('parent_id')
            ->with(['children' => function ($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->take(4)
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'items' => $category->children->map(function ($child) {
                        return [
                            'name' => $child->name,
                            'slug' => $child->slug,
                            'href' => "/produk/{$child->slug}",
                        ];
                    })->toArray(),
                ];
            })
            ->toArray();
    }

    /**
     * Get published pages for footer.
     *
     * @return array<int, array<string, mixed>>
     */
    protected function getPages(): array
    {
        return Page::published()
            ->ordered()
            ->get(['id', 'title', 'slug', 'order'])
            ->map(function ($page) {
                return [
                    'id' => $page->id,
                    'title' => $page->title,
                    'slug' => $page->slug,
                    'href' => "/page/{$page->slug}",
                ];
            })
            ->toArray();
    }

    /**
     * Build footer menu structure.
     *
     * @param  array<int, array<string, mixed>>  $categories
     * @param  array<int, array<string, mixed>>  $pages
     * @return array<int, array<string, mixed>>
     */
    protected function buildFooterMenus(array $categories, array $pages): array
    {
        $supportPages = $this->filterPagesByKeywords($pages, ['support', 'contact', 'warranty', 'faq', 'bantuan']);
        $infoPages = $this->filterPagesByKeywords($pages, ['privacy', 'terms', 'legal', 'about', 'tentang']);

        return [
            [
                'title' => 'Belanja',
                'links' => [
                    ['name' => 'Semua Produk', 'href' => '/toko'],
                    ['name' => 'Artikel & Blog', 'href' => '/artikel'],
                    ['name' => 'Promo Spesial', 'href' => '/toko?promo=true'],
                    ['name' => 'Produk Terbaru', 'href' => '/toko?sort=newest'],
                ],
            ],
            [
                'title' => 'Produk',
                'links' => ! empty($categories) ? array_map(fn ($cat) => [
                    'name' => $cat['name'],
                    'href' => "/toko?category={$cat['slug']}",
                ], array_slice($categories, 0, 4)) : [
                    ['name' => 'Semua Kategori', 'href' => '/toko'],
                ],
            ],
            [
                'title' => 'Dukungan',
                'links' => ! empty($supportPages) ? $supportPages : [
                    ['name' => 'Hubungi Kami', 'href' => '/page/contact'],
                    ['name' => 'FAQ', 'href' => '/page/faq'],
                ],
            ],
            [
                'title' => 'Informasi',
                'links' => ! empty($infoPages) ? $infoPages : array_map(fn ($page) => [
                    'name' => $page['title'],
                    'href' => $page['href'],
                ], array_slice($pages, 0, 4)),
            ],
        ];
    }

    /**
     * Filter pages by keywords in slug.
     *
     * @param  array<int, array<string, mixed>>  $pages
     * @param  array<int, string>  $keywords
     * @return array<int, array<string, string>>
     */
    protected function filterPagesByKeywords(array $pages, array $keywords): array
    {
        $filtered = array_filter($pages, function ($page) use ($keywords) {
            $slug = strtolower($page['slug']);
            foreach ($keywords as $keyword) {
                if (str_contains($slug, $keyword)) {
                    return true;
                }
            }

            return false;
        });

        return array_values(array_map(fn ($page) => [
            'name' => $page['title'],
            'href' => $page['href'],
        ], $filtered));
    }

    /**
     * Build social media links from settings.
     *
     * @param  array<string, mixed>  $settings
     * @return array<int, array<string, string>>
     */
    protected function buildSocialLinks(array $settings): array
    {
        $links = [];
        $platforms = [
            'facebook' => 'Facebook',
            'twitter' => 'Twitter',
            'instagram' => 'Instagram',
            'youtube' => 'YouTube',
        ];

        foreach ($platforms as $key => $name) {
            if (! empty($settings["social_{$key}"])) {
                $links[] = [
                    'name' => $name,
                    'href' => $settings["social_{$key}"],
                    'icon' => $key,
                ];
            }
        }

        return $links;
    }

    /**
     * Get authenticated user data.
     * Prioritizes client guard for ecommerce routes.
     *
     * @return array<string, mixed>|null
     */
    protected function getAuthUser(Request $request): ?array
    {
        // For admin/web routes, check web guard only
        if ($request->is('admin/*') || $request->is('login') || $request->is('settings/*')) {
            if ($request->user()) {
                return [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'avatar' => $request->user()->avatar ?? null,
                ];
            }

            return null;
        }

        // For all other routes (ecommerce/client), check client guard
        if (auth('client')->check()) {
            return [
                'id' => auth('client')->user()->id,
                'name' => auth('client')->user()->name,
                'email' => auth('client')->user()->email,
                'ewallet_saldo' => auth('client')->user()->ewallet_saldo ?? 0,
            ];
        }

        return null;
    }
}
