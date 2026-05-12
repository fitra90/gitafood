<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\BarangController;
use App\Http\Controllers\TransaksiBarangController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::get('/', function () {
    return response()->json(['message' => 'running']);
});
Route::post('/login', [LoginController::class, 'login']);

// Protected routes (require api_token)
Route::middleware('auth:api')->group(function () {
    Route::get('/user', [LoginController::class, 'user']);
    Route::post('/logout', [LoginController::class, 'logout']);

    // Barang
    Route::get('/barang', [BarangController::class, 'index']);
    Route::post('/barang', [BarangController::class, 'store']);
    Route::get('/barang/{barang}', [BarangController::class, 'show']);
    Route::put('/barang/{barang}', [BarangController::class, 'update']);
    Route::delete('/barang/{barang}', [BarangController::class, 'destroy']);

    // transaksi barang
    Route::get('/transaksi_barang', [TransaksiBarangController::class, 'index']);
    Route::post('/transaksi_barang', [TransaksiBarangController::class, 'store']);
});

