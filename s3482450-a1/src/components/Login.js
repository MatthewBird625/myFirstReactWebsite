import { Button, Row, Col} from "react-bootstrap";
import "./Login.css"
const Login = () => {

    return (
        <div>
        <h1>sign in to continue</h1>
        <p class="mt-4">
          {" "}
          company policy requires that all content is to be only accessed
          by registered members!
        </p>
        <Row>
            <Col>
            <Button className="mx-1 my-2 button-bigger"> Login</Button>
            </Col>
            <Col >
            <Button className="mx-1 my-2 button-bigger" variant="secondary">
          Register
        </Button>

            </Col>
        </Row>
   
      
        </div>
    )
}

export default Login;