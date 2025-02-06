<?php

use App\Models\Booking;
use App\Models\Ticket;

it('belongs to a booking', function () {
    $ticket = Ticket::factory()->create();
    expect($ticket->booking)->toBeInstanceOf(Booking::class);
});
