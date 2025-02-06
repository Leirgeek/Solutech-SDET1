<?php

use App\Models\Booking;
use App\Models\Tour;
use App\Models\User;

it('allows a user to book a tour', function () {
    $tour = Tour::factory()->create();

    $response = $this->post('bookings', [
        'tour_id' => $tour->id,
        'user_name' => 'John Doe',
        'email_address' => 'test@test.com',
        'slots' => 2,
        'total_price' => 200,
    ]);

    expect(Booking::where('user_id', User::where('email', 'test@test.com')->first()->id)->exists())->toBeTrue();
    expect(Booking::where('tour_id', $tour->id)->exists())->toBeTrue();
    expect(Booking::where('slots', 2)->exists())->toBeTrue();
    expect(Booking::where('total_price', 200)->exists())->toBeTrue();

    $response->assertStatus(201);

});
