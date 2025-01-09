import React, { useState, useContext, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/post.css';
import { useParams, useLocation } from "react-router-dom";
import { PostsContext } from "./Posts";
import { userContext } from "./App";
import Update from "./Update";
import Comment from "./Comment";
import Delete from "./Delete";
import AddItem from "./AddItem";
import useHandleDisplay from "./useHandleDisplay";
export const CommentContext = createContext();
function Post({ post }) {
    const navigate = useNavigate();
    const { id, postid } = useParams();
    const [showPost, setShowPost] = useState(postid == post.id ? true : false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments, updateComments, deleteComments, addComments] = useHandleDisplay([]);
    const { updatePosts, deletePosts, setDisplayChanged } = useContext(PostsContext);
    const { userData } = useContext(userContext);
    const attributes = ["name", "body"];
    const location = useLocation();
    function showPostFunction() {
        setShowPost(true);
        navigate(`/users/${id}/posts/${post.id}`);
    }
    useEffect(() => {
        (async function () {
            const hasPath = location.pathname.includes("comments");
            if (hasPath) {
                if (comments.length>0) {
                    setShowComments(true);
                }
                else {
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
                            setShowComments(true);
                        }
                    }
                    catch (ex) {

                    }
                }
            }

        })();
    }, [location.pathname])
    async function navigateToComments() {
        navigate(`/users/${id}/posts/${post.id}/comments`);
    }
    return (
        <>
            {!showPost && (
                <div className="postContainer">
                    <p>{post.id}</p>
                    <p>{post.title}</p>
                    {post.userId == userData.id && <div>
                        <Update item={post} type='posts' updateDisplay={updatePosts} setDisplayChanged={setDisplayChanged} />
                        <Delete id={post.id} type='posts' deleteDisplay={deletePosts} setDisplayChanged={setDisplayChanged} />
                    </div>}
                    <button onClick={showPostFunction}>Show Post</button>
                </div>
            )}
            {showPost && (<div className="overlay">
                <div className="postContainer modal">
                    <button onClick={() => {
                        setShowPost(false);
                        setShowComments(false);
                        navigate(`/users/${id}/posts`);
                    }}> x</button>
                    <h6 className="postTitle">{post.title}</h6>
                    <p className="postData">{post.body}</p>
                    <button onClick={navigateToComments}>Show Comments</button>
                    <CommentContext.Provider value={{ updateComments, deleteComments }}> <div> <AddItem keys={attributes} type="comments" addDisplay={addComments} defaltValues={{ email: userData.email, postId: post.id }} />{
                        showComments && <div className="comment-container">{comments.map((comment) => { return <Comment key={comment.id} comment={comment}></Comment> })}
                        </div>}</div></CommentContext.Provider>
                </div>
            </div>
            )}
        </>
    );
}

export default Post;
