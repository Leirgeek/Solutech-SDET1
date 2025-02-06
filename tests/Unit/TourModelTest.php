<?php

use App\Models\Destination;
use App\Models\Tour;

it('belongs to a destination', function () {
    $tour = Tour::factory()->create();
    expect($tour->destination)->toBeInstanceOf(Destination::class);
});
