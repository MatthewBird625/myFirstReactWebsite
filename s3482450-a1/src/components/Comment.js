const Comment = (props) => {



    if(props.postId === props.comment.postId){

    return<p><strong>{props.comment.userAccount}:  </strong>{props.comment.content}</p>;

    }
    else{
        return;
    }






}

export default Comment;