<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tickets = Ticket::with('booking.user')->orderByDesc('id')->paginate(10);

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets
        ]);
    }
}
