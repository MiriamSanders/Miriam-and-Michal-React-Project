import React, { useState, useEffect } from "react";
import Album from "./Album";
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";

function Albums({ id }) {
    const [albums, setAlbums] = useState(null);
    let albumAttributes = ['title'];

    useEffect(() => {
        const fetchAlbums = async () => {
            setAlbums(await fetchData('albums', id));
        };
        fetchAlbums();
    }, [id]);

    return (
        <div>
            <AddItem key="albums" keys={albumAttributes} type="albums" display={false} />
            {albums && albums.map((album) => <Album key={album.id} album={album} />)}
        </div>
    );
}

export default Albums;
