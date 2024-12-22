import React, { useState } from "react";
import "../css/album.css"; // Import the CSS file
import { FaPen, FaTrash } from "react-icons/fa";
import Photo from "./Photo";

function Album({ id, itemTitle }) {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoPage, setPhotoPage] = useState(1);
    async function openAlbumPhotos() {
        setLoading(true); // מצב טעינה
        setError(null); // איפוס שגיאות ישנות
        try {
            const response = await fetch(`http://localhost:3000/photos/?albumId=${id}&_page=${photoPage}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (result) {
                setPhotos(result.data); // שמירת התמונות בסטייט
            } else {
                throw new Error("No photos in the album");
            }
        } catch (err) {
            setError(err.message); // שמירת הודעת השגיאה
        } finally {
            setLoading(false); // סיום טעינה
            setPhotoPage((prevPhotoPage) => prevPhotoPage + 1);
        }
    }

    return (
        <div className="albumContainer">
            <p className="albumId">{id}</p>
            <p className="albumTitle">{itemTitle}</p>
            <FaPen />
            <FaTrash />
            <button onClick={openAlbumPhotos} disabled={loading}>
                {loading ? "Loading..." : "Load More Photos"}
            </button>

            {error && <div className="error">Error: {error}</div>}

            <div className="photoContainer">
                {photos.map((item) => {
                    return <Photo key={item.id} thumbnailUrl={item.thumbnailUrl} />
                })}
            </div>
        </div>
    );
}

export default Album;
