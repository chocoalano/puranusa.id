<?php

namespace Tests\Feature;

use App\Models\Manage\Customer;
use App\Models\Manage\CustomerNetworkMatrix;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SponsorNetworkTest extends TestCase
{
    use RefreshDatabase;

    public function test_new_customer_can_register_with_referral_code(): void
    {
        // Create sponsor
        $sponsor = Customer::factory()->create([
            'ref_code' => 'REF-SPONSOR1',
        ]);

        // Register new customer with sponsor's ref code
        $response = $this->post('/client/register', [
            'name' => 'New Member',
            'email' => 'newmember@example.com',
            'phone' => '081234567890',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'ref_code' => 'REF-SPONSOR1',
        ]);

        $response->assertRedirect('/beranda');

        // Check if customer was created
        $this->assertDatabaseHas('customers', [
            'email' => 'newmember@example.com',
        ]);

        $newCustomer = Customer::where('email', 'newmember@example.com')->first();

        // Check if matrix relationship was created
        $this->assertDatabaseHas('customer_network_matrixes', [
            'member_id' => $newCustomer->id,
            'sponsor_id' => $sponsor->id,
        ]);
    }

    public function test_sponsor_can_see_passive_members_in_their_network(): void
    {
        // Create sponsor
        $sponsor = Customer::factory()->create([
            'ref_code' => 'REF-SPONSOR2',
        ]);

        // Create passive member (registered but not in binary tree yet)
        $passiveMember = Customer::factory()->create([
            'name' => 'Passive Member',
            'email' => 'passive@example.com',
        ]);

        // Add to matrix with sponsor
        CustomerNetworkMatrix::addToMatrix($passiveMember->id, $sponsor->id);

        // Login as sponsor and visit profile
        $response = $this->actingAs($sponsor, 'client')
            ->get('/profile');

        $response->assertSuccessful();

        // Check if passive member appears in the response
        $response->assertInertia(fn ($page) => $page
            ->component('ecommerce/profile/Index')
            ->has('passiveMembers', 1)
            ->where('passiveMembers.0.name', 'Passive Member')
            ->where('passiveMembers.0.email', 'passive@example.com')
            ->where('passiveMembers.0.has_placement', false)
        );
    }

    public function test_passive_member_becomes_active_when_placed_in_binary_tree(): void
    {
        // Create sponsor
        $sponsor = Customer::factory()->create();

        // Create passive member
        $passiveMember = Customer::factory()->create();

        // Add to matrix
        CustomerNetworkMatrix::addToMatrix($passiveMember->id, $sponsor->id);

        // Initially, member should be in passive list
        $this->actingAs($sponsor, 'client')
            ->get('/profile')
            ->assertInertia(fn ($page) => $page->has('passiveMembers', 1));

        // Place member in binary tree
        \App\Models\Manage\CustomerNetwork::placeNewMember($passiveMember->id, $sponsor->id);

        // Now member should be in active list
        $this->actingAs($sponsor, 'client')
            ->get('/profile')
            ->assertInertia(fn ($page) => $page
                ->has('passiveMembers', 0)
                ->has('activeMembers', 1)
                ->where('activeMembers.0.id', $passiveMember->id)
                ->where('activeMembers.0.has_placement', true)
            );
    }

    public function test_customer_without_referral_code_is_not_in_any_sponsor_network(): void
    {
        // Register customer without ref code
        $response = $this->post('/client/register', [
            'name' => 'Independent Member',
            'email' => 'independent@example.com',
            'phone' => '081234567891',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect('/beranda');

        $customer = Customer::where('email', 'independent@example.com')->first();

        // Check matrix entry exists but with null sponsor
        $this->assertDatabaseHas('customer_network_matrixes', [
            'member_id' => $customer->id,
            'sponsor_id' => null,
        ]);
    }

    public function test_prospect_members_are_new_members_within_30_days(): void
    {
        $sponsor = Customer::factory()->create();

        // Create new member (within 30 days)
        $newMember = Customer::factory()->create([
            'created_at' => now()->subDays(15),
        ]);
        CustomerNetworkMatrix::addToMatrix($newMember->id, $sponsor->id);

        // Create old member (more than 30 days)
        $oldMember = Customer::factory()->create([
            'created_at' => now()->subDays(45),
        ]);
        CustomerNetworkMatrix::addToMatrix($oldMember->id, $sponsor->id);

        // Check prospect members
        $this->actingAs($sponsor, 'client')
            ->get('/client/profile')
            ->assertInertia(fn ($page) => $page
                ->has('prospectMembers', 1)
                ->where('prospectMembers.0.id', $newMember->id)
            );
    }

    public function test_sponsor_can_place_passive_member_to_binary_tree(): void
    {
        // Create sponsor with network position
        $sponsor = Customer::factory()->create();
        \App\Models\Manage\CustomerNetwork::create([
            'member_id' => $sponsor->id,
            'upline_id' => null,
            'position' => 'left',
            'level' => 1,
            'status' => true,
        ]);

        // Create passive member
        $passiveMember = Customer::factory()->create([
            'name' => 'Passive Member To Place',
        ]);
        CustomerNetworkMatrix::addToMatrix($passiveMember->id, $sponsor->id);

        // Verify member is passive
        $this->assertNull($passiveMember->fresh()->networkPosition);

        // Place member to binary tree
        $response = $this->actingAs($sponsor, 'client')
            ->post('/client/profile/place-member', [
                'member_id' => $passiveMember->id,
                'position' => 'left',
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        // Verify member is now active
        $passiveMember = $passiveMember->fresh();
        $this->assertNotNull($passiveMember->networkPosition);
        $this->assertEquals('left', $passiveMember->networkPosition->position);
        $this->assertEquals($sponsor->id, $passiveMember->networkPosition->upline_id);
    }

    public function test_cannot_place_member_to_occupied_position(): void
    {
        // Create sponsor
        $sponsor = Customer::factory()->create();
        \App\Models\Manage\CustomerNetwork::create([
            'member_id' => $sponsor->id,
            'upline_id' => null,
            'position' => 'left',
            'level' => 1,
            'status' => true,
        ]);

        // Create and place first member at left position
        $firstMember = Customer::factory()->create();
        CustomerNetworkMatrix::addToMatrix($firstMember->id, $sponsor->id);
        \App\Models\Manage\CustomerNetwork::create([
            'member_id' => $firstMember->id,
            'upline_id' => $sponsor->id,
            'position' => 'left',
            'level' => 2,
            'status' => true,
        ]);

        // Try to place second member at same position
        $secondMember = Customer::factory()->create();
        CustomerNetworkMatrix::addToMatrix($secondMember->id, $sponsor->id);

        $response = $this->actingAs($sponsor, 'client')
            ->post('/client/profile/place-member', [
                'member_id' => $secondMember->id,
                'position' => 'left',
            ]);

        $response->assertRedirect();
        $response->assertSessionHasErrors();
    }

    public function test_cannot_place_member_not_in_sponsor_network(): void
    {
        $sponsor = Customer::factory()->create();
        $otherCustomer = Customer::factory()->create();

        // Other customer is not in sponsor's matrix
        $response = $this->actingAs($sponsor, 'client')
            ->post('/client/profile/place-member', [
                'member_id' => $otherCustomer->id,
                'position' => 'left',
            ]);

        $response->assertRedirect();
        $response->assertSessionHasErrors();
    }
}
