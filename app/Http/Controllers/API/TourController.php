<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Tour;
use Illuminate\Http\Request;

class TourController extends Controller
{
    /**
     *  List all the tours.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //Note:: We'll render these via Inertia.js
        $tours = Tour::orderBy('id', 'desc')->paginate(10);
        return response()->json(['tours' => $tours], 201);
    }

    /**
     * Store a new tour.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $tour = Tour::create($request->all());
            return response()->json($tour, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to store the tour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Show a tour.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $tour = Tour::find($id);

        if(!$tour){
            return response()->json(['message' => 'Tour not found'], 404);
        }

        return response()->json(['tour' => $tour], 201);
    }

    /**
     * Update a tour
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        try {
            $tour = Tour::find($id);

            if(!$tour){
                return response()->json(['message' => 'Tour not found'], 404);
            }

            $tour->update($request->all());
            return response()->json($tour, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update the tour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Destroy a tour
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
        $tour = Tour::find($id);

        if(!$tour){
            return response()->json(['message' => 'Tour not found'], 404);
        }

        try {
            $tour->delete();
            $tours = Tour::orderBy('id', 'desc')->paginate(10);
            return response()->json(['message' => "Tour Deleted",
                'tours' => $tours], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Tour deletion failed!'], 409);
        }
    }
}
