import React, { useState, useEffect, useMemo } from 'react';
import { FaThList, FaThLarge, FaSearch } from 'react-icons/fa';
import { useSearch, useDebounce } from '../../hooks';
import { useVirtualScrolling } from '../../hooks';
import { LoadingSpinner, ErrorMessage } from '../ErrorBoundary';

const PositionBoard = ({ 
  type, // 'internship' or 'nss'
  title,
  description,
  CardComponent,
  ModalComponent,
  darkMode 
}) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isGridView, setIsGridView] = useState(true);
  const [filters, setFilters] = useState({});
  
  const { 
    searchTerm, 
    setSearchTerm, 
    performSearch, 
    getSuggestions,
    suggestions 
  } = useSearch();
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Perform search when debounced term or filters change
  const searchResults = useMemo(() => {
    if (!debouncedSearchTerm && Object.keys(filters).length === 0) {
      return []; // Return empty to show all positions via CardComponent's own logic
    }
    return performSearch(debouncedSearchTerm, { ...filters, type });
  }, [debouncedSearchTerm, filters, type, performSearch]);

  // Virtual scrolling for large datasets
  const {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll
  } = useVirtualScrolling(searchResults, 280, 600);

  const useVirtual = searchResults.length > 50;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length >= 2) {
      getSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    performSearch(suggestion, { ...filters, type });
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[filterKey] = value;
    } else {
      delete newFilters[filterKey];
    }
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`position-board max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-6 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'text-gray-900'}`}>
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {description}
            </p>
          )}
        </div>
        
        {/* Search and Controls */}
        <div className="flex items-center space-x-2 sm:space-x-4 justify-center sm:justify-end w-full sm:w-auto">
          {/* Search Bar with Suggestions */}
          <div className="relative flex-1 sm:w-64 lg:w-80">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${type} positions...`}
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
                className={`w-full pl-10 pr-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg outline-none focus:border-red-600 text-sm sm:text-base transition-colors ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
              />
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto border rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Layout Toggle */}
          <button
            onClick={() => setIsGridView(!isGridView)}
            className={`p-2 sm:p-3 rounded-lg flex-shrink-0 transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            aria-label="Toggle Layout"
          >
            {isGridView ? <FaThList className="text-red-600 text-sm sm:text-base" /> : <FaThLarge className="text-red-600 text-sm sm:text-base" />}
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(Object.keys(filters).length > 0 || searchTerm) && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Active filters:
          </span>
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Search: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </span>
          )}
          {Object.entries(filters).map(([key, value]) => (
            <span
              key={key}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {key}: {value}
              <button
                onClick={() => handleFilterChange(key, null)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Position Grid */}
      <div className="position-grid">
        {useVirtual ? (
          // Virtual scrolling for large datasets
          <div
            className="virtual-scroll-container"
            style={{ height: '600px', overflow: 'auto' }}
            onScroll={onScroll}
          >
            <div style={{ height: totalHeight, position: 'relative' }}>
              <div style={{ transform: `translateY(${offsetY}px)` }}>
                <div className={isGridView ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4 sm:space-y-6'}>
                  {visibleItems.map((position) => (
                    <CardComponent
                      key={position.id}
                      {...position}
                      darkMode={darkMode}
                      onShowMore={() => setSelectedPosition(position)}
                      isGridView={isGridView}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Regular rendering for smaller datasets
          <PositionGrid
            type={type}
            searchResults={searchResults}
            CardComponent={CardComponent}
            isGridView={isGridView}
            onSelectPosition={setSelectedPosition}
            darkMode={darkMode}
            hasSearchOrFilter={searchTerm || Object.keys(filters).length > 0}
          />
        )}
      </div>

      {/* Modal */}
      {selectedPosition && (
        <ModalComponent
          position={selectedPosition}
          isOpen={!!selectedPosition}
          onClose={() => setSelectedPosition(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

// Separate component for position grid to avoid re-renders
const PositionGrid = ({ 
  type, 
  searchResults, 
  CardComponent, 
  isGridView, 
  onSelectPosition, 
  darkMode,
  hasSearchOrFilter 
}) => {
  // This would normally use the positions hook, but for now we'll use a simple approach
  // In the real implementation, this would integrate with the usePositions hook
  
  if (hasSearchOrFilter) {
    // Show search results
    if (searchResults.length === 0) {
      return (
        <div className="col-span-full text-center py-8 sm:py-12">
          <p className="text-gray-500 text-sm sm:text-base">No positions found matching your criteria.</p>
        </div>
      );
    }

    return (
      <div className={isGridView ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4 sm:space-y-6'}>
        {searchResults.map((position) => (
          <CardComponent
            key={position.id}
            {...position}
            darkMode={darkMode}
            onShowMore={() => onSelectPosition(position)}
            isGridView={isGridView}
          />
        ))}
      </div>
    );
  }

  // Show all positions (this will be handled by the original component logic)
  return (
    <div className="text-center py-8">
      <p className="text-gray-500">Use the existing component logic for showing all positions</p>
    </div>
  );
};

export default PositionBoard;
