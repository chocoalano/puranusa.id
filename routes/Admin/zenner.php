<?php

use App\Http\Controllers\Admin\Zenner\WelcomeVideoController;
use App\Http\Controllers\Admin\Zenner\JoinMedsosController;
use App\Http\Controllers\Admin\Zenner\MarketingKitController;
use App\Http\Controllers\Admin\Zenner\CopywritingController;
use App\Http\Controllers\Admin\Zenner\GalleryController;
use App\Http\Controllers\Admin\Zenner\ProcureProductController;
use App\Http\Controllers\Admin\Zenner\TestimonialController;
use App\Http\Controllers\Admin\Zenner\CourseController;
use App\Http\Controllers\Admin\Zenner\LessonController;
use App\Http\Controllers\Admin\Zenner\IncentiveRuleController;
use App\Http\Controllers\Admin\Zenner\ProductKnowledgeController;
use App\Http\Controllers\Admin\Zenner\SellingGuideController;
use App\Http\Controllers\Admin\Zenner\AdsGuideController;
use App\Http\Controllers\Admin\Zenner\WebinarController;
use App\Http\Controllers\Admin\Zenner\LeaderboardConfigController;
use App\Http\Controllers\Admin\Zenner\LeaderboardEntryController;
use App\Http\Controllers\Admin\Zenner\CertificateController;
use App\Http\Controllers\Admin\Zenner\MonthlyChallengeController;
use App\Http\Controllers\Admin\Zenner\TopAffiliateController;
use App\Http\Controllers\Admin\Zenner\HallOfFameController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('admin/zenner')->name('admin.zenner.')->group(function () {
    // Welcome Video
    Route::resource('welcome-videos', WelcomeVideoController::class)->except(['show']);

    // Join Medsos
    Route::resource('join-medsos', JoinMedsosController::class)->except(['show']);

    // Marketing Kit
    Route::resource('marketing-kits', MarketingKitController::class)->except(['show']);

    // Copywriting
    Route::resource('copywritings', CopywritingController::class)->except(['show']);

    // Gallery (Foto & Video)
    Route::resource('galleries', GalleryController::class)->except(['show']);

    // Procure Produk & Insentif
    Route::resource('procure-products', ProcureProductController::class)->except(['show']);

    // Testimoni Produk
    Route::resource('testimonials', TestimonialController::class)->except(['show']);

    // Zenner Academy - Courses
    Route::resource('courses', CourseController::class);

    // Zenner Academy - Lessons
    Route::resource('lessons', LessonController::class)->except(['show']);

    // Skema Insentif (Rules)
    Route::resource('incentive-rules', IncentiveRuleController::class)->except(['show']);

    // Produk Knowledge
    Route::resource('product-knowledges', ProductKnowledgeController::class)->except(['show']);

    // Cara Jualan (Organik)
    Route::resource('selling-guides', SellingGuideController::class)->except(['show']);

    // Cara Iklan (Ads)
    Route::resource('ads-guides', AdsGuideController::class)->except(['show']);

    // Webinar & Online Training
    Route::resource('webinars', WebinarController::class)->except(['show']);

    // Leaderboard Config
    Route::resource('leaderboard-configs', LeaderboardConfigController::class);

    // Leaderboard Entries (read-only)
    Route::get('leaderboard-entries', [LeaderboardEntryController::class, 'index'])->name('leaderboard-entries.index');
    Route::get('leaderboard-entries/{leaderboard_entry}', [LeaderboardEntryController::class, 'show'])->name('leaderboard-entries.show');

    // Sertifikat Program
    Route::resource('certificates', CertificateController::class)->except(['show']);

    // Monthly Challenge
    Route::resource('monthly-challenges', MonthlyChallengeController::class)->except(['show']);

    // Top Affiliate (read-only)
    Route::get('top-affiliates', [TopAffiliateController::class, 'index'])->name('top-affiliates.index');

    // Hall of Fame
    Route::resource('hall-of-fames', HallOfFameController::class)->except(['show']);
});
