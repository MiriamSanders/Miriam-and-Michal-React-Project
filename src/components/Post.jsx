import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import '../css/post.css';
import { useParams } from "react-router-dom";
import { PostsContext } from "./Posts";
import Update from "./Update";
import Comment from "./Comment";
import Delete from "./Delete";
//update my posts, delte my posts
function Post({ post }) {
    const navigate = useNavigate();
    const [showPost, setShowPost] = useState(false);
    const [comments, setComments] = useState(null);
    const { updatePosts, deletePosts } = useContext(PostsContext);

    const { id } = useParams();
    function showPostFunction() {
        setShowPost(true);
        navigate(`/home/users/${id}/posts/${post.id}`);
    }
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
                    <p>{post.id}</p>
                    <p>{post.title}</p>
                    <button onClick={showPostFunction}>Show Post</button>
                </div>
            )}
            {showPost && (
                <div className="postContainer">
                    <h6 className="postTitle">{post.title}</h6>
                    <p className="postData">{post.body}</p>
                    <button onClick={showComments}>Show Comments</button>
                    <Update item={post} type='posts' updateDisplay={updatePosts} />
                    <Delete id={post.id} type='posts' deleteDisplay={deletePosts} />
                    {comments && <div className="comment-container">{comments.map((comment) => { return <Comment key={comment.id} comment={comment}></Comment> })}</div>}

                </div>
            )}
        </>
    );
}

export default Post;
