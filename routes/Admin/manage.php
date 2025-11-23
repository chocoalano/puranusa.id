<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\DocumentationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('manage/users', UserController::class);

    // Customer Management Routes
    Route::resource('manage/customers', CustomerController::class);

    // Additional Customer Routes
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

    // Documentation Route
    Route::get('documentation', [DocumentationController::class, 'index'])->name('documentation');
});
