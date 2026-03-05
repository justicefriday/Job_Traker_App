import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center flex flex-col items-center space-y-6">
        
        {/* Icon */}
        <FaExclamationTriangle className="text-9xl text-pink-500" />

        {/* Heading */}
        <h1 className="text-6xl font-extrabold text-indigo-700">
          404
        </h1>

        {/* Subheading */}
        <p className="text-2xl text-gray-600">
          Oops! The page you are looking for doesn’t exist.
        </p>

        {/* Description */}
        <p className="text-gray-500 max-w-md">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back Home Button */}
        <Link
          to="/"
          className="inline-flex items-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-105 transform transition"
        >
          <FaHome className="mr-2" /> Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
