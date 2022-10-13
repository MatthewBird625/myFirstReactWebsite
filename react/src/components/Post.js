import { useState } from "react";
import Card from "react-bootstrap/Card";
import "../Assets/CSS/Post.css";
import { deletePost, deleteComments, getUser } from "../data/repository";
import { Form, Button } from "react-bootstrap";
import Comments from "./Comments";
import { updatePost } from "../data/repository";

const Post = (props) => {
  const [editMode, setEditMode] = useState(false);

  //stores the default form content for resetting form content if the user cancels the edit mode
  const [defaultFormContent, setDefaultFormContent] = useState(
    props.postData.text
  );

  const [form, setForm] = useState({
    content: props.postData.text,
    email: getUser().email,
    postId: props.postData.post_id,
  });

  //API CALLS
  const postDelete = async (id) => {
    const deleteId = { id: id };
    await deleteComments(deleteId);
    await deletePost(deleteId);
    props.reloadPosts();
  };

  const submitEditPost = async (event) => {
    event.preventDefault();
    console.log("submitting edit");
    await updatePost(form);
    props.reloadPosts();
    setDefaultFormContent(form.content);
    toggleEditMode();
  };

  //CONDITIONAL RENDERING OF EDIT BUTTONS BASED ON IF IT IS USERS POST
  const toggleEditMode = () => {
    form.content = defaultFormContent;
    if (editMode === false) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  let button = <div></div>;
  if (props.postData.userEmail === getUser().email)
    button = (
      <div>
        {" "}
        <Button
          onClick={() => {
            toggleEditMode();
          }}
          className="post-button"
          variant="primary"
        >
          edit
        </Button>
        <Button
          onClick={() => {
            postDelete(props.postData.post_id);
          }}
          className="post-button"
          variant="danger"
        >
          delete
        </Button>
      </div>
    );
  const handleChange = (field) => (event) => {
    setForm((form) => ({ ...form, [field]: event.target.value }));
  };

  return (
    <Card className="post">
      {/* points to a random photo for now. Will be updated with the picture from the back end when implemented */}
      <Card.Img variant="top" src="https://picsum.photos/640/480" />
      <Card.Body>
        <Card.Title className="post-username">
          {props.postData.userEmail}
        </Card.Title>
        {!editMode && (
          <Card.Text className="post-text">{props.postData.text}</Card.Text>
        )}
        {editMode && (
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicontent"
              value={form.content}
              onChange={handleChange("content")}
            >
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                type="text"
                placeholder=""
                defaultValue={form.content}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>{" "}
            <Button
              className=""
              variant="primary"
              type="submit"
              onClick={submitEditPost}
            >
              Submit
            </Button>
            <Button
              className=""
              variant="secondary"
              type=""
              onClick={toggleEditMode}
            >
              Back
            </Button>
          </Form>
        )}
      </Card.Body>
      {!editMode && button}

      <Comments
        postId={props.postData.post_id}
        currentUser={props.currentUser}
      ></Comments>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default Post;
