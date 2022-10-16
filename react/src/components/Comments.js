import { ListGroupItem, ListGroup } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { Row, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { getComments } from "../data/repository";
import { createComment } from "../data/repository";

import "../Assets/CSS/Comments.css";

const Comments = (props) => {
  //variables
  const [comment, setComment] = useState({
    content: "",
    userEmail: props.currentUser,
    postId: props.postId,
  });

  const [postComments, setPostComments] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const commentRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //fetch all the comments before rendering
  useEffect(() => {
    const fetchComments = async () => {
      const result = await getComments(props.postId);

      setPostComments(result);

      setLoadingComments(false);
    };
    fetchComments().catch(console.error);
  }, [props.postId]);

  //allows the comments to be refreshed after a user has posted a new comment
  const refreshComments = async () => {
    const result = await getComments(props.postId);
    setPostComments(result);
    setLoadingComments(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (comment.content.length < 1 || comment.content.length > 600) {
      setError("comments must be between 1 and 600 characters");
      return;
    }
    try {
      createComment(comment);
      setSuccess("comment posted!");
      setComment({ ...comment, content: "" });
      refreshComments();
    } catch {
      setError("failed to post comment!");
    }
    await refreshComments();
  };
  //change handler for form fields
  const handleChange = (field) => (event) => {
    setComment((comment) => ({ ...comment, [field]: event.target.value }));
  };

  return (
    <div className="comments-section">
      <ListGroup className="list-group-flush">
        {loadingComments ? (
          <p>loading comments</p>
        ) : (
          postComments.map((comment) => (
            <ListGroupItem>
              <p>
                <strong>{comment.userEmail}: </strong>
                {comment.text}
              </p>
            </ListGroupItem>
          ))
        )}
      </ListGroup>

      <Form onSubmit={handleSubmit}>
        <h4 class="center"> leave a comment</h4>

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
    </div>
  );
};

export default Comments;
