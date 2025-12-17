<?php

use App\Http\Controllers\BonusComission\BonusCashbackController;
use App\Http\Controllers\BonusComission\BonusController;
use App\Http\Controllers\BonusComission\BonusLifetimeCashRewardController;
use App\Http\Controllers\BonusComission\BonusMatchingController;
use App\Http\Controllers\BonusComission\BonusPairingController;
use App\Http\Controllers\BonusComission\BonusRetailController;
use App\Http\Controllers\BonusComission\BonusRewardController;
use App\Http\Controllers\BonusComission\BonusSponsorController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    // Bonus Regular Routes
    Route::resource('bonus/regular', BonusController::class)
        ->parameters(['regular' => 'customerBonus'])
        ->names('bonus.regular');
    Route::post('bonus/regular/{customerBonus}/release', [BonusController::class, 'release'])
        ->name('bonus.regular.release');
    Route::post('bonus/regular/mass-release', [BonusController::class, 'massRelease'])
        ->name('bonus.regular.massRelease');

    // Bonus Matching Routes
    Route::resource('bonus/matching', BonusMatchingController::class)
        ->parameters(['matching' => 'customerBonusMatching'])
        ->names('bonus.matching');
    Route::post('bonus/matching/{customerBonusMatching}/release', [BonusMatchingController::class, 'release'])
        ->name('bonus.matching.release');
    Route::post('bonus/matching/mass-release', [BonusMatchingController::class, 'massRelease'])
        ->name('bonus.matching.massRelease');

    // Bonus Pairing Routes
    Route::resource('bonus/pairing', BonusPairingController::class)
        ->parameters(['pairing' => 'customerBonusPairing'])
        ->names('bonus.pairing');
    Route::post('bonus/pairing/{customerBonusPairing}/release', [BonusPairingController::class, 'release'])
        ->name('bonus.pairing.release');
    Route::post('bonus/pairing/flush', [BonusPairingController::class, 'flush'])
        ->name('bonus.pairing.flush');

    // Bonus Sponsor Routes
    Route::resource('bonus/sponsor', BonusSponsorController::class)
        ->parameters(['sponsor' => 'customerBonusSponsor'])
        ->names('bonus.sponsor');
    Route::post('bonus/sponsor/{customerBonusSponsor}/release', [BonusSponsorController::class, 'release'])
        ->name('bonus.sponsor.release');
    Route::post('bonus/sponsor/mass-release', [BonusSponsorController::class, 'massRelease'])
        ->name('bonus.sponsor.massRelease');

    // Bonus Cashback Routes
    Route::resource('bonus/cashback', BonusCashbackController::class)
        ->parameters(['cashback' => 'customerBonusCashback'])
        ->names('bonus.cashback');
    Route::post('bonus/cashback/{customerBonusCashback}/release', [BonusCashbackController::class, 'release'])
        ->name('bonus.cashback.release');
    Route::post('bonus/cashback/mass-release', [BonusCashbackController::class, 'massRelease'])
        ->name('bonus.cashback.massRelease');

    // Bonus Reward Routes
    Route::resource('bonus/reward', BonusRewardController::class)
        ->parameters(['reward' => 'customerBonusReward'])
        ->names('bonus.reward');
    Route::post('bonus/reward/{customerBonusReward}/release', [BonusRewardController::class, 'release'])
        ->name('bonus.reward.release');
    Route::post('bonus/reward/mass-release', [BonusRewardController::class, 'massRelease'])
        ->name('bonus.reward.massRelease');

    // Bonus Retail Routes
    Route::resource('bonus/retail', BonusRetailController::class)
        ->parameters(['retail' => 'customerBonusRetail'])
        ->names('bonus.retail');
    Route::post('bonus/retail/{customerBonusRetail}/release', [BonusRetailController::class, 'release'])
        ->name('bonus.retail.release');
    Route::post('bonus/retail/mass-release', [BonusRetailController::class, 'massRelease'])
        ->name('bonus.retail.massRelease');

    // Bonus Lifetime Cash Reward Routes
    Route::resource('bonus/lifetime-cash-reward', BonusLifetimeCashRewardController::class)
        ->parameters(['lifetime-cash-reward' => 'customerBonusLifetimeCashReward'])
        ->names('bonus.lifetime-cash-reward');
    Route::post('bonus/lifetime-cash-reward/{customerBonusLifetimeCashReward}/release', [BonusLifetimeCashRewardController::class, 'release'])
        ->name('bonus.lifetime-cash-reward.release');
    Route::post('bonus/lifetime-cash-reward/mass-release', [BonusLifetimeCashRewardController::class, 'massRelease'])
        ->name('bonus.lifetime-cash-reward.massRelease');
});
