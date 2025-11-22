<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;
use MongoDB\BSON\Binary;

class Message extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'messages';

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
        'image',
        'is_read'
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

    public function setMessageAttribute($value)
    {
        $this->attributes['message'] = Crypt::encryptString($value);
    }

    public function getMessageAttribute($value)
    {
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value;
        }
    }

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id', '_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id', '_id');
    }
}
