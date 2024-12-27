import React, { createContext, useState, useEffect, useContext } from "react";
import Post from "./Post"
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";
function Posts({id})
{
    const [posts, setPosts] = useState(null);
    let postAttributes=['title','body'];
    useEffect(()=>{const  fetchPosts =async()=>{
      setPosts(await fetchData('posts',id));}
      fetchPosts();
    },[id])
   return  (<div>
     <AddItem key='posts' keys={postAttributes} type='posts' display={false}/>
    {posts&&posts.map((post)=>{ return <Post key={post.id} post={post}/>}
    )}
   </div>
   )
}
export default Posts