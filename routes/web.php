<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\API\BookingController as ApiBookingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('welcome');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/tours', [TourController::class, 'index'])->name('tours.index');
    Route::get('/destinations', [DestinationController::class, 'index'])->name('destinations.index');
});

Route::post('/bookings', [ApiBookingController::class, 'store'])->name('bookings.store')->middleware('web');

