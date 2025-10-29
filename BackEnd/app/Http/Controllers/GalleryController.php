<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json([Gallery::all()]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'image' => 'required|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->errors()], 422);
        }

        $gallery = Gallery::create([
            'title' => $request->title ?: 'Galeri Rajawali Plastic',
            'image' => $request->image,
            'description' => $request->description ?: 'Foto kegiatan atau produk kami.',
        ]);

        return response()->json([
            'message' => 'Gallery item berhasil ditambahkan',
            'gallery' => $gallery,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return response()->json(['message' => 'Galeri tidak ditemukan'], 404);
        }

         $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        $gallery->update([
            'title' => $data['title'] ?? $gallery->title,
            'image' => $data['image'] ?? $gallery->image,
            'description' => $data['description'] ?? $gallery->description,
        ]);

        return response()->json([
            'message' => 'Gallery item berhasil diupdate',
            'gallery' => $gallery,
        ], 200);
    }

    public function destroy($id){
        $gallery = Gallery::find($id);
        if(!$gallery){
            return response()->json(['message' => 'Galeri item tidak ditemukan'], 404);
        }

        $gallery->delete();

        return response()->json(['message' => 'Gallery item berhasil dihapus']);
    }

}
