import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const JobCardModal = ({ 
  isOpen, 
  onClose, 
  children, 
  darkMode = false,
  title,
  maxWidth = 'max-w-2xl' // Customizable max-width
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* Backdrop with animation */}
      <div 
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-300 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal container with centering */}
      <div className="min-h-screen px-4 text-center">
        {/* This element is to trick the browser into centering the modal contents. */}
        <span 
          className="inline-block h-screen align-middle" 
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`
            inline-block w-full ${maxWidth} p-6 my-4
            text-left align-middle transition-all duration-300
            transform shadow-2xl rounded-xl
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}
          `}
        >
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
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title (if provided) */}
          {title && (
            <div className="mb-4">
              <h2 
                id="modal-title"
                className={`text-xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {title}
              </h2>
            </div>
          )}

          {/* Content with responsive padding */}
          <div className={`
            mt-2 space-y-4
            ${darkMode ? 'text-gray-200' : 'text-gray-600'}
          `}>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobCardModal;