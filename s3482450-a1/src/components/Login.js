import { Button } from "react-bootstrap";

const Login = () => {

    return (
        <div>
        <h1>sign in to continue</h1>
        <p class="mt-4">
          {" "}
          company policy requires that all content is to be only accessed
          by registered members!
        </p>
        <Button className="px-4 mx-4"> Login</Button>
        <Button className="px-4" variant="secondary">
          Register
        </Button>
        </div>
    )
}

export default Login;