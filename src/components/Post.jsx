import React, { useState } from "react";
import '../css/post.css';
import { FaPen, FaTrash } from "react-icons/fa";
import Comment from "./Comment";

function Post({ id, itemTitle, postData }) {
    const [showPost, setShowPost] = useState(false);
    const [comments, setComments] = useState(null);

    async function showComments() {

        const response = await fetch(
            `http://localhost:3000/comments/?postId=${id}`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();

        if (result.length > 0) {
            setComments(result); // הוספת תמונות
        } else {
            throw new Error("No more comments to load");
        }
    }
    return (
        <>
            {!showPost && (
                <div className="postContainer">
                    <p>{id}</p>
                    <p>{itemTitle}</p>
                    <button onClick={() => setShowPost(!showPost)}>Show Post</button>
                </div>
            )}
            {showPost && (
                <div className="postContainer">
                    <h6 className="postTitle">{itemTitle}</h6>
                    <p className="postData">{postData}</p>
                    <button onClick={showComments}>Show Comments</button>
                    {comments && comments.map((comment) => { return <Comment key={comment.id}  body={comment.body} email={comment.email}></Comment> })}
                    <FaPen />
                    <FaTrash />
                </div>
            )}
        </>
    );
}

export default Post;
