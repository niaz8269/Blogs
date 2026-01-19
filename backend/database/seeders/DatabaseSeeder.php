<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Roles
        $adminRole = Role::create([
            'name' => 'admin',
            'display_name' => 'Administrator',
        ]);

        $authorRole = Role::create([
            'name' => 'author',
            'display_name' => 'Author',
        ]);

        $userRole = Role::create([
            'name' => 'user',
            'display_name' => 'Registered User',
        ]);

        // Create Admin User
        User::create([
            'role_id' => $adminRole->id,
            'name' => 'Admin User',
            'email' => 'admin@blog.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create Author User
        User::create([
            'role_id' => $authorRole->id,
            'name' => 'Author User',
            'email' => 'author@blog.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create Regular User
        User::create([
            'role_id' => $userRole->id,
            'name' => 'Regular User',
            'email' => 'user@blog.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);
    }
}
