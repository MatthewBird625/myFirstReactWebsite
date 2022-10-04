import { ListGroupItem, ListGroup} from "react-bootstrap";
import Comment from "./Comment";
const Comments= (props) => {


    let postComments = props.comments.filter((comment) => comment.postId === props.postId)
 


  
     
    return <ListGroup className="list-group-flush">

{postComments.map((comment)=>(<ListGroupItem><Comment comment= {comment} postId = {props.postId}/></ListGroupItem> ))}

 
    </ListGroup>

    
}

export default Comments;