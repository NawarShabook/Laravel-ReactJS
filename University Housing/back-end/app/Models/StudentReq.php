<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentReq extends Model
{
    use HasFactory;
    protected $fillable=['firstName', 'lastName', 'fatherName', 'birthDay', 'college', 'level', 'phoneNumber'];
}
