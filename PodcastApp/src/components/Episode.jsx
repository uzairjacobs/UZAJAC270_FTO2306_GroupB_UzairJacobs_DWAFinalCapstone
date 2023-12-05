import React from "react";

const Episode = ({ episodeData, image }) => {
  const { title, episode, description, file } = episodeData;

  const renderAudioPlayer = () => {
    return (
      <audio controls className="audio">
        <source src={file} type="audio/mp3" />
      </audio>
    );
  };

  return (
    <div key={episode} className="episodes">
      <img src={image} alt={title} className="episode-img" />
      <div>
        <h4>{title}</h4>
        <h5>Episode: {episode}</h5>
        <p>{description}</p>
        {file && renderAudioPlayer()}
      </div>
    </div>
  );
};

export default Episode;