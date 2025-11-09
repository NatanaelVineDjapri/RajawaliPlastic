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
            'data' => Order::with('user')->latest('_id')->get()
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_email' => 'required|email',
            'products' => 'required|array|min:1',
            'products.*.product_id' => 'required|string|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.total_price' => 'nullable|numeric|min:0',
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

        $today = now()->format('Ymd');
        $lastOrder = Order::where('order_no', 'like', "RS-$today-%")
            ->orderBy('order_no', 'desc')
            ->first();
        $lastNumber = $lastOrder ? (int) substr($lastOrder->order_no, -3) : 0;
        $newNumber = str_pad($lastNumber + 1, 3, '0', STR_PAD_LEFT);
        $orderNo = "RS-$today-$newNumber";

        $productsData = [];
        $totalOrderPrice = 0;
        foreach ($request->products as $item) {
            $product = Product::find($item['product_id']);
            if (!$product) {
                return response()->json(['message' => "Product {$item['product_id']} not found"], 404);
            }

            $price = $item['total_price'] ?? 0;
            $totalOrderPrice += $price;

            $productsData[] = [
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $item['quantity'],
                'total_price' => $price,
            ];
        }

        $order = Order::create([
            'order_no' => $orderNo,
            'user_id' => $user->id,
            'user_email' => $user->email,
            'products' => $productsData,
            'total_price' => $totalOrderPrice,
            'status_delivery' => $request->status,
            'status_payment' => 'pending',
            'notes' => $request->notes ?? 'Sesuai kebutuhan pelanggan',
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order
        ], 201);
    }

    public function show($id)
{
    $order = Order::find($id);

    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    return response()->json([
        'message' => 'Order retrieved successfully',
        'data' => $order
    ], 200);
}

    public function update(Request $request, $id)
    {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'user_email' => 'sometimes|required|email',
            'products' => 'sometimes|required|array|min:1',
            'products.*.product_id' => 'required|string|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.total_price' => 'nullable|numeric|min:0',
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

        // Update products if ada
        if ($request->has('products')) {
            $productsData = [];
            $totalOrderPrice = 0;
            foreach ($request->products as $item) {
                $product = Product::find($item['product_id']);
                if (!$product) {
                    return response()->json(['message' => "Product {$item['product_id']} not found"], 404);
                }
                $price = $item['total_price'] ?? 0;
                $totalOrderPrice += $price;

                $productsData[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'quantity' => $item['quantity'],
                    'total_price' => $price,
                ];
            }
            $request->merge([
                'products' => $productsData,
                'total_price' => $totalOrderPrice,
            ]);
        }

        $order->update($request->only([
            'user_id',
            'user_email',
            'products',
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
                    '$unwind' => '$products'
                ],
                [
                    '$group' => [
                        '_id' => '$user_id',
                        'total_orders' => ['$sum' => 1],
                        'total_quantity' => ['$sum' => '$products.quantity'],
                        'total_price' => ['$sum' => '$products.total_price'],
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
                    '$unwind' => '$products'
                ],
                [
                    '$group' => [
                        '_id' => [
                            'user_id' => '$user_id',
                            'user_email' => '$user_email'
                        ],
                        'total_orders' => ['$sum' => 1],
                        'total_quantity' => ['$sum' => '$products.quantity'],
                        'total_price' => ['$sum' => '$products.total_price'],
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
