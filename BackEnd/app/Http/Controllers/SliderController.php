<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        return response()->json(Slider::latest()->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        // Simpan file ke storage/app/public/sliders
        $path = $request->file('image')->store('sliders', 'public');

        // Simpan path relatif ke database (misal: storage/sliders/namafile.jpg)
        $slider = Slider::create([
            'image' => 'storage/' . $path,
        ]);

        return response()->json([
            'message' => 'Slider berhasil ditambahkan',
            'slider' => $slider,
        ], 201);
    }

    public function destroy($id)
    {
        $slider = Slider::find($id);
        if (!$slider) {
            return response()->json(['message' => 'Slider tidak ditemukan'], 404);
        }

        // Hapus file fisik di storage/public/sliders
        if ($slider->image && str_contains($slider->image, 'storage/')) {
            $oldPath = str_replace('storage/', '', $slider->image);
            Storage::disk('public')->delete($oldPath);
        }

        $slider->delete();

        return response()->json(['message' => 'Slider berhasil dihapus'], 200);
    }
}
