import React from "react";
import Update from "./Update";
import Delete from "./Delete";

function Photo({ photo, updateDisplay, deleteDisplay }) {
    return (
        <div>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <Update item={photo} type='photos' updateDisplay={updateDisplay} />
            <Delete id={photo.id} type='photos' deleteDisplay={deleteDisplay} />
        </div>
    );
}

export default Photo;
