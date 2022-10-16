import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../Assets/CSS/Post.css";
import {
  deletePost,
  deleteComments,
  getUser,
  deleteReactions,
} from "../data/repository";
import { Form, Button } from "react-bootstrap";
import Comments from "./Comments";
import { updatePost } from "../data/repository";
import Reaction from "./Reaction";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "../Assets/CSS/Post.css";

const Post = (props) => {
  const [editMode, setEditMode] = useState(false);

  //stores the default form content for resetting form content if the user cancels the edit mode
  const [defaultFormContent, setDefaultFormContent] = useState(
    props.postData.text
  );

  //value for React Quill box
  const [value, setValue] = useState(props.postData.text);

  const [form, setForm] = useState({
    content: props.postData.text,
    email: getUser().email,
    postId: props.postData.post_id,
  });

  useEffect(() => {
    const updatePostEffect = async () => {
      const result = await updatePost(form);
    };
    if (value !== defaultFormContent) {
      updatePostEffect();
      props.reloadPosts();
    }
  }, [form]);

  //API CALLS
  const postDelete = async (id) => {
    const deleteId = { id: id };
    await deleteComments(deleteId);
    await deleteReactions(deleteId);
    await deletePost(deleteId);
    props.reloadPosts();
  };

  const submitEditPost = async (event) => {
    event.preventDefault();
    setForm({ ...form, content: value });

    setDefaultFormContent(form.content);
    toggleEditMode();
    props.reloadPosts();
    props.postData.text = value;
  };

  // allows for setting edit mode
  const toggleEditMode = () => {
    form.content = defaultFormContent;
    if (editMode === false) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };
  //CONDITIONAL RENDERING OF EDIT BUTTONS BASED ON IF IT IS USERS POST
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
    <Card className="post feed-background">
      {/* points to a random photo for now. Will be updated with the picture from the back end when implemented */}
      <Card.Img
        className="post-image"
        variant="top"
        src="https://picsum.photos/640/480"
      />
      <Card.Body className="post-user-content">
        <Card.Title className="post-username">
          {props.postData.userEmail}
        </Card.Title>
        {!editMode && (
          <ReactQuill
            className="post-text"
            value={props.postData.text}
            onChange={setValue}
            theme={"bubble"}
          />
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
              <ReactQuill theme="snow" value={value} onChange={setValue} />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>{" "}
            <Button
              className="post-button"
              variant="primary"
              type="submit"
              onClick={submitEditPost}
            >
              Submit
            </Button>
            <Button
              className="post-button"
              variant="secondary"
              type=""
              onClick={toggleEditMode}
            >
              Back
            </Button>
          </Form>
        )}
      </Card.Body>
      <Reaction postId={props.postData.post_id} />
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
