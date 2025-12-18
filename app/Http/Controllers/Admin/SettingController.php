<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::query()
            ->orderBy('group')
            ->orderBy('key')
            ->get()
            ->groupBy('group');

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'settings' => 'required|array',
            'site_logo' => 'nullable|file|image|max:2048',
        ]);

        // Handle file upload for site_logo
        if ($request->hasFile('site_logo')) {
            $file = $request->file('site_logo');
            $path = $file->store('logos', 'public');
            $validated['settings']['site_logo'] = '/storage/'.$path;

            // Delete old logo if exists
            $oldLogo = Setting::where('key', 'site_logo')->first();
            if ($oldLogo && $oldLogo->value && str_starts_with($oldLogo->value, '/storage/logos/')) {
                \Storage::disk('public')->delete(str_replace('/storage/', '', $oldLogo->value));
            }
        }

        // Define setting groups and types
        $settingConfig = [
            'site_name' => ['group' => 'general', 'type' => 'text'],
            'site_description' => ['group' => 'general', 'type' => 'text'],
            'site_logo' => ['group' => 'general', 'type' => 'text'],
            'social_facebook' => ['group' => 'social', 'type' => 'text'],
            'social_twitter' => ['group' => 'social', 'type' => 'text'],
            'social_instagram' => ['group' => 'social', 'type' => 'text'],
            'social_youtube' => ['group' => 'social', 'type' => 'text'],
            'payment_methods' => ['group' => 'payment', 'type' => 'json'],
        ];

        foreach ($validated['settings'] as $key => $value) {
            // Skip null values for non-essential fields (but allow empty string)
            if ($value === null && ! in_array($key, ['site_logo'])) {
                continue;
            }

            $config = $settingConfig[$key] ?? ['group' => 'general', 'type' => 'text'];

            // Handle JSON type
            if ($config['type'] === 'json' && is_array($value)) {
                $value = json_encode($value);
            }

            // Use updateOrCreate to handle both new and existing settings
            Setting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $value,
                    'type' => $config['type'],
                    'group' => $config['group'],
                ]
            );
        }

        // Clear the settings cache to ensure fresh data
        \Illuminate\Support\Facades\Cache::forget('settings');

        return back()->with('success', 'Pengaturan berhasil diperbarui');
    }
}
