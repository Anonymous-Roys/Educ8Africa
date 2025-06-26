import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from './Modal';
import NssApplyCard from './NssApplyCard';
import { FaMapMarkerAlt, FaBriefcase, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const NssModalContent = ({ posting, darkMode }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{posting.jobTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-600" />
            <span>{posting.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-red-600" />
            <span>{posting.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="text-red-600" />
            <span>Reports to: {posting.reportsTo}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-red-600" />
            <span>{posting.compensation}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Company Overview</h3>
        <p className="text-sm leading-relaxed">{posting.company.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Role Overview</h3>
        <p className="text-sm leading-relaxed">{posting.roleOverview}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Key Responsibilities</h3>
        <div className="space-y-4">
          {Object.entries(posting.keyResponsibilities).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-medium text-red-600 mb-2">
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {posting.application && (
        <div>
          <h3 className="text-lg font-semibold mb-2">How to Apply</h3>
          <p className="text-sm mb-2">Deadline: {posting.application.deadline}</p>
          <p className="text-sm">{posting.application.instructions}</p>
        </div>
      )}

      <div className="flex justify-end space-x-4 pt-4 border-t">
        <button
          onClick={handleApply}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Apply Now
        </button>
      </div>

      {/* Apply Modal */}
      <NssApplyCard
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        jobTitle={posting.jobTitle}
        darkMode={darkMode}
      />
    </div>
  );
};

NssModalContent.propTypes = {
  posting: PropTypes.object.isRequired,
  darkMode: PropTypes.bool
};

const NssModal = ({ isOpen, onClose, posting, darkMode }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      darkMode={darkMode}
      size="large"
      title={posting.jobTitle}
    >
      <NssModalContent posting={posting} darkMode={darkMode} />
    </Modal>
  );
};

NssModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  posting: PropTypes.object.isRequired,
  darkMode: PropTypes.bool.isRequired
};

export default NssModal;
