import React, { useState, useEffect } from "react";

const Episode = ({ episodeData, image, onToggleFavorite }) => {
  const { id, title, episode, description, file } = episodeData;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState(null);

  const renderAudioPlayer = () => {
    return (
      <div>
        <audio
          controls
          className="audio"
          onPlay={() => setIsAudioPlaying(true)}
          onPause={() => setIsAudioPlaying(false)}
          onLoadedMetadata={(e) => {
            setAudioElement(e.target);

            // Retrieve playback position from localStorage
            const savedPlaybackPosition = localStorage.getItem(`episode-${id}-position`);
            if (savedPlaybackPosition !== null) {
              e.target.currentTime = parseFloat(savedPlaybackPosition);
            }
          }}
          onEnded={() => {
            // Clear playback position when the episode ends
            localStorage.removeItem(`episode-${id}-position`);
          }}
          onTimeUpdate={() => {
            // Save playback position to localStorage every 10 seconds
            if (audioElement.currentTime % 10 === 0) {
              localStorage.setItem(`episode-${id}-position`, audioElement.currentTime.toString());
            }
          }}
        >
          <source src={file} type="audio/mp3" />
        </audio>
        {audioElement && (
          <div className="audio-timestamps">
            <p>Current: {formatTime(audioElement.currentTime)}</p>
            <p>Duration: {formatTime(audioElement.duration)}</p>
          </div>
        )}
        <button onClick={handleResetProgress}>Reset Progress</button>
      </div>
    );
  };

  const handleToggleFavorite = () => {
    console.log("Toggle favorite button clicked");
  };

  const handleResetProgress = () => {
    // Clear playback position from localStorage
    localStorage.removeItem(`episode-${id}-position`);
    // Reset the audio element's current time
    if (audioElement) {
      audioElement.currentTime = 0;
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isAudioPlaying && audioElement) {
        // Save playback position to localStorage when the user closes the page
        localStorage.setItem(`episode-${id}-position`, audioElement.currentTime.toString());
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isAudioPlaying, audioElement, id]);

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
