<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
 use Intervention\Image\Facades\Image;
//  use Intervention\Image\ImageManagerStatic as Image;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:users',
            'password' => [
                'required', 'min:6',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[!:;,@&#.]/'
            ],
            'confirm_password' => 'required|same:password'
        ]);
        $user = new User();
        $user->name = $request->input('name');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->crypted_email = crypt($user->email,'sns');
        $user->password = Hash::make($request->password);

        $letters ="0123456789ABCDEF";
        $color=sprintf('%06X',mt_rand(0,0xFFFFFF));
        $profile="https://ui-avatars.com/api/?background=".$color."&color=fff&name=".$user->name."+".$user->lastname."&rounded=true";
        $user->profile = $profile;

        
        $res = $user->save();
        if ($res) {
            return response()->json([
                'success' => 'registred successfuly'
            ]);
        } else {
            return response()->json([
                'fail'=> 'Something wrong'
            ]);
        }
    }

    public function login(Request $request){
        $request->validate([
            
            'email'=> 'required|email',
            'password'=> [
                'required','min:6',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[!:;,@&#.]/'
            ]
            
        ]);
        $user = User::where('email','=',$request->email)->first();
        if ($user) {
            if (Hash::check($request->password,$user->password)) {
                // $request->session()->put('LoginId',$user->id);
                return response()->json([
                    'user'=> $user,
                    'email'=>$user->email
                ]); 
                
            }else{
                return response()->json([
                        'error'=>['password'=>['the password is incorrect']],
                        'message'=>'Your password is incorrect'
                    
                    
                ]);
            }
            
        }else{
            return response()->json(['error'=>['email'=>['the email is not  registered']],
            'message'=>'the email is not  registered']);
        }
        
        
    }

    public function dashboard($cookie){
        $user = User::where('email','=',$cookie)->first();
        // dd(decrypt($cookie,'st'));
        return response()->json([
            'user'=>$user
        ]);
    }
}
