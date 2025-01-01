import React, { useState, useContext, createContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlbumsContext } from "./Albums";
import useUpdateDisplay from './useUpdateDisplay';
import Photo from "./Photo";
import Update from "./Update";
import Delete from "./Delete";
import "../css/album.css";
export const PhotoContext=createContext();
function Album({ album }) {
    const [photos, setPhotos, updatePhotos, deletePhotos] = useUpdateDisplay([]); // ניהול התמונות בעזרת הוק
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoPage, setPhotoPage] = useState(1);
    const { updateAlbums, deleteAlbums } = useContext(AlbumsContext); // קבלת הפונקציות מהקונטקסט
    const { id } = useParams();
    const navigate = useNavigate();

    async function openAlbumPhotos() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/photos/?albumId=${album.id}&_page=${photoPage}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (result) {
                setPhotos((prevPhotos) => prevPhotos ? [...prevPhotos, ...result.data] : result.data);

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
            <Update item={album} type='albums' updateDisplay={updateAlbums} />
            <Delete id={album.id} type='albums' deleteDisplay={deleteAlbums} />

            <button onClick={openAlbumPhotos} disabled={loading}>
                {photoPage === 1 ? "show photos" : "Load More Photos"}
            </button>

            {error && <div className="error">Error: {error}</div>}
<PhotoContext.Provider value={{updatePhotos,deletePhotos}}>
            {photos[0] && <div className="photoContainer">
                {photos.map((item) => {
                    return <Photo
                        key={item.id}
                        photo={item}
                        // updateDisplay={updatePhotos} // העברת פונקציות הוק ל-Photo
                        // deleteDisplay={deletePhotos}
                    />
                })}
            </div>}
            </PhotoContext.Provider>
        </div>
    );
}

export default Album;
