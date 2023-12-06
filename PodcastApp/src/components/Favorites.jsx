import React, { useState, useEffect } from "react";
import Episode from "./Episode";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState([]);

  useEffect(() => {
    // Retrieve favorited episode IDs from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    // Fetch details of favorited episodes using the IDs
    const fetchFavoritedEpisodes = async () => {
      const favoritedEpisodesData = await Promise.all(
        storedFavorites.map(async (episodeId) => {
          const response = await fetch("https://podcast-api.netlify.app/shows");
          const episodeDetails = await response.json();
          return episodeDetails;
        })
      );
      setFavoriteEpisodes(favoritedEpisodesData);
    };

    fetchFavoritedEpisodes();
  }, []);

  const removeFromFavorites = (episodeId) => {
    // Implement remove from favorites logic
    const updatedFavorites = favorites.filter((id) => id !== episodeId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);

    // Update the favorite episodes state without the removed episode
    setFavoriteEpisodes((prevFavoriteEpisodes) =>
      prevFavoriteEpisodes.filter((episode) => episode.id !== episodeId)
    );
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favoriteEpisodes.length > 0 ? (
        favoriteEpisodes.map((episode) => (
          <Episode
            key={episode.id}
            episodeData={episode}
            onToggleFavorite={() => removeFromFavorites(episode.id)}
          />
        ))
      ) : (
        <p>No favorite episodes yet.</p>
      )}
    </div>
  );
};

export default Favorites;
