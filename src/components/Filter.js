import React, { useState } from 'react';
import '../styles/Filter.css';

function Filter({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange(e.target.value, selectedPriceRange); // Update filter on category change
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
    onFilterChange(selectedCategory, e.target.value); // Update filter on price change
  };

  return (
    <div className="filter-section">
      <h3>Filter by Category</h3>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <h3>Filter by Price Range</h3>
      <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
        <option value="">All Prices</option>
        <option value="low">Below $100</option>
        <option value="high">Above $100</option>
      </select>
    </div>
  );
}

export default Filter;
