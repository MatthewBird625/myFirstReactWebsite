import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";


const Feed = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
      if (props.login !== true) {
        navigate("/");
      }
    }, []);
  

    const [posts, setPosts] = useState(
        localStorage.getItem("posts")
          ? JSON.parse(localStorage.getItem("posts"))
          : []
      );


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

  useEffect(() => {
    localStorage.setItem("postCount", postCount.toString())
  }, [postCount]);



    


    return <div>
        <Row>
            <Col>
                
            </Col>
            {/* CENTER COLUMN */}
            <Col sm={10} md= {8}>
            <h1>Your feed:</h1>

            {posts.map((post)=>( <Post setPostCount={setPostCount} postCount={postCount} postData= {post} comments={comments} setComments={setComments} currentUser = {props.currentUser}/> ))}
      
                
            </Col>
            <Col>

            </Col>
        </Row>
    </div>
};


export default Feed;