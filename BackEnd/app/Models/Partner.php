<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'gallery';

    protected $fillable = [
        'name',
        'logo_url',
        'link',
    ];
}
