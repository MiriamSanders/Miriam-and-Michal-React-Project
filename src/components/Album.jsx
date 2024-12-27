import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import "../css/album.css"; 
import Photo from "./Photo";
import Update from "./Update";
import Delete from "./Delete";
//update albums, erase
function Album({ album }) {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoPage, setPhotoPage] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    async function openAlbumPhotos(){
        setLoading(true);
        setError(null); 
        try {
            const response = await fetch(`http://localhost:3000/photos/?albumId=${album.id}&_page=${photoPage}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (result) {
                navigate(`/home/users/${id}/albums/${album.id}`);
                setPhotos((prevPhotos)=>[...prevPhotos,...result.data]);
            } else {
                throw new Error("No photos in the album");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
            setPhotoPage((prevPhotoPage) => prevPhotoPage + 1);
        }
    }

    return (
        <div className="albumContainer">
            <p className="albumId">{album.id}</p>
            <p className="albumTitle">{album.title}</p>
           <Update item={album} type='albums'/>
            <Delete id={album.id} type='albums'/>
            
            <button onClick={openAlbumPhotos} disabled={loading}>
                {photoPage==1 ? "show photos" : "Load More Photos"}
            </button>

            {error && <div className="error">Error: {error}</div>}

        { photos[0]&&  <div className="photoContainer">
                {photos.map((item) => {
                    return <Photo key={item.id} photo={item} />
                })}
            </div>}
        </div>
    );
}

export default Album;
