import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Carousel from "./Carousel";
import FilterControls from "./FilterControls";
import PodcastItems from "./PodcastItems";

const PodcastDisplay = () => {
  const [seasonButton, setSeasonButton] = useState("");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [podcasts, setPodcasts] = useState([]);
  const [podcastPreview, setPodcastPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    const data = await response.json();
    setPodcasts(data);
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  const togglePreview = (podcast) => {
    setPodcastPreview((prevPodcast) =>
      prevPodcast === podcast ? null : podcast
    );
  };

  const handleClosePreview = () => setPodcastPreview(null);

  const toggleSeason = (item) => {
    setSeasonButton((prevItem) => (prevItem === item ? "" : item));
    setOverlayOpen(true);
  };

  const onCloseDialog = () => {
    setOverlayOpen(false);
    setSeasonButton("");
  };

  const handleSearch = (results) => setPodcasts(results);

  const handleSort = (sortConfig) => {
    const { criteria, direction } = sortConfig;
    const sortedPodcasts = [...podcasts];

    switch (criteria) {
      case "title":
        sortedPodcasts.sort((a, b) =>
          direction === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
        break;
      case "date":
        sortedPodcasts.sort((a, b) =>
          direction === "asc"
            ? new Date(b.updated) - new Date(a.updated)
            : new Date(a.updated) - new Date(b.updated)
        );
        break;
      default:
    }

    setPodcasts(sortedPodcasts);
  };

  return (
    <div>
      <Carousel />
      <FilterControls onSearch={handleSearch} onSortChange={handleSort} />
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
      />
    </div>
  );
};

export default PodcastDisplay;
