<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\BSON\Binary;

class Gallery extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'gallery';

    protected $fillable = [
        'title',
        'image',
        'description',
    ];

     protected $hidden = ['image'];

    protected $appends = ['image_base64'];

    public function getImageBase64Attribute()
    {
        if ($this->image instanceof Binary) {
            return base64_encode($this->image->getData());
        }
        return null;
    }
}
