import React, { useEffect, useState } from "react";
import SeasonDetails from "./SeasonDetails.jsx";

const PodcastSeasonsModal = ({ seasonId, overlayOpen, onClose, onToggleFavorite }) => {
  // Logging the type of onToggleFavorite prop for debugging
  console.log("Type of onToggleFavorite:", typeof onToggleFavorite);
  
  // State variables for storing podcast season details and the selected season
  const [podcastSeasons, setPodcastSeasons] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("");
  
  // useEffect hook to fetch podcast season details when the component mounts or when seasonId or overlayOpen changes
  useEffect(() => {
    console.log("Inside useEffect - Type of onToggleFavorite:", typeof onToggleFavorite);
    
    // Asynchronous function to fetch podcast season details
    const getPodcasts = async () => {
      // Throw an error if seasonId is falsy
      if (!seasonId) {
        throw new Error("Invalid seasonId");
      }

      try {
        // Fetch podcast season details from the specified API endpoint
        const res = await fetch(`https://podcast-api.netlify.app/id/${seasonId}`);
        
        // Check if the fetch request is successful
        if (!res.ok) {
          console.error("Failure to acquire podcast details.");
          return;
        }

        // Parse the JSON response
        const data = await res.json();
        
        // Update the podcastSeasons state with the fetched data
        setPodcastSeasons(data);
      } catch (err) {
        console.error("An error occurred while fetching the podcast details.", err);
      }
    };

    // Call the getPodcasts function
    getPodcasts();
  }, [seasonId, overlayOpen]);

  // Return a message if podcastSeasons is falsy (still loading)
  if (!podcastSeasons) {
    return <div>Trying to load podcast details</div>;
  }

  // Destructure relevant data from podcastSeasons
  const { image, title, updated, genres, seasons: podcastSeasonsList } = podcastSeasons;

  // Function to handle changes in the selected season from the dropdown
  const handleSeasonChange = (event) => {
    const selectedSeasonId = event.target.value;
    setSelectedSeason(selectedSeasonId);
  };

  // Generate options for the season dropdown based on filtered and sorted podcast seasons
  const seasonOptions = podcastSeasonsList
    .filter((item) => item.episodes && item.episodes.length > 0)
    .sort((a, b) => a.season - b.season)
    .map((item) => (
      <option key={item.season} value={item.season}>
        Season {item.season} ({item.episodes.length} Episodes)
      </option>
    ));

  // Render the SeasonDetails component with relevant props
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
