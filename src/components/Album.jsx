import React from "react"
// מציג אלבום יחיד ולטפל בו 
function Album({id,itemTitle})
{
        return (
            <div>
                <p>{id}</p>
                <p>{itemTitle}</p>
            </div>
        )

}
export default Album;