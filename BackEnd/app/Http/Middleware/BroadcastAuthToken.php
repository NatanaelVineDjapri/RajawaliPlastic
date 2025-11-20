<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BroadcastAuthToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('authToken');
        if ($token) {
            $user = User::where('api_token', $token)->first();
            if ($user) {
                Auth::login($user);
            }
        }

        return $next($request);
    }
}
