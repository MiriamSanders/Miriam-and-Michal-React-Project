import React, { useState } from "react";
import '../css/post.css'; 

function Post({ id, itemTitle, postData }) {
  const [showPost, setShowPost] = useState(false);

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
          <button>Show Comments</button>
        </div>
      )}
    </>
  );
}

export default Post;
