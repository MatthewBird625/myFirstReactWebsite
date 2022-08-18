import { Button, Row, Col } from "react-bootstrap";
import { Link} from "react-router-dom";
import "./Login.css";
const Login = (props) => {




  return (
    <div>
    
    {props.loginStatus!== true && (<div>
      <h1>sign in to continue</h1>
     <p class="mt-4">
        {" "}
        company policy requires that all content is to be only accessed by
        registered members!
      </p>
      <Row>
        <Col>
          <Link to="/loginForm">
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
  
    </div>) }
    {props.loginStatus === true && (<div>
      <h1>Welcome...</h1>
     <p class="mt-4">
        {localStorage.getItem("name")}
        
      </p>
      
  
    </div>)}
    
    </div>
  );
};

export default Login;
