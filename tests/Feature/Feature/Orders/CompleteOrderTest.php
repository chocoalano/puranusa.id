<?php

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('can show order detail for authenticated user', function () {
    $user = User::factory()->create();
    $order = Order::factory()->create([
        'customer_id' => $user->id,
        'status' => 'paid',
    ]);

    $response = $this->actingAs($user, 'customer')
        ->getJson("/api/client/orders/{$order->id}");

    $response->assertSuccessful()
        ->assertJsonStructure([
            'data' => [
                'id',
                'order_no',
                'status',
                'grand_total',
            ],
        ]);
});

it('cannot show order detail for another user', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $order = Order::factory()->create([
        'customer_id' => $otherUser->id,
    ]);

    $response = $this->actingAs($user, 'customer')
        ->getJson("/api/client/orders/{$order->id}");

    $response->assertForbidden();
});

it('can mark shipped order as completed', function () {
    $user = User::factory()->create();
    $order = Order::factory()->create([
        'customer_id' => $user->id,
        'status' => 'shipped',
    ]);

    $response = $this->actingAs($user, 'customer')
        ->postJson("/api/client/orders/{$order->id}/complete");

    $response->assertSuccessful();

    $order->refresh();
    expect($order->status)->toBe('completed');
});

it('cannot mark non-shipped order as completed', function () {
    $user = User::factory()->create();
    $order = Order::factory()->create([
        'customer_id' => $user->id,
        'status' => 'paid',
    ]);

    $response = $this->actingAs($user, 'customer')
        ->postJson("/api/client/orders/{$order->id}/complete");

    $response->assertStatus(422);

    $order->refresh();
    expect($order->status)->toBe('paid');
});

it('cannot mark another users order as completed', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $order = Order::factory()->create([
        'customer_id' => $otherUser->id,
        'status' => 'shipped',
    ]);

    $response = $this->actingAs($user, 'customer')
        ->postJson("/api/client/orders/{$order->id}/complete");

    $response->assertForbidden();
});
