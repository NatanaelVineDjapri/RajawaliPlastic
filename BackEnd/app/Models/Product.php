<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;

class Product extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'products'; // optional
    protected $fillable = ['name', 'price', 'stock'];
}
