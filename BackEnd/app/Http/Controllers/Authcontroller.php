<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class Authcontroller extends Controller
{
    public function register (Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'email'=> 'required|string|email|max:255|unique:users',
            'password'=> "required|string|min:6|max:12|confirmed",
            
        ]);

        if($validator->fails()){
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

        $token = $user->createToken('RajawaliPlastic'.$user->email.'Untar')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi Berhasil, Silakan Login!',
            'user' => $user,
            'token'=> $token
        ]);
    }
}
