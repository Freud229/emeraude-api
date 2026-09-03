<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatalogueController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\VideoController;

// ROUTES PUBLIQUES
Route::prefix('public')->group(function () {
    Route::get('/catalogues', [CatalogueController::class, 'public']);
    Route::get('/videos', [VideoController::class, 'public']);
});

// AUTHENTIFICATION
Route::post('/auth/login', [AuthController::class, 'login']);

// ROUTES PROTÉGÉES
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Catalogues
    Route::get('/catalogues', [CatalogueController::class, 'index']);
    Route::post('/catalogues', [CatalogueController::class, 'store']);
    Route::get('/catalogues/{catalogue}', [CatalogueController::class, 'show']);
    Route::put('/catalogues/{catalogue}', [CatalogueController::class, 'update']);
    Route::delete('/catalogues/{catalogue}', [CatalogueController::class, 'destroy']);

    // Photos
    Route::get('/photos', [PhotoController::class, 'index']);
    Route::post('/photos', [PhotoController::class, 'store']);
    Route::patch('/photos/{photo}/toggle', [PhotoController::class, 'toggle']);
    Route::delete('/photos/{photo}', [PhotoController::class, 'destroy']);

    // Vidéos
    Route::get('/videos', [VideoController::class, 'index']);
    Route::post('/videos', [VideoController::class, 'store']);
    Route::patch('/videos/{video}/toggle', [VideoController::class, 'toggle']);
    Route::delete('/videos/{video}', [VideoController::class, 'destroy']);
});
