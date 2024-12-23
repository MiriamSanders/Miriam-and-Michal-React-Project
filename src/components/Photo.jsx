import React from "react"
import Update from "./Update";
import Delete from "./Delete";
//update,delete
function Photo({photo})
{
    return (<div><img src={photo.thumbnailUrl}></img>
    <Update item={photo} type='photos'/>
    <Delete id={photo.id} type='photos'/>
    </div> )
    
}
export default Photo;