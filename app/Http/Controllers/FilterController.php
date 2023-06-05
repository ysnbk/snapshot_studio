<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilterController extends Controller
{
    public function saveFilter(Request $request){
        return response()->json([
            'dataTest'=>$request->all()
        ]);
    }
}
