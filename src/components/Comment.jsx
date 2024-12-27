import React from "react";
import { useParams } from "react-router-dom";
import Update from "./Update";
import Delete from "./Delete";
import "../css/comment.css"; // Importing the CSS file

function Comment({ comment }) {
    const { id } = useParams();
    // Add logic to check the user using context (e.g., if user matches comment creator)

    return (
        <div className="comment-div">
            <p className="comment-email">{comment.email}</p>
            <p className="comment-name">{comment.name}</p>
            <p className="comment-body">{comment.body}</p>
            <div className="comment-actions">
                <Update item={comment} type="comments" />
                <Delete id={comment.id} type="comments" />
            </div>
        </div>
    );
}

export default Comment;
