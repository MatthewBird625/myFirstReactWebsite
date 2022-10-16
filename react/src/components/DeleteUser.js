import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteUser,
  getUser,
  deleteUserReactions,
  deleteUserComments,
  deleteUserPosts,
} from "../data/repository";

const DeleteUser = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.loginStatus !== true) {
      navigate("/");
    }
  });

  const [user, setUser] = useState(getUser());

  const handleSubmit = () => {
    deleteUserReactions(user);
    deleteUserComments(user);
    deleteUserPosts(user);
    deleteUser(user);

    props.setLogin(false);
    props.logInUser("");
    alert("account deleted!");

    return;
  };

  return (
    <div id="profile">
      <h4 className="center">
        are you sure you want to delete account: <b>{props.currentUser}</b> ?
      </h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Button className="button-bigger" variant="danger" type="submit">
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
