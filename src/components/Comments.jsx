import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";

function Comments({ id }) {
    const [comments, setComments] = useState(null);
    let commentAttributes = ['name', 'email', 'body'];

    useEffect(() => {
        const fetchComments = async () => {
            setComments(await fetchData('comments', id));
        };
        fetchComments();
    }, [id]);

    return (
        <div>
            <AddItem key="comments" keys={commentAttributes} type="comments" defaltValues={user} />
            {comments && comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
        </div>
    );
}

export default Comments;
