import PropTypes from 'prop-types';

const NssApplyCard = ({ isOpen, onClose, jobTitle, darkMode }) => {
  if (!isOpen) return null;

  const handleEmailRedirect = () => {
    const emailSubject = `Application - ${jobTitle}`;
    const emailBody = `Dear Hiring Team,

I am writing to apply for the position of ${jobTitle}.

Please find my resume and cover letter attached.

Best regards,
[Your Name]`;

    const mailtoLink = `mailto:careers@educ8africa.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="min-h-screen px-4 text-center">
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel */}
        <div className={`
          inline-block w-full max-w-md p-6 my-4
          text-left align-middle transition-all duration-300
          transform shadow-2xl rounded-xl
          ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
        `}>
          {/* Close button */}
          <button
            onClick={onClose}
            className={`
              absolute top-4 right-4
              p-2 rounded-full transition-all duration-200
              ${darkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
              ${darkMode 
                ? 'focus:ring-gray-500 focus:ring-offset-gray-800' 
                : 'focus:ring-gray-300 focus:ring-offset-white'
              }
            `}
            aria-label="Close"
          >
            ×
          </button>

          {/* Content */}
          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Apply for {jobTitle}
            </h2>
            
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              If you are a motivated and enthusiastic individual looking to contribute to a thriving online 
              community and gain valuable experience in the field of cybersecurity, we encourage you to apply. 
              Please submit your resume and cover letter to{' '}
              <a 
                href="mailto:careers@educ8africa.com" 
                className="text-red-600 hover:text-red-700 underline"
              >
                careers@educ8africa.com
              </a>.
            </p>

            {/* Action buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className={`
                  px-4 py-2 rounded-md font-medium transition-colors
                  ${darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                `}
              >
                Cancel
              </button>
              <button
                onClick={handleEmailRedirect}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

NssApplyCard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  jobTitle: PropTypes.string.isRequired,
  darkMode: PropTypes.bool
};

export default NssApplyCard;
