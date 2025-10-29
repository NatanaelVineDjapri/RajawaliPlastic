<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\GalleryController;

Route::prefix('rs')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/galleries', [GalleryController::class, 'index']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/messages/{receiverId}', [MessageController::class, 'index']);
        Route::post('/messages', [MessageController::class, 'store']);
        Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
        Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

        Route::middleware('role:user')->group(function () {
            //kosong
        });

        Route::middleware('role:admin')->group(function () {
            Route::post('/products', [ProductController::class, 'store']);
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::delete('/products/{id}', [ProductController::class, 'destroy']);

            Route::post('/testimonials', [TestimonialController::class, 'store']);
            Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
            Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

            Route::post('/galleries', [GalleryController::class, 'store']);
            Route::put('/galleries/{id}', [GalleryController::class, 'update']);
            Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);
        });
    });
});
