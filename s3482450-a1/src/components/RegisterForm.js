import { useRef, useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { Link} from "react-router-dom";
import "./Button.css";
const RegisterForm = (props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  const emailRef = useRef(null);
  const passRef = useRef(null);
  const nameRef = useRef(null);

  const [users, setUsers] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    console.log("effect!");
  }, [users]);

  const [user, setUser] = useState({
    email: "",
    name: "",
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
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const handleSubmit = (e) => {
    setError("");
    setSuccess("");

    e.preventDefault();
    if (user.name.length < 1) {
      setError("insert a name!");
      nameRef.current.focus();
      return;
    }
    if (!EMAIL_REGEX.test(user.email)) {
      setError("incorrect email format!");
      emailRef.current.focus();

      return;
    }

    if (!PASS_REGEX.test(user.password)) {
      setError(
        "password must be at least 8 characters, contain at least one numeric digit, one special character, one uppercase and one lowercase letter"
      );
      passRef.current.focus();

      return;
    }

    setUsers(() => {
      let newUsers = [...users];
      if(newUsers.find((entry) => entry.email === user.email)){
        console.log()
        setError("email already registered!")
        return users;
      }
      newUsers.push(user);
      console.log("newusers: " + newUsers);
      setSuccess(user.email + " registration successful");

      return newUsers;
    });

   
    setUser({ ...user,
    password: "",})
    
  };

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicName"
          value={user.name}
          onChange={handleChange("name")}
        >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="john smith" ref={nameRef} />
          <Form.Text className="text-muted">name goes here</Form.Text>
        </Form.Group>
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
          <Form.Text className="text-muted">your email</Form.Text>
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
        {success && <Alert variant="success">{success}</Alert>}
      </Form>
    </div>
  );
};

export default RegisterForm;
