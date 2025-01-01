import React,{useContext} from "react";
import Update from "./Update";
import Delete from "./Delete";
import { PhotoContext } from "./Album";
function Photo({ photo,  }) {
    const{updatePhoto,deletePhoto}=useContext(PhotoContext);
    return (
        <div>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <Update item={photo} type='photos' updateDisplay={updatePhoto} />
            <Delete id={photo.id} type='photos' deleteDisplay={deletePhoto} />
        </div>
    );
}

export default Photo;
