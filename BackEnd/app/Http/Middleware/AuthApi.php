<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthApi
{
    public function handle(Request $request, Closure $next)
    {
        
        $bearer = $request->bearerToken();

        if (!$bearer) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        $user = User::where('api_token', $bearer)->first();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $request->user = $user;

        return $next($request);
    }
}
