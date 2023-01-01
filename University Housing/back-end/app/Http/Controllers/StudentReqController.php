<?php

namespace App\Http\Controllers;

use App\Models\StudentReq;
use Illuminate\Http\Request;

class StudentReqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $studentsReq=StudentReq::all();


        // dd($students);

        // return view('student',['students'=> $students]);
        return $studentsReq;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        StudentReq::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StudentReq  $studentReq
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $studentReq = StudentReq::find($id);
        $studentReq->createdAt=$studentReq->created_at->diffForHumans();
        return $studentReq;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\StudentReq  $studentReq
     * @return \Illuminate\Http\Response
     */
    public function edit(StudentReq $studentReq)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StudentReq  $studentReq
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StudentReq $studentReq)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StudentReq  $studentReq
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result=StudentReq::where('id',$id)->delete();
        if($result){
            return ['result'=> 'تم الحذف بنجاح'];
        }
    }
}
