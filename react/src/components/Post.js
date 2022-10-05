import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../Assets/CSS/Post.css";
import { Row, Alert } from "react-bootstrap";
import Comments from "./Comments";

const Post = (props) => {
  const [comment, setComment] = useState({
    content: "",
    userAccount: props.currentUser,
    commentId: 0, //not required now- but will be the PK from the database
    postId: props.postData.postId,
  });

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(props.comments));
  }, [props.comments]);

  const commentRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    if (comment.content.length < 1 || comment.content.length > 250) {
      setError("comments must be between 1 and 250 characters");
      return;
    }

    setComment({ ...comment, commentId: parseInt(props.postCount) });

    props.setComments(() => {
      let newComments = [...props.comments];

      newComments.push(comment);
      return newComments;
    });

    setComment({ ...comment, content: "" });
  };

  const handleChange = (field) => (event) => {
    setComment((comment) => ({ ...comment, [field]: event.target.value }));
  };

  return (
    <Card className="post">
      {/* points to a random photo for now. Will be updated with the picture from the back end when implemented */}
      <Card.Img variant="top" src="https://picsum.photos/200/100" />
      <Card.Body>
        <Card.Title className="post-username">
          {props.postData.userAccount}
        </Card.Title>
        <Card.Text className="post-text">{props.postData.content}</Card.Text>
      </Card.Body>
      <Comments
        comments={props.comments}
        postId={props.postData.postId}
      ></Comments>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <h3> leave a comment</h3>

          <Form.Group
            className="mb-3"
            controlId="formBasicontent"
            value={comment.content}
            onChange={handleChange("content")}
          >
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              type="text"
              placeholder=""
              ref={commentRef}
              value={comment.content}
              onChange={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Row>
            <Button className="button" variant="primary" type="submit">
              Submit
            </Button>
          </Row>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Post;
