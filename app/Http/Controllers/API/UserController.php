<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return User::latest()->paginate(10);
    }

    public function store(Request $request)
    {

        $this->validate($request,[
            'name'  => 'required|string|max:255',
            'email'  => 'required|string|email|max:255|unique:users',
            'password'  => 'required|string|min:6',

        ]);
        return User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'type' => $request['type'],
            'bio' => $request['bio'],
            'photo' => $request['photo'],
            'password' => Hash::make($request['password']),

        ]);
    }


    public function show($id)
    {
        //
    }
    public function updateProfile(Request $request)
    {
        $user = auth('api')->user(); //check authenticated user

        $this->validate($request,[
            'name'  => 'required|string|max:255',
            'email'  => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password'  => 'sometimes|required|min:6',

        ]);

        $currentPhoto = $user->photo;
        $requestphoto = $request->photo;
        if($requestphoto != $currentPhoto){ //check image
            $name = time().'.' . explode('/', explode(':', substr($requestphoto, 0,
            strpos($requestphoto, ';')))[1])[1];
            \Image::make($requestphoto)->save(public_path('img/profile/').$name);
            $request->merge(['photo' => $name]);

            $userPhoto = public_path('/img/profile/').$currentPhoto; // delete current photo if the user update his/her photo
            if(file_exists($userPhoto)){
                @unlink($userPhoto);

            }
        }
        if(!empty($request->password)){
            $request->merge(['password' => Hash::make($request['password'])]);

        }
        $user->update($request->all());
        return ['message' => 'Successful'];
    }
    
    public function profile()
    {
        return auth('api')->user();
    }
    

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $this->validate($request,[
            'name'  => 'required|string|max:255',
            'email'  => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password'  => 'sometimes|string|min:6',

        ]);

        $user->update($request->all());
        return ['message' => 'Updated user'];
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        //delete the user
        //redirect
        $user->delete();
        return  ['message' => 'User Deleted'];
    }
}
