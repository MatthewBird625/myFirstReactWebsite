import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../data/repository";

const Feed = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState("");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (props.login !== true) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await getPosts();

      setPosts(result);
      setIsLoadingPosts(false);
    };
    fetchPosts().catch(console.error);
    console.log("loading posts");
  }, [isLoadingPosts]);

  const [comments, setComments] = useState(
    localStorage.getItem("comments")
      ? JSON.parse(localStorage.getItem("comments"))
      : []
  );

  //temporary front end PK generator for posts until back end is implemented
  const [postCount, setPostCount] = useState(
    localStorage.getItem("postCount")
      ? JSON.parse(localStorage.getItem("postCount"))
      : 0
  );
  const reloadThePostsData = () => {
    console.log("TOGGLE");
    if (isLoadingPosts === false) {
      setIsLoadingPosts(true);
    } else {
      setIsLoadingPosts(false);
    }
  };
  return (
    <div>
      <Row>
        <Col></Col>
        {/* CENTER COLUMN */}
        <Col sm={10} md={8}>
          <h1>Your feed:</h1>
          {/* loading control logic below is based on lab08- registration and login example forum file */}
          {isLoadingPosts ? (
            <div>Loading posts...</div>
          ) : posts.length === 0 ? (
            <span className="text-muted">No posts have been submitted.</span>
          ) : (
            posts.map((post) => (
              <Post
                setPostCount={setPostCount}
                postCount={postCount}
                postData={post}
                comments={comments}
                setComments={setComments}
                currentUser={props.currentUser}
                reloadThePostsData={reloadThePostsData}
              />
            ))
          )}
        </Col>
        <Col></Col>
      </Row>
    </div>
  );
};

export default Feed;
