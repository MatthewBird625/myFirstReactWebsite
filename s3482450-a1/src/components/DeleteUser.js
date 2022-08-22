import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const DeleteUser = (props) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.clear();
    props.setLogin(false);
    props.setCurrentUser("");
    alert("account deleted!");
    navigate("/");

    return;
  };

  return (
    <div>
      <h1>are you sure you want to delete {props.currentUser}'s account?</h1>
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
