import { useRef, useState  } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form'
import "./Post.css"
import { Row , Alert } from 'react-bootstrap';

const Post = (props)=>{
    
    const [comment, setComment] = useState({
        content: "",
        userAccount: props.currentUser,
        commentId: 0
      });
      const commentRef = useRef(null);
      const [error, setError] = useState("")
      const [success, setSuccess]= useState("");

      const handleSubmit=(e) =>{
        e.preventDefault()

      }

      const handleChange = (field) => (event) => {
        setComment((comment) => ({ ...comment, [field]: event.target.value }));
    
       
      };

    return <Card className = "post">
    <Card.Img variant="top" src="https://picsum.photos/200/100" />
    <Card.Body>
      <Card.Title className='post-username'>{props.postData.userAccount}</Card.Title>
      <Card.Text className='post-text'>
      {props.postData.content}
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Comment</ListGroup.Item>
      <ListGroup.Item>Comment</ListGroup.Item>
      <ListGroup.Item>Comment</ListGroup.Item>
    </ListGroup>
    <Card.Body>
    <Form> <Form onSubmit={handleSubmit}>
    <h3> leave a comment</h3>
         
            <Form.Group
              className="mb-3"
              controlId="formBasicontent"
              value={comment.content}
              onChange={handleChange("content")}
            >
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                type="text"
                placeholder=""
                ref={commentRef}
                value= {comment.content}
                onChange={handleChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Row>
                <Button
                  className="button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
            
            </Row>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
          </Form></Form>

    </Card.Body>
  </Card>
}

export default Post;