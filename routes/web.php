<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HeritageController;
use App\Http\Controllers\HeritageTypeController;
use App\Http\Controllers\Api\IndonesiaController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('/heritage-types', [HeritageTypeController::class, 'index'])->name('heritage-types.index');
    // Route::post('/heritage-types', [HeritageTypeController::class, 'store'])->name('heritage-types.store');
    // Route::put('/heritage-types/{id}', [HeritageTypeController::class, 'update'])->name('heritage-types.update');
    // Route::delete('/heritage-types/{id}', [HeritageTypeController::class, 'destroy'])->name('heritage-types.destroy');

    // Route::get('/heritage', [HeritageController::class, 'index'])->name('heritage.index');
    // Route::get('/heritage/create', [HeritageController::class, 'create'])->name('heritage.create');
    // Route::post('/heritage', [HeritageController::class, 'store'])->name('heritage.store');
    // Route::get('/heritage/{id}/edit', [HeritageController::class, 'edit'])->name('heritage.edit');
    // Route::put('/heritage/{id}', [HeritageController::class, 'update'])->name('heritage.update');
    // Route::delete('/heritage/{id}', [HeritageController::class, 'destroy'])->name('heritage.destroy');

    Route::resource('heritage-types', HeritageTypeController::class)->names('heritage-types');
    Route::resource('heritage', HeritageController::class)->names('heritage');
});

Route::get('/api/indonesia/provinces', [IndonesiaController::class, 'provinces']);
Route::get('/api/indonesia/cities', [IndonesiaController::class, 'cities']);
Route::get('/api/indonesia/districts', [IndonesiaController::class, 'districts']);
Route::get('/api/indonesia/villages', [IndonesiaController::class, 'villages']);

require __DIR__ . '/auth.php';
