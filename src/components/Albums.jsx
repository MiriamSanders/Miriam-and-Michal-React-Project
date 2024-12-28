import React, { useState, useEffect, useContext, createContext } from "react";
import Album from "./Album";
import AddItem from "./AddItem";
import { fetchData } from "./GeneralRequests";
import useUpdateDisplay from "./useUpdateDisplay";
export const AlbumsContext = createContext();
function Albums({ id }) {
    //const [albums, setAlbums] = useState(null);
    const [albums, setAlbums, updateAlbums, deleteAlbums, addAlbums] = useUpdateDisplay(null);

    let albumAttributes = ['title'];

    useEffect(() => {
        const fetchAlbums = async () => {
            setAlbums(await fetchData('albums', id));
        };
        fetchAlbums();
    }, [id]);

    return (
        <AlbumsContext.Provider value={{ updateAlbums, deleteAlbums }}>
            <div>
                <AddItem key="albums" keys={albumAttributes} type="albums" display={false}  addDisplay={addAlbums}/>
                {albums && albums.map((album) => <Album key={album.id} album={album} />)}
            </div>
        </AlbumsContext.Provider>);
}

export default Albums;
