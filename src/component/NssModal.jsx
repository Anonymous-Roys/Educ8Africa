import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import NssApplyCard from './NssApplyCard';
import { FaMapMarkerAlt, FaBriefcase, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import mammoth from 'mammoth/mammoth.browser';
import './NssModal.css';

const NssModalContent = ({ posting, darkMode }) => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [documentHtml, setDocumentHtml] = useState('');
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  const [documentError, setDocumentError] = useState(false);

  useEffect(() => {
    let isActive = true;

    const loadDocument = async () => {
      setIsDocumentLoading(true);
      setDocumentError(false);
      try {
        const response = await fetch(posting.document);
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        if (isActive) setDocumentHtml(result.value);
      } catch {
        if (isActive) setDocumentError(true);
      } finally {
        if (isActive) setIsDocumentLoading(false);
      }
    };

    loadDocument();
    return () => { isActive = false; };
  }, [posting.document]);

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  return (
    <div className="nss-document-shell">
      <div className="border-b pb-3 sm:pb-4">
        <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 leading-tight ${
          darkMode ? 'text-white' : 'text-black'
        }`}>{posting.jobTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className={`flex items-center gap-2 text-sm sm:text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-900'
          }`}>
            <FaMapMarkerAlt className={`flex-shrink-0 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className="truncate">{posting.location}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm sm:text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-900'
          }`}>
            <FaBriefcase className={`flex-shrink-0 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className="truncate">{posting.department}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm sm:text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-900'
          }`}>
            <FaUser className={`flex-shrink-0 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className="truncate">Reports To: {posting.reportsTo}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm sm:text-base ${
            darkMode ? 'text-gray-300' : 'text-gray-900'
          }`}>
            <FaMoneyBillWave className={`flex-shrink-0 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className="truncate">{posting.compensation}</span>
          </div>
          {posting.jobType && (
            <div className={`flex items-center gap-2 text-sm sm:text-base ${
              darkMode ? 'text-gray-300' : 'text-gray-900'
            }`}>
              <FaBriefcase className={`flex-shrink-0 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`} />
              <span className="truncate">Type: {posting.jobType}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`nss-document ${darkMode ? 'nss-document-dark' : ''}`}>
        {isDocumentLoading && <p className="nss-document-status">Loading document...</p>}
        {documentError && <p className="nss-document-status">The document could not be loaded.</p>}
        {!isDocumentLoading && !documentError && (
          <div dangerouslySetInnerHTML={{ __html: documentHtml }} />
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-3 sm:pt-4 border-t">

        <button
          onClick={handleApply}
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm sm:text-base font-medium"
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
      size="responsive"
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
