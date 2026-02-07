<?php

use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\CustomerLifetimeRewardController;
use App\Http\Controllers\Admin\CustomerPromotionsRewardController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MemberPackageController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StockistController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ZennerClubController;
use App\Http\Controllers\DocumentationController;

// Impersonating routes - accessible without full auth middleware (protected by session)
Route::post('manage/customers/{customer}/login-as', [CustomerController::class, 'loginAsCustomer'])
    ->middleware('auth')
    ->name('manage.customers.login-as');
Route::post('manage/customers/stop-impersonating', [CustomerController::class, 'stopImpersonating'])
    ->name('manage.customers.stop-impersonating');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('manage/users', UserController::class);

    // Additional Customer Routes (MUST be before resource to avoid conflicts)
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

    // Customer Promotions Rewards Progress
    Route::get('manage/customers/{customer}/promotions-rewards', [CustomerPromotionsRewardController::class, 'index'])
        ->name('manage.customers.promotions-rewards');

    // Customer Lifetime Cash Rewards
    Route::get('manage/customers/{customer}/lifetime-rewards', [CustomerLifetimeRewardController::class, 'index'])
        ->name('manage.customers.lifetime-rewards');
    Route::post('manage/customers/{customer}/lifetime-rewards/{reward}/claim', [CustomerLifetimeRewardController::class, 'claim'])
        ->name('manage.customers.lifetime-rewards.claim');

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

    Route::prefix('admin/report')
        ->name('admin.report.')
        ->group(function () {
            Route::get('/analytic', [ReportController::class, 'analytic'])->name('analytic');
            Route::post('/analytic', [ReportController::class, 'analytic_export'])->name('analytic.export');
            Route::get('/tax-daily', [ReportController::class, 'tax_daily_report'])->name('tax_daily_report');
            Route::get('/tax-daily/export', [ReportController::class, 'tax_daily_report_export'])->name('tax_daily_report.export');
            Route::get('/tax-summary', [ReportController::class, 'tax_summary_report'])->name('tax_summary_report');
            Route::get('/tax-summary/export', [ReportController::class, 'tax_summary_report_export'])->name('tax_summary_report.export');
        });

    Route::prefix('admin/zenner-club')->group(function () {
        // Contents
        Route::get('contents', [ZennerClubController::class, 'index']);
        Route::get('contents/create', [ZennerClubController::class, 'create']);
        Route::post('contents', [ZennerClubController::class, 'store']);
        Route::get('contents/{id}', [ZennerClubController::class, 'show']);
        Route::get('contents/{id}/edit', [ZennerClubController::class, 'edit']);
        Route::put('contents/{id}', [ZennerClubController::class, 'update']);
        Route::delete('contents/{id}', [ZennerClubController::class, 'destroy']);

        // Categories
        Route::get('categories', [ZennerClubController::class, 'categoriesIndex']);
        Route::get('categories/create', [ZennerClubController::class, 'categoriesCreate']);
        Route::post('categories', [ZennerClubController::class, 'categoriesStore']);
        Route::get('categories/{id}', [ZennerClubController::class, 'categoriesShow']);
        Route::get('categories/{id}/edit', [ZennerClubController::class, 'categoriesEdit']);
        Route::put('categories/{id}', [ZennerClubController::class, 'categoriesUpdate']);
        Route::delete('categories/{id}', [ZennerClubController::class, 'categoriesDestroy']);
    });

    Route::get('admin/zenner/welcome-videos', [ZennerClubController::class, 'categoryView'])
        ->name('admin.zenner.welcome-videos');

});
