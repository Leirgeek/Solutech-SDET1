<?php

use App\Http\Controllers\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->name('api.')->group(function () {

    Route::apiResource('tours', 'App\Http\Controllers\API\TourController');
    Route::apiResource('destinations', 'App\Http\Controllers\API\DestinationController');
    Route::apiResource('bookings', 'App\Http\Controllers\API\BookingController')->except(['destroy', 'update']);

    Route::get('stats', [HomeController::class, 'stats'])->name('dashboard.stats');
});
