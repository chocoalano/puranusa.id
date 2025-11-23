<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user index page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/manage/users');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('manage/users/Index'));
});

test('user index displays paginated users', function () {
    $admin = User::factory()->create();
    User::factory()->count(15)->create();

    $response = $this->actingAs($admin)->get('/manage/users');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('manage/users/Index')
        ->has('users.data', 10)
        ->has('users.links')
    );
});

test('user index can be searched', function () {
    $admin = User::factory()->create();
    $john = User::factory()->create(['name' => 'John Doe', 'email' => 'john@example.com']);
    User::factory()->create(['name' => 'Jane Smith', 'email' => 'jane@example.com']);

    $response = $this->actingAs($admin)->get('/manage/users?search=John');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('manage/users/Index')
        ->where('users.data.0.name', 'John Doe')
    );
});

test('user index can be sorted', function () {
    $admin = User::factory()->create(['name' => 'Admin']);
    $alice = User::factory()->create(['name' => 'Alice']);
    $bob = User::factory()->create(['name' => 'Bob']);

    $response = $this->actingAs($admin)->get('/manage/users?sort_by=name&sort_order=asc');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('manage/users/Index')
        ->where('users.data.0.name', 'Admin')
        ->where('users.data.1.name', 'Alice')
    );
});

test('user create page can be rendered', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/manage/users/create');

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page->component('manage/users/Create'));
});

test('new user can be created', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post('/manage/users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertRedirect('/manage/users');
    $this->assertDatabaseHas('users', [
        'name' => 'Test User',
        'email' => 'test@example.com',
    ]);
});

test('user creation validates required fields', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post('/manage/users', []);

    $response->assertSessionHasErrors(['name', 'email', 'password']);
});

test('user creation validates email uniqueness', function () {
    $admin = User::factory()->create();
    $existingUser = User::factory()->create(['email' => 'existing@example.com']);

    $response = $this->actingAs($admin)->post('/manage/users', [
        'name' => 'Test User',
        'email' => 'existing@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('user edit page can be rendered', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($admin)->get("/manage/users/{$user->id}/edit");

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('manage/users/Edit')
        ->has('user')
    );
});

test('user can be updated', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create(['name' => 'Old Name']);

    $response = $this->actingAs($admin)->put("/manage/users/{$user->id}", [
        'name' => 'New Name',
        'email' => $user->email,
    ]);

    $response->assertRedirect('/manage/users');
    $this->assertDatabaseHas('users', [
        'id' => $user->id,
        'name' => 'New Name',
    ]);
});

test('user update validates email uniqueness except self', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create(['email' => 'user@example.com']);
    $otherUser = User::factory()->create(['email' => 'other@example.com']);

    $response = $this->actingAs($admin)->put("/manage/users/{$user->id}", [
        'name' => $user->name,
        'email' => 'other@example.com',
    ]);

    $response->assertSessionHasErrors(['email']);
});

test('user password can be updated', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create();
    $oldPassword = $user->password;

    $response = $this->actingAs($admin)->put("/manage/users/{$user->id}", [
        'name' => $user->name,
        'email' => $user->email,
        'password' => 'newpassword123',
        'password_confirmation' => 'newpassword123',
    ]);

    $response->assertRedirect('/manage/users');
    $user->refresh();
    $this->assertNotEquals($oldPassword, $user->password);
});

test('user password is not updated when empty', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create();
    $oldPassword = $user->password;

    $response = $this->actingAs($admin)->put("/manage/users/{$user->id}", [
        'name' => 'Updated Name',
        'email' => $user->email,
    ]);

    $response->assertRedirect('/manage/users');
    $user->refresh();
    $this->assertEquals($oldPassword, $user->password);
});

test('user can be deleted', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($admin)->delete("/manage/users/{$user->id}");

    $response->assertRedirect('/manage/users');
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

test('user show page can be rendered', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create();

    $response = $this->actingAs($admin)->get("/manage/users/{$user->id}");

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('manage/users/Show')
        ->has('user')
        ->where('user.id', $user->id)
    );
});

test('guests cannot access user management', function () {
    $response = $this->get('/manage/users');

    $response->assertRedirect('/login');
});
