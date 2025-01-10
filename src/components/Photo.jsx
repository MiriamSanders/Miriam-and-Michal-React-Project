import React, { useContext } from "react";
import Update from "./Update";
import Delete from "./Delete";
import "../css/Photo.css";
import { PhotoContext } from "./Album";
function Photo({ photo }) {
    const { updatePhotos, deletePhotos } = useContext(PhotoContext);
    return (
        // <div>
        //     <img src={photo.thumbnailUrl} alt={photo.title} />
        //     <Update item={photo} type='photos' updateDisplay={updatePhotos} />
        //     <Delete id={photo.id} type='photos' deleteDisplay={deletePhotos} />
        // </div>
        <div class="image-container">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <div class="overlay-buttons">
            <Update item={photo} type='photos' updateDisplay={updatePhotos} />
            <Delete id={photo.id} type='photos' deleteDisplay={deletePhotos} />
            </div>
        </div>
    );
}

export default Photo;
