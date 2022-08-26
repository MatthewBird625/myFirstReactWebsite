import { Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const DeleteUser = (props) => {
  const navigate = useNavigate();

    useEffect(() => {
      if (props.loginStatus !== true) {
        navigate("/");
      }
    });


  const [users, setUsers] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
   
  }, [users]);


  const handleSubmit = () => {
    setUsers(()=>{
      let newUsers = [...users]
      newUsers = newUsers.filter(userFiltered => userFiltered.email !== props.currentUser)
      console.log(newUsers)

      return newUsers;

    })

    props.setLogin(false);
    props.setCurrentUser("");

    

   

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
