import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      {" "}
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="email@email.com" />
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
           <Link to= "/"> <Button className="button-bigger" variant="secondary" type="submit">
              Back
            </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default LoginForm;
