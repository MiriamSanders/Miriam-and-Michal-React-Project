import React ,{useState}from "react"

function Post({ id, itemTitle, postData }) {
    const [ showPost,setShowPost] = useState(false);
    return (
        <>{!showPost && <div>
            <p>{id}</p>
            <p>{itemTitle}</p>
            <button onClick={()=>{setShowPost(!showPost)}}>show post</button>
        </div>
        }
            {showPost && <div>
                <h6 className="postTitle">{itemTitle}</h6>
                <p className="postData">{postData}</p>
                <button>show comments</button>
            </div>
            }
        </>
    )
}
export default Post;