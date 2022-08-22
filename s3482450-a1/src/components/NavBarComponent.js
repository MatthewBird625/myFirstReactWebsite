import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBarComponent = (props) => {

  const navigate = useNavigate();

  
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand >LAN Company Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

          {props.loggedIn ? ( <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate("/")}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{navigate("/profile")}}>Profile</Nav.Link>
              <Nav.Link onClick={()=>{navigate("/")}}>Feed</Nav.Link>
              <Nav.Link onClick={()=>{navigate("/post")}}>Post</Nav.Link>
              <Nav.Link href="/">Logout</Nav.Link>
            </Nav>) : (<div></div>)}
           
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
