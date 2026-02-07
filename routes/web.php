<?php

use Illuminate\Support\Facades\Route;

Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
})->name('csrf-token');

Route::get('/_phpinfo', fn () => phpinfo());

// Home redirect - must be before other route files
Route::get('/', function () {
    return redirect()->route('ecommerce.beranda');
})->name('home');

require __DIR__.'/Ecommerce/shop.php';
require __DIR__.'/settings.php';
require __DIR__.'/Admin/bonus.php';
require __DIR__.'/Admin/manage.php';
require __DIR__.'/Admin/ecommerce.php';
