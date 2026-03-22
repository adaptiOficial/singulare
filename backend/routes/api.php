<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LinkWppController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\CompanyInformationController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/link-wpp', LinkWppController::class);
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/banners', BannerController::class)->except('index', 'show');
   
Route::put('/companyinformation/{id}', [CompanyInformationController::class, 'update']);
    Route::apiResource('/feedbacks', FeedbackController::class)->except('index');


Route::apiResource('/faq',FaqController::class)->except('index');
    

    Route::apiResource('contacts', ContactController::class);
   
 
});

 Route::get('/feedbacks', [FeedbackController::class,'index']);

Route::get('/faq', [FaqController::class, 'index']);


  
 Route::get('/companyinformation', [CompanyInformationController::class, 'index']);


Route::get('/link-wpp', [LinkWppController::class, 'index']);
Route::get('/link-wpp/{id}', [LinkWppController::class, 'show']);

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/banners', [BannerController::class, 'index'] );
Route::get('/banners/{id}', [BannerController::class, 'show'] );

require __DIR__.'/auth.php';
