import React from "react";

// PodcastItem is a functional component that represents an individual podcast item.
// It takes in the podcast object and a function, togglePreview, to handle interactions.
const PodcastItem = ({ podcast, togglePreview }) => {
  return (
    // Each podcast item is wrapped in a div with a unique key based on podcast.id
    <div key={podcast.id} className="podcast-item">
      {/* The podcast image is displayed as an img element with a click event */}
      <img
        className="podcast-item--img"
        src={podcast.image}
        // When the image is clicked, the togglePreview function is invoked with the podcast object
        onClick={() => togglePreview(podcast)}
      />
      {/* The podcast title is displayed as an h4 element */}
      <h4 className="podcast-item--title">{podcast.title}</h4>
    </div>
  );
};

// Export PodcastItem as the default export of this module
export default PodcastItem;
