import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../data/repository";
import "../Assets/CSS/Post.css";

const Feed = (props) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState("");
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

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
  }, [isLoadingPosts]);

  const reloadPosts = async () => {
    const result = await getPosts();

    setPosts(result);
    setIsLoadingPosts(false);
  };
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
        <Col className="feed-center" sm={10} md={8}>
          <h1>Your feed:</h1>
          {/* loading control logic below is based on lab08- registration and login example forum file */}
          {isLoadingPosts ? (
            <div>Loading posts...</div>
          ) : posts.length === 0 ? (
            <span className="text-muted">No posts have been submitted.</span>
          ) : (
            posts.map((post) => (
              <Post
                reloadPosts={reloadPosts}
                postData={post}
                currentUser={props.currentUser}
                key={post.post_id}
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
