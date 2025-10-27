<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::prefix('rs')->group(function() {


    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function() {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::middleware('role:user')->group(function(){
            //kosongan dlu
        });

        Route::middleware('role:admin')->group(function(){
            //kosongan dlu
        });
    });

});
