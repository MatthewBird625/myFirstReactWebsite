import { useState, useRef, useEffect} from "react";

import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ProfileEdit = (props) => {

  const [error, setError] = useState("");

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();

  const[user,setUser] = useState({
    name: "",
    email: "",
    password:""
  })

  const [users, setUsers] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
   
  }, [users]);


  //   email regex from : https://emailregex.com/
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    
    if (!EMAIL_REGEX.test(user.email)) {
      setError("incorrect email format!");
      emailRef.current.focus();
      return;
    }
    if (user.name.length< 1) {
        setError("input a Name");
        nameRef.current.focus();
        return;
      }

      setUsers(() =>{
        let newUsers = [...users]
      
    
        newUsers = newUsers.map((details) => {
          if (details.email === props.currentUser){
            user.password = details.password
            return user;
    
          }
          else{
            return details;
          }
        })
        console.log(newUsers)
        return newUsers;
     

  });

  props.logInUser(user.email)

 



  }
  const handleChange = (field) => (event) => {
    setUser((user) => ({ ...user, [field]: event.target.value }));
  };

  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New Email address</Form.Label>
          <Form.Control
            type="text"
            ref={emailRef}
            value={user.email}
            onChange={handleChange("email")}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>New Name</Form.Label>

          <Form.Control
            type="text"
            value={user.name}
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
      </Form>
    </div>
  );
};

export default ProfileEdit;
