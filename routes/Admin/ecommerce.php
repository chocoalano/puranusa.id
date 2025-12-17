<?php

use App\Http\Controllers\Admin\AddressManagementController;
use App\Http\Controllers\Admin\ArticleController;
use App\Http\Controllers\Admin\CategoryManagementController;
use App\Http\Controllers\Admin\CourierManagementController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\NetworkBinaryController;
use App\Http\Controllers\Admin\NetworkMatrixController;
use App\Http\Controllers\Admin\PaymentMethodManagementController;
use App\Http\Controllers\Admin\ProductManagementController;
use App\Http\Controllers\Admin\PromotionManagementController;
use App\Http\Controllers\Admin\ReturnRefundController;
use App\Http\Controllers\Admin\ReviewManagementController;
use App\Http\Controllers\Admin\RewardController;
use App\Http\Controllers\Admin\ShipmentManagementController;
use App\Http\Controllers\Admin\TopupManagementController;
use App\Http\Controllers\Admin\WithdrawalManagementController;
use App\Http\Controllers\Ecommerce\Auth\CartController;
use App\Http\Controllers\Ecommerce\Auth\OrderController;
use App\Http\Controllers\Ecommerce\Auth\WalletController;
use App\Http\Controllers\Ecommerce\Auth\WishlistController;
use App\Http\Controllers\Ecommerce\NewsletterController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Products Management
    Route::resource('products', ProductManagementController::class);
    Route::delete('products/{media}/image', [ProductManagementController::class, 'deleteImage'])->name('products.image.delete');
    Route::post('products/{product}/image/primary', [ProductManagementController::class, 'setPrimaryImage'])->name('products.image.primary');
    Route::post('products/{product}/images/reorder', [ProductManagementController::class, 'reorderImages'])->name('products.images.reorder');

    // Categories Management
    Route::resource('categories', CategoryManagementController::class);

    // Articles Management
    Route::resource('articles', ArticleController::class)->except(['show']);

    // Image Upload for PageBuilder
    Route::post('upload-image', [ImageUploadController::class, 'upload'])->name('upload-image');

    // Cart Management (View Only)
    Route::get('carts', [CartController::class, 'adminIndex'])->name('carts.index');
    Route::delete('carts/{cart}', [CartController::class, 'adminDestroy'])->name('carts.destroy');

    // Wishlist Management (View Only)
    Route::get('wishlists', [WishlistController::class, 'adminIndex'])->name('wishlists.index');
    Route::delete('wishlists/{wishlist}', [WishlistController::class, 'adminDestroy'])->name('wishlists.destroy');

    // Reviews Management
    Route::get('reviews', [ReviewManagementController::class, 'index'])->name('reviews.index');
    Route::post('reviews/{review}/approve', [ReviewManagementController::class, 'approve'])->name('reviews.approve');
    Route::post('reviews/{review}/reject', [ReviewManagementController::class, 'reject'])->name('reviews.reject');
    Route::delete('reviews/{review}', [ReviewManagementController::class, 'destroy'])->name('reviews.destroy');

    // Promotions Management
    Route::resource('promotions', PromotionManagementController::class);

    // Orders Management
    Route::get('orders', [OrderController::class, 'adminIndex'])->name('orders.index');
    Route::get('orders/pending', [OrderController::class, 'adminPending'])->name('orders.pending');
    Route::get('orders/paid', [OrderController::class, 'adminPaid'])->name('orders.paid');
    Route::get('orders/completed', [OrderController::class, 'adminCompleted'])->name('orders.completed');
    Route::get('orders/{order}', [OrderController::class, 'adminShow'])->name('orders.show');
    Route::post('orders/{order}/cancel', [OrderController::class, 'adminCancel'])->name('orders.cancel');
    Route::post('orders/{order}/setup-shipment', [OrderController::class, 'adminSetupShipment'])->name('orders.setup-shipment');
    Route::post('orders/{order}/ship', [OrderController::class, 'adminShipOrder'])->name('orders.ship');
    Route::post('orders/{order}/deliver', [OrderController::class, 'adminDeliverOrder'])->name('orders.deliver');

    // Shipments Management
    Route::get('shipments', [ShipmentManagementController::class, 'index'])->name('shipments.index');
    Route::put('shipments/{shipment}', [ShipmentManagementController::class, 'update'])->name('shipments.update');

    // Returns & Refunds Management
    Route::get('returns', [ReturnRefundController::class, 'indexReturns'])->name('returns.index');
    Route::post('returns/{return}/approve', [ReturnRefundController::class, 'approveReturn'])->name('returns.approve');
    Route::post('returns/{return}/reject', [ReturnRefundController::class, 'rejectReturn'])->name('returns.reject');
    Route::get('refunds', [ReturnRefundController::class, 'indexRefunds'])->name('refunds.index');
    Route::post('refunds/{refund}/process', [ReturnRefundController::class, 'processRefund'])->name('refunds.process');

    // E-Wallet Management
    Route::get('wallets', [WalletController::class, 'adminIndex'])->name('wallets.index');
    Route::get('wallet-transactions', [WalletController::class, 'adminTransactions'])->name('wallets.transactions');

    // Topup Management
    Route::get('topups', [TopupManagementController::class, 'index'])->name('topups.index');
    Route::post('topups/{topup}/approve', [TopupManagementController::class, 'approve'])->name('topups.approve');
    Route::post('topups/{topup}/reject', [TopupManagementController::class, 'reject'])->name('topups.reject');

    // Withdrawal Management
    Route::get('withdrawals', [WithdrawalManagementController::class, 'index'])->name('withdrawals.index');
    Route::post('withdrawals/{withdrawal}/approve', [WithdrawalManagementController::class, 'approve'])->name('withdrawals.approve');
    Route::post('withdrawals/{withdrawal}/reject', [WithdrawalManagementController::class, 'reject'])->name('withdrawals.reject');

    // Network Management
    Route::prefix('networks')->name('networks.')->group(function () {
        // Binary Network
        Route::get('binary', [NetworkBinaryController::class, 'index'])->name('binary.index');
        // Route::get('binary/tree', [NetworkBinaryController::class, 'tree'])->name('binary.tree');

        // Matrix Network
        Route::get('matrix', [NetworkMatrixController::class, 'index'])->name('matrix.index');
        // Route::get('matrix/tree', [NetworkMatrixController::class, 'tree'])->name('matrix.tree');
    });

    // Settings
    Route::prefix('settings')->name('settings.')->group(function () {
        // Address Management
        Route::get('addresses', [AddressManagementController::class, 'index'])->name('addresses.index');
        Route::delete('addresses/{address}', [AddressManagementController::class, 'destroy'])->name('addresses.destroy');

        // Payment Methods
        Route::get('payment-methods', [PaymentMethodManagementController::class, 'index'])->name('payment-methods.index');
        Route::put('payment-methods/{paymentMethod}', [PaymentMethodManagementController::class, 'update'])->name('payment-methods.update');

        // Couriers
        Route::get('couriers', [CourierManagementController::class, 'index'])->name('couriers.index');

        // Newsletter
        Route::get('newsletters', [NewsletterController::class, 'adminIndex'])->name('newsletters.index');
        Route::delete('newsletters/{subscriber}', [NewsletterController::class, 'adminDestroy'])->name('newsletters.destroy');

        // Promotions Rewards (type = 0 - periode)
        Route::prefix('promotions-rewards')->name('promotions-rewards.')->group(function () {
            Route::get('/', [RewardController::class, 'promotions'])->name('index');
            Route::get('/create', [RewardController::class, 'createPromotion'])->name('create');
            Route::post('/', [RewardController::class, 'storePromotion'])->name('store');
            Route::get('/{reward}/edit', [RewardController::class, 'editPromotion'])->name('edit');
            Route::put('/{reward}', [RewardController::class, 'updatePromotion'])->name('update');
            Route::delete('/{reward}', [RewardController::class, 'destroyPromotion'])->name('destroy');
        });

        // Lifetime Cash Rewards (type = 1 - permanen)
        Route::prefix('lifetime-cash-rewards')->name('lifetime-cash-rewards.')->group(function () {
            Route::get('/', [RewardController::class, 'lifetime'])->name('index');
            Route::get('/create', [RewardController::class, 'createLifetime'])->name('create');
            Route::post('/', [RewardController::class, 'storeLifetime'])->name('store');
            Route::get('/{reward}/edit', [RewardController::class, 'editLifetime'])->name('edit');
            Route::put('/{reward}', [RewardController::class, 'updateLifetime'])->name('update');
            Route::delete('/{reward}', [RewardController::class, 'destroyLifetime'])->name('destroy');
        });
    });
});
