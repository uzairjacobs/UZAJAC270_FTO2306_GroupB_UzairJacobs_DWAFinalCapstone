import React from "react";
import Loading from "./Loading";
import PodcastItem from "./PodcastItem";
import PodcastDescription from "./PodcastDescription";
import PodcastSeasonsModal from "./PodcastSeasonsModal";

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
}) => {
  return (
    <div className="podcast-list">
      {!isLoading ? (
        <Loading />
      ) : (
        podcasts.map((podcast) => (
          <PodcastItem
            key={podcast.id}
            podcast={podcast}
            togglePreview={togglePreview}
            
          />
        ))
      )}

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

      {overlayOpen && (
        <PodcastSeasonsModal
          seasonId={seasonButton}
          overlayOpen={overlayOpen}
          onClose={onCloseDialog}
        />
      )}
    </div>
  );
};

export default PodcastItems;
