<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => "required|string|min:6|max:12|confirmed",

        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()], 422);
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

        // $token = $user->createToken('RajawaliPlastic'.$user->email.'Untar')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi Berhasil, Silakan Login!',
            'user' => $user,
            // 'token'=> $token
        ]);
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

        $token = $user->createToken('Token for user ' . $user->email)->plainTextToken;

        return response()->json([
            'message' => 'Login Success',
            'user' => $user,
            'role' => $user->role,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
  
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil!'
        ]);
    }

}
