import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


function StudentReq(){
    const [firstName, setFirstName] =useState('');
    const [lastName, setLastName] =useState('');
    const [fatherName, setFatherName] =useState('');
    const [date, setDate] =useState('');
    const [college, setCollege] =useState('');
    const [level, setLevel] =useState('');
    const [number, setNumber] =useState('');
    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    useEffect(() => {
        if(!user)
        {
            navigate('/');
        }

    },[])
    async function Sreq(){
        
        if(!(firstName && lastName && fatherName && date && college && level && number)){
            swal("خطأ", "يجب تعبئة جميع الخانات", "error");
            return
        }
        

        const formData=new FormData();
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('fatherName',fatherName);
        formData.append('birthDay',date);
        formData.append('college',college);
        formData.append('level',level);
        formData.append('phoneNumber',number);

        let result = await fetch("http://127.0.0.1:8000/api/StudentsReq/Reg", {
            method:"POST",
            body:formData
        });
        swal("نجاح", "تم إرسال الطلب بنجاح", "success");
    }

    return(

        <>
  
        <h1 className="text-success">طلب تسجيل على السكن</h1>
            <table cellPadding='0' cellSpacing='0' style={{textlign: "right"}} className='table table-hover table-striped'>
            <tbody> 
            <tr><td><input type="text"  autoFocus
            onChange={(e)=>setFirstName(e.target.value)} /> </td><td>الاسم</td> </tr>

            <tr><td>  <input type="text" 
            onChange={(e)=>setLastName(e.target.value)} /> </td><td>اللقب</td> </tr>

            <tr><td>  <input type="text" 
            onChange={(e)=>setFatherName(e.target.value)} /> </td><td>اسم الأب </td> </tr>

            <tr><td>  <input type="date" 
            onChange={(e)=>setDate(e.target.value)} /> </td><td> تاريخ الولادة</td> </tr>

            <tr><td>   <select onChange={(e)=>setCollege(e.target.value)}>
            <option  value="">--غير محدد--</option>
            <option value="كلية الهندسة المعلوماتية ">كلية الهندسة المعلوماتية </option>
            <option value="كلية الهندسة المدنية">كلية الهندسة المدنية</option>
            <option value="كلية الهندسة الكيميائية">كلية الهندسة الكيميائية </option>
            <option value="كلية الهندسة الميكاترونيكس">كلية هندسة الميكاترونيكس </option>
            <option value ="كلية التربية قسم معلم صف">كلية التربية </option>
            <option value ="كلية الأدارة والأقتصاد">كلية الإدارة والأقتصاد</option> 
            <option value ="كلية الشريعة والقانون">كلية الشريعة والقانون</option>
            </select></td><td>الكلية </td> </tr> 

            <tr><td><select onChange={(e)=>setLevel(e.target.value)}>
            <option  value="">--غير محدد--</option>
            <option  value="1">الأولى</option>
            <option  value="2">الثانية</option>
            <option  value="3">الثالثة</option>
            <option  value="4">الرابعة</option>
            </select></td><td> السنة الدراسية </td> </tr>

            <tr><td><input type="text"
            onChange={(e)=>setNumber(e.target.value)} /> </td><td> رقم التواصل</td> </tr>
            </tbody>
            </table>
            <button onClick={Sreq} className='btn btn-success'> submit </button>
        </>
    )
}

export default StudentReq;


