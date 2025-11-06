<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Orders retrieved successfully',
            'data'    => Order::with('user')->latest('_id')->get()
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email',
            'product_id' => 'required|string|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'total_price' => 'nullable|numeric|min:0',
            'status' => 'required|in:pending,proses,kirim,selesai',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->user_email)->first();
        if (!$user) {
            return response()->json(['message' => 'User email not found'], 404);
        }

        $product = Product::find($request->product_id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $today = now()->format('Ymd');
        $lastOrder = Order::where('order_no', 'like', "RS-$today-%")
            ->orderBy('order_no', 'desc')
            ->first();
        $lastNumber = $lastOrder ? (int) substr($lastOrder->order_no, -3) : 0;
        $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        $orderNo = "RS-$today-$newNumber";

        $order = Order::create([
            'order_no' => $orderNo,
            'user_id' => $user->id,
            'user_email' => $user->email,
            'product_name' => $product->name,
            'quantity' => $request->quantity,
            'total_price' => $request->total_price ?? 0,
            'status_delivery' => $request->status,
            'status_payment' => 'pending',
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
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_email' => 'sometimes|required|email',
            'product_id' => 'sometimes|required|integer|exists:products,id',
            'quantity' => 'sometimes|required|integer|min:1',
            'total_price' => 'sometimes|nullable|numeric|min:0',
            'status_delivery' => 'sometimes|required|in:pending,proses,kirim,selesai',
            'status_payment' => 'sometimes|required|in:pending,paid,failed,refunded',
            'notes' => 'sometimes|nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->errors()], 422);
        }

        if ($request->has('user_email')) {
            $user = User::where('email', $request->user_email)->first();
            if (!$user) {
                return response()->json(['message' => 'User email not found'], 404);
            }
            $request->merge([
                'user_id' => $user->id,
                'user_email' => $user->email,
            ]);
        }

        if ($request->has('product_id')) {
            $product = Product::find($request->product_id);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
            $request->merge([
                'product_name' => $product->name,
            ]);
        }

        $order->update($request->only([
            'user_id',
            'user_email',
            'product_name',
            'quantity',
            'total_price',
            'status_delivery',
            'status_payment',
            'notes',
        ]));

        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $order
        ], 200);
    }

    public function destroy($id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $order->delete();
        return response()->json([
            'message' => 'Order deleted successfully'
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

        return response()->json(['data' => $summary]);
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

        return response()->json(['data' => $summary]);
    }
}