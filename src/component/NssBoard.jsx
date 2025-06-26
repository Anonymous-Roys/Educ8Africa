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
    <div id="nsslist" className={`mt-4 max-w-7xl mx-auto py-12 px-4 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}`}>
      {/* Search Bar and Layout Toggle */}
      <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
        <h1 className={`text-4xl font-bold text-red-700 mb-4`}>
          NSS Openings
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for NSS positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`border-2 border-gray-300 p-2 rounded-lg outline-none focus:border-red-600 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          />
          {/* Layout Toggle Button */}
          <button
            onClick={toggleLayout}
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
            aria-label="Toggle Layout"
          >
            {isGridView ? <FaThList className="text-red-600" /> : <FaThLarge className="text-red-600" />}
          </button>
        </div>
      </div>

      {/* NSS Cards */}
      <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
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
          <p className="text-red-500">No NSS positions found.</p>
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
