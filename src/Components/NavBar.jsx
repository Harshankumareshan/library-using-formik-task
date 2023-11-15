import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'
function NavBar() {
    let navigate = useNavigate()
  return  <div className="nav-wrapper">
  <Navbar  data-bs-theme="dark" style={{height:"90px"}}>
       <Container>
         <Navbar.Brand href="/"><h2>Library Home</h2></Navbar.Brand>
         <div className="justify">
         <Nav className="me-auto" >
           <Nav.Link onClick={()=>navigate('/')}>Home</Nav.Link>
           <Nav.Link onClick={()=>navigate('/manage')} >Manage</Nav.Link>
           <Nav.Link onClick={()=>navigate('/create')} >Create books</Nav.Link>
         </Nav>
         </div>
       </Container>
     </Navbar>
    
 </div>
}

export default NavBar