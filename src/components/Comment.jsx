import React from "react"

function Comment({ body, email }) {
    return <>
        <p>
            {email}
        </p>
        <p>
            {body}
        </p>
    </>
}
export default Comment;