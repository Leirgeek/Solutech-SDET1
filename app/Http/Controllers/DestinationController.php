<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $destinations = Destination::orderByDesc('id')->paginate(10);
        return Inertia::render('Destinations/Index', [
            'destinations' => $destinations
        ]);
    }
}
