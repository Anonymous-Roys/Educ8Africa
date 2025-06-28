import { MapPin } from "lucide-react";
import { dataHelpers } from '../utils/dataStore';

const Nsscard = ({ 
  id,
  jobTitle, 
  title, // New data structure
  department, 
  departmentId, // New data structure
  location, 
  locationId, // New data structure
  roleOverview, 
  onShowMore, 
  darkMode,
  isGridView = true
}) => {
  // Handle both new and legacy data structures
  const displayTitle = jobTitle || title;
  const displayLocation = location || (locationId ? dataHelpers.getLocation(locationId)?.city : 'Remote');
  const displayDepartment = department || (departmentId ? dataHelpers.getDepartment(departmentId)?.name : '');
  
  // Truncate roleOverview to first 100 characters to match description length
  const truncatedOverview = roleOverview && roleOverview.length > 100 
    ? roleOverview.substring(0, 100) + "..." 
    : roleOverview;

  return (
    <div className={`flex flex-col rounded-lg items-baseline justify-between shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750 text-white' : 'bg-white text-gray-800'} ${!isGridView ? 'flex-row sm:items-center' : ''}`}>
      <div className={isGridView ? '' : 'flex-1'}>
        <h3 className="mb-2 text-lg sm:text-xl font-bold leading-tight">{displayTitle}</h3>
        {displayDepartment && (
          <p className="mb-2 text-sm font-medium text-red-600 dark:text-red-400">{displayDepartment}</p>
        )}
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-justify leading-relaxed line-clamp-3">
          {truncatedOverview || displayDepartment}
        </p>
      </div>

      <div className={`flex ${isGridView ? 'flex-col sm:flex-row' : 'flex-row items-center'} justify-between items-start sm:items-center w-full ${isGridView ? 'space-y-2 sm:space-y-0' : 'space-x-4'} ${!isGridView ? 'ml-6' : ''}`}>
        <button
          onClick={onShowMore}
          className={`text-red-500 hover:text-red-600 font-medium text-sm sm:text-base transition-colors ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
        > 
          Show More
        </button>
        <div className="flex items-center p-2 font-semibold text-xs sm:text-sm text-gray-100 bg-red-500 border-[1px] border-red-400 rounded-full">
          <MapPin size={16} className="inline-block mr-1 sm:mr-2" />
          <span className="truncate">{displayLocation}</span>
        </div>
      </div>
    </div>
  );
};

export default Nsscard;
