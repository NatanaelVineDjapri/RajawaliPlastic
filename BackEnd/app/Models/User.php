<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use MongoDB\Laravel\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasApiTokens, Notifiable;

    /**
     * MongoDB connection and collection
     */
    protected $connection = 'mongodb'; // optional, default dari config
    protected $collection = 'users';   // nama collection MongoDB

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'name',
        'email',
        'role',
        'phone_number',
        'address',
        'image',
        'password',
        'api_token',
    ];

    /**
     * Attributes hidden in serialization
     */
    protected $hidden = [
        'password',
        'remember_token',
        'api_token',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Laravel 10 auto-hash
    ];

    /**
     * Relationships
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isUser()
    {
        return $this->role === 'user';
    }
}
