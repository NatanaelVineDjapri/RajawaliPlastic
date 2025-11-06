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
        'user_id',     
        'user_email',    
        'product_name',
        'order_no',
        'quantity',
        'total_price',
        'status_delivery',
        'status_payment',
        'notes',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // protected $casts = [
    //     'user_id' => 'objectid',
    // ];

}
