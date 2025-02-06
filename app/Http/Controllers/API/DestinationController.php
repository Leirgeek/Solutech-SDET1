<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    /**
     *  List all the destinations.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        //Note:: We'll render these via Inertia.js
        $destinations = Destination::orderBy('id', 'desc')->paginate(10);
        return response()->json(['destinations' => $destinations], 201);
    }

    /**
     * Store a new destination.
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->name)));
        $request->merge(['slug' => $slug]);

        try {
            Destination::create($request->all());
            $destinations = Destination::orderBy('id', 'desc')->paginate(10);
            return response()->json(['message' => "Destination Created",
                'destinations' => $destinations], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Destination creation failed!'], 409);
        }

    }

    /**
     * Show a destination.
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }
        return response()->json(['destination' => $destination], 201);
    }

    /**
     * Update a destination
     * @param Request $request
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string'
        ]);

        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }

        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->name)));
        $request->merge(['slug' => $slug]);

        try {
            $destination->update($request->all());
            $destinations = Destination::orderBy('id', 'desc')->paginate(10);
            return response()->json(['message' => "Destination Updated",
                'destinations' => $destinations], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Destination update failed!'], 409);
        }
    }

    /**
     * Destroy a destination
     * @param string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }
        $destination->delete();
        $destinations = Destination::orderBy('id', 'desc')->paginate(10);
        return response()->json(['message' => 'Destination deleted',
            'destinations' => $destinations], 201);
    }
}
