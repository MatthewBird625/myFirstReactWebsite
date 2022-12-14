import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../Assets/CSS/Button.css";
import "../Assets/CSS/PostPage.css";
import "../Assets/CSS/view.css";
import { useRef, useState, useEffect } from "react";
import { getUser, createPost } from "../data/repository";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostPage = (props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const [form, setForm] = useState({
    content: "",
    email: getUser().email,
  });
  //value for React Quill box
  const [value, setValue] = useState("");

  useEffect(() => {
    const createPostEffect = async () => {
      const result = await createPost(form);
    };
    if (value.length < 1 || value.length > 250) {
    } else {
      createPostEffect();
    }
  }, [form]);

  // handle change and handleSubmit is based off the solution presented in the RMIT FWP WEEK 5 LAB with some modifications
  const handleChange = (field) => (event) => {
    setForm((form) => ({ ...form, [field]: event.target.value }));

    setSuccess("");
  };

  const handleSubmit = async (e) => {
    setForm({ ...form, content: value });
    e.preventDefault();
    setSuccess("");
    setError("");

    if (value.length < 1 || value.length > 250) {
      setError("content must be between 1 and 250 characters");
      return;
    }

    setSuccess("post created!");
  };

  return (
    <Container fluid>
      <Row className="min-view post">
        <Col></Col>
        <Col className="make-post" sm={8} md={6}>
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
            <Form.Group className="mb-3" controlId="formBasicontent">
              <Form.Label></Form.Label>
              <Form.Control
                type="file"
                name="myImage"
                multiple
                accept="image/*"
                onChange={(event) => {
                  setImageUpload(event.target.files[0]);
                }}
              />
              <Form.Text className="text-muted">upload image</Form.Text>
            </Form.Group>

            <ReactQuill theme="snow" value={value} onChange={setValue} />
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
