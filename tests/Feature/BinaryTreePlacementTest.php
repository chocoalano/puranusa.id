<?php

use App\Models\Manage\Customer;
use App\Models\Manage\CustomerNetworkMatrix;
use App\Models\Order;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create sponsor
    $this->sponsor = Customer::factory()->create([
        'ref_code' => 'SPONSOR01',
        'upline_id' => null,
        'position' => null,
        'foot_left' => null,
        'foot_right' => null,
    ]);

    // Create passive member (member with purchase)
    $this->passiveMember = Customer::factory()->create([
        'ref_code' => 'PASSIVE01',
        'upline_id' => null,
        'position' => null,
    ]);

    // Create order for passive member
    Order::factory()->create([
        'customer_id' => $this->passiveMember->id,
        'status' => 'paid',
    ]);

    // Add passive member to sponsor's matrix
    CustomerNetworkMatrix::create([
        'member_id' => $this->passiveMember->id,
        'sponsor_id' => $this->sponsor->id,
        'level' => 1,
    ]);

    // Create prospect member (member without purchase)
    $this->prospectMember = Customer::factory()->create([
        'ref_code' => 'PROSPECT01',
        'upline_id' => null,
        'position' => null,
    ]);

    // Add prospect member to sponsor's matrix
    CustomerNetworkMatrix::create([
        'member_id' => $this->prospectMember->id,
        'sponsor_id' => $this->sponsor->id,
        'level' => 1,
    ]);

    // Mock stored procedure
    DB::shouldReceive('statement')
        ->with('CALL sp_register(?)', [$this->passiveMember->id])
        ->andReturn(true);
});

test('sponsor can place passive member to left position', function () {
    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $this->passiveMember->id,
            'position' => 'left',
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    // Verify member's upline_id and position updated
    $this->passiveMember->refresh();
    expect($this->passiveMember->upline_id)->toBe($this->sponsor->id)
        ->and($this->passiveMember->position)->toBe('left');

    // Verify sponsor's foot_left updated
    $this->sponsor->refresh();
    expect($this->sponsor->foot_left)->toBe($this->passiveMember->id);
});

test('sponsor can place passive member to right position', function () {
    DB::shouldReceive('statement')
        ->with('CALL sp_register(?)', [$this->passiveMember->id])
        ->andReturn(true);

    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $this->passiveMember->id,
            'position' => 'right',
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    // Verify member's upline_id and position updated
    $this->passiveMember->refresh();
    expect($this->passiveMember->upline_id)->toBe($this->sponsor->id)
        ->and($this->passiveMember->position)->toBe('right');

    // Verify sponsor's foot_right updated
    $this->sponsor->refresh();
    expect($this->sponsor->foot_right)->toBe($this->passiveMember->id);
});

test('cannot place prospect member without purchase', function () {
    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $this->prospectMember->id,
            'position' => 'left',
        ])
        ->assertRedirect()
        ->assertSessionHasErrors(['error']);

    // Verify member's placement was not updated
    $this->prospectMember->refresh();
    expect($this->prospectMember->upline_id)->toBeNull()
        ->and($this->prospectMember->position)->toBeNull();
});

test('cannot place member to already filled position', function () {
    // Place first member to left
    $this->sponsor->update(['foot_left' => 999]);

    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $this->passiveMember->id,
            'position' => 'left',
        ])
        ->assertRedirect()
        ->assertSessionHasErrors(['error']);
});

test('cannot place already placed member', function () {
    // Already placed member
    $this->passiveMember->update([
        'upline_id' => 1,
        'position' => 'left',
    ]);

    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $this->passiveMember->id,
            'position' => 'right',
        ])
        ->assertRedirect()
        ->assertSessionHasErrors(['error']);
});

test('cannot place member not in sponsor matrix', function () {
    // Create member not in sponsor's matrix
    $outsideMember = Customer::factory()->create([
        'ref_code' => 'OUTSIDE01',
    ]);

    Order::factory()->create([
        'customer_id' => $outsideMember->id,
        'status' => 'paid',
    ]);

    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $outsideMember->id,
            'position' => 'left',
        ])
        ->assertRedirect()
        ->assertSessionHasErrors(['error']);
});

test('validates required fields', function () {
    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [])
        ->assertSessionHasErrors(['member_id', 'position']);
});

test('validates position must be left or right', function () {
    $this->actingAs($this->sponsor, 'client')
        ->post(route('client.profile.place-member'), [
            'member_id' => $this->passiveMember->id,
            'position' => 'invalid',
        ])
        ->assertSessionHasErrors(['position']);
});
