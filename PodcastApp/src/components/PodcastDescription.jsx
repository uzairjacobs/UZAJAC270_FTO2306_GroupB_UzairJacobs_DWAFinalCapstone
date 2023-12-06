import React from "react";

// PodcastDescription is a functional component that renders a detailed preview of a podcast.
export default function PodcastDescription({
  image,
  title,
  text,
  limit,
  seasons,
  onClose,
  podcastSeasons,
}) {
  // State to manage whether the full description is expanded or truncated
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Function to conditionally truncate the text based on the isExpanded state
  const truncateText = (text, limit) =>
    isExpanded ? text : `${text.slice(0, limit)}...`;

  // Truncate the text for display
  const readMore = truncateText(text, limit);

  // JSX rendering of the PodcastDescription component
  return (
    <div className="preview-podcast">
      <div className="preview-content">
        {/* Display the podcast image */}
        <img className="preview-img" src={image} alt={title} />

        {/* Display the number of seasons */}
        <div className={'preview-season '}>
          Seasons: {seasons}
        </div>

        {/* Display the truncated or expanded podcast description with conditional styling */}
        <div className={`preview-description ${isExpanded ? "expanded" : ""}`}>
          {readMore}
        </div>

        {/* Interactive buttons section */}
        <div className="preview-buttons">
          {/* Button to toggle between expanding and collapsing the description */}
          <button
            className="preview-read--more"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>

          {/* Button to close the podcast preview */}
          <button onClick={onClose} className="preview-close--button">
            Close
          </button>

          {/* Button to navigate to or display information about the podcast's seasons */}
          <button onClick={podcastSeasons} className="preview-seasons">
            Seasons
          </button>
        </div>
      </div>
    </div>
  );
}
