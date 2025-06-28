import { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import PropTypes from 'prop-types';
import AccessibleButton from './common/AccessibleButton';

const EnhancedSearch = ({ 
  onSearch, 
  onFilter, 
  darkMode = false,
  placeholder = "Search jobs, skills, or departments...",
  showFilters = true,
  filterOptions = {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    department: '',
    jobType: '',
    location: '',
    sortBy: 'newest'
  });
  const [activeQuickFilters, setActiveQuickFilters] = useState([]);

  const quickFilterOptions = [
    'Full-time', 'Part-time', 'Remote', 'Hybrid', 'Entry Level', 'Senior'
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch?.(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  // Apply filters when they change
  useEffect(() => {
    onFilter?.({
      ...filters,
      quickFilters: activeQuickFilters
    });
  }, [filters, activeQuickFilters, onFilter]);

  const handleQuickFilter = (filter) => {
    setActiveQuickFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      department: '',
      jobType: '',
      location: '',
      sortBy: 'newest'
    });
    setActiveQuickFilters([]);
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(filters).some(f => f !== '' && f !== 'newest') || 
                          activeQuickFilters.length > 0 || 
                          searchTerm.length > 0;

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
    }`}>
      {/* Main search bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:border-red-500 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {showFilters && (
        <>
          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {quickFilterOptions.map(filter => (
              <button
                key={filter}
                onClick={() => handleQuickFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                  activeQuickFilters.includes(filter)
                    ? 'bg-red-600 text-white border-red-600'
                    : darkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Advanced filters toggle */}
          <div className="flex items-center justify-between mb-4">
            <AccessibleButton
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              variant="ghost"
              size="small"
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <Filter className="w-4 h-4 mr-1" />
              Advanced Filters
              <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                showAdvancedFilters ? 'rotate-180' : ''
              }`} />
            </AccessibleButton>

            {hasActiveFilters && (
              <AccessibleButton
                onClick={clearAllFilters}
                variant="ghost"
                size="small"
                className="text-gray-500 hover:text-gray-700"
              >
                Clear All
              </AccessibleButton>
            )}
          </div>

          {/* Advanced filters panel */}
          {showAdvancedFilters && (
            <div className={`p-4 rounded-lg border transition-all duration-300 ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Department filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className={`w-full p-2 rounded border transition-colors ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">All Departments</option>
                    {filterOptions.departments?.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Job type filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Job Type
                  </label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange('jobType', e.target.value)}
                    className={`w-full p-2 rounded border transition-colors ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">All Job Types</option>
                    {filterOptions.jobTypes?.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Location filter */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className={`w-full p-2 rounded border transition-colors ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">All Locations</option>
                    {filterOptions.locations?.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Sort by */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className={`w-full p-2 rounded border transition-colors ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                    <option value="department">Department</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

EnhancedSearch.propTypes = {
  onSearch: PropTypes.func,
  onFilter: PropTypes.func,
  darkMode: PropTypes.bool,
  placeholder: PropTypes.string,
  showFilters: PropTypes.bool,
  filterOptions: PropTypes.shape({
    departments: PropTypes.arrayOf(PropTypes.string),
    jobTypes: PropTypes.arrayOf(PropTypes.string),
    locations: PropTypes.arrayOf(PropTypes.string)
  })
};

export default EnhancedSearch;
