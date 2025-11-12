<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Blog retrieved successfully',
            'data' => Blog::orderBy('created_at', 'desc')->get()
        ], 200);
    }

    public function show($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Detail blog ditemukan',
            'data' => $blog,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $slug = Str::slug($request->title);
        $path = null;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blog', 'public');
        }

        $blog = Blog::create([
            'title' => $request->title,
            'slug' => $slug,
            'description' => $request->description,
            'content' => $request->input('content'),
            'image' => $path
                ? asset('storage/' . $path)
                : asset('images/default-image.png'),
        ]);

        return response()->json([
            'message' => 'Blog berhasil ditambahkan',
            'blog' => $blog,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        if ($request->hasFile('image')) {
            if ($blog->image && str_contains($blog->image, 'storage/blog/')) {
                $oldPath = str_replace(asset('storage/'), '', $blog->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('blog', 'public');
            $blog->image = asset('storage/' . $path);
        }

        $blog->update([
            'title' => $request->title ?? $blog->title,
            'slug' => $request->title ? Str::slug($request->title) : $blog->slug,
            'description' => $request->description ?? $blog->description,
            'content' => $request->input('content') ?? $blog->content,
            'image' => $blog->image,
        ]);

        return response()->json([
            'message' => 'Blog berhasil diupdate',
            'blog' => $blog,
        ], 200);
    }


    public function destroy(Request $request, $id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog tidak ditemukan'], 404);
        }

        $blog->delete();

        return response()->json([
            'message' => 'Blog berhasil dihapus',
        ]);
    }
}
