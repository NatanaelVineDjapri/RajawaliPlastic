<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'orders';

     protected $fillable = [
        'order_no',
        'user_id',
        'user_email',
        'products',      
        'total_price',   
        'status_delivery',
        'status_payment',
        'notes',
    ];
    protected $casts = [
        'products' => 'array',
        'total_price' => 'float',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // protected $casts = [
    //     'user_id' => 'objectid',
    // ];

}
