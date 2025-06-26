import { MapPin } from "lucide-react";

const Nsscard = ({ jobTitle, department, location, roleOverview, onShowMore, darkMode }) => {
  // Truncate roleOverview to first 100 characters
  const truncatedOverview = roleOverview && roleOverview.length > 100 
    ? roleOverview.substring(0, 100) + "..." 
    : roleOverview;

  return (
    <div className={`flex flex-col rounded-lg items-baseline justify-between shadow-lg p-6 mb-6 transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-750 text-white' : 'bg-white hover:shadow-xl text-gray-800'}`}>
      <div>
        <h3 className="mb-2 text-xl font-bold">{jobTitle}</h3>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">{department}</p>
        {truncatedOverview && (
          <p className="mb-4 text-sm text-justify">{truncatedOverview}</p>
        )}
      </div>

      <div className="flex justify-between w-full">
        <button
          onClick={onShowMore} // Open modal with job details
          className={`text-red-500 hover:text-red-600 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}
        > 
          Show More
        </button>
        <div className="p-2 font-semibold text-gray-100 bg-red-500 border-[1px] border-red-400 rounded-full">
          <MapPin size={20} className="inline-block mr-2 animate-icon" />
          {location}
        </div>
      </div>
    </div>
  );
};

export default Nsscard;
