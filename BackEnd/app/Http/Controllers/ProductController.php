<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index(){
        return Product::all();
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        if($validator->fails()){
            return response()->json(['messages'=>$validator->errors()],422);
        }

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_url' => $request->image_url,
        ]);

        return response()->json($product,200);
    }

    public function update(Request $request, $id){
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $product->update($validator->validated());

        return response()->json($product);
    }

    public function destroy($id){
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404);

        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
