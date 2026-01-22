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
            // Guest & Public Callback / Webhook
            // ==========================================================
            'checkout/midtrans/notification',
            'client/wallet/midtrans/notification',
            'newsletter/subscribe',

            // ==========================================================
            // Client Actions (E-Commerce)
            // ==========================================================
            'checkout/process',
            'client/login',
            'client/logout',
            'api/client/orders/*/check-payment-status',
            'client/wallet/topup',
            'client/wallet/withdrawal',
            'client/profile',
            'client/profile/*', // includes password & place-member
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
            // Admin Management & Operations (ALL non-GET endpoints)
            // ==========================================================

            // Products (resource + image actions)
            'admin/login',
            'admin/products',
            'admin/products/*', // store/update/destroy + image delete/primary/reorder etc.
            'admin/upload-image',

            // Categories (resource)
            'admin/categories',
            'admin/categories/*',

            // Articles (resource)
            'admin/articles',
            'admin/articles/*',

            // Promotions (resource)  <-- (ini yang sering kelupaan)
            'admin/promotions',
            'admin/promotions/*',

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

            // Shipments update
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

            // ==========================================================
            // Admin Settings & Rewards
            // ==========================================================
            'admin/settings/addresses/*',
            'admin/settings/payment-methods/*',
            'admin/settings/newsletters/*',

            // Promotions Rewards (periode)
            'admin/settings/promotions-rewards',
            'admin/settings/promotions-rewards/*',

            // Lifetime Cash Rewards (permanen)
            'admin/settings/lifetime-cash-rewards',
            'admin/settings/lifetime-cash-rewards/*',

            // ==========================================================
            // Impersonation
            // ==========================================================
            'manage/customers/stop-impersonating',
            'manage/customers/*/login-as',
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
