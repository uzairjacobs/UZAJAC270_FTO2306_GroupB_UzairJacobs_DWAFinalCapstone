import React, { useState } from "react";
import Favorites from "./Favorites";

export default function Navbar() {
  const [showFavoritesOverlay, setShowFavoritesOverlay] = useState(false);

  const toggleFavoritesOverlay = () => {
    setShowFavoritesOverlay((prevShowFavoritesOverlay) => !prevShowFavoritesOverlay);
  };


  return (
    <nav className="nav-bar">
      <div className="podcast-nav">
        <img className="podcast-logo" src="/podcast.png" />
        <h3 className='podcast-title'>EchoPods</h3>
      </div>

      <div className="nav-items">
        <ul>
          <li onClick={toggleFavoritesOverlay}>Favourites</li>
        </ul>
      </div>

      {showFavoritesOverlay && (
        <div className="favorites-overlay">
          <div className="favorites-container">
            <button onClick={toggleFavoritesOverlay} className="close-button">
              Close
            </button>
            
            <Favorites  />
          </div>
        </div>
      )}
    </nav>
  );
}
