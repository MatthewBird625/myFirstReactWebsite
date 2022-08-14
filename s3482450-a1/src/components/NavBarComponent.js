import { Navbar, Container, Nav } from "react-bootstrap";

const NavBarComponent = (props) => {

  console.log(props.loggedIn);
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">LAN Company Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

          {props.loggedIn ? ( <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Nav.Link href="#link">Feed</Nav.Link>
              <Nav.Link href="#link">Logout</Nav.Link>
            </Nav>) : (<div></div>)}
           
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarComponent;
