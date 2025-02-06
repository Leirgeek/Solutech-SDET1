<?php

use App\Models\Booking;
use App\Models\Tour;
use App\Models\User;

it('belongs to a tour and user', function () {
    $booking = Booking::factory()->create();
    expect($booking->tour)->toBeInstanceOf(Tour::class);
    expect($booking->user)->toBeInstanceOf(User::class);
});

it('handles booking status transitions', function () {
    $booking = Booking::factory()->create(['status' => 'pending']);
    $booking->update(['status' => 'confirmed']);
    expect($booking->status)->toBe('confirmed');
});
