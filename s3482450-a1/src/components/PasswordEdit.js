import { useState, useRef } from "react";

import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PasswordEdit = (props) => {
  const originalPassword = localStorage.getItem("password");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [error, setError] = useState("");

  const oldPassRef = useRef(null);
  const newPassRef = useRef(null);
  const newPassConfirmRef = useRef(null);
  const navigate = useNavigate();

  //   password regex from: https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

  const PASS_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const handleSubmit = (e) => {
    setError("");

    e.preventDefault();
    if (!PASS_REGEX.test(oldPass)) {
      setError("incorrect password format");
      oldPassRef.current.focus();
      return;
    }
    if (!PASS_REGEX.test(newPass)) {
      setError("incorrect password format");
      newPassRef.current.focus();
      return;
    }
    if (!PASS_REGEX.test(newPassConfirm)) {
      setError("incorrect password format");
      newPassConfirmRef.current.focus();
      return;
    }

    if (newPass !== newPassConfirm) {
      setError("new passwords don't match!");
    }
    if (oldPass !== originalPassword) {
      setError("incorrect account password!");
      oldPassRef.current.focus();
      return;
    }

    updatePassword();
    alert("password updated!");
    navigate("/profile");
  };

  const updatePassword = () => {
    localStorage.setItem("password", newPass);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>oldPassword</Form.Label>
          <Form.Control
            type="password"
            ref={oldPassRef}
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>

          <Form.Control
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            ref={newPassRef}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>

          <Form.Control
            type="password"
            value={newPassConfirm}
            onChange={(e) => setNewPassConfirm(e.target.value)}
            ref={newPassConfirmRef}
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

export default PasswordEdit;
