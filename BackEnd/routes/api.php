<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\blogController;
use App\Http\Controllers\PartnerController;

Route::prefix('rs')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/testimonials', action: [TestimonialController::class, 'index']);
    Route::get('/galleries', action: [GalleryController::class, 'index']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/partners', [PartnerController::class, 'index']);

    // Route::middleware('auth.api')->group(function (): void {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/messages/{receiverId}', [MessageController::class, 'index']);
        Route::post('/messages', [MessageController::class, 'store']);
        Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
        Route::delete('/messages/{id}', [MessageController::class, 'destroy']);

 
        // Route::middleware('role:admin')->group(function () {
            Route::post('/products', [ProductController::class, 'store']);
            Route::get('/products/last-edited', [ProductController::class, 'lastEdited']);
            Route::get('/products/{id}', [ProductController::class, 'show']);
             
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::delete('/products/{id}', [ProductController::class, 'destroy']);

           

            Route::post('/testimonials', [TestimonialController::class, 'store']);
            Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
            Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

            Route::post('/galleries', [GalleryController::class, 'store']);
            Route::put('/galleries/{id}', [GalleryController::class, 'update']);
            Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);

            Route::post('/orders', [OrderController::class, 'store']);
            Route::get('/orders/{id}', [OrderController::class, 'show']);      
            Route::put('/orders/{id}', [OrderController::class, 'update']);
            Route::delete('/orders/{id}', [OrderController::class, 'destroy']);
            Route::get('/orders/summary', [OrderController::class, 'summary']);
            Route::get('/orders/summary-detail', [OrderController::class, 'summaryDetail']);
            
            Route::get('/sliders', [SliderController::class, 'index']);
            Route::post('/sliders', [SliderController::class, 'store']);
            Route::delete('/sliders/{id}', [SliderController::class, 'destroy']);

            Route::post('/blogs', [BlogController::class, 'store']);
            Route::put('/blogs/{id}', [BlogController::class, 'update']);
            Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

            Route::post('/partners', [PartnerController::class, 'store']);
            Route::delete('/partners/{id}', [PartnerController::class, 'destroy']);
        // });
    // });
});
