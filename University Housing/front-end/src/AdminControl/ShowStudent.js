import {useState} from 'react';
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Header from '../Header';
function ShowStudent(){

    const [students, setStudents] = useState([]);
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
        getAllStudents();
    },[])

    const getAllStudents= ()=>{
        fetch('http://localhost:8000/api/Students')
        .then((res)=>res.json())
        .then((data)=>setStudents(data))
    }

    return(
        <>
 
        <br />
        <button className='btn btn-primary' onClick={window.print}>طباعة الملف</button>
        <h1>صفحة جميع طلاب السكن</h1>

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
        students.map((student)=>{
            return(
                
                <tr key={student.id} className="table-primary" >
                    
                    <td >{student.id}</td>
                    <td>{student.firstName+' '+student.lastName}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.college}</td>
                    <td>{student.level}</td>
                    <td><Link to={`/Students/${student.id}`} className="btn btn-info">عرض الطالب</Link></td>
                    
                </tr>
        )} )}
        </tbody>
        </table>
    </>
);

}

export default ShowStudent;

