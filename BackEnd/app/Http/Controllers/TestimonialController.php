<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonials;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(Testimonials::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $testimonials = Testimonials::create([
            'name' => $request->name,
            'logo' => $request->logo ?: '', // default logo kalau kosong
            'description' => $request->description ?: 'Kami bangga bermitra bersama dengan UMKM terpercaya seperti Rajawali Plastic.',
        ]);

        return response()->json([
            'message' => 'Testimoni berhasil ditambahkan',
            'testimonials' => $testimonials,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonials::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'logo' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $testimonial->update([
            'name' => $data['name'] ?? $testimonial->name,
            'logo' => $data['logo'] ?? '/images/default-logo.png',
            'description' => $data['description'] ?? 'Kami bangga bermitra bersama dengan UMKM terpercaya seperti Rajawali Plastic.',
        ]);

        return response()->json([
            'message' => 'Testimoni berhasil diupdate',
            'testimonials' => $testimonial,
        ], 200);
    }

    public function destroy($id)
    {
        $testimonial = Testimonials::find($id);

        if (!$testimonial) {
            return response()->json([ 'message' => 'Testimoni tidak ditemukan'], 404);
        }

        $testimonial->delete();

        return response()->json([
            'message' => 'Testimoni berhasil dihapus'
        ],200);
    }
}
