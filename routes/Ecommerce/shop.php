<?php

use App\Http\Controllers\Api\ShippingController;
use App\Http\Controllers\Ecommerce\ArticleController;
use App\Http\Controllers\Ecommerce\Auth\CartController;
use App\Http\Controllers\Ecommerce\Auth\LogRegController;
use App\Http\Controllers\Ecommerce\Auth\OrderController;
use App\Http\Controllers\Ecommerce\Auth\ProfileController;
use App\Http\Controllers\Ecommerce\Auth\WalletController;
use App\Http\Controllers\Ecommerce\Auth\WishlistController;
use App\Http\Controllers\Ecommerce\BerandaController;
use App\Http\Controllers\Ecommerce\CheckoutController;
use App\Http\Controllers\Ecommerce\NewsletterController;
use App\Http\Controllers\Ecommerce\PageController;
use App\Http\Controllers\Ecommerce\ProdukController;
use App\Http\Controllers\Ecommerce\TokoController;

Route::get('/beranda', [BerandaController::class, 'index'])->name('ecommerce.beranda');
Route::get('/toko', [TokoController::class, 'index'])->name('ecommerce.toko');
Route::get('/produk/{slug}', [ProdukController::class, 'show'])->name('ecommerce.produk');

// Article Routes
Route::get('/artikel', [ArticleController::class, 'index'])->name('ecommerce.artikel.index');
Route::get('/artikel/{slug}', [ArticleController::class, 'show'])->name('ecommerce.artikel.show');

// Static Page Routes
Route::get('/page/{slug}', [PageController::class, 'show'])->name('ecommerce.page');

// Client Authentication Routes (Guest only)
Route::middleware(['client.guest'])->group(function () {
    Route::get('/client/login', [LogRegController::class, 'showLogin'])->name('client.login');
    // Route::post('/client/login', [LogRegController::class, 'login'])->name('client.login.store');
    Route::get('/client/register', [LogRegController::class, 'showRegister'])->name('client.register');
    // Route::post('/client/register', [LogRegController::class, 'register'])->name('client.register.store');

    // Password Reset Routes
    Route::get('/client/forgot-password', [LogRegController::class, 'showForgotPassword'])->name('client.password.request');
    Route::post('/client/forgot-password', [LogRegController::class, 'forgotPassword'])->name('client.password.email');
    Route::get('/client/reset-password/{token}', [LogRegController::class, 'showResetPassword'])->name('client.password.reset');
    Route::post('/client/reset-password', [LogRegController::class, 'resetPassword'])->name('client.password.update');
});

// Client Logout Route (Authenticated only)
Route::middleware(['client.auth'])->group(function () {
    Route::post('/client/logout', [LogRegController::class, 'logout'])->name('client.logout');

    // Profile Routes
    Route::get('/client/profile', [ProfileController::class, 'index'])->name('client.profile');
    Route::patch('/client/profile', [ProfileController::class, 'update'])->name('client.profile.update');
    Route::patch('/client/profile/password', [ProfileController::class, 'updatePassword'])->name('client.profile.password');
    Route::delete('/client/profile', [ProfileController::class, 'destroy'])->name('client.profile.destroy');
    Route::post('/client/profile/place-member', [ProfileController::class, 'placeMember'])->name('client.profile.place-member');
    Route::get('/client/profile/member-tree/{memberId}', [ProfileController::class, 'getMemberTree'])->name('client.profile.member-tree');
    Route::get('/client/profile/search-member', [ProfileController::class, 'searchMemberInTree'])->name('client.profile.search-member');
    Route::post('/client/profile/claim-lifetime-reward', [ProfileController::class, 'claimLifetimeReward'])->name('client.profile.claim-lifetime-reward');

    // Address Management Routes
    Route::post('/client/profile/addresses', [ProfileController::class, 'storeAddress'])->name('client.profile.addresses.store');
    Route::put('/client/profile/addresses/{address}', [ProfileController::class, 'updateAddress'])->name('client.profile.addresses.update');
    Route::delete('/client/profile/addresses/{address}', [ProfileController::class, 'deleteAddress'])->name('client.profile.addresses.delete');
    Route::post('/client/profile/addresses/{address}/set-default', [ProfileController::class, 'setDefaultAddress'])->name('client.profile.addresses.set-default');

    // Wallet Routes
    Route::post('/client/wallet/topup', [WalletController::class, 'topup'])->name('client.wallet.topup');
    Route::post('/client/wallet/check-status', [WalletController::class, 'checkStatus'])->name('client.wallet.check-status');
    Route::post('/client/wallet/withdrawal', [WalletController::class, 'withdrawal'])->name('client.wallet.withdrawal');
    Route::get('/client/wallet/history', [WalletController::class, 'history'])->name('client.wallet.history');
});

// Midtrans Callback (Public - called by Midtrans server)
Route::post('/client/wallet/midtrans/notification', [WalletController::class, 'callback'])->name('client.wallet.notification');
Route::get('/client/wallet/midtrans/finish', [WalletController::class, 'callback'])->name('client.wallet.callback');

// Newsletter subscription
Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe'])->name('newsletter.subscribe');

// Cart routes (require authentication)
Route::middleware(['client.auth'])->group(function () {
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/cart/update', [CartController::class, 'update'])->name('cart.update');
    Route::post('/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
});

// Wishlist routes (require authentication)
Route::middleware(['client.auth'])->group(function () {
    Route::post('/wishlist/add', [WishlistController::class, 'add'])->name('wishlist.add');
    Route::post('/wishlist/remove', [WishlistController::class, 'remove'])->name('wishlist.remove');
});

// Shipping API routes (for RajaOngkir integration)
Route::prefix('api/shipping')->name('api.shipping.')->group(function () {
    Route::get('/provinces', [ShippingController::class, 'provinces'])->name('provinces');
    Route::get('/cities', [ShippingController::class, 'cities'])->name('cities');
    Route::post('/calculate', [ShippingController::class, 'calculateCost'])->name('calculate');
});

// Order API routes (require authentication)
Route::middleware(['client.auth'])->prefix('api/client/orders')->name('api.client.orders.')->group(function () {
    Route::get('/{order}', [OrderController::class, 'show'])->name('show');
    Route::post('/{order}/pay', [OrderController::class, 'pay'])->name('pay');
    Route::post('/{order}/pay-wallet', [OrderController::class, 'payWithWallet'])->name('pay-wallet');
    Route::post('/{order}/complete', [OrderController::class, 'complete'])->name('complete');
    Route::post('/{order}/check-payment-status', [OrderController::class, 'checkPaymentStatus'])->name('check-payment-status');
    Route::post('/{order}/reviews', [OrderController::class, 'submitReview'])->name('reviews.submit');
});

// Checkout routes (require authentication)
Route::middleware(['client.auth'])->group(function () {
    Route::post('/checkout/process', [CheckoutController::class, 'process'])->name('checkout.process');
    Route::get('/checkout/finish', [CheckoutController::class, 'finish'])->name('checkout.finish');
});

// Midtrans Checkout Callback (Public - called by Midtrans server)
Route::post('/checkout/midtrans/notification', [CheckoutController::class, 'callback'])->name('checkout.notification');
