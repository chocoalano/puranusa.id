<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MemberPackageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StockistController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DocumentationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('manage/users', UserController::class);

    // Additional Customer Routes (MUST be before resource to avoid conflicts)
    Route::post('manage/customers/{customer}/login-as', [CustomerController::class, 'loginAsCustomer'])
        ->name('manage.customers.login-as');
    Route::post('manage/customers/stop-impersonating', [CustomerController::class, 'stopImpersonating'])
        ->name('manage.customers.stop-impersonating');
    Route::post('manage/customers/{customer}/release-bonuses', [CustomerController::class, 'releaseBonuses'])
        ->name('manage.customers.release-bonuses');
    Route::post('manage/customers/{customer}/top-up', [CustomerController::class, 'topUp'])
        ->name('manage.customers.top-up');
    Route::post('manage/customers/{customer}/deduct', [CustomerController::class, 'deduct'])
        ->name('manage.customers.deduct');
    Route::get('manage/customers/placement/find-position', [CustomerController::class, 'findPosition'])
        ->name('manage.customers.find-position');
    Route::post('manage/customers/placement/validate', [CustomerController::class, 'validatePosition'])
        ->name('manage.customers.validate-position');

    // Customer Management Routes
    Route::resource('manage/customers', CustomerController::class);

    // Stockist Management Routes
    Route::get('admin/stockists/cities', [StockistController::class, 'getCities'])
        ->name('admin.stockists.cities');
    Route::resource('admin/stockists', StockistController::class)->names([
        'index' => 'admin.stockists.index',
        'create' => 'admin.stockists.create',
        'store' => 'admin.stockists.store',
        'edit' => 'admin.stockists.edit',
        'update' => 'admin.stockists.update',
        'destroy' => 'admin.stockists.destroy',
    ])->parameters([
        'stockists' => 'stockist',
    ]);

    // Pages Management Routes
    Route::resource('admin/pages', PageController::class)->names([
        'index' => 'admin.pages.index',
        'create' => 'admin.pages.create',
        'store' => 'admin.pages.store',
        'edit' => 'admin.pages.edit',
        'update' => 'admin.pages.update',
        'destroy' => 'admin.pages.destroy',
    ]);

    // Settings Management Routes
    Route::get('admin/settings', [SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('admin/settings', [SettingController::class, 'update'])->name('admin.settings.update');

    // Member Package Route
    Route::get('admin/settings/member-package', [MemberPackageController::class, 'index'])->name('admin.member-package.index');

    // Documentation Route
    Route::get('documentation', [DocumentationController::class, 'index'])->name('documentation');
});
