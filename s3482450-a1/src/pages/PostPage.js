import { Container, Row, Col, Form, Button, Alert} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../components/Button.css";
import "./PostPage.css"
import { useRef, useState } from "react";
const PostPage = (props) => {


  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const contentRef = useRef(null);
  


  if (props.login !== true) {
    navigate("/");
  }

  const handleSubmit = (e) => {
    setSuccess("");
    e.preventDefault();

    if(content.length < 1 || content.length > 250){
      setError("content must be between 1 and 250 characters");
      return;
    }


    setError("");
    setSuccess("successful post!");
    setContent("");
    
  };

  return (
    <Container fluid>
      <Row className="px-4 my-5">
      <Col></Col>
        <Col sm={8} md={6}>
          {/* Dummy placeg=holder for now- TODO replace with company logo */}
          <h1 className="heading">Make a Post</h1>

          <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicontent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        >
          <Form.Label></Form.Label>
          <Form.Control
          as="textarea" rows="5"
            type="text"
            placeholder=""
            ref={contentRef}
          />
          <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

        <Row>
          <Col>
            <Button className="button-bigger" variant="primary" type="submit">
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
