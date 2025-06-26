import { useState } from 'react';
import Nsscard from './Nsscard';
import { jobPostings } from '../data/nssdata';
import NssModal from './NssModal';
import { FaThList, FaThLarge } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const NssBoard = ({ darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);

  // Filter postings based on search term
  const filteredPostings = jobPostings.filter((posting) =>
    posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    posting.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    posting.roleOverview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = (posting) => {
    setSelectedPosting(posting);
    setIsModalOpen(true);
  };

  const toggleLayout = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div id="nsslist" className={`mt-4 max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-6 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}`}>
      {/* Search Bar and Layout Toggle */}
      <div className="flex flex-col items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 sm:flex-row">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 mb-2 sm:mb-4 text-center sm:text-left`}>
          NSS Openings
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for NSS positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 sm:w-64 lg:w-80 border-2 border-gray-300 p-2 sm:p-3 rounded-lg outline-none focus:border-red-600 text-sm sm:text-base ${darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
          />
          {/* Layout Toggle Button */}
          <button
            onClick={toggleLayout}
            className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
            aria-label="Toggle Layout"
          >
            {isGridView ? <FaThList className="text-red-600 text-sm sm:text-base" /> : <FaThLarge className="text-red-600 text-sm sm:text-base" />}
          </button>
        </div>
      </div>

      {/* NSS Cards */}
      <div className={isGridView ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4 sm:space-y-6'}>
        {filteredPostings.length ? (
          filteredPostings.map((posting, index) => (
            <Nsscard
              key={index}
              jobTitle={posting.jobTitle}
              department={posting.department}
              location={posting.location}
              roleOverview={posting.roleOverview}
              darkMode={darkMode}
              onShowMore={() => handleShowMore(posting)}
              isGridView={isGridView}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12">
            <p className="text-red-500 text-sm sm:text-base">No NSS positions found.</p>
          </div>
        )}
      </div>

      {/* Modal for NSS Position Details */}
      {selectedPosting && (
        <NssModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          posting={selectedPosting}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default NssBoard;
