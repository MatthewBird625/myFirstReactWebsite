import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../Assets/CSS/Button.css";
import "../Assets/CSS/PostPage.css";
import "../Assets/CSS/view.css";
import { useRef, useState, useEffect } from "react";

const PostPage = (props) => {
  const navigate = useNavigate();

  // i manually generate a pk for each post using this state and post counter in local storage.
  //later this will be replaced with the pk from the database- without this when a profile is deleted,
  // the comments of that post move to the next made post! which is incorrect behaviour
  const [postCount, setPostCount] = useState(
    localStorage.getItem("postCount")
      ? JSON.parse(localStorage.getItem("postCount"))
      : 0
  );

  useEffect(() => {
    if (props.login !== true) {
      navigate("/");
    }
  }, []);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const contentRef = useRef(null);

  const [imageUpload, setImageUpload] = useState(null);
  const [form, setForm] = useState({
    content: "",
    userAccount: props.currentUser,
    postId: postCount,
  });

  const [posts, setPosts] = useState(
    localStorage.getItem("posts")
      ? JSON.parse(localStorage.getItem("posts"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("postCount", JSON.stringify(postCount));
  }, [postCount]);

  // handle change and handleSubmit is based off the solution presented in the RMIT FWP WEEK 5 LAB with some modifications
  const handleChange = (field) => (event) => {
    setForm((form) => ({ ...form, [field]: event.target.value }));

    setSuccess("");
  };

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
      //this post ID will be used with a /images path to store images locally for now till the back end is developed.
      //currently increments values of 2 instead of 1- but doesnt't affect funcitonality and not worth fixing as this will not be used later.

      form.postId = postCount;
      newPosts.push(form);
      setSuccess("post successful!");
      setForm({ content: "", userAccount: props.currentUser });
      setPostCount((parseInt(postCount) + 1).toString());

      //if the user has an image
      //functionality to store image on backend goes here:
      if (imageUpload) {
        console.log(imageUpload);
      }

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
          {imageUpload && (
            <div>
              <img
                className="post-image"
                alt="not fount"
                src={URL.createObjectURL(imageUpload)}
              />
              <br />
              <Button
                className="image-button"
                variant="secondary"
                onClick={() => setImageUpload(null)}
              >
                Remove
              </Button>
            </div>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="formBasicontent"
              value={form.content}
              onChange={handleChange("content")}
            >
              <Form.Label></Form.Label>
              <Form.Control
                type="file"
                name="myImage"
                multiple
                accept="image/*"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setImageUpload(event.target.files[0]);
                }}
              />
              <Form.Text className="text-muted">upload image</Form.Text>
            </Form.Group>
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
