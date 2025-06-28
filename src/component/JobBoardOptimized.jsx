import React from 'react';
import PositionBoard from './common/PositionBoard';
import JobCard from './JobCard';
import JobCardModal from './JobCardModal';
import { useTheme } from '../context/AppContext';
import { withErrorBoundary } from './ErrorBoundary';

const JobBoard = () => {
  const { darkMode } = useTheme();

  const jobDescription = "Discover exciting internship opportunities that will launch your career in technology, cybersecurity, and digital innovation.";

  return (
    <div id="joblist">
      <PositionBoard
        type="internship"
        title="Internship Openings"
        description={jobDescription}
        CardComponent={JobCard}
        ModalComponent={JobCardModal}
        darkMode={darkMode}
      />
    </div>
  );
};

export default withErrorBoundary(JobBoard);
