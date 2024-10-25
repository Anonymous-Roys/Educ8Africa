import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ErrorPage = () => {
  const navigate = useNavigate(); // Get the navigate function

  const handleReturnHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="mb-6 text-lg text-gray-700">We couldn't find the page you're looking for.</p>
      <button
        onClick={handleReturnHome}
        className="px-6 py-2 text-white transition duration-300 bg-red-600 rounded hover:bg-red-700"
      >
        Return to Home
      </button>
    </div>
  );
};

export default ErrorPage;
