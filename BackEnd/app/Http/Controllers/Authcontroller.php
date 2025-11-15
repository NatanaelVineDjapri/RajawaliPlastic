<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => "required|string|min:6|max:12|confirmed",
            'address' => 'required|string|max:255',
            'phone_number' => 'required|string|min:10|max:13'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        if (User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Email sudah terdaftar'], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'address' => $request->address,
            'phone_number' => $request->phone_number,
            'role' => 'customer',
        ]);

        return response()->json([
            'message' => 'Registrasi Berhasil, Silakan Login!',
            'user' => $user,
        ], 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:12',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors()
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah!'
            ], 401);
        }

        $customWord = "RajawaliXUntar2025@9823";
        $randomPart = Str::random(60);
        $token = hash('sha256', $customWord . '_' . $randomPart);

        $user->update(['api_token' => $token]);

        $cookie = cookie(
            'authToken',
            $token,
            60 * 24 * 7,   // 7 hari
            '/',
            null,
            false,          // secure=false supaya bisa di localhost
            true,           // httpOnly
            false,
            'Lax'           // sameSite
        );

        return response()->json([
            'message' => 'Login Berhasil!',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ]
        ], 200)->withCookie($cookie);
    }

    public function logout(Request $request)
    {
        $token = $request->cookie('authToken');

        if ($token) {
            $user = User::where('api_token', $token)->first();
            if ($user) {
                $user->api_token = null;
                $user->save();
            }
        }

        $cookie = Cookie::forget('authToken');

        return response()->json([
            'message' => 'Logout berhasil!'
        ])->withCookie($cookie);
    }

    public function profile(Request $request)
    {
        $token = $request->cookie('authToken');

        if (!$token) {
            return response()->json(['message' => 'Token tidak ditemukan'], 401);
        }

        $user = User::where('api_token', $token)->first();
        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        return response()->json([
            'message' => 'Profile user ditemukan',
            'user' => $user
        ], 200);
    }

    public function updateProfile(Request $request)
    {
        $token = $request->cookie('authToken');

        if (!$token) {
            return response()->json(['message' => 'Token tidak ditemukan'], 401);
        }

        $user = User::where('api_token', $token)->first();
        if (!$user) {
            return response()->json(['message' => 'User tidak ditemukan'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'phone_number' => 'sometimes|string|min:10|max:13',
            'password' => 'sometimes|string|min:6|max:12|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $data = $validator->validated();

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json([
            'message' => 'Profil berhasil diperbarui!',
            'user' => $user
        ], 200);
    }
}
