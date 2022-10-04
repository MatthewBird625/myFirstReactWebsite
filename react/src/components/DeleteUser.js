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


  const [posts, setPosts] = useState(
    localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : []
  );

  const [comments, setComments] = useState(
    localStorage.getItem("comments")
      ? JSON.parse(localStorage.getItem("comments"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("comments", JSON.stringify(comments));
    localStorage.setItem("posts", JSON.stringify(posts));
   
  }, [users]);


  const handleSubmit = () => {
    setUsers(()=>{
      let newUsers = [...users]
      newUsers = newUsers.filter(userFiltered => userFiltered.email !== props.currentUser)
      console.log(newUsers)
      

      return newUsers;

    })

    setPosts(() => {
      let newPosts = [...posts]
      newPosts = newPosts.filter(postFiltered => postFiltered.userAccount !== props.currentUser)
  
      

      return newPosts;

    })
    setComments(() => {
      let newComments = [...comments]
      newComments = newComments.filter(commentFiltered => commentFiltered.userAccount !== props.currentUser)
  
      

      return newComments;

    })

    props.setLogin(false);
    props.logInUser("");
    alert("account deleted!")

    

   

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
