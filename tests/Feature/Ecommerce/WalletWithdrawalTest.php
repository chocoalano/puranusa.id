<?php

use App\Models\CustomerWalletTransaction;
use App\Models\Manage\Customer;
use Illuminate\Support\Facades\Hash;

beforeEach(function () {
    $this->customer = Customer::factory()->create([
        'ewallet_saldo' => 500000,
        'password' => Hash::make('password123'),
    ]);
});

it('requires authentication for withdrawal', function () {
    $response = $this->post('/client/wallet/withdrawal', [
        'amount' => 100000,
        'bank_name' => 'BCA',
        'bank_account' => '1234567890',
        'bank_holder' => 'Test User',
        'password' => 'password123',
    ]);

    $response->assertRedirect('/client/login');
});

it('requires password for withdrawal', function () {
    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 100000,
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
        ]);

    $response->assertSessionHasErrors('password');
});

it('validates password is correct', function () {
    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 100000,
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
            'password' => 'wrongpassword',
        ]);

    $response->assertSessionHasErrors('password');
});

it('prevents withdrawal when there is pending request', function () {
    // Create a pending withdrawal
    CustomerWalletTransaction::create([
        'customer_id' => $this->customer->id,
        'type' => 'withdrawal',
        'amount' => 50000,
        'balance_before' => 500000,
        'balance_after' => 450000,
        'status' => 'pending',
        'transaction_ref' => 'WD-TEST-001',
    ]);

    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 100000,
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
            'password' => 'password123',
        ]);

    $response->assertSessionHasErrors('pending');
});

it('allows withdrawal when previous request is completed', function () {
    // Create a completed withdrawal
    CustomerWalletTransaction::create([
        'customer_id' => $this->customer->id,
        'type' => 'withdrawal',
        'amount' => 50000,
        'balance_before' => 500000,
        'balance_after' => 450000,
        'status' => 'completed',
        'transaction_ref' => 'WD-TEST-001',
    ]);

    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 100000,
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
            'password' => 'password123',
        ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();

    $this->assertDatabaseHas('customer_wallet_transactions', [
        'customer_id' => $this->customer->id,
        'type' => 'withdrawal',
        'amount' => 100000,
        'status' => 'pending',
    ]);
});

it('validates minimum withdrawal amount', function () {
    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 10000, // Less than minimum 50000
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
            'password' => 'password123',
        ]);

    $response->assertSessionHasErrors('amount');
});

it('validates sufficient balance', function () {
    $this->customer->update(['ewallet_saldo' => 30000]);

    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 50000,
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
            'password' => 'password123',
        ]);

    $response->assertSessionHasErrors('amount');
});

it('creates withdrawal transaction with correct data', function () {
    $response = $this->actingAs($this->customer, 'client')
        ->post('/client/wallet/withdrawal', [
            'amount' => 100000,
            'bank_name' => 'BCA',
            'bank_account' => '1234567890',
            'bank_holder' => 'Test User',
            'password' => 'password123',
        ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();

    $transaction = CustomerWalletTransaction::where('customer_id', $this->customer->id)
        ->where('type', 'withdrawal')
        ->latest()
        ->first();

    expect($transaction)->not->toBeNull();
    expect($transaction->amount)->toBe('100000.00');
    expect($transaction->status)->toBe('pending');
    expect($transaction->balance_before)->toBe('500000.00');
    expect($transaction->balance_after)->toBe('400000.00');

    $notes = json_decode($transaction->notes, true);
    expect($notes['bank_name'])->toBe('BCA');
    expect($notes['bank_account'])->toBe('1234567890');
    expect($notes['bank_holder'])->toBe('Test User');
});
