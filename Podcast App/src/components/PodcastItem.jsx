import React from "react";

const PodcastItem = ({ podcast, togglePreview, }) => {
  return (
    <div key={podcast.id} className="podcast-item">
      <img className='podcast-item--img'src={podcast.image} onClick={() => togglePreview(podcast)} />
      <h4 className='podcast-item--title'>{podcast.title}</h4>
    </div>
  );
};

export default PodcastItem;

