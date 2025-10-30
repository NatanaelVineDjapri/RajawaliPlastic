<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    // 🔹 Lihat semua order
    public function index()
    {  
        return response()->json(Order::with('user')->latest()->get());
    }

    // 🔹 Tambah order baru
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id'      => 'required|exists:users,id',
            'product_name' => 'required|string|max:255',
            'quantity'     => 'required|integer|min:1',
            'total_price'  => 'nullable|numeric|min:0',
            'status'       => 'required|in:pending,proses,kirim,selesai',
            'notes'        => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::create([
            'user_id'      => $request->user_id,
            'product_name' => $request->product_name,
            'quantity'     => $request->quantity,
            'total_price'  => $request->total_price ?? null,
            'status'       => $request->status,
            'notes'        => $request->notes ?? 'Sesuai kebutuhan pelanggan',
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'data'    => $order
        ], 201);
    }

    // 🔹 Update order
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_id'      => 'sometimes|required|exists:users,id',
            'product_name' => 'sometimes|required|string|max:255',
            'quantity'     => 'sometimes|required|integer|min:1',
            'total_price'  => 'sometimes|nullable|numeric|min:0',
            'status'       => 'sometimes|required|in:pending,proses,kirim,selesai',
            'notes'        => 'sometimes|nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 🟡 Update pakai $request->only() biar gak overwrite field yang gak dikirim
        $order->update($request->only([
            'user_id',
            'product_name',
            'quantity',
            'total_price',
            'status',
            'notes',
        ]));

        return response()->json([
            'message' => 'Order berhasil diperbarui',
            'data'    => $order
        ], 200);
    }

    public function destroy($id){
        $order = Order::find($id);
        if(!$order){
            return response()->json(['message'=> 'Order tidak ditemukan'],404);
        }

        $order->delete();
        return response()->json([
            'message' => 'Order berhasil dihapus'
        ],200);
    }
}
