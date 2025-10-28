<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MessageController;

Route::prefix('rs')->group(function () {


    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);


    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/messages/{receiverId}', [MessageController::class, 'index']);
        Route::post('/messages', [MessageController::class, 'store']);
        Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
        Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
        
        Route::middleware('role:user')->group(function () {
            //kosongan dlu
        });

        Route::middleware('role:admin')->group(function () {
            //kosongan dlu
        });
    });

});
