<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with('user')->latest('_id')->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email',
            'product_name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'nullable|numeric|min:0',
            'status' => 'required|in:pending,proses,kirim,selesai',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->user_email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email user tidak ditemukan'], 404);
        }

        $today = now()->format('Ymd');
        $lastOrder = Order::where('order_no', 'like', "ORD-$today-%")
            ->orderBy('order_no', 'desc')
            ->first();

        $lastNumber = $lastOrder
            ? (int)substr($lastOrder->order_no, -3)
            : 0;

        $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        $orderNo = "RS-$today-$newNumber";

        $order = Order::create([
            'order_no' => $orderNo,
            'user_id' => $user->id,
            'user_email' => $user->email,
            'product_name' => $request->product_name,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price ?? 0,
            'status' => $request->status,
            'notes' => $request->notes ?? 'Sesuai kebutuhan pelanggan',
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }
    
    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_email' => 'sometimes|required|email',
            'product_name' => 'sometimes|required|string|max:255',
            'quantity' => 'sometimes|required|integer|min:1',
            'total_price' => 'sometimes|nullable|numeric|min:0',
            'status' => 'sometimes|required|in:pending,proses,kirim,selesai',
            'notes' => 'sometimes|nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->has('user_email')) {
            $user = User::where('email', $request->user_email)->first();
            if (!$user) {
                return response()->json(['message' => 'Email user tidak ditemukan'], 404);
            }
            $request->merge([
                'user_id' => $user->id,
                'user_email' => $user->email,
            ]);
        }

        $order->update($request->only([
            'user_id',
            'user_email',
            'product_name',
            'quantity',
            'total_price',
            'status',
            'notes',
        ]));

        return response()->json([
            'message' => 'Order berhasil diperbarui',
            'data' => $order
        ], 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order tidak ditemukan'], 404);
        }

        $order->delete();
        return response()->json([
            'message' => 'Order berhasil dihapus'
        ], 200);
    }

    public function summary()
    {
        $summary = Order::raw(function ($collection) {
            return $collection->aggregate([
                [
                    '$group' => [
                        '_id' => '$user_id',
                        'total_orders' => ['$sum' => 1],
                        'total_quantity' => ['$sum' => '$quantity'],
                        'total_price' => ['$sum' => '$total_price'],
                    ]
                ]
            ]);
        });

        return response()->json($summary);
    }

    public function summaryDetail()
    {
        $summary = Order::raw(function ($collection) {
            return $collection->aggregate([
                [
                    '$group' => [
                        '_id' => [
                            'user_id' => '$user_id',
                            'user_email' => '$user_email'
                        ],
                        'total_orders' => ['$sum' => 1],
                        'total_quantity' => ['$sum' => '$quantity'],
                        'total_price' => ['$sum' => '$total_price'],
                    ]
                ],
                [
                    '$sort' => ['total_price' => -1]
                ]
            ]);
        });

        return response()->json($summary);
    }
}
