import React from "react";
import '../css/album.css';  // Import the CSS file

function Album({ id, itemTitle }) {
  return (
    <div className="albumContainer">
      <p className="albumId">{id}</p>
      <p className="albumTitle">{itemTitle}</p>
    </div>
  );
}

export default Album;
