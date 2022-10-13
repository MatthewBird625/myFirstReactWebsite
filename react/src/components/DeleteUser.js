import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUser, getUser } from "../data/repository";

const DeleteUser = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus !== true) {
      navigate("/");
    }
  });

  const [user, setUser] = useState(getUser());

  const handleSubmit = () => {
    deleteUser(user);
    props.setLogin(false);
    props.logInUser("");
    alert("account deleted!");

    return;
  };

  return (
    <div>
      <h2>are you sure you want to delete {props.currentUser}'s account?</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Button className="button-bigger" variant="primary" type="submit">
              Yes
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
      </Form>
    </div>
  );
};

export default DeleteUser;
