import { useState } from 'react';
import JobCard from './JobCard';
import { jobs } from '../data/jobs';
import JobCardModal from './JobCardModal';
import Modal from './Modal';
import { FaThList, FaThLarge } from 'react-icons/fa'; // Import icons for the layout toggle
import { Scrollbars } from 'react-custom-scrollbars-2'

// eslint-disable-next-line react/prop-types
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
    <div id="joblist" className={`mt-4 max-w-7xl mx-auto py-6 sm:py-8 lg:py-12 px-2 sm:px-4 lg:px-6 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}`}>
      {/* Search Bar and Layout Toggle */}
      <div className="flex flex-col items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 sm:flex-row">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-red-700 mb-2 sm:mb-4 text-center sm:text-left`}>
          Internship Openings
        </h1>
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for internships..."
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

      {/* Job Cards */}
      <div className={isGridView ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6' : 'space-y-4 sm:space-y-6'}>
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
          <div className="col-span-full text-center py-8 sm:py-12">
            <p className="text-red-500 text-sm sm:text-base">No internships found.</p>
          </div>
        )}
      </div>
      {/* Modal for Job Details and Apply */}
      {selectedJob && (
        <JobCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} darkMode={darkMode}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {selectedJob.title}
        </h2>
        
        <p className="mb-4">{selectedJob.description}</p>
      
          <Scrollbars style={{height:'56vh'}}>
        <div className="space-y-4">
          {/* Responsibilities */}
          <div>
            <h4 className="mb-2 font-semibold">Responsibilities:</h4>
            {Object.entries(selectedJob.responsibilities).map(([category, tasks], index) => (
              <div key={index} className="mb-2">
                <h5 className="font-medium">{category.replace(/([A-Z])/g, ' $1')}</h5> {/* Turn 'contentCreation' into 'Content Creation' */}
                <ul className="space-y-1 list-disc list-inside">
                  {tasks.map((task, idx) => (
                    <li key={idx}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
      
          {/* Qualifications */}
          <div>
            <h4 className="mb-2 font-semibold">Qualifications:</h4>
            <ul className="space-y-1 list-disc list-inside">
              {selectedJob.qualifications.map((qual, index) => (
                <li key={index}>{qual}</li>
              ))}
            </ul>
          </div>
      
          {/* Skills */}
          <div>
            <h4 className="mb-2 font-semibold">Skills:</h4>
            <ul className="space-y-1 list-disc list-inside">
              {selectedJob.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
      
          {/* Benefits */}
          <div>
            <h4 className="mb-2 font-semibold">Benefits:</h4>
            <ul className="space-y-1 list-disc list-inside">
              {selectedJob.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        </Scrollbars>
        {/* Application Button */}
        <button
          onClick={() => handleApply(selectedJob)}
          className="px-6 py-2 mt-6 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
        >
          Apply Now
        </button>
      
        {/* Application Modal */}
        <Modal isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} darkMode={darkMode}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Apply for {selectedJob.title}
          </h2>
          <p className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="block">
              If you are a motivated and enthusiastic individual looking to contribute to a thriving online
              community and gain valuable experience in the field of cybersecurity, we encourage you to apply.
            </span>
            
            <span className="block">
              <strong>Please submit your CV and a brief cover letter (maximum 150 words) to:</strong>
            </span>
            <span className="block">
              📧{' '}
              <a href="mailto:careers@educ8africa.com" className="text-red-600 hover:text-red-700 underline">
                careers@educ8africa.com
              </a>
            </span>
            <span className="block">
              📌 <strong>Subject Line:</strong> Application – National Service Associate Technical Writer & Research Lead
            </span>
            
            <span className="block mt-4">
              <strong>Additional Notes</strong>
            </span>
            <ul className="list-disc list-inside space-y-1 text-sm mt-2">
              <li>Applicants are expected to manage their time effectively within a flexible remote structure.</li>
              <li>You must be able to collaborate with teams, meet project timelines, and contribute to shared goals.</li>
              <li>Strong performers may be given priority consideration for future roles within Educ8Africa or its partner network.</li>
            </ul>
          </p>
        </Modal>
      </JobCardModal>
     
      
    
      )}

    </div>
  );
};

export default JobBoard;
