<?php

use App\Models\Manage\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('customer can register without referral', function () {
    $response = $this->post(route('client.register'), [
        'name' => 'New Customer',
        'email' => 'newcustomer@example.com',
        'phone' => '081234567890',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertRedirect('/beranda');

    $customer = Customer::where('email', 'newcustomer@example.com')->first();

    expect($customer)->not->toBeNull()
        ->and($customer->name)->toBe('New Customer')
        ->and($customer->sponsor_id)->toBeNull()
        ->and($customer->status)->toBe(1); // 1 = prospek
});

test('customer can register with referral code', function () {
    // Create sponsor
    $sponsor = Customer::factory()->create([
        'ref_code' => 'SPONSOR123',
        'status' => 3, // aktif
    ]);

    $response = $this->post(route('client.register'), [
        'name' => 'Referred Customer',
        'email' => 'referred@example.com',
        'phone' => '081234567891',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'ref_code' => 'SPONSOR123',
    ]);

    $response->assertRedirect('/beranda');

    $customer = Customer::where('email', 'referred@example.com')->first();

    expect($customer)->not->toBeNull()
        ->and($customer->name)->toBe('Referred Customer')
        ->and($customer->sponsor_id)->toBe($sponsor->id)
        ->and($customer->status)->toBe(1); // 1 = prospek
});

test('customer registration sets status to prospek by default', function () {
    $response = $this->post(route('client.register'), [
        'name' => 'Test Customer',
        'email' => 'test@example.com',
        'phone' => '081234567892',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $customer = Customer::where('email', 'test@example.com')->first();

    expect($customer->status)->toBe(1); // 1 = prospek
});

test('customer registration does not create customer_network_matrix record', function () {
    // Create sponsor
    $sponsor = Customer::factory()->create([
        'ref_code' => 'SPONSOR456',
    ]);

    $this->post(route('client.register'), [
        'name' => 'Matrix Test',
        'email' => 'matrix@example.com',
        'phone' => '081234567893',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'ref_code' => 'SPONSOR456',
    ]);

    $customer = Customer::where('email', 'matrix@example.com')->first();

    // Check that no customer_network_matrix record was created
    $matrixRecord = \App\Models\Manage\CustomerNetworkMatrix::where('member_id', $customer->id)->first();

    expect($matrixRecord)->toBeNull();
});

test('customer is automatically logged in after registration', function () {
    $response = $this->post(route('client.register'), [
        'name' => 'Auto Login',
        'email' => 'autologin@example.com',
        'phone' => '081234567894',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $this->assertAuthenticatedAs(
        Customer::where('email', 'autologin@example.com')->first(),
        'client'
    );
});

test('registration validates required fields', function () {
    $response = $this->post(route('client.register'), []);

    $response->assertSessionHasErrors(['name', 'email', 'phone', 'password']);
});

test('registration validates email uniqueness', function () {
    Customer::factory()->create(['email' => 'existing@example.com']);

    $response = $this->post(route('client.register'), [
        'name' => 'Duplicate Email',
        'email' => 'existing@example.com',
        'phone' => '081234567895',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('registration validates password confirmation', function () {
    $response = $this->post(route('client.register'), [
        'name' => 'Password Mismatch',
        'email' => 'mismatch@example.com',
        'phone' => '081234567896',
        'password' => 'password123',
        'password_confirmation' => 'differentpassword',
    ]);

    $response->assertSessionHasErrors(['password']);
});

test('registration validates referral code exists', function () {
    $response = $this->post(route('client.register'), [
        'name' => 'Invalid Ref',
        'email' => 'invalidref@example.com',
        'phone' => '081234567897',
        'password' => 'password123',
        'password_confirmation' => 'password123',
        'ref_code' => 'NONEXISTENT',
    ]);

    $response->assertSessionHasErrors(['ref_code']);
});
