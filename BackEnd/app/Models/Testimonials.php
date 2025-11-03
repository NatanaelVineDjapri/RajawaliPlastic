<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Testimonials extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'testimonials';

    protected $fillable =[
        'name',
        'logo',
        'description',
    ];
}
