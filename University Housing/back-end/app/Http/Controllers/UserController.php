<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {

        $input=$request->all();
        $input['password']=Hash::make($input['password']);
        //coding the password
        $user=new User;
        $user->userName=$input['name'];
        $user->email=$input['email'];
        $user->password=$input['password'];
        $user->role=$input['role'];
        $user->save();
        return response()->json( ["message"=>"success" ,"userName"=>$user->userName, "role"=>$user->role],200);
    }

    public function login(Request $req)
    {
        $user = User::where('email', $req->email )->where('role', $req->role)->first();
        if(!$user || !Hash::check($req->password,$user->password))
        {
            return response()->json( ["message"=>"Email or password is not matched"],401);

        }
        else{
            return response()->json( ["message"=>"success", "userName"=>$user->userName, "role"=>$user->role],200);
        }
        // return $user;
    }
}
