// Import necessary React components
import React, { useEffect, useState } from "react";
import PodcastDescription from "./PodcastDescription.jsx";
import PodcastSeasonsModal from "./PodcastSeasonsModal.jsx";
import Loading from "./Loading.jsx";

// Define the Carousel component
export default function Carousel() {
  // State to manage carousel data, selected podcast, season button, overlay state, and loading state
  const [carousel, setCarousel] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [seasonButton, setSeasonButton] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Slice the carousel data to display a subset
  const displayedCarousel = carousel.slice(0, 50);

  // Fetch podcast data on component mount
  useEffect(() => {
    fetchPodcasts();
  }, []);

  // Fetch podcast data from the API
  const fetchPodcasts = async () => {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    const data = await response.json();
    setCarousel(data);
    setIsLoading(false);
  };

  // Open a detailed preview of the selected podcast
  const togglePreview = (podcast) => {
    setSelectedPodcast(podcast);
  };

  // Close the podcast preview
  const handleClosePreview = () => {
    setSelectedPodcast(null);
  };

  // Open the modal for podcast seasons
  const toggleSeason = (item) => {
    setSeasonButton(item);
    setOverlayOpen(true);
  };

  // Close the modal
  const onCloseDialog = () => {
    setOverlayOpen(false);
  };

  // Handle scrolling left or right in the carousel
  const handleScroll = (scrollDirection) => {
    const scrollAmount = 1700;
    const carouselBox = document.querySelector(".carousel-box");

    if (!carouselBox) return;

    switch (scrollDirection) {
      case "left":
        carouselBox.scrollLeft -= scrollAmount;
        break;
      case "right":
        carouselBox.scrollLeft += scrollAmount;
        break;
      default:
        break;
    }
  };

  // Render the Carousel component
  return (
    <div>
      {/* Display a title for the carousel */}
      <h4 className="carousel-title">Hot Right Now:</h4>
      
      {/* Container for the carousel with left and right navigation buttons */}
      <div className="carousel-container">
        <button
          className="scroll-button left"
          onClick={() => handleScroll("left")}
        >
          {"<"}
        </button>
        
        {/* Carousel box to display podcast images */}
        <div className="carousel-box">
          {isLoading ? (
            <Loading />
          ) : (
            displayedCarousel.map((podcast) => (
              <div key={podcast.id} className="carousel">
                {/* Display podcast images with an onClick event to toggle the preview */}
                <img
                  src={podcast.image}
                  className="carousel-images"
                  alt={podcast.title}
                  onClick={() => togglePreview(podcast)}
                />
              </div>
            ))
          )}
        </div>
        
        <button
          className="scroll-button right"
          onClick={() => handleScroll("right")}
        >
          {">"}
        </button>
      </div>

      {/* Display the detailed podcast description when a podcast is selected */}
      {selectedPodcast && (
        <PodcastDescription
          image={selectedPodcast.image}
          description={selectedPodcast.description}
          text={selectedPodcast.description}
          limit={200}
          seasons={selectedPodcast.seasons}
          onClose={handleClosePreview}
          podcastSeasons={() => toggleSeason(selectedPodcast.id)}
        />
      )}

      {/* Display the modal for podcast seasons when the overlay is open */}
      {overlayOpen && (
        <PodcastSeasonsModal
          seasonId={seasonButton}
          overlayOpen={overlayOpen}
          onClose={onCloseDialog}
        />
      )}
    </div>
  );
}
