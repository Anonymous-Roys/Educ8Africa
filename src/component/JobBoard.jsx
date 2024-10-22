import { useState } from 'react';
import JobCard from './JobCard';
import { jobs } from '../data/jobs';
import JobCardModal from './JobCardModal';
import Modal from './Modal';
import { FaThList, FaThLarge } from 'react-icons/fa'; // Import icons for the layout toggle

const JobBoard = ({ darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // To track the selected job
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true); // To toggle between list and grid views

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (job) => {
    setSelectedJob(job); // Select the job the user wants to apply to
    setIsApplyOpen(true); // Open modal
  };

  const handleShowMore = (job) => {
    setSelectedJob(job); // Set the job to display in modal
    setIsModalOpen(true); // Open modal to show job details
  };

  const toggleLayout = () => {
    setIsGridView(!isGridView); // Toggle between list and grid views
  };

  return (
    <div id="joblist" className={`mt-4 max-w-7xl mx-auto py-12 px-4 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}`}>
      {/* Search Bar and Layout Toggle */}
      <div className="mb-8 flex justify-between items-center md:flex-row flex-col">
        <h1 className={`text-4xl font-bold text-red-700`}>
          Job Openings
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for jobs..."
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

      {/* Job Cards */}
      <div className={isGridView ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {filteredJobs.length ? (
          filteredJobs.map((job, index) => (
            <JobCard
              key={index}
              {...job}
              darkMode={darkMode}
              onShowMore={() => handleShowMore(job)} // Trigger modal with job details
              isGridView={isGridView} // Pass the view type to the JobCard component
            />
          ))
        ) : (
          <p className="text-red-500">No jobs found.</p>
        )}
      </div>

      {/* Modal for Job Details and Apply */}
      {selectedJob && (
        <JobCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} darkMode={darkMode}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {selectedJob.title}
          </h2>
          <p className="mb-4">{selectedJob.description}</p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Responsibilities:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Qualifications:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.qualifications.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedJob.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={() => handleApply(selectedJob)}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors mt-6"
          >
            Apply Now
          </button>
          <Modal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} darkMode={darkMode}>
            <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Apply for {selectedJob.title}
            </h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              If you are a motivated and enthusiastic individual looking to contribute to a thriving online community and gain valuable experience in the field of cybersecurity, we encourage you to apply. Please submit your resume and cover letter to <a href="mailto:davidarhin2005@gmail.com" className="underline">davidarhin2005@gmail.com</a>.
            </p>
          </Modal>
        </JobCardModal>
      )}
    </div>
  );
};

export default JobBoard;
