import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../Assets/CSS/Post.css";
import { Row, Alert } from "react-bootstrap";
import Comments from "./Comments";
import { createComment } from "../data/repository";

const Post = (props) => {
  const [comment, setComment] = useState({
    content: "",
    userEmail: props.currentUser,
    postId: props.postData.post_id,
  });

  const commentRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reload, setReload] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (comment.content.length < 1 || comment.content.length > 250) {
      setError("comments must be between 1 and 250 characters");
      return;
    }
    try {
      createComment(comment);
      setSuccess("comment posted!");
      setComment({ ...comment, content: "" });
      // props.reloadThePostsData();
      if (reload === false) {
        setReload(true);
      } else {
        setReload(false);
      }
    } catch {
      setError("failed to post comment!");
    }
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
          {props.postData.userEmail}
        </Card.Title>
        <Card.Text className="post-text">{props.postData.text}</Card.Text>
      </Card.Body>
      <Comments
        reload={reload}
        comments={props.comments}
        postId={props.postData.post_id}
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
              reload={reload}
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
