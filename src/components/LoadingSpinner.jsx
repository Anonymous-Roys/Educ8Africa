const LoadingSpinner = ({ size = 'medium', darkMode = false, className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`flex justify-center items-center p-4 ${className}`}>
      <div 
        className={`animate-spin rounded-full border-2 border-t-red-600 ${sizeClasses[size]} ${
          darkMode ? 'border-gray-600' : 'border-gray-300'
        }`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
