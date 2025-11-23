<?php

namespace App\Providers;

use App\Models\Setting;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share settings globally with Inertia
        Inertia::share([
            'appSettings' => function () {
                return [
                    'site_name' => Setting::get('site_name', 'PURANUSA'),
                    'site_logo' => Setting::get('site_logo'),
                    'site_description' => Setting::get('site_description'),
                ];
            },
        ]);
    }
}
