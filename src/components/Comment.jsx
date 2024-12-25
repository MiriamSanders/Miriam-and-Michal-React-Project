import React from "react"
import { useParams } from "react-router-dom";
import Update from "./Update";
import Delete from "./Delete";
//update my Comment, erase my comment
function Comment({ comment }) {
    const {id}=useParams();
    return <>
        <p>
            {comment.email}
        </p>
        <p>{comment.name}</p>
        <p>
            {comment.body}
        </p>
        {//important -chack if it is the right user!!!!!!!!!!!!!!!!!! -use context
        <div><Update item={comment} type='comments'/>
        <Delete id={comment.id} type='comments'/></div>
}
    </>
}
export default Comment;