<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Partner retrieved successfully',
            'data' => Partner::orderBy('created_at', 'desc')->get()
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
        
        $path = null;

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('partner', 'public');
        }
        $partner = Partner::create([
            'name' => $request->name,
            'logo' => $path ? asset('storage/' . $path) : null,
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

        if ($partner->image_url) {
            $oldPath = str_replace(asset('storage/') . '/', '', $partner->image_url);
            Storage::disk('public')->delete($oldPath);
        }

        $partner->delete();

        return response()->json(['message' => 'Partner deleted successfully'], 200);
    }
}

