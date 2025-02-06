<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use App\Models\Tour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $destinations = Destination::get();
        $tours = Tour::with('destination')->orderByDesc('id')->paginate(10);

        return Inertia::render('Tours/Index', [
            'tours' => $tours,
            'destinations' => $destinations
        ]);
    }
}
