<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class AuthApi
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('authToken');

        if (!$token) {
            return response()->json(['message' => 'Token not provided'], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        auth()->login($user);

        return $next($request);
    }
}
