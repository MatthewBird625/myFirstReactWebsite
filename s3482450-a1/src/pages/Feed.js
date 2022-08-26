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

    


    return <div>
        <Row>
            <Col>
                
            </Col>
            {/* CENTER COLUMN */}
            <Col sm={10} md= {8}>
            <h1>Your feed:</h1>

            {posts.map((post)=>( <Post postData= {post}/> ))}
      
                
            </Col>
            <Col>

            </Col>
        </Row>
    </div>
};


export default Feed;