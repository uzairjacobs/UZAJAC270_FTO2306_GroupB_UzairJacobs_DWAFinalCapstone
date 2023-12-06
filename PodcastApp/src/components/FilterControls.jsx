import React from "react";
import Sort from "./Sort.jsx";
import Search from "./Search.jsx";

/**
 * FilterControls component manages sorting and searching functionalities for podcasts.
 * Props:
 *   - onSortChange: Callback for handling sorting changes
 *   - onSearch: Callback for managing search actions
 *   - podcasts: List of podcasts
 *   - setPodcasts: Function to update the podcasts state
 */
const FilterControls = ({ onSortChange, onSearch, podcasts, setPodcasts }) => {
  /**
   * Callback function to handle sorting change.
   * Invokes the onSortChange callback with sorting configuration,
   * the current list of podcasts, and the function to set podcasts.
   * @param {object} sortConfig - Sorting configuration
   */
  const handleSortChange = (sortConfig) => {
    onSortChange(sortConfig, podcasts, setPodcasts);
  };

  // JSX rendering of the FilterControls component
  return (
    <div className="filter-container">
      {/* Render the Sort component and pass the handleSortChange callback */}
      <Sort onSortChange={handleSortChange} />
      
      {/* Render the Search component and pass the onSearch callback */}
      <Search onSearch={onSearch} />
    </div>
  );
};

// Export FilterControls as the default export of this module
export default FilterControls;
