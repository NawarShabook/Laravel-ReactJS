import {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Header from '../Header';
function ReqId(){
    const {reqId} = useParams();

    const [requestStd, setRequestStd] =useState('');
    const [firstName, setFirstName] =useState('');
    const [lastName, setLastName] =useState('');
    const [fatherName, setFatherName] =useState('');
    const [date, setDate] =useState('');
    const [college, setCollege] =useState('');
    const [level, setLevel] =useState('');
    const [room, setRoom] =useState('');
    const [number, setNumber] =useState('');
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    useEffect(() => {
        if(!user)
        {
            navigate('/');
        }
        else
        {   
            if(user.role=='student')
            {
                navigate('/');
            }
        }
        // getStudentReq()
        getStudentReq();
        setData();

    },[requestStd])
    async function getStudentReq(){
        const response = await fetch(`http://localhost:8000/api/StudentsReq/${reqId}`)
        .then((response) => response.json())
        .then((json) =>{
            if(!requestStd){
                setRequestStd(json)
            }
        })
        .catch((error) => alert(error));
            
    }
    async function setData(){
        setFirstName(requestStd.firstName);
        setLastName(requestStd.lastName);
        setFatherName(requestStd.fatherName);
        setDate(requestStd.birthDay);
        setCollege(requestStd.college);
        setLevel(requestStd.level);
        setRoom(requestStd.room);
        setNumber(requestStd.phoneNumber); 
    }
    async function add(){
        alert(firstName , lastName , fatherName , date , college , level , room , number)
        if(!(firstName && lastName && fatherName && date && college && level && room && number)){
            swal("خطأ", "يجب تعبئة جميع الخانات", "error");
            return
        }

        
        console.warn(firstName, lastName, fatherName,
            date, college, level, room, number);

        const formData=new FormData();
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('fatherName',fatherName);
        formData.append('birthDay',date);
        formData.append('college',college);
        formData.append('level',level);
        formData.append('room',room);
        formData.append('phoneNumber',number);

        let result = await fetch("http://127.0.0.1:8000/api/Students/add", {
            method:"POST",
            body:formData
        });
        swal("نجاح", "تم إضافة الطالب بنجاح", "success");


        fetch(`http://localhost:8000/api/StudentsReq/${reqId}`, {
                    method:'DELETE'
                }).then((res)=>res.json())
                .then((res)=>swal("message", "تم الحذف الطلب", "info"))
                navigate('/StudentsReq');
    }
    const deleteٍRequest = ()=>{
        swal({
            title: "هل أنت متأكد",
            text: "بعد التأكيد لن تستطيع التراجع عن الحذف",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((data)=> {
            if(data){
                fetch(`http://localhost:8000/api/StudentsReq/${reqId}`, {
                    method:'DELETE'
                }).then((res)=>res.json())
                .then((res)=>swal("message", res.result, "info"))
                navigate('/StudentsReq')
            }
            else{
                swal("تم إلغاء الحذف");
            }
        })
    }

    return(

        <>
        <h1 className="text-success"> طلب تسجيل طالب في السكن</h1>
            <table cellPadding='0' cellSpacing='0' style={{textlign: "right"}} className='table table-hover table-striped'>
            <tbody> 
            <tr><td><input type="text" value={firstName}
            onChange={(e)=>setFirstName(e.target.value)} /> </td><td>الاسم</td> </tr>

            <tr><td>  <input type="text" value={lastName}
            onChange={(e)=>setLastName(e.target.value)} /> </td><td>اللقب</td> </tr>

            <tr><td>  <input type="text" value={fatherName}
            onChange={(e)=>setFatherName(e.target.value)} /> </td><td>اسم الأب </td> </tr>

            <tr><td>  <input type="date" value={date}
            onChange={(e)=>setDate(e.target.value)} /> </td><td> تاريخ الولادة</td> </tr>

            <tr><td> <input  value={college} onChange={(e)=>setCollege(e.target.value)}>
            
            </input></td><td>الكلية </td> </tr> 

            <tr><td><input value={level}
            onChange={(e)=>setLevel(e.target.value)} /></td><td> السنة الدراسية </td> </tr>

            <tr><td><input type="number"
            onChange={(e)=>setRoom(e.target.value)}/> </td><td>رقم الغرفة</td> </tr>

            <tr><td><input type="text" value={number}
            onChange={(e)=>setNumber(e.target.value)} /> </td><td> رقم التواصل</td> </tr>
            <tr><td><input type="text" disabled value={requestStd.createdAt} /> </td><td> تاريخ تقديم الطلب</td> </tr>
            </tbody>
            </table>
            <button onClick={add} className='btn btn-success'> submit </button>
            <br /><br />
            <button onClick={deleteٍRequest} className='btn btn-danger'> حذف الطلب </button>
        </>
    )
}

export default ReqId;