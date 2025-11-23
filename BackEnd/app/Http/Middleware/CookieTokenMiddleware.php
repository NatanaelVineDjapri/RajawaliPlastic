<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CookieTokenMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response

    {
        $token = $request->cookie('authToken');
        if ($token && !Auth::check()) {
            $user = User::where('api_token', $token)->first();
            if ($user) {
                Auth::login($user); 
            }
        }

        if ($token) {
             $request->headers->set('Authorization', 'Bearer ' . $token);
        }

        return $next($request);
    }

}
