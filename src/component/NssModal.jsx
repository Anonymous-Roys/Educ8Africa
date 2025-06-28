import PropTypes from 'prop-types';
import Modal from './Modal';
import { FaMapMarkerAlt, FaBriefcase, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const NssModalContent = ({ posting, onApply }) => {
  const handleApply = () => {
    const emailSubject = `Application - ${posting.jobTitle}`;
    const emailBody = `Dear Hiring Team,

I am writing to apply for the position of ${posting.jobTitle}.

[Please include:
- Full Name
- NSS Number
- Contact Information
- Educational Background (${posting.qualifications?.educationalBackground || 'As specified in requirements'})
- Relevant Skills and Experience
- Portfolio/Links (if applicable)
- Motivation for applying]

Best regards,
[Your Name]`;

    const mailtoLink = `mailto:careers@educ8africa.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
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
    </div>
  );
};

NssModalContent.propTypes = {
  posting: PropTypes.object.isRequired,
  onApply: PropTypes.func
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
      <NssModalContent posting={posting} />
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
