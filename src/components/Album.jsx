import React, { useState, useContext, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlbumsContext } from "./Albums";
import useHandleDisplay from "./useHandleDisplay";
import Photo from "./Photo";
import Update from "./Update";
import Delete from "./Delete";
import AddItem from "./AddItem";
import "../css/album.css";
export const PhotoContext = createContext();

function Album({ album }) {
    const [photos, setPhotos, updatePhotos, deletePhotos, addPhotos] = useHandleDisplay([]);
    const [showPhotos, setShowPhotos] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoPage, setPhotoPage] = useState(1);
    const { updateAlbums, deleteAlbums,setDisplayChanged } = useContext(AlbumsContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const attributes = ["title", "url", "thumbnailUrl"];

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
                setShowPhotos(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setPhotoPage((prevPhotoPage) => prevPhotoPage + 1);
            navigate(`/users/${id}/albums/${album.id}/photos`);
        }
    }

    return (
        <div className="albumContainer">
            <p className="albumId">{album.id}</p>
            <p className="albumTitle">{album.title}</p>
            <Update item={album} type='albums' updateDisplay={updateAlbums} setDisplayChanged={setDisplayChanged} />
            <Delete id={album.id} type='albums' deleteDisplay={deleteAlbums} setDisplayChanged={setDisplayChanged} />
            <button onClick={openAlbumPhotos} disabled={loading}>
                {photoPage === 1 ? "show photos" : "Load More Photos"}
            </button>
            {error && <div className="error">Error: {error}</div>}
            <PhotoContext.Provider value={{ updatePhotos, deletePhotos }}><div>
                <AddItem keys={attributes} type="photos"  addDisplay={addPhotos} defaltValues={{albumId:album.id}}/>
                {showPhotos && <div className="photoContainer">
                    <button className="close-btn" onClick={() => { setShowPhotos(false); navigate(`/users/${id}/albums`);setPhotoPage(1); }}> x</button>
                    <div className="photos-grid">
                        {photos.map((item) => {
                            return <Photo
                                key={item.id}
                                photo={item}
                            />
                        })}
                    </div>
                </div>}
            </div>
            </PhotoContext.Provider>
        </div>
    );
}

export default Album;
