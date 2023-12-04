import React, { useState } from "react";

export default function Sort({ onSortChange }) {
  const [sortCriteria, setSortCriteria] = useState("date");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSortCriteriaChange = (event) => {
    const selectedSortCriteria = event.target.value;
    setSortCriteria(selectedSortCriteria);
    onSortChange({ criteria: selectedSortCriteria, direction: sortDirection });
  };

  const handleSortDirectionChange = (event) => {
    const selectedSortDirection = event.target.value;
    setSortDirection(selectedSortDirection);
    onSortChange({ criteria: sortCriteria, direction: selectedSortDirection });
  };

  return (
    <div className="sort-container">
      <label htmlFor="sortCriteria">Sort By </label>
      <select id="sortCriteria" value={sortCriteria} onChange={handleSortCriteriaChange}>
        <option value="date">Date</option>
        <option value="title">Title</option>
       
      </select>

      <label htmlFor="sortDirection">Sort Direction </label>
      <select id="sortDirection" value={sortDirection} onChange={handleSortDirectionChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}