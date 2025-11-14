<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use MongoDB\BSON\Binary;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();

        return response()->json([
            'message' => 'Products retrieved successfully',
            'data' => $products
        ], 200);
    }

    public function lastEdited()
    {
        $products = Product::where('total_update', '>', 0)
            ->orderBy('updated_at', 'desc')
            ->take(100)
            ->get()
            ->filter(fn($p) => $p->updated_at != $p->created_at)
            ->take(5);

        return response()->json([
            'message' => 'Last edited products retrieved successfully',
            'data' => $products->values()
        ], 200);
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json([
            'message' => 'Product retrieved successfully',
            'data' => $product
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->errors()], 422);
        }

        $binary = null;
        if ($request->hasFile('image')) {
            $binary = new Binary(file_get_contents($request->file('image')->getRealPath()));
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_url' => $binary,
            'total_update' => 0,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('image')) {
            $product->image_url = new Binary(file_get_contents($request->file('image')->getRealPath()));
        }

        $product->name = $request->name ?? $product->name;
        $product->description = $request->description ?? $product->description;
        $product->total_update = $product->total_update + 1;
        $product->save();

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product
        ], 200);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
