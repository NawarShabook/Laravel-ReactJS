import {useState} from 'react';
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Header from '../Header';
function ShowStudent(){

    const [StudentReq, setStudentReq] = useState([]);
    const navigate=useNavigate();
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
        getAllStudentReq();
    },[])

    const getAllStudentReq= ()=>{
        fetch('http://localhost:8000/api/StudentsReq')
        .then((res)=>res.json())
        .then((data)=>setStudentReq(data))
    }

    return(
        <>
        <br />
        <button className='btn btn-primary' onClick={window.print}>طباعة الملف</button>
        <h1>صفحة جميع طلبات التسجيل على السكن</h1>

        <table className="table table-striped table-bordered table-hover" style={{direction:'rtl'}}>
        <thead>
            <tr>
            <th>id</th>
            <th>الاسم واللقب</th>
            <th>اسم الأب</th>
            <th>الكلية</th>
            <th>السنة الدراسية</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {
        StudentReq.map((sreq)=>{
            return(
                
                <tr key={sreq.id} className="table-primary" >
                    
                    <td >{sreq.id}</td>
                    <td>{sreq.firstName+' '+sreq.lastName}</td>
                    <td>{sreq.fatherName}</td>
                    <td>{sreq.college}</td>
                    <td>{sreq.level}</td>
                    <td><Link to={`/StudentsReq/${sreq.id}`} className="btn btn-info">عرض الطلب</Link></td>
                    
                </tr>
        )} )}
        </tbody>
        </table>
    </>
);

}

export default ShowStudent;

