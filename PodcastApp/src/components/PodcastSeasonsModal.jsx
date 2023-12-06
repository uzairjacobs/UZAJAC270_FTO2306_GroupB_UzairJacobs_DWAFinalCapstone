import React, { useEffect, useState } from "react";
import SeasonDetails from "./SeasonDetails.jsx";

const PodcastSeasonsModal = ({ seasonId, overlayOpen, onClose, onToggleFavorite }) => {
  const [podcastSeasons, setPodcastSeasons] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");

  useEffect(() => {
    const getPodcasts = async () => {
      if (!seasonId) {
        throw new Error("Invalid seasonId");
      }

      try {
        const res = await fetch(
          `https://podcast-api.netlify.app/id/${seasonId}`
        );
        if (!res.ok) {
          console.error("Failure to acquire podcast details.");
          return;
        }
        const data = await res.json();
        setPodcastSeasons(data);
      } catch (err) {
        console.error(
          "An error occurred while fetching the podcast details.",
          err
        );
      }
    };

    getPodcasts();
  }, [seasonId, overlayOpen]);

  if (!podcastSeasons) {
    return <div>Failed to load podcast details.</div>;
  }

  const {
    image,
    title,
    updated,
    genres,
    seasons: podcastSeasonsList,
  } = podcastSeasons;

  const handleSeasonChange = (event) => {
    const selectedSeasonId = event.target.value;
    setSelectedSeason(selectedSeasonId);
  };

  const seasonOptions = podcastSeasonsList
    .filter((item) => item.episodes && item.episodes.length > 0)
    .sort((a, b) => a.season - b.season)
    .map((item) => (
      <option key={item.season} value={item.season}>
        Season {item.season} ({item.episodes.length} Episodes)
      </option>
    ));

  return (
    <SeasonDetails
      image={image}
      title={title}
      updated={updated}
      genres={genres}
      seasonOptions={seasonOptions}
      selectedSeason={selectedSeason}
      handleSeasonChange={handleSeasonChange}
      onClose={onClose}
      podcastSeasonsList={podcastSeasonsList}
      onToggleFavorite={onToggleFavorite}
    />
  );
};

export default PodcastSeasonsModal;
