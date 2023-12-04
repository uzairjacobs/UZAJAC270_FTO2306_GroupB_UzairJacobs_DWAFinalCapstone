import React from "react";

export default function PodcastDescription({
  image,
  title,
  text,
  limit,
  seasons,
  onClose,
  podcastSeasons,
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const truncateText = (text, limit) =>
    isExpanded ? text : `${text.slice(0, limit)}...`;

  const readMore = truncateText(text, limit);

  return (
    <div className="preview-podcast">
      <div className="preview-content">
        <img className="preview-img" src={image} alt={title} />

        <div className={`preview-season ${isExpanded ? "expanded" : ""}`}>
          Seasons: {seasons}
        </div>

        <div className={`preview-description ${isExpanded ? "expanded" : ""}`}>
          {readMore}
        </div>

        <div className="preview-buttons">
          <button
            className="preview-read--more"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>

          <button onClick={onClose} className="preview-close--button">
            Close
          </button>

          <button onClick={podcastSeasons} className="preview-seasons">
            Seasons
          </button>
        </div>
      </div>
    </div>
  );
}
