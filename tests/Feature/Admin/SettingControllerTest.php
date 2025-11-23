<?php

use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->actingAs($this->user);

    Setting::create(['key' => 'site_logo', 'value' => null, 'type' => 'string', 'group' => 'general']);
});

it('can view settings page', function () {
    $response = $this->get('/admin/settings');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page->component('Admin/Settings/Index'));
});

it('can update settings with URL logo', function () {
    $response = $this->post('/admin/settings', [
        'settings' => [
            'site_logo' => 'https://example.com/logo.png',
        ],
    ]);

    $response->assertRedirect('/admin/settings');
    $this->assertDatabaseHas('settings', [
        'key' => 'site_logo',
        'value' => 'https://example.com/logo.png',
    ]);
});

it('can upload logo file', function () {
    Storage::fake('public');

    $file = UploadedFile::fake()->image('logo.png', 200, 200);

    $response = $this->post('/admin/settings', [
        'settings' => [
            'site_logo' => null,
        ],
        'site_logo' => $file,
    ]);

    $response->assertRedirect('/admin/settings');

    $setting = Setting::where('key', 'site_logo')->first();
    expect($setting->value)->toContain('/storage/logos/');

    Storage::disk('public')->assertExists(str_replace('/storage/', '', $setting->value));
});

it('deletes old logo when uploading new one', function () {
    Storage::fake('public');

    // Upload first logo
    $oldFile = UploadedFile::fake()->image('old-logo.png');
    $oldPath = $oldFile->store('logos', 'public');
    Setting::where('key', 'site_logo')->update(['value' => '/storage/' . $oldPath]);

    // Upload new logo
    $newFile = UploadedFile::fake()->image('new-logo.png');
    $response = $this->post('/admin/settings', [
        'settings' => [
            'site_logo' => null,
        ],
        'site_logo' => $newFile,
    ]);

    $response->assertRedirect('/admin/settings');

    // Old file should be deleted
    Storage::disk('public')->assertMissing($oldPath);

    // New file should exist
    $setting = Setting::where('key', 'site_logo')->first();
    Storage::disk('public')->assertExists(str_replace('/storage/', '', $setting->value));
});

it('validates logo file type and size', function () {
    Storage::fake('public');

    // Test invalid file type
    $file = UploadedFile::fake()->create('document.pdf', 100);

    $response = $this->post('/admin/settings', [
        'settings' => [
            'site_logo' => null,
        ],
        'site_logo' => $file,
    ]);

    $response->assertSessionHasErrors('site_logo');
});
