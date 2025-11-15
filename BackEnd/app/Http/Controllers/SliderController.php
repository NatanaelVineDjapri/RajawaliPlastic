<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Slider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    // public function index()
    // {
    //     return response()->json(Slider::latest()->get());
    // }

    public function index()
    {
        $sliders = Slider::orderBy('created_at', 'desc')->get();

        $sliders->transform(function ($item) {
            if (isset($item->image) && $item->image instanceof MongoDB\BSON\Binary) {
                $item->image = base64_encode($item->image->getData());
            }
            return $item;
        });

        return response()->json([
            'message' => 'Sliders retrieved successfully',
            'data' => $sliders
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('sliders', 'public');
        }

        $slider = Slider::create([
            'image' => $path ? asset('storage/' . $path) : null,
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

        if ($slider->image && str_contains($slider->image, 'storage/')) {
            $oldPath = str_replace('storage/', '', $slider->image);
            Storage::disk('public')->delete($oldPath);
        }

        $slider->delete();

        return response()->json(['message' => 'Slider berhasil dihapus'], 200);
    }
}
