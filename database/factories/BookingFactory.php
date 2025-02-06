<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'tour_id' => 1,
            'slots' => $this->faker->numberBetween(1, 10),
            'total_price' => $this->faker->randomFloat(2, 100, 1000),
            'status' => 'pending'
        ];
    }
}
