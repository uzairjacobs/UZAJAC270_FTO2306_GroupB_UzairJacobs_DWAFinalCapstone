import React from "react";
import Loading from "./Loading.jsx";
import PodcastItem from "./PodcastItem.jsx";
import PodcastDescription from "./PodcastDescription.jsx";
import PodcastSeasonsModal from "./PodcastSeasonsModal.jsx";

// PodcastItems is a functional component responsible for rendering a list of podcast items.
// It receives various props to manage podcast data, loading state, and user interactions.
const PodcastItems = ({
  podcasts,
  isLoading,
  togglePreview,
  toggleSeason,
  podcastPreview,
  handleClosePreview,
  seasonButton,
  overlayOpen,
  onCloseDialog,
  onToggleFavorite,
}) => {
  // Log the type of onToggleFavorite for debugging purposes
  console.log("Type of onToggleFavorite:", typeof onToggleFavorite);

  // JSX rendering of the PodcastItems component
  return (
    <div className="podcast-list">
      {/* Conditional rendering based on loading state */}
      {!isLoading ? (
        // If podcasts are still loading, display the Loading component
        <Loading />
      ) : (
        // Once loading is complete, map through the array of podcasts and render individual PodcastItem components
        podcasts.map((podcast) => (
          <PodcastItem
            key={podcast.id}
            podcast={podcast}
            togglePreview={togglePreview}
          />
        ))
      )}

      {/* Conditional rendering of PodcastDescription modal when there is a podcast preview */}
      {podcastPreview && (
        <PodcastDescription
          image={podcastPreview.image}
          description={podcastPreview.description}
          text={podcastPreview.description}
          limit={200}
          seasons={podcastPreview.seasons}
          onClose={handleClosePreview}
          podcastSeasons={() => toggleSeason(podcastPreview.id)}
        />
      )}

      {/* Conditional rendering of PodcastSeasonsModal when overlay is open */}
      {overlayOpen && (
        <PodcastSeasonsModal
          seasonId={seasonButton}
          overlayOpen={overlayOpen}
          onClose={onCloseDialog}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
};

// Export PodcastItems as the default export of this module
export default PodcastItems;