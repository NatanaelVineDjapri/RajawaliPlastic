<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonials;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use MongoDB\BSON\Binary;
class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Testimonials retrieved successfully',
            'data' => Testimonials::orderBy('created_at', 'desc')->get()
        ], 200);
    }

    public function show($id)
    {
        $testimonial = Testimonials::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimonial not found'], 404);
        }

        return response()->json([
            'message' => 'Testimonial retrieved successfully',
            'data' => $testimonial
        ], 200);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $binary = null;
        if ($request->hasFile('logo')) {
            $binary = new Binary(file_get_contents($request->file('logo')->getRealPath()));
        }

        $testimonials = Testimonials::create([
            'name' => $request->name,
            'logo' => $binary,
            'description' => $request->description ?: 'Kami bangga bermitra bersama dengan UMKM terpercaya seperti Rajawali Plastic.',
        ]);

        return response()->json([
            'message' => 'Testimony added successfully!',
            'testimonials' => $testimonials,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonials::find($id);
        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }
        if ($request->hasFile('logo')) {
            $testimonial->logo = new Binary(file_get_contents($request->file('logo')->getRealPath()));
        }

        $testimonial->name = $request->name ?? $testimonial->name;
        $testimonial->description = $request->description ?? $testimonial->description;
        $testimonial->save();

        return response()->json([
            'message' => 'Testimoni berhasil diupdate',
            'testimonials' => $testimonial,
        ], 200);
    }

    public function destroy($id)
    {
        $testimonial = Testimonials::find($id);
        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan'], 404);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Testimoni berhasil dihapus'], 200);
    }
}
