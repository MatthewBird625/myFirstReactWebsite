import { useState, useRef, useEffect } from "react";

import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  getUser,
  findUser,
  updateUser,
  setUserLocal,
} from "../data/repository";

import "../Assets/CSS/Profile.css";

const ProfileEdit = (props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  const [userInput, setUserInput] = useState({
    email: "",
    name: "",
    oldEmail: "",
  });

  //fetch our user profile data with a use effect

  useEffect(() => {
    const fetchUser = async () => {
      const result = await findUser(getUser().email);
      setUser(result);
      setUserInput(result);
    };
    fetchUser();
  }, []);

  //   email regex from : https://emailregex.com/
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!EMAIL_REGEX.test(userInput.email)) {
      setError("incorrect email format!");
      emailRef.current.focus();
      return;
    }
    if (userInput.name.length < 1) {
      setError("input a Name");
      nameRef.current.focus();
      return;
    }
    try {
      userInput.oldEmail = user.email;
      setUserLocal(userInput);
      updateUser(userInput);
      setSuccess("profile updated!");
    } catch {
      setError("unable to update profile- contact admin");
    }
  };
  const handleChange = (field) => (event) => {
    setUserInput((user) => ({ ...user, [field]: event.target.value }));
  };

  return (
    <div>
      {" "}
      <Form className="padding" onSubmit={handleSubmit} id="profile">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Email address</Form.Label>
          <Form.Control
            type="text"
            ref={emailRef}
            value={userInput.email}
            onChange={handleChange("email")}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>New Name</Form.Label>

          <Form.Control
            type="text"
            value={userInput.name}
            onChange={handleChange("name")}
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
        {success && <Alert variant="success">{success}</Alert>}
      </Form>
    </div>
  );
};

export default ProfileEdit;
