import Header from '../Header';
import {useState, useEffect} from 'react';
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



function Register(){

    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const [Cpassword,setCPassword]=useState('');
    const [email,setEmail]=useState('');
    const [role,setRole]=useState('');
    const navigate=useNavigate();
    let user = JSON.parse(localStorage.getItem('user-info'));
    useEffect(()=>{
          
        if(!user || (user && user.role=='student'))
        {
            navigate('/');
        }
        // if(localStorage.getItem('user-info'))
        // {
        //     navigate('/Student');
        // }
    },[])


    async function register(){

        let items={name,email,password, role};
        if(!(name && email && password && Cpassword)){
            swal("خطأ", "يجب تعبئة جميع الخانات", "error");
            return
        }
        if(password!=Cpassword){
            swal("خطأ", "خطأ في كلمة المرور", "error");
            return
        }
        let result = await fetch("http://127.0.0.1:8000/api/register",{
            method : 'POST',
            body:JSON.stringify(items),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"    
            }
        })
        .then((res)=>res.json())
        .then((res)=>{swal('message',res.message,'info')
            if(res.message=='success' &&role=='admin'){
                alert(res.role)
                localStorage.setItem("user-info", JSON.stringify({userName:res.userName, role:res.role}))
                navigate('/Student');
            }
        })
        // result = await result.json();
        // localStorage.setItem("user-info", JSON.stringify(result));
        // console.warn('result', result);
        // navigate('/');
        
}
    return (

        
        <>
  
        <MDBContainer fluid>

        <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
            <MDBCardBody>
            <MDBRow>
                <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">إنشاء حساب</p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg'/>
                    <MDBInput value={name} onChange={(e)=>setName(e.target.value)} label='Your Name' id='form1' type='text' className='w-100'/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                    <MDBInput value={email} onChange={(e)=>setEmail(e.target.value)} label='Your Email' id='form2' type='email'/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg'/>
                    <MDBInput value={password} onChange={(e)=>setPassword(e.target.value)} label='Password' id='form3' type='password'/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg'/>
                    <MDBInput value={Cpassword} onChange={(e)=>setCPassword(e.target.value)} label='Repeat your password' id='form4' type='password'/>
                </div>
                <div onChange={(e)=>setRole(e.target.value)}>
                    <MDBRadio value="admin"  name='role' id='flexRadioDefault1' label='مدير' />
                    <MDBRadio value="student"  name='role' id='flexRadioDefault2' label='طالب' />
                </div>

                <MDBBtn onClick={register} className='mb-4' size='lg'>Register</MDBBtn>

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

export default Register;