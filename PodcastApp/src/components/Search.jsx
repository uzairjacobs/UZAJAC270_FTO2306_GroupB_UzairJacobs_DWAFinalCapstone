import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

// The Search component provides a search functionality for podcasts.
export default function Search({ onSearch }) {
  // State variables
  const [query, setQuery] = useState(''); // Holds the current search query
  const [filteredPodcasts, setFilteredPodcasts] = useState([]); // Stores matching podcasts
  const [podcasts, setPodcasts] = useState([]); // Represents the list of all podcasts
  const [fuse, setFuse] = useState(null); // Instance of Fuse.js for fuzzy searching

  // useEffect hook to fetch podcasts on component mount
  useEffect(() => {
    fetchPodcasts();
  }, []);

  // Fetches the list of podcasts from the API and initializes Fuse.js for fuzzy search
  const fetchPodcasts = async () => {
    try {
      const res = await fetch("https://podcast-api.netlify.app/shows");
      const data = await res.json();
      setPodcasts(data);

      // Initialize Fuse.js only if there are podcasts available
      if (data.length > 0) {
        setFuse(
          new Fuse(data, {
            keys: ["title"],
            includeScore: true,
            threshold: 0.4,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  // Updates the query state based on user input
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Handles the search submission, updating filteredPodcasts and invoking onSearch callback
  const handleSearchSubmit = () => {
    switch (true) {
      // If the query is empty, reset filteredPodcasts and invoke onSearch with all podcasts
      case query.trim() === "":
        setFilteredPodcasts([]);
        onSearch(podcasts);
        break;
      // If there's a non-empty query and Fuse.js is available, perform fuzzy search
      default:
        if (fuse) {
          const results = fuse.search(query).map((result) => result.item);
          setFilteredPodcasts(results);
          onSearch(results);
        }
        break;
    }
  };

  // JSX rendering of the Search component
  return (
    <div className="search-container">
      {/* Input field for the search query */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
      />
      {/* Button to trigger the search */}
      <button onClick={handleSearchSubmit} className="search-button">
        Search
      </button>
    </div>
  );
}
