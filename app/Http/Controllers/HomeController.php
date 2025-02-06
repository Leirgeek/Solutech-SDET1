<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Destination;
use App\Models\Ticket;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Show the application welcome screen.
     *
     * @return \Inertia\Response
     */

    public function index()
    {
        return Inertia::render('Welcome', [
            'tours' => Tour::with('destination')->where('slots', '>', 0)->get(),
            'canLogin' => Route::has('login'),
            'canRegister' => false,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }

    public function stats()
    {
        // This week
        $start_date = now()->startOfWeek();
        $end_date = now();

        $total_bookings = Booking::whereBetween('created_at', [$start_date, $end_date])->count();
        $pending_bookings = Booking::whereBetween('created_at', [$start_date, $end_date])->where('status', 'pending')->count();
        $confirmed_bookings = Booking::whereBetween('created_at', [$start_date, $end_date])->where('status', 'confirmed')->count();
        $cancelled_bookings = Booking::whereBetween('created_at', [$start_date, $end_date])->where('status', 'cancelled')->count();
        $total_destinations = Destination::count();
        $total_tickets = Ticket::whereBetween('created_at', [$start_date, $end_date])->count();
        $total_revenue = Booking::whereBetween('created_at', [$start_date, $end_date])->sum('total_price');
        $total_tours = Tour::count();
        $users = User::where('is_admin', false)->count();
        $admin_users = User::where('is_admin', true)->count();


        return response()->json(
            [
                'total_bookings' => $total_bookings,
                'pending_bookings' => $pending_bookings,
                'total_destinations' => $total_destinations,
                'confirmed_bookings' => $confirmed_bookings,
                'cancelled_bookings' => $cancelled_bookings,
                'total_tickets' => $total_tickets,
                'total_revenue' => $total_revenue,
                'total_tours' => $total_tours,
                'users' => $users,
                'admin_users' => $admin_users,
            ], 201);
    }
}
