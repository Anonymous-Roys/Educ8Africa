const JobCard = ({ title, description, onShowMore, darkMode }) => {
  return (
    <div className={`flex flex-col rounded-lg items-baseline justify-between shadow-lg p-6 mb-6 transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-750 text-white' : 'bg-white hover:shadow-xl text-gray-800'}`}>
      <div>
        
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="mb-4 text-justify">{description}</p>
      </div>

<div className="flex justify-between w-full">
  
      <button
   
   onClick={onShowMore} // Open modal with job details
   className={` text-red-500 hover:text-red-600 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}
   > 
        Show More
      </button>
      <div className="p-2 font-semibold text-gray-100 bg-red-500 border-2 border-red-400 rounded-full right-6">Remote</div>
    </div>
   </div>
  );
};

export default JobCard;
