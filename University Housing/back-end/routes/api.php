<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentReqController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register' ,[UserController::class,'register'] );
Route::post('login' ,[UserController::class,'login' ] );
// Students
Route::post('Students/add', [StudentController::class, 'store']);
Route::get('Students', [StudentController::class, 'index']);
Route::get('Students/{ID}', [StudentController::class, 'show']);
Route::delete('Students/{ID}', [StudentController::class, 'destroy']);

// Students Req
Route::post('StudentsReq/Reg', [StudentReqController::class, 'store']);
Route::get('StudentsReq', [StudentReqController::class, 'index']);
Route::get('StudentsReq/{ID}', [StudentReqController::class, 'show']);
Route::delete('StudentsReq/{ID}', [StudentReqController::class, 'destroy']);

