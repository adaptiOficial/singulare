<?php

use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
});
Route::apiResource('/about-us', AboutUsController::class)->except('index', 'show');

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/about-us', [AboutUsController::class, 'index'] );
Route::get('/about-us/{id}', [AboutUsController::class, 'show'] );

require __DIR__.'/auth.php';
