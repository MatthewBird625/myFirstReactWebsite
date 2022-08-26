import { useRef, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import "./Button.css";
const LoginForm = (props) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passRef = useRef(null);

  const [users] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (event) => {
    setUser((user) => ({ ...user, [field]: event.target.value }));
  };
  

  //   email regex from : https://emailregex.com/
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   password regex from: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
  const PASS_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  const handleSubmit = (e) => {
  
    setError("");

    e.preventDefault();
    if (!EMAIL_REGEX.test(user.email)) {
      setError("incorrect email format!");
      emailRef.current.focus();
      return;
    }

    if (!PASS_REGEX.test(user.password)) {
      passRef.current.focus();
      setError(
        "password must be between 8 to 20 characters, contain at least one numeric digit, one special character, one uppercase and one lowercase letter"
      );
      return;
    }
    const userSearched = users.find(userSearch => userSearch.email === user.email)
  

    if(user.password !== userSearched.password || user.email !== userSearched.email){
      setError("invalid user name or password!");
      passRef.current.focus();
      return;

    }
    loginUser(userSearched.email, userSearched.password);
  };

  const loginUser = (email, password) => {
 

    if (user.email === email && user.password === password) {
      props.setLogin(true);
      props.logInUser(email);
      navigate("/profile");
    }
  };

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          value={user.email}
          onChange={handleChange("email")}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="email@email.com"
            ref={emailRef}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange("password")}
            ref={passRef}
          />
          <Form.Text className="text-muted">
            password must be at least 8 characters
          </Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Button className="button-bigger" variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Link to="/">
              {" "}
              <Button className="button-bigger" variant="secondary">
                Back
              </Button>
            </Link>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </div>
  );
};

export default LoginForm;
