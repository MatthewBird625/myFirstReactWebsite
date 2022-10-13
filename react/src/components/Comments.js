import { ListGroupItem, ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

import { getComments } from "../data/repository";

const Comments = (props) => {
  const [postComments, setPostComments] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getComments(props.postId);

      setPostComments(result);
      console.log(result);
      setLoadingComments(false);
    };
    fetchPosts().catch(console.error);
  }, []);

  return (
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
  );
};

export default Comments;
