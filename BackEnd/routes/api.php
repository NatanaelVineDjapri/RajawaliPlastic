<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\PartnerController;
use Illuminate\Http\Request;

Route::prefix('rs')->group(function () {
    Route::post('/broadcasting/auth', function (Request $request) {
        return Broadcast::auth($request);
    })->middleware('auth.api');

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/galleries', [GalleryController::class, 'index']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/partners', [PartnerController::class, 'index']);
    Route::get('/profile', action: [AuthController::class, 'profile']);
    Route::get('/admin-for-chat', [AuthController::class, 'getAdminUserForChat']);

    // Route::middleware('auth.api')->group(function (): void {
        Route::put('/profile/update', [AuthController::class, 'updateProfile']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/messages/{receiverId}', [MessageController::class, 'index']);
        Route::post('/messages', [MessageController::class, 'store']);
        Route::put('/messages/{id}/read', [MessageController::class, 'markAsRead']);
        Route::delete('/messages/{id}', [MessageController::class, 'destroy']);
    
        Route::get('/conversations', [MessageController::class, 'getConversations']);
    
        // Route::middleware('role:admin')->group(function () {
            Route::post('/products', [ProductController::class, 'store']);
            Route::get('/products/last-edited', [ProductController::class, 'lastEdited']);
            Route::get('/products/{id}', [ProductController::class, 'show']);
            
            Route::put('/products/{id}', [ProductController::class, 'update']);
            Route::delete('/products/{id}', [ProductController::class, 'destroy']);

            Route::post('/testimonials', [TestimonialController::class, 'store']);
            Route::get('/testimonials/{id}', [TestimonialController::class, 'show']); 	
            Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
            Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);

            Route::post('/galleries', [GalleryController::class, 'store']);
            Route::put('/galleries/{id}', [GalleryController::class, 'update']);
            Route::delete('/galleries/{id}', [GalleryController::class, 'destroy']);            
            
            Route::post('/orders', [OrderController::class, 'store']);
            Route::get('/orders/summary', [OrderController::class, 'summary']);
            Route::get('/orders/summary-detail', [OrderController::class, 'summaryDetail']);
            Route::get('/orders/{id}', [OrderController::class, 'show']); 	
            Route::put('/orders/{id}', [OrderController::class, 'update']);
            Route::delete('/orders/{id}', [OrderController::class, 'destroy']);

            Route::get('/users', [AuthController::class, 'getAllUsers']);
            Route::delete('/users/{id}', [AuthController::class, 'deleteUser']);
            
            Route::get('/sliders', [SliderController::class, 'index']);
            Route::post('/sliders', [SliderController::class, 'store']);
            Route::delete('/sliders/{id}', [SliderController::class, 'destroy']);

            Route::post('/blogs', [BlogController::class, 'store']);
            Route::get('/blogs/{id}', [BlogController::class, 'show']); 	
            Route::put('/blogs/{id}', [BlogController::class, 'update']);
            Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

            Route::post('/partners', [PartnerController::class, 'store']);
            Route::get('/partners/{id}', [PartnerController::class, 'show']); 	

            Route::delete('/partners/{id}', [PartnerController::class, 'destroy']);
        // });
    // });
});