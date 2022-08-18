import { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();



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
    if (!EMAIL_REGEX.test(email)) {
      setError("incorrect email format!");
      return;
    }
    console.log(password);
    if (!PASS_REGEX.test(password)) {
      console.log("testing");
      setError(
        "password must be between 8 to 20 characters, contain at least one numeric digit, one special character, one uppercase and one lowercase letter"
      );
      return;
    }
    loginUser(email, password);
  };

  const loginUser = (email, password) => {
    let storedEmail = localStorage.getItem("email");
    let storedPassword = localStorage.getItem("password");

    if (storedEmail === email && storedPassword === password) {
      props.setLogin(true);
      navigate("/");
    }
  };

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="email@email.com" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            password must be at least 8 characters- praise LAN.
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
              <Button
                className="button-bigger"
                variant="secondary"
                type="submit"
              >
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
