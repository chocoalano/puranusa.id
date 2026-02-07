<?php

use App\Http\Middleware\ClientAuthenticate;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectIfClientAuthenticated;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->validateCsrfTokens(except: [
            // ==========================================================
            // Internal / Dev Tools
            // ==========================================================
            '_boost/browser-logs',

            // ==========================================================
            // Guest & Public Callback / Webhook
            // ==========================================================
            'checkout/midtrans/notification',
            'client/wallet/midtrans/notification',
            'newsletter/subscribe',

            // ==========================================================
            // Public API (Shipping)
            // ==========================================================
            'api/shipping/calculate',

            // ==========================================================
            // Client API Orders (non-GET)
            // ==========================================================
            'api/client/orders/*/check-payment-status',
            'api/client/orders/*/complete',
            'api/client/orders/*/pay',
            'api/client/orders/*/pay-wallet',
            'api/client/orders/*/reviews',

            // ==========================================================
            // Client Actions (E-Commerce)
            // ==========================================================
            'checkout/process',

            'client/register',
            'client/login',
            'client/logout',
            'client/forgot-password',
            'client/reset-password',

            // Profile root actions (PATCH, DELETE)
            'client/profile',

            // Profile sub actions (password/place-member/search-member/etc.)
            // NOTE: ini hanya cover 1 segmen setelah "client/profile/"
            'client/profile/*',

            // Profile addresses (butuh coverage multi-segmen)
            'client/profile/addresses',
            'client/profile/addresses/*',
            'client/profile/addresses/*/set-default',

            // Wallet actions (non-GET)
            'client/wallet/check-status',
            'client/wallet/topup',
            'client/wallet/withdrawal',

            // Wishlist & Cart actions
            'wishlist/add',
            'wishlist/remove',
            'cart/add',
            'cart/update',
            'cart/remove',

            // ==========================================================
            // Bonus Module (ALL non-GET endpoints: resource + actions)
            // ==========================================================

            // Bonus Regular (resource: store/update/destroy) + release/mass-release
            'bonus/regular',
            'bonus/regular/*',
            'bonus/regular/*/release',
            'bonus/regular/mass-release',

            // Bonus Matching (resource) + release/mass-release
            'bonus/matching',
            'bonus/matching/*',
            'bonus/matching/*/release',
            'bonus/matching/mass-release',

            // Bonus Pairing (resource) + release/flush
            'bonus/pairing',
            'bonus/pairing/*',
            'bonus/pairing/*/release',
            'bonus/pairing/flush',

            // Bonus Sponsor (resource) + release/mass-release
            'bonus/sponsor',
            'bonus/sponsor/*',
            'bonus/sponsor/*/release',
            'bonus/sponsor/mass-release',

            // Bonus Cashback (resource) + release/mass-release
            'bonus/cashback',
            'bonus/cashback/*',
            'bonus/cashback/*/release',
            'bonus/cashback/mass-release',

            // Bonus Reward (resource) + release/mass-release
            'bonus/reward',
            'bonus/reward/*',
            'bonus/reward/*/release',
            'bonus/reward/mass-release',

            // Bonus Retail (resource) + release/mass-release
            'bonus/retail',
            'bonus/retail/*',
            'bonus/retail/*/release',
            'bonus/retail/mass-release',

            // Bonus Lifetime Cash Reward (resource) + release/mass-release
            'bonus/lifetime-cash-reward',
            'bonus/lifetime-cash-reward/*',
            'bonus/lifetime-cash-reward/*/release',
            'bonus/lifetime-cash-reward/mass-release',

            // ==========================================================
            // Admin Auth / Fortify (non-GET)
            // ==========================================================
            'admin/login',
            'admin/logout',
            'admin/register',
            'admin/forgot-password',
            'admin/reset-password',
            'admin/email/verification-notification',
            'admin/two-factor-challenge',

            // Confirm password
            'admin/user/confirm-password',

            // Two factor enable/disable & confirmations
            'admin/user/two-factor-authentication', // POST enable + DELETE disable
            'admin/user/confirmed-two-factor-authentication',
            'admin/user/two-factor-recovery-codes', // POST regenerate recovery codes

            // ==========================================================
            // Admin Management & Operations (ALL non-GET endpoints)
            // ==========================================================

            // Articles (resource)
            'admin/articles',
            'admin/articles/*',

            // Categories (resource)
            'admin/categories',
            'admin/categories/*',

            // Pages (resource)
            'admin/pages',
            'admin/pages/*',

            // Products (resource + image actions)
            'admin/products',
            'admin/products/*', // update/destroy (1 segment)
            'admin/products/*/image', // DELETE admin/products/{media}/image
            'admin/products/*/image/primary', // POST admin/products/{product}/image/primary
            'admin/products/*/images/reorder', // POST admin/products/{product}/images/reorder

            // Promotions (resource)
            'admin/promotions',
            'admin/promotions/*',

            // Upload image
            'admin/upload-image',

            // Carts (destroy)
            'admin/carts/*',

            // Wishlists (destroy)
            'admin/wishlists/*',

            // Reviews (approve/reject/destroy)
            'admin/reviews/*/approve',
            'admin/reviews/*/reject',
            'admin/reviews/*',

            // Orders actions
            'admin/orders/*/cancel',
            'admin/orders/*/setup-shipment',
            'admin/orders/*/ship',
            'admin/orders/*/deliver',

            // Shipments update (PUT)
            'admin/shipments/*',

            // Topups actions
            'admin/topups/*/approve',
            'admin/topups/*/reject',

            // Withdrawals actions
            'admin/withdrawals/*/approve',
            'admin/withdrawals/*/reject',

            // Returns & Refunds actions
            'admin/returns/*/approve',
            'admin/returns/*/reject',
            'admin/refunds/*/process',

            // Stockists (store/update/destroy)
            'admin/stockists',
            'admin/stockists/*',

            // ==========================================================
            // Admin Settings & Rewards (non-GET)
            // ==========================================================

            // General settings update (POST admin/settings)
            'admin/settings',

            // Addresses
            'admin/settings/addresses/*',

            // Payment methods (PUT)
            'admin/settings/payment-methods/*',

            // Newsletters (DELETE)
            'admin/settings/newsletters/*',

            // Promotions Rewards (periode)
            'admin/settings/promotions-rewards',
            'admin/settings/promotions-rewards/*',

            // Lifetime Cash Rewards (permanen)
            'admin/settings/lifetime-cash-rewards',
            'admin/settings/lifetime-cash-rewards/*',

            // ==========================================================
            // Backoffice / Manage (Admin)
            // ==========================================================

            // Manage Customers (non-GET)
            'manage/customers',
            'manage/customers/*',
            'manage/customers/placement/validate',
            'manage/customers/stop-impersonating',
            'manage/customers/*/login-as',
            'manage/customers/*/deduct',
            'manage/customers/*/lifetime-rewards/*/claim',
            'manage/customers/*/release-bonuses',
            'manage/customers/*/top-up',

            // Manage Users (non-GET)
            'manage/users',
            'manage/users/*',

            // ==========================================================
            // User Settings (non-GET)
            // ==========================================================
            'settings/password',
            'settings/profile',

            // ==========================================================
            // Zenner Club (Admin Zenner) (ALL non-GET endpoints)
            // ==========================================================

            // Welcome Video
            'admin/zenner-club/welcome-videos',
            'admin/zenner-club/contents',
            'admin/zenner-club/contents/create',
            'admin/zenner-club/contents/*',
            'admin/zenner-club/contents/*/edit',
            'admin/zenner-club/categories',
            'admin/zenner-club/categories/create',
            'admin/zenner-club/categories/*',
            'admin/zenner-club/categories/*/edit',
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'client.auth' => ClientAuthenticate::class,
            'client.guest' => RedirectIfClientAuthenticated::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
