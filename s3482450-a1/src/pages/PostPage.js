import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../components/Button.css";
import "./PostPage.css";
import "./view.css";
import { useRef, useState, useEffect } from "react";
const PostPage = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (props.login !== true) {
      navigate("/");
    }
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const contentRef = useRef(null);

  const [form, setForm] = useState({
    content: "",
    userAccount: props.currentUser,
    postId: 0
  });

  const [posts, setPosts] = useState(
    localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handleChange = (field) => (event) => {
    setForm((form) => ({ ...form, [field]: event.target.value }));

    setSuccess("");
  };

  // This is based off the solution presented in the RMIT FWP WEEK 5 LAB
  const handleSubmit = (e) => {
    let postCount = 0;
    e.preventDefault();
    if (form.content.length < 1 || form.content.length > 250) {
      setError("content must be between 1 and 250 characters");
      return;
    }

    setPosts((post) => {
      let newPosts = [...posts];

      newPosts = newPosts.map((entry) => {
        postCount++;
        return entry;
      });
      //Later this post ID will come from the backend
      //currently it generates ID in increments of 2 instead of 1 thanks to the React development environment. 
      //this post ID will be used with a /images path to store images locally for now timm the back end is developed. 
      form.postId = postCount;
      newPosts.push(form);
      setSuccess("post successful!");
      setForm({ content: "", userAccount: props.currentUser });
      console.log(postCount)
      return newPosts;
    });
  
  };
  
  return (
    <Container fluid>
      <Row className="min-view post">
        <Col></Col>
        <Col sm={8} md={6}>
          {/* Dummy placeg=holder for now- TODO replace with company logo */}
          <h1 className="heading">Make a Post</h1>

          <Form onSubmit={handleSubmit}>
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
                ref={contentRef}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Row>
              <Col>
                <Button
                  className="button-bigger"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Col>
              <Col>
                <Link to="/">
                  {" "}
                  <Button className="button-bigger" variant="secondary">
                    Back
                  </Button>
                </Link>
              </Col>
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
          </Form>
          {/* image generated from https://smashinglogo.com/ and used for non for profit educational purposes */}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default PostPage;
