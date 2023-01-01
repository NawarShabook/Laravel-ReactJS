import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'

function Header(){

    let user = JSON.parse(localStorage.getItem('user-info'));
    
    const navigate=useNavigate();
    function logout()
    {
        localStorage.clear(); 
        navigate('/');
    }
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">University Housing</Navbar.Brand>
                <Nav className="me-auto navbar_wrapper">
                    {
                        user?
                            user.role=='admin'?
                            <>
                                <Link to='/Students/add'>ِAdd Student</Link>
                                <Link to='/Students'>ِShow Students</Link>
                                <Link to='/register'>Register</Link>
                                <Link to='/StudentsReq'>Show Students Requests</Link>
                            </> 
                            :<>
                                <Link to='/StudentsReq/Reg'>ِStudent Request</Link>
                            </>
                        
                        :
                        <>
                            <Link to='/login' >Login</Link>
                        </>
                        }
                    
                </Nav>
                {localStorage.getItem('user-info')?
                <Nav>
                    <NavDropdown title={user && user.userName}>

                        <NavDropdown.Item >{user.role}</NavDropdown.Item>
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>:null }
                </Container>
            </Navbar>
        </>
    )
}

export default Header;