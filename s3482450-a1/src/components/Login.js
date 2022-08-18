import { Button, Row, Col } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <div>
    <div>
      <h1>sign in to continue</h1>
     <p class="mt-4">
        {" "}
        company policy requires that all content is to be only accessed by
        registered members!
      </p>
      <Row>
        <Col>
          <Link to="/login">
            <Button className="mx-1 my-2 button-bigger"> Login</Button>
          </Link>
        </Col>
        <Col>
          <Link to="/register">
            {" "}
            <Button className="mx-1 my-2 button-bigger" variant="secondary">
              Register
            </Button>
          </Link>
        </Col>
      
      </Row>
  
    </div>
    
    </div>
  );
};

export default Login;
