import { useRef, useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Button.css";
const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const nameRef = useRef(null);

  //   email regex from : https://emailregex.com/

  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   password regex from: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

  const PASS_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleSubmit = (e) => {
    setError("");

    e.preventDefault();
    if (name.length < 1) {
      setError("insert a name!");
      nameRef.current.focus();
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError("incorrect email format!");
      emailRef.current.focus();

      return;
    }

    if (!PASS_REGEX.test(password)) {
      setError(
        "password must be at least 8 characters, contain at least one numeric digit, one special character, one uppercase and one lowercase letter"
      );
      passRef.current.focus();

      return;
    }

    alert("registration successful!");

    registerUser(name, email, password);
    navigate("/loginForm");
  };

  const registerUser = (name, email, password) => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  };

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="john smith" ref={nameRef} />
          <Form.Text className="text-muted">name goes here</Form.Text>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="email@email.com"
            ref={emailRef}
          />
          <Form.Text className="text-muted">
            your email and Soul belongs to the Lan corperation from now
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passRef}
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

export default RegisterForm;
