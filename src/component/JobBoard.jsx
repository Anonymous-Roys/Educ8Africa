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
    <div id="joblist" className={`mt-4 max-w-7xl mx-auto py-12 px-4 transition-all duration-500 ${darkMode ? 'bg-gray-900 text-white' : ' text-gray-900'}`}>
      {/* Search Bar and Layout Toggle */}
      <div className="flex flex-col items-center justify-between mb-8 md:flex-row">
        <h1 className={`text-4xl font-bold text-red-700 mb-4`}>
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
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            If you are a motivated and enthusiastic individual looking to contribute to a thriving online
            community and gain valuable experience in the field of cybersecurity, we encourage you to apply.
            Please submit your resume and cover letter to <a href="mailto:careers@educ8africa.com" className="underline">careers@educ8africa.com</a>.
          </p>
        </Modal>
      </JobCardModal>
     
      
    
      )}

    </div>
  );
};

export default JobBoard;
