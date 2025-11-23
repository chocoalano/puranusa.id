<?php

use App\Http\Controllers\BonusComission\BonusController;
use App\Http\Controllers\BonusComission\BonusMatchingController;
use App\Http\Controllers\BonusComission\BonusPairingController;
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
});
