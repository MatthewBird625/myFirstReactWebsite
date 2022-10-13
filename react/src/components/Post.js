import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../Assets/CSS/Post.css";
import { deletePost, deleteComments, getUser } from "../data/repository";
import { useState } from "react";

import Comments from "./Comments";

const Post = (props) => {
  const postDelete = async (id) => {
    const deleteId = { id: id };
    deleteComments(deleteId);
    deletePost(deleteId);
    props.reloadPosts();
  };
  let button = <div></div>;
  if (props.postData.userEmail == getUser().email)
    button = (
      <div>
        {" "}
        <Button className="post-button" variant="primary">
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
      {button}

      <Comments
        postId={props.postData.post_id}
        currentUser={props.currentUser}
      ></Comments>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default Post;
