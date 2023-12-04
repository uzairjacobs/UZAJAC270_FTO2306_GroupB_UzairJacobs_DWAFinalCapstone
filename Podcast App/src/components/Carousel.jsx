import React, { useEffect, useState } from "react";
import PodcastDescription from "./PodcastDescription";
import PodcastSeasonsModal from "./PodcastSeasonsModal";
import Loading from "./Loading";

export default function Carousel() {
  const [carousel, setCarousel] = useState([]);
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [seasonButton, setSeasonButton] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const displayedCarousel = carousel.slice(0, 50);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    const data = await response.json();
    setCarousel(data);
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  const togglePreview = (podcast) => {
    setSelectedPodcast(podcast);
  };

  const handleClosePreview = () => {
    setSelectedPodcast(null);
  };

  const toggleSeason = (item) => {
    setSeasonButton(item);
    setOverlayOpen(true);
  };

  const onCloseDialog = () => {
    setOverlayOpen(false);
  };

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

  return (
    <div>
      <h4 className="carousel-title">Hot Right Now:</h4>
      <div className="carousel-container">
        <button
          className="scroll-button left"
          onClick={() => handleScroll("left")}
        >
          {"<"}
        </button>
        <div className="carousel-box">
          {displayedCarousel.map((podcast) => (
            <div key={podcast.id} className="carousel">
              <img
                src={podcast.image}
                className="carousel-images"
                alt={podcast.title}
                onClick={() => togglePreview(podcast)}
              />
            </div>
          ))}
        </div>
        <button
          className="scroll-button right"
          onClick={() => handleScroll("right")}
        >
          {">"}
        </button>
      </div>
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
