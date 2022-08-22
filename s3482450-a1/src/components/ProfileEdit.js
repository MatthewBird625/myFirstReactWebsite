import { useState, useRef } from "react";

import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ProfileEdit = (props) => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [email, setEmail] = useState(props.currentUser);
  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  //   email regex from : https://emailregex.com/
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    setError("");

    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setError("incorrect email format!");
      emailRef.current.focus();
      return;
    }
    if (name.length< 1) {
        setError("input a Name");
        nameRef.current.focus();
        return;
      }

      updateProfile();
      navigate("/profile");

  };


  const updateProfile = () =>{
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    props.logInUser(email);

  }

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Email address</Form.Label>
          <Form.Control
            type="text"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>New Name</Form.Label>

          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Row>
          <Col>
            <Button className="button-bigger" variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Link to="/profile">
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

export default ProfileEdit;
