import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../Assets/CSS/Button.css";
import "../Assets/CSS/PostPage.css";
import "../Assets/CSS/view.css";
import { useRef, useState, useEffect } from "react";
import { getUser, createPost } from "../data/repository";

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

  const [imageUpload, setImageUpload] = useState(null);
  const [form, setForm] = useState({
    content: "",
    email: getUser().email,
  });

  // handle change and handleSubmit is based off the solution presented in the RMIT FWP WEEK 5 LAB with some modifications
  const handleChange = (field) => (event) => {
    setForm((form) => ({ ...form, [field]: event.target.value }));

    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.content.length < 1 || form.content.length > 250) {
      setError("content must be between 1 and 250 characters");
      return;
    }
    console.log(form.content);
    createPost(form);
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
