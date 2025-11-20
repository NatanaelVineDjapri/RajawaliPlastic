<?php

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Middleware: ['web', 'auth'] untuk otentikasi berbasis session/cookie.
|
*/
Broadcast::channel('chat.{userId}', function ($user, $userId) {
    if (!$user) return false;
    
    if ((string) $user->id === (string) $userId) return true;
    if (strtolower($user->role) === 'admin') return true;

    return false;
});