import React, { useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import '../css/post.css';
import { useParams } from "react-router-dom";
import { PostsContext } from "./posts";
import { userContext } from "./App";
import Update from "./Update";
import Comment from "./Comment";
import Delete from "./Delete";
import AddItem from "./AddItem";
import useHandleDisplay from "./useHandleDisplay";
//update my posts, delte my posts
export const CommentContext = createContext();
function Post({ post }) {
    const navigate = useNavigate();
    const { id, postid } = useParams();
    console.log(id, postid);
    const [showPost, setShowPost] = useState(postid == post.id ? true : false);
    // const [comments, setComments] = useState(null);
    const [comments, setComments, updateComments, deleteComments, addComments] = useHandleDisplay(null);
    const { updatePosts, deletePosts, setDisplayChanged } = useContext(PostsContext);
    const { userData } = useContext(userContext);
    const attributes = ["email", "name", "body"];
    function showPostFunction() {
        setShowPost(true);
        navigate(`/home/users/${id}/posts/${post.id}`);
    }
    async function showComments() {
        try {
            const response = await fetch(
                `http://localhost:3000/comments/?postId=${id}`
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();

            if (result.length > 0) {
                setComments(result);
                navigate(`/home/users/${id}/posts/${post.id}/comments`);
            }
        }
        catch (ex) {

        }
    }
    return (
        <>
            {!showPost && (
                <div className="postContainer">
                    <p>{post.id}</p>
                    <p>{post.title}</p>
                    {post.userId == userData.id && <div>
                        <Update item={post} type='posts' updateDisplay={updatePosts} />
                        <Delete id={post.id} type='posts' deleteDisplay={deletePosts} />
                    </div>}
                    <button onClick={showPostFunction}>Show Post</button>
                </div>
            )}
            {showPost && (<div className="overlay">
                <div className="postContainer modal">
                    <button onClick={()=>{setShowPost(false); navigate(`/home/users/${id}/posts`); }}> x</button>
                    <h6 className="postTitle">{post.title}</h6>
                    <p className="postData">{post.body}</p>
                    <button onClick={showComments}>Show Comments</button>
                    <CommentContext.Provider value={{ updateComments, deleteComments }}> <div> <AddItem keys={attributes} type="comments" display={false} addDisplay={addComments} />{comments && <div className="comment-container">{comments.map((comment) => { return <Comment key={comment.id} comment={comment}></Comment> })}</div>}</div></CommentContext.Provider>
                </div>
                </div>
            )}
        </>
    );
}

export default Post;
