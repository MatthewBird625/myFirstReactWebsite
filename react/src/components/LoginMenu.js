import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../Assets/CSS/Button.css";
import { getUser } from "../data/repository";
import "../Assets/CSS/Login.css";

const Login = (props) => {
  return (
    <div className="form">
      {props.loginStatus !== true && (
        <div>
          <h2 className="sign-in-heading">sign in to continue</h2>

          <Row className="login-padding-top">
            <Col className="left-padding">
              <Link to="/loginForm">
                <Button className="mx-1 my-2 button-bigger"> Login</Button>
              </Link>
            </Col>
            <Col>
              <Link to="/register">
                {" "}
                <Button className="mx-1 my-2 button-bigger" variant="secondary">
                  Register
                </Button>
              </Link>
            </Col>
          </Row>
          <p className="mt-4 company-policy-text">
            {" "}
            company policy requires that all content is to be only <br />
            accessed by registered members!
          </p>
        </div>
      )}
      {props.loginStatus === true && (
        <div>
          <h3 className="login-padding sign-in-heading">
            Welcome {getUser().name}
          </h3>
        </div>
      )}
    </div>
  );
};

export default Login;
