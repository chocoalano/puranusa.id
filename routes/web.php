<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('ecommerce.beranda');
})->name('home');

require __DIR__.'/Ecommerce/shop.php';
require __DIR__.'/settings.php';
require __DIR__.'/Admin/bonus.php';
require __DIR__.'/Admin/manage.php';
require __DIR__.'/Admin/ecommerce.php';
