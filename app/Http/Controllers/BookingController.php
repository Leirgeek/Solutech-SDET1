<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings =  Booking::with('tour', 'ticket', 'user')->orderByDesc('id')->paginate(10);

        return Inertia::render('Bookings/Index', [
            'bookings' => $bookings
        ]);
    }
}
