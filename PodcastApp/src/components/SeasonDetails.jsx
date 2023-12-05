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
}) => {
  const selectedSeasonData =
    selectedSeason &&
    podcastSeasonsList.find(
      (season) => season.season === Number(selectedSeason)
    )?.episodes;

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
        Genre:{" "}
        {Array.isArray(genres)
          ? genres
              .filter((genre) => genre !== "All" && genre !== "Featured")
              .join(", ")
          : genres}
      </div>
      <div className="season-select--container">
        <select
          className="season-select"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          <option value="">Seasons:</option>
          {seasonOptions}
        </select>
      </div>

      <button onClick={onClose} className="season-close">
        Close
      </button>

      {renderEpisodeContainer()}
    </div>
  );

  function renderEpisodeContainer() {
    if (selectedSeasonData && selectedSeasonData.length > 0) {
      return (
        <div className="episode-container">
          {selectedSeasonData.map((episode) => (
            <Episode
              key={episode.episode}
              episodeData={episode}
              image={image}
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
