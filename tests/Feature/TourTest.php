<?php

use App\Models\Destination;
use App\Models\Tour;
use App\Models\User;

it('allows an admin to create a tour', function () {
    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post('api/tours', [
        'name' => 'New Tour',
        'destination_id' => Destination::factory()->create()->id,
        'price' => 1000,
        'slots' => 10,
        'description' => 'A new tour description',
    ]);

    $response->assertStatus(201);
    expect(Tour::where('name', 'New Tour')->exists())->toBeTrue();
    expect(Tour::where('price', 1000)->exists())->toBeTrue();
    expect(Tour::where('slots', 10)->exists())->toBeTrue();
    expect(Tour::where('description', 'A new tour description')->exists())->toBeTrue();
});
