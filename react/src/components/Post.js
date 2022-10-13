import Card from "react-bootstrap/Card";
import "../Assets/CSS/Post.css";

import Comments from "./Comments";

const Post = (props) => {
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
        postId={props.postData.post_id}
        currentUser={props.currentUser}
      ></Comments>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default Post;
