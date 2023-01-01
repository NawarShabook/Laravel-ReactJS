import Header from './Header';
import {useEffect, useState} from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import swal from 'sweetalert';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBRadio
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';



function Login(){

    const [userName,setName]=useState('');
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const [role,setRole]=useState('');
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user-info'))
        {
            navigate('/Student');
        }
    },[])
    // alert(name);

    async function login(){


        let items={email,password, role};
        if(!( email && password)){
            swal("خطأ", "يجب تعبئة جميع الخانات", "error");
            return
        }
        
        let result = await fetch("http://127.0.0.1:8000/api/login",{
            method : 'POST',
            body:JSON.stringify(items),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"    
            }
        })
        .then((res)=>res.json())
        .then((res)=>{swal('message',res.message,'info')
        if(res.message=='success'){
            swal('success',res.role+"تم تسجيل الدخول ك" ,'success')
            localStorage.setItem("user-info", JSON.stringify({userName:res.userName, role:res.role}))
            navigate('/Students');
        }
        else {navigate('/login');}})
        
    }
    return (

        <>
      
        <MDBContainer fluid>

        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
            <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">تسجيل دخول</p>

                
                
                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                    <MDBInput value={email} onChange={(e)=>setEmail(e.target.value)} label='Your Email' id='form2' type='email'/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg'/>
                    <MDBInput value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' id='form3' type='password'/>
                </div>

                <div onChange={(e)=>setRole(e.target.value)}>
                    <MDBRadio value="admin"  name='role' id='flexRadioDefault1' label='مدير' />
                    <MDBRadio value="student"  name='role' id='flexRadioDefault2' label='طالب' />
                </div>
                

                <MDBBtn onClick={login} className='mb-4' size='lg'>Login</MDBBtn>

                </MDBCol>

                <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                </MDBCol>

            </MDBRow>
            </MDBCardBody>
        </MDBCard>

        </MDBContainer>
        </>
    );
}

export default Login;