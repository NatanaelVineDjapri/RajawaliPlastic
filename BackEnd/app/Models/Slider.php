<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Slider extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'products';

    protected $fillable = [
        'image'
    ];
}
