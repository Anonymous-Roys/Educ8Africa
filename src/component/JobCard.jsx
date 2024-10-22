const JobCard = ({ title, description, onShowMore, darkMode }) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 mb-6 transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-750 text-white' : 'bg-white hover:shadow-xl text-gray-800'}`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4 text-justify">{description}</p>

      <button
      disabled
        onClick={onShowMore} // Open modal with job details
        className={`text-red-500 hover:text-red-600 font-medium ${darkMode ? 'text-red-400' : 'text-red-600'}`}
      >
        Show More
      </button>
    </div>
  );
};

export default JobCard;
