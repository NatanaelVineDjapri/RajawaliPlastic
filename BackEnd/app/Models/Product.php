<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\BSON\Binary;

class Product extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'products';

    protected $fillable = [
        'name',
        'description',
        'image_url', 
        'total_update'
    ];

    protected $hidden = ['image_url'];

    protected $appends = ['image_base64'];

    public function getImageBase64Attribute()
    {
        if ($this->image_url instanceof Binary) {
            return base64_encode($this->image_url->getData());
        }
        return null;
    }
}
