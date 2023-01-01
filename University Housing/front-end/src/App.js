
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from './AdminControl/Register';
import AddStudent from './AdminControl/AddStudent';
import ShowStudent from './AdminControl/ShowStudent';
import StudentDetails from './AdminControl/StudentDetails';
import ShowStudentReq from './AdminControl/ShowStudentReq';
import ReqId from './AdminControl/ReqId';
import Header from './Header';
import StudentReq from './StudentReq';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
    
        <Header/>
      <Routes>
      <Route path="/" element={
        <>
          <h1>University Housing</h1>
          <Link to={'/login'}>Login</Link>
        </>
      }/>
      <Route path="/login" element={
        <>
          <Login/>
        </>
      }/>
      {/* admin */}
      <Route path="/register" element={
        <>
          <Register/>
        </>
      }/>
     <Route path="/Students" element={
        <>
          <ShowStudent/>
        </>
      }/>
      

      <Route path="/Students/add" element={
        <>
          <AddStudent/>
        </>
      }/>
      <Route path="/Students/:studentId" element={<StudentDetails />} />
      <Route path="/StudentsReq" element={<ShowStudentReq />} />
    
      <Route path="/StudentsReq/:reqId" element={<ReqId />} />

      {/* Student Request */}
      <Route path="/StudentsReq/Reg" element={<StudentReq />} />
      
      </Routes>
      
        
        
      </BrowserRouter>
      </div>
  ); 
}
export default App;