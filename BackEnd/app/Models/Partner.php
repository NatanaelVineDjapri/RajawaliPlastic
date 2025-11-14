<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\BSON\Binary;

class Partner extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'partners';

    protected $fillable = [
        'name',
        'logo', 
        'link',
    ];

    protected $hidden = ['logo']; 
    protected $appends = ['logo_base64']; 
    public function getLogoBase64Attribute()
    {
        if ($this->logo instanceof Binary) {
            return base64_encode($this->logo->getData());
        }

        return null;
    }
}
