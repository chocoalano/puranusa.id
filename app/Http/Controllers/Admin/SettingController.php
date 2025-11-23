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

        foreach ($validated['settings'] as $key => $value) {
            $existingSetting = Setting::where('key', $key)->first();

            if ($existingSetting) {
                // Handle JSON type
                if ($existingSetting->type === 'json' && is_array($value)) {
                    $value = json_encode($value);
                }

                $existingSetting->update(['value' => $value]);
            }
        }

        return redirect()->route('admin.settings.index')->with('success', 'Pengaturan berhasil diperbarui');
    }
}
