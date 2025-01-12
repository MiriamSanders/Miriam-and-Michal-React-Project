import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post"
import AddItem from "./AddItem";
import { fetchData } from "../js-files/GeneralRequests";
import useHandleDisplay from "./useHandleDisplay";
import useHandleError from "./useHandleError";
import Search from "./Search";
import '../css/post.css';
export const PostsContext = createContext();
function Posts({ id }) {
  const [showPosts, setShowPosts] = useState(false);
  const [displayChanged, setDisplayChanged] = useState(false);
  const [posts, setPosts, updatePosts, deletePosts, addPosts] = useHandleDisplay([]);
  const {handleError}=useHandleError();
  const navigate = useNavigate();
  let postAttributes = ['title', 'body'];
  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await fetchData('posts',"userId", id,handleError));
    }
    fetchPosts();
  }, [id]);
  async function fatchAllPosts() {
    navigate(`/users/${id}/posts`)
    if (!showPosts) {
      setPosts(await fetchData('posts',"userId","",handleError));
      setShowPosts(true);
    }
    else {
      setPosts(await fetchData('posts', "userId",id, handleError));
      setShowPosts(false);
    }
  }
  return (
    <PostsContext.Provider value={{ updatePosts, deletePosts, displayChanged, setDisplayChanged }}>
      <div>
        <Search type="posts" searchItems={["id", "title"]} setItems={setPosts} items={posts} displayChanged={displayChanged} setDisplayChanged={setDisplayChanged} />
        <button className="show-posts"onClick={fatchAllPosts}>{showPosts ? "show my posts" : "show all posts"}</button>
        <AddItem key='posts' keys={postAttributes} type='posts'  addDisplay={addPosts} setDisplayChanged={setDisplayChanged} defaltValues={{userId:id}}/>
        {posts && posts.map((post) => { return <Post key={post.id} post={post} /> }
        )}
      </div>
    </PostsContext.Provider>
  )
}
export default Posts