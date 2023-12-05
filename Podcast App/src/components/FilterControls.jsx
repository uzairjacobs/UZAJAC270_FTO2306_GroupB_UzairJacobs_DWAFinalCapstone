import React from "react";
import Sort from "./Sort";
import Search from "./Search";

const FilterControls = ({ onSortChange, onSearch, podcasts, setPodcasts }) => {
  const handleSortChange = (sortConfig) => {
    onSortChange(sortConfig, podcasts, setPodcasts);
  };

  return (
    <div className="filter-container">
      <Sort onSortChange={handleSortChange} />
      <Search onSearch={onSearch} />
    </div>
  );
};

export default FilterControls;
