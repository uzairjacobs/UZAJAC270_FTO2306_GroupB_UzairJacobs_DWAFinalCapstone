import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('');
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      const res = await fetch("https://podcast-api.netlify.app/shows");
      const data = await res.json();
      setPodcasts(data);

      switch (true) {
        case data.length > 0:
          setFuse(
            new Fuse(data, {
              keys: ["title"],
              includeScore: true,
              threshold: 0.4,
            })
          );
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    switch (true) {
      case query.trim() === "":
        setFilteredPodcasts([]);
        onSearch(podcasts);
        break;
      default:
        if (fuse) {
          const results = fuse.search(query).map((result) => result.item);
          setFilteredPodcasts(results);
          onSearch(results);
        }
        break;
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search"
      />
      <button onClick={handleSearchSubmit} className="search-button">
        Search
      </button>
    </div>
  );
}
