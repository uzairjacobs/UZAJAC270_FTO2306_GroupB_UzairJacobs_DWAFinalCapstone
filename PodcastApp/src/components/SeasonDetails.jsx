import React from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Episode from "./Episode.jsx";

const SeasonDetails = ({
  image,
  title,
  updated,
  genres,
  seasonOptions,
  selectedSeason,
  handleSeasonChange,
  onClose,
  podcastSeasonsList,
  onToggleFavorite, 
}) => {
  // Logging the type of onToggleFavorite prop for debugging
  console.log("Type of onToggleFavorite:", typeof onToggleFavorite);
  
  // Get data for the selected season based on the chosen seasonId
  const selectedSeasonData =
    selectedSeason &&
    podcastSeasonsList.find(
      (season) => season.season === Number(selectedSeason)
    )?.episodes;

  // Format the 'updated' timestamp to a human-readable date format
  const dateFormat = format(new Date(updated), "MMMM d, yyyy", {
    locale: enUS,
  });

  return (
    <div className="season-details">
      <div className="season-img--container">
        <img src={image} alt={title} className="season-img" />
      </div>

      <h2 className="season-title">{title}</h2>

      <div className="season-date">Updated: {dateFormat}</div>
      <div className="season-genre">
        {/* Display genres based on whether they are provided as an array */}
        {Array.isArray(genres)
          ? genres
              .filter((genre) => genre !== "All" && genre !== "Featured")
              .join(", ")
          : genres}
      </div>

      <div className="season-select--container">
        {/* Dropdown for selecting different seasons */}
        <select
          className="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          <option value="">Seasons:</option>
          {seasonOptions}
        </select>
      </div>

      {/* Close button to close the modal overlay */}
      <button onClick={onClose} className="season-close">
        Close
      </button>

      {/* Call the renderEpisodeContainer function to render episodes */}
      {renderEpisodeContainer()}
    </div>
  );

  // Function to render the container of individual episodes
  function renderEpisodeContainer() {
    if (selectedSeasonData && selectedSeasonData.length > 0) {
      return (
        <div className="episode-container">
          {selectedSeasonData.map((episode) => (
            // Render individual Episode components for each episode
            <Episode
              key={episode.episode}
              episodeData={episode}
              image={image}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
};

export default SeasonDetails;
