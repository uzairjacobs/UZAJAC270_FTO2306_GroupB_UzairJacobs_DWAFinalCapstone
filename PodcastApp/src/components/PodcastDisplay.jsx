import React, { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import Carousel from "./Carousel.jsx";
import FilterControls from "./FilterControls.jsx";
import PodcastItems from "./PodcastItems.jsx";
import Favorites from "./Favorites.jsx";
import Navbar from "./Navbar.jsx";

// PodcastDisplay is a functional component representing the central hub for displaying and managing podcast-related content.
const PodcastDisplay = () => {
  // State variables to manage various aspects of the component
  const [seasonButton, setSeasonButton] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [podcastPreview, setPodcastPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalPodcasts, setOriginalPodcasts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  // Fetch podcasts from an external API when the component mounts
  useEffect(() => {
    fetchPodcasts();
  }, []);

  // Function to fetch podcasts from an external API
  const fetchPodcasts = async () => {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    const data = await response.json();
    setPodcasts(data);
    setOriginalPodcasts(data);
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  // Function to toggle the detailed preview of a podcast
  const togglePreview = (podcast) => {
    setPodcastPreview(podcast);
  };

  // Function to close the podcast preview modal
  const handleClosePreview = () => setPodcastPreview(null);

  // Function to toggle the display of the modal overlay for podcast seasons
  const toggleSeason = (item) => {
    setSeasonButton(item) ;
    setOverlayOpen(true);
  };

  // Function to close the podcast seasons modal
  const onCloseDialog = () => {
    setOverlayOpen(false);
    setSeasonButton("");
  };

  // Function to handle search results and update the displayed podcasts
  const handleSearch = (results) => setPodcasts(results);

  // Function to handle toggling the favorite status of a podcast episode
  const onToggleFavorite = (episodeId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(episodeId)) {
      favorites.push(episodeId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setFavorites(favorites); 
    }
  };

  // Function to handle sorting of podcasts based on criteria such as title, date, or genre
  const handleSort = (sortConfig, podcasts, setPodcasts) => {
    const { criteria, direction, genre } = sortConfig;
    setIsSorting(true);
    let filteredPodcasts;

    switch (criteria) {
      case "title":
        filteredPodcasts = [...podcasts].sort((a, b) =>
          direction === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case "date":
        filteredPodcasts = [...podcasts].sort((a, b) =>
          direction === "asc"
            ? new Date(b.updated) - new Date(a.updated)
            : new Date(a.updated) - new Date(b.updated)
        );
        break;
      case "genre":
        if (genre !== "all") {
          filteredPodcasts = [...podcasts].filter((podcast) =>
            podcast.genres.includes(parseInt(genre))
          );
        } else {
          filteredPodcasts = [...originalPodcasts];
        }
        break;
      default:
        filteredPodcasts = [...originalPodcasts];
    }

    setPodcasts(filteredPodcasts);
  };

  // JSX rendering of the PodcastDisplay component
  return (
    <div>
      {/* Navbar component displaying navigation elements */}
      <Navbar favorites={favorites} /> 
      {/* Carousel component presenting a visually appealing carousel of featured podcasts */}
      <Carousel />
      {/* FilterControls component providing UI elements for searching and sorting podcasts */}
      <FilterControls
        onSearch={handleSearch}
        onSortChange={handleSort}
        podcasts={podcasts}
        setPodcasts={setPodcasts}
      />
      {/* PodcastItems component rendering the actual list of podcast items with interactive elements */}
      <PodcastItems
        overlayOpen={overlayOpen}
        handleClosePreview={handleClosePreview}
        toggleSeason={toggleSeason}
        onCloseDialog={onCloseDialog}
        isLoading={isLoading}
        podcastPreview={podcastPreview}
        seasonButton={seasonButton}
        togglePreview={togglePreview}
        podcasts={podcasts}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

// Export PodcastDisplay as the default export of this module
export default PodcastDisplay;
