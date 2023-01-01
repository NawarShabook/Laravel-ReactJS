import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';
function StudentDetails(){


    const {studentId} = useParams();
    const [student, setStudent] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(!localStorage.getItem('user-info'))
        {
            navigate('/');
        }
        else
        {   
            if(localStorage.getItem('user-info').role=='student')
            {
                navigate('/');
            }
        }   
        
        fetch(`http://localhost:8000/api/Students/${studentId}`)
        
        .then((res)=>{if(!res.ok) { throw res } return res.json()})
        .then((data)=>setStudent(data))
        .catch(err=>swal("error", err.statusText, "error").then((error)=>{if(error){navigate("/Student")}}))
    },[])

    const deleteٍStudent = (studentID)=>{
        swal({
            title: "هل أنت متأكد",
            text: "بعد التأكيد لن تستطيع التراجع عن الحذف",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((data)=> {
            if(data){
                fetch(`http://localhost:8000/api/Students/${studentId}`, {
                    method:'DELETE'
                }).then((res)=>res.json())
                .then((res)=>swal("message", res.result, "info"))
                navigate('/Students')
            }
            else{
                swal("تم إلغاء الحذف");
            }
        })
    }
    return(
        <>
            <h1>Student Details</h1>
            <div className="table-responsive">
                <table className="table table-primary" style={{direction:'rtl'}}>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">الاسم واللقب</th>
                            <th scope="col">اسم الأب</th>
                            <th scope="col">الكلية</th>
                            <th scope="col">السنة الدراسية</th>
                            <th scope="col">تاريخ الميلاد  </th>
                            <th scope="col">رقم الغرفة</th>
                            <th scope="col">رقم الهاتف</th>
                            <th scope="col">تاريخ الإضافة</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td scope="row">{student.id}</td>
                            <td>{student.firstName+' '+student.lastName}</td>
                            <td>{student.fatherName}</td>
                            <td>{student.college}</td>
                            <td>{student.level}</td>
                            <td>{student.birthDay}</td>
                            <td>{student.room}</td>
                            <td>{student.phoneNumber}</td>
                            <td>{student.createdAt}</td>
                            <td><button className="btn btn-danger" onClick={()=>deleteٍStudent(student.id)}>حذف الطالب</button></td>
                            
                        </tr>
                    </tbody>
                </table>
            </div>
            

        </>

    )
}

export default StudentDetails;