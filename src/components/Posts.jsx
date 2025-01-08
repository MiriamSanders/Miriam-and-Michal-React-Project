import React, { createContext, useState, useEffect, useContext } from "react";
import Post from "./Post"
import AddItem from "./AddItem";
import { fetchData } from "../js-files/GeneralRequests";
import useHandleDisplay from "./useHandleDisplay";
import Search from "./Search";
export const PostsContext = createContext();
function Posts({ id }) {
  const [showPosts, setShowPosts] = useState(false);
  const [displayChanged, setDisplayChanged] = useState(false);
  const [posts, setPosts, updatePosts, deletePosts, addPosts] = useHandleDisplay(null);
  let postAttributes = ['title', 'body'];
  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await fetchData('posts', id));
    }
    fetchPosts();
  }, [id]);
  async function fatchAllPosts() {
    if (!showPosts) {
      setPosts(await fetchData('posts'));
      setShowPosts(true);
    }
    else {
      setPosts(await fetchData('posts', id));
      setShowPosts(false);
    }
  }
  return (
    <PostsContext.Provider value={{ updatePosts, deletePosts, displayChanged, setDisplayChanged }}>
      <div>
        <button onClick={fatchAllPosts}>{showPosts ? "show my posts" : "show all posts"}</button>
        <Search type="posts" searchItems={["id", "title"]} setItems={setPosts} items={posts} displayChanged={displayChanged} />
        <AddItem key='posts' keys={postAttributes} type='posts'  addDisplay={addPosts} setDisplayChanged={setDisplayChanged} />
        {posts && posts.map((post) => { return <Post key={post.id} post={post} /> }
        )}
      </div>
    </PostsContext.Provider>
  )
}
export default Posts