import React, { useState } from "react";

const Episode = ({ episodeData, image, onToggleFavorite }) => {
  const { id, title, episode, description, file } = episodeData;
  const [isFavorite, setIsFavorite] = useState(false);

  const renderAudioPlayer = () => {
    return (
      <audio controls className="audio">
        <source src={file} type="audio/mp3" />
      </audio>
    );
  };

  const handleToggleFavorite = () => {
      console.log("Toggle favorite button clicked");
  };

  return (
    <div key={id} className="episodes">
      <img src={image} alt={title} className="episode-img" />
      <div>
        <h4>{title}</h4>
        <h5>Episode: {episode}</h5>
        <p>{description}</p>
        {file && renderAudioPlayer()}
        <button onClick={handleToggleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default Episode;
