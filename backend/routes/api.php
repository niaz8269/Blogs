<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BlogController;
use App\Http\Controllers\Api\V1\BlogApprovalController;
use App\Http\Controllers\Api\V1\EngagementController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\CategoryController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\FeaturedPostController;
use App\Http\Controllers\Api\V1\SearchController;
use App\Http\Controllers\Api\V1\DashboardController;

Route::prefix('v1')->group(function () {
    // Public routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/featured-posts', [FeaturedPostController::class, 'publicIndex']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);
    Route::get('/tags', [TagController::class, 'index']);
    Route::get('/search', [SearchController::class, 'search']);

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Blog CRUD (except index/show which are public)
        Route::post('/blogs', [BlogController::class, 'store']);
        Route::put('/blogs/{blog}', [BlogController::class, 'update']);
        Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);
        
        // Blog approval workflow
        Route::post('/blogs/{blog}/submit', [BlogApprovalController::class, 'submit']);
        Route::post('/blogs/{blog}/approve', [BlogApprovalController::class, 'approve']);
        Route::post('/blogs/{blog}/reject', [BlogApprovalController::class, 'reject']);

        // Engagement
        Route::post('/blogs/{blog}/like', [EngagementController::class, 'like']);
        Route::delete('/blogs/{blog}/like', [EngagementController::class, 'unlike']);
        Route::post('/blogs/{blog}/bookmark', [EngagementController::class, 'bookmark']);
        Route::delete('/blogs/{blog}/bookmark', [EngagementController::class, 'unbookmark']);
        
        // Comments
        Route::post('/blogs/{blog}/comments', [CommentController::class, 'store']);
        Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);

        // Admin/Author routes
        Route::post('/categories', [CategoryController::class, 'store']);
        Route::post('/tags', [TagController::class, 'store']);
        
        Route::get('/featured-posts/admin', [FeaturedPostController::class, 'index']);
        Route::post('/featured-posts', [FeaturedPostController::class, 'store']);
        Route::delete('/featured-posts/{featuredPost}', [FeaturedPostController::class, 'destroy']);

        // Dashboards
        Route::get('/dashboard/author', [DashboardController::class, 'author']);
        Route::get('/dashboard/admin', [DashboardController::class, 'admin']);
    });
});
