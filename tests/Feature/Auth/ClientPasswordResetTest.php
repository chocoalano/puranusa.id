<?php

use App\Models\Manage\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

it('can request password reset link', function () {
    Notification::fake();

    $customer = Customer::factory()->create();

    $response = $this->post('/client/forgot-password', [
        'email' => $customer->email,
    ]);

    $response->assertRedirect();
    $response->assertSessionHas('status');

    // Verify token exists in database
    $this->assertDatabaseHas('customer_password_resets', [
        'email' => $customer->email,
    ]);
});

it('shows error for non-existent email', function () {
    $response = $this->post('/client/forgot-password', [
        'email' => 'nonexistent@example.com',
    ]);

    $response->assertSessionHasErrors('email');
});

it('can reset password with valid token', function () {
    $customer = Customer::factory()->create();

    // Create token directly in database
    $token = \Illuminate\Support\Str::random(60);
    DB::table('customer_password_resets')->insert([
        'email' => $customer->email,
        'token' => Hash::make($token),
        'created_at' => now(),
    ]);

    $newPassword = 'NewSecurePassword123';

    $response = $this->post('/client/reset-password', [
        'token' => $token,
        'email' => $customer->email,
        'password' => $newPassword,
        'password_confirmation' => $newPassword,
    ]);

    $response->assertRedirect(route('client.login'));
    $response->assertSessionHas('status');

    // Verify password was updated
    $customer->refresh();
    expect(Hash::check($newPassword, $customer->password))->toBeTrue();

    // Verify token was deleted from database
    $this->assertDatabaseMissing('customer_password_resets', [
        'email' => $customer->email,
    ]);
});

it('shows error for invalid token', function () {
    $customer = Customer::factory()->create();

    $response = $this->post('/client/reset-password', [
        'token' => 'invalid-token',
        'email' => $customer->email,
        'password' => 'NewPassword123',
        'password_confirmation' => 'NewPassword123',
    ]);

    $response->assertSessionHasErrors('email');
});

it('shows error for mismatched password confirmation', function () {
    $customer = Customer::factory()->create();

    // Create token directly in database
    $token = \Illuminate\Support\Str::random(60);
    DB::table('customer_password_resets')->insert([
        'email' => $customer->email,
        'token' => Hash::make($token),
        'created_at' => now(),
    ]);

    $response = $this->post('/client/reset-password', [
        'token' => $token,
        'email' => $customer->email,
        'password' => 'NewPassword123',
        'password_confirmation' => 'DifferentPassword123',
    ]);

    $response->assertSessionHasErrors('password');
});

it('can display reset password form', function () {
    $response = $this->get('/client/reset-password/sample-token?email=test@example.com');

    $response->assertSuccessful();
    $response->assertInertia(fn ($page) => $page
        ->component('ecommerce/auth/ResetPassword')
        ->has('token')
        ->has('email')
    );
});

it('throttles password reset requests', function () {
    $customer = Customer::factory()->create();

    // First request should succeed
    $this->post('/client/forgot-password', [
        'email' => $customer->email,
    ])->assertRedirect();

    // Immediate second request should be throttled
    $response = $this->post('/client/forgot-password', [
        'email' => $customer->email,
    ]);

    $response->assertSessionHasErrors('email');
});
