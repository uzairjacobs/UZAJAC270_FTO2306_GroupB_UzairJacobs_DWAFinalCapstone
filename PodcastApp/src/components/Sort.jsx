import React, { useState } from "react";

// Define the Sort component
const Sort = ({ onSortChange }) => {
  // State variables for sorting criteria, direction, and selected genre
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Handle change in sorting criteria
  const handleSortCriteriaChange = (event) => {
    const selectedSortCriteria = event.target.value;
    setSortCriteria(selectedSortCriteria);
    // Invoke the onSortChange callback with updated sorting configuration
    onSortChange({
      criteria: selectedSortCriteria,
      direction: sortDirection,
      genre: selectedGenre,
    });
  };

  // Handle change in sorting direction
  const handleSortDirectionChange = (event) => {
    const selectedSortDirection = event.target.value;
    setSortDirection(selectedSortDirection);
    // Invoke the onSortChange callback with updated sorting configuration
    onSortChange({
      criteria: sortCriteria,
      direction: selectedSortDirection,
      genre: selectedGenre,
    });
  };

  // Handle change in selected genre
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
    // Invoke the onSortChange callback with updated sorting configuration
    onSortChange({
      criteria: sortCriteria,
      direction: sortDirection,
      genre: selectedGenre,
    });
  };

  // Render the Sort component UI
  return (
    <div className="sort-container">
      {/* Sorting criteria dropdown */}
      <label htmlFor="sortCriteria">Sort By </label>
      <select
        id="sortCriteria"
        value={sortCriteria}
        onChange={handleSortCriteriaChange}
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
      </select>

      {/* Genre dropdown, conditionally rendered based on sorting criteria */}
      {sortCriteria === "genre" && (
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="all">All Genres</option>
          <option value="1">Personal Growth</option>
          {/* Additional genre options... */}
        </select>
      )}

      {/* Sorting direction dropdown */}
      <label htmlFor="sortDirection">Sort Direction </label>
      <select
        id="sortDirection"
        value={sortDirection}
        onChange={handleSortDirectionChange}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Sort;