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
      
      {/* Header with NSS Openings Title (Left) and Search Bar (Right) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        {/* NSS Openings Title - Left Side */}
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 text-center sm:text-left`}>
          NSS Openings
        </h1>
        
        {/* Search Bar and Layout Toggle - Right Side */}
        <div className="flex items-center space-x-2 sm:space-x-4 justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search for NSS positions..."
            value={searchTerm}            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Intro Statement - Now below search bar */}
      <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-red-600">
          We Don't Do Idle Desks. We Build Africa's Digital Future.
        </h2>
        <div className="space-y-4 text-base sm:text-lg leading-relaxed">
          <p className="font-semibold">
            At Educ8Africa, National Service is not about coffee runs or clock-watching. It is a launchpad.
            Here, you will work on real tech, real training, and real change — alongside a vibrant team pushing boundaries in cybersecurity, innovation, and youth empowerment.
          </p>
          <p className="font-semibold">
            Your effort counts. Your ideas matter. Your growth is non-negotiable.
          </p>
          <p className="font-bold text-lg sm:text-xl">
            So, if you are hungry to make an impact — and not just go on waakye runs — we want to hear from you.
          </p>
          <p className="font-bold text-lg sm:text-xl text-red-600">
            👉 Join the team building Africa's digital future.
          </p>
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
