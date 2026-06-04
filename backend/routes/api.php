<?php

use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\LinkWppController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\MyHistoryController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Models\MyHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\CompanyInformationController;
use App\Http\Controllers\FacilitatorController;
use App\Http\Controllers\InscriptionsController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/link-wpp', LinkWppController::class);
    Route::apiResource('/services', ServiceController::class)->except('index', 'show');
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/banners', BannerController::class)->except('index', 'show');
    Route::put('/companyinformation/{id}', [CompanyInformationController::class, 'update']);
    Route::apiResource('/feedbacks', FeedbackController::class)->except('index');
    Route::apiResource('/faq', FaqController::class)->except('index');
    Route::apiResource('/inscriptions', InscriptionsController::class);
    
    Route::apiResource('/facilitator', FacilitatorController::class)->except('index', 'show');
});



Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::get('/feedbacks', [FeedbackController::class, 'index']);

Route::get('/faq', [FaqController::class, 'index']);
Route::get('/faq-all', [FaqController::class, 'getAll']);

Route::get('/companyinformation', [CompanyInformationController::class, 'index']);

Route::get('/link-wpp', [LinkWppController::class, 'index']);
Route::get('/link-wpp/{id}', [LinkWppController::class, 'show']);
Route::apiResource('/about-us', AboutUsController::class)->except('index', 'show');

Route::get('/banners', [BannerController::class, 'index']);
Route::get('/banners/{id}', [BannerController::class, 'show']);

Route::get('/about-us', [AboutUsController::class, 'index']);
Route::get('/about-us/{id}', [AboutUsController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::get('/facilitator', [FacilitatorController::class, 'index']);
Route::get('/facilitator/{id}', [FacilitatorController::class, 'show']);

require __DIR__ . '/auth.php';
