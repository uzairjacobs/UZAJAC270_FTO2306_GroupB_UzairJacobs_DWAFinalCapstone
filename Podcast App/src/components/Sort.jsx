import React, { useState } from "react";

const Sort = ({ onSortChange }) => {
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const handleSortCriteriaChange = (event) => {
    const selectedSortCriteria = event.target.value;
    setSortCriteria(selectedSortCriteria);
    onSortChange({
      criteria: selectedSortCriteria,
      direction: sortDirection,
      genre: selectedGenre,
    });
  };

  const handleSortDirectionChange = (event) => {
    const selectedSortDirection = event.target.value;
    setSortDirection(selectedSortDirection);
    onSortChange({
      criteria: sortCriteria,
      direction: selectedSortDirection,
      genre: selectedGenre,
    });
  };

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    setSelectedGenre(selectedGenre);
    onSortChange({
      criteria: sortCriteria,
      direction: sortDirection,
      genre: selectedGenre,
    });
  };

  return (
    <div className="sort-container">
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

      {sortCriteria === "genre" && (
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="all">All Genres</option>
          <option value="1">Personal Growth</option>
          <option value="2">True Crime and Investigative Journalism</option>
          <option value="3">History</option>
          <option value="4">Comedy</option>
          <option value="5">Entertainment</option>
          <option value="6">Business</option>
          <option value="7">Fiction</option>
          <option value="8">News</option>
          <option value="9">Kids and Family</option>
        </select>
      )}

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
