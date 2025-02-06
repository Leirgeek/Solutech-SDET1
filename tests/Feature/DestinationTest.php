<?php

use App\Models\Destination;
use App\Models\User;

it('allows admin to create a destination', function () {

    $admin = User::factory()->create();

    $response = $this->actingAs($admin)->post('api/destinations', [
        'name' => 'New Destination',
        'description' => 'A new destination description',
    ]);

    $response->assertStatus(201);
    expect(Destination::where('name', 'New Destination')->exists())->toBeTrue();
    expect(Destination::where('description', 'A new destination description')->exists())->toBeTrue();
});

