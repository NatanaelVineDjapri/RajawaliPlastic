<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class Message extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'messages';

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
        'image_url',
        'is_read'
    ];

    public function setMessageAttribute($value)
    {
        $this->attributes['message'] = Crypt::encryptString($value);
    }

    public function getMessageAttribute($value)
    {
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value; // fallback: tampilkan teks asli kalau gagal decrypt
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
