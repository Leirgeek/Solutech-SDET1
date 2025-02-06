<?php

use App\Models\Destination;


it('has many tours', function () {
    $destination = Destination::factory()->hasTours(3)->create();
    expect($destination->tours)->toHaveCount(3);
});
