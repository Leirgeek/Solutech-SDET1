<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //Seed a destination with three tours and an admin user
        $this->call([
            DestinationsSeeder::class,
            UsersSeeder::class
        ]);
    }
}
