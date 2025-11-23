<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            // General Settings
            ['key' => 'site_name', 'value' => 'PURANUSA', 'type' => 'text', 'group' => 'general'],
            ['key' => 'site_description', 'value' => 'Puranusa adalah destinasi belanja online terpercaya untuk kebutuhan teknologi dan gaya hidup Anda. Kami menyediakan produk berkualitas tinggi dengan harga terbaik.', 'type' => 'textarea', 'group' => 'general'],
            ['key' => 'site_logo', 'value' => null, 'type' => 'image', 'group' => 'general'],

            // Social Media Links
            ['key' => 'social_facebook', 'value' => 'https://facebook.com/puranusa', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_twitter', 'value' => 'https://twitter.com/puranusa', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_instagram', 'value' => 'https://instagram.com/puranusa', 'type' => 'text', 'group' => 'social'],
            ['key' => 'social_youtube', 'value' => 'https://youtube.com/@puranusa', 'type' => 'text', 'group' => 'social'],

            // Payment Methods
            ['key' => 'payment_methods', 'value' => json_encode(['VISA', 'Mastercard', 'GoPay', 'OVO']), 'type' => 'json', 'group' => 'payment'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
