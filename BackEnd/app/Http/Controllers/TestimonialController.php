<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Testimonials;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

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
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $path = null;
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('testimonials', 'public');
        }

        $testimonials = Testimonials::create([
            'name' => $request->name,
            'logo' => $path ? asset('storage/' . $path) : asset('images/default-logo.png'),
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
            if ($testimonial->logo && str_contains($testimonial->logo, 'storage/')) {
                $oldPath = str_replace(asset('storage/') . '/', '', $testimonial->logo);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('logo')->store('testimonials', 'public');
            $testimonial->logo = asset('storage/' . $path);
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

        if ($testimonial->logo && str_contains($testimonial->logo, 'storage/')) {
            $oldPath = str_replace(asset('storage/') . '/', '', $testimonial->logo);
            Storage::disk('public')->delete($oldPath);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Testimoni berhasil dihapus'], 200);
    }
}
