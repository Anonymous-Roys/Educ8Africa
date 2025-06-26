import { MapPin } from "lucide-react";

const Nsscard = ({ jobTitle, department, location, roleOverview, onShowMore, darkMode }) => {
  // Truncate roleOverview to first 100 characters to match description length
  const truncatedOverview = roleOverview && roleOverview.length > 100 
    ? roleOverview.substring(0, 100) + "..." 
    : roleOverview;

  return (
    <div className={`flex flex-col rounded-lg items-baseline justify-between shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 transition-all hover:shadow-xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750 text-white' : 'bg-white text-gray-800'}`}>
      <div>
        <h3 className="mb-2 text-lg sm:text-xl font-bold leading-tight">{jobTitle}</h3>
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-justify leading-relaxed">{truncatedOverview || department}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full space-y-2 sm:space-y-0">
        <button
          onClick={onShowMore}
          className={`text-red-500 hover:text-red-600 font-medium text-sm sm:text-base transition-colors ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
        > 
          Show More
        </button>
        <div className="flex items-center p-2 font-semibold text-xs sm:text-sm text-gray-100 bg-red-500 border-[1px] border-red-400 rounded-full">
          <MapPin size={16} className="inline-block mr-1 sm:mr-2" />
          <span className="truncate">{location}</span>
        </div>
      </div>
    </div>
  );
};

export default Nsscard;
