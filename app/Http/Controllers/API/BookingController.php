<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BookingController extends Controller
{
    /**
     *  List all the bookings.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //Note:: We'll render these via Inertia.js
        $bookings = Booking::with('tour', 'ticket', 'user')->orderByDesc('id')->paginate(10);

        return response()->json(['bookings' => $bookings], 201);
    }

    /**
     * Store a new booking.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_name' => 'required|string',
                'email_address' => 'required|email',
                'tour_id' => 'required|integer',
                'slots' => 'required|integer',
                'total_price' => 'required|numeric'
            ]);

            $random_string = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(10 / strlen($x)))), 1, 10);

            $user = User::firstOrCreate([
                'name' => $request->user_name,
                'email' => $request->email_address,
                'password' => Hash::make($random_string)
            ]);

            $request->merge(['user_id' => $user->id]);

            $booking = Booking::create($request->except('user_name', 'email_address'));

            $booking->ticket()->create([
                'ticket_number' => ticket_number()
            ]);

            //Update the tour slots
            $tour = $booking->tour;

            $slots = $tour->slots - $booking->slots;

            $tour->update(
                ['slots' => $slots]
            );

            $ticket = Ticket::where('booking_id', $booking->id)->first();

            return response()->json([
                'message' => 'Booking created successfully',
                'booking' => $booking,
                'ticket_number' => $ticket->ticket_number
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Booking creation failed',
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Show a booking.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function show(string $id)
    {
        //Show the booking details
        $booking = Booking::with('tour', 'ticket', 'user')->find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        return response()->json(['booking' => $booking], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
