import React, { createContext, useState, useEffect, useContext } from "react";
import Post from "./Post"
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";
import useUpdateDisplay from "./useUpdateDisplay";
export const PostsContext = createContext();
function Posts({id})
{
    // const [posts, setPosts] = useState(null);
    const [posts,setPosts,updatePosts,deletePosts,addPosts]=useUpdateDisplay(null);
    let postAttributes=['title','body'];
    useEffect(()=>{const  fetchPosts =async()=>{
      setPosts(await fetchData('posts',id));}
      fetchPosts();
    },[id])
   return  (
    <PostsContext.Provider value={{  updatePosts,deletePosts }}>
   <div>
     <AddItem key='posts' keys={postAttributes} type='posts' display={false} addDisplay={addPosts}/>
    {posts&&posts.map((post)=>{ return <Post key={post.id} post={post}/>}
    )}
   </div>
     </PostsContext.Provider>
   )
}
export default Posts