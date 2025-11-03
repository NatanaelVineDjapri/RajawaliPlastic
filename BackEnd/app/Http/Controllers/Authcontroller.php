<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|',
            'password' => "required|string|min:6|max:12|confirmed",

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
            'address' => 'Belum Diisi',
            'phone_number' => 'Belum Diisi',
            'role' => 'customer',
            'image' => url(''), //belum disi wkwkkw
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
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Wrong Email or Password'], 401);
        }

        $customWord = "RajawaliXUntar2025@9823";
        $randomPart = Str::random(40);
        $token = hash('sha256', $customWord . '_' . $randomPart);

        $user->api_token = $token;
        $user->save();
        return response()->json([
            'message' => 'Login Success',
            'user' => $user,
            'role' => $user->role,
            'token' => $token
        ], 200);
    }

    public function logout(Request $request)
    {

        $user = $request->user;
        $user->api_token = null;
        $user->save();

        return response()->json([
            'message' => 'Logout berhasil!'
        ], 200);
    }

}
