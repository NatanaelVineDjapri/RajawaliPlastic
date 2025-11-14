<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use MongoDB\BSON\Binary;
class PartnerController extends Controller
{
     public function index()
    {
        $products = Partner::orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Partner retrieved successfully',
            'data' => $products
        ], 200);
    }


    public function show($id)
    {
        $Partner = Partner::find($id);

        if (!$Partner) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        return response()->json([
            'message' => 'Partner retrieved successfully',
            'data' => $Partner
        ], 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'logo' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            'link' => 'nullable|url'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $binary = null;
        if ($request->hasFile('logo')) {
            $binary = new Binary(file_get_contents($request->file('logo')->getRealPath()));
        }

        $partner = Partner::create([
            'name' => $request->name,
            'logo' => $binary,
            'link' => $request->link,
        ]);

        return response()->json([
            'message' => 'Partner added successfully!',
            'data' => $partner
        ]);
    }

    public function destroy($id)
    {
        $partner = Partner::find($id);
        if (!$partner) {
            return response()->json(['message' => 'Partner not found'], 404);
        }

        $partner->delete();

        return response()->json(['message' => 'Partner deleted successfully'], 200);
    }
}

