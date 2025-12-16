<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('Creating admin users...');

        // Super Admin
        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@puranusa.id',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@puranusa.id',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Manager
        User::factory()->create([
            'name' => 'Manager',
            'email' => 'manager@puranusa.id',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Staff/Operator
        User::factory()->create([
            'name' => 'Operator',
            'email' => 'operator@puranusa.id',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // CS (Customer Service)
        User::factory()->create([
            'name' => 'Customer Service',
            'email' => 'cs@puranusa.id',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        $this->command->info('Creating additional random users...');

        // Additional random users
        User::factory(5)->withoutTwoFactor()->create();

        $this->command->info('Users seeded successfully!');
        $this->command->info('Total users created: '.User::count());
    }
}
