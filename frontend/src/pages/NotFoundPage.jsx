import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 px-4 py-10">
      <div className="text-center max-w-2xl">
        {/* Animated Icon */}
        <FaExclamationTriangle className="text-green-500 text-7xl sm:text-8xl md:text-9xl mx-auto mb-6 md:mb-8 animate-bounce" />

        {/* 404 Title */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold mb-4 md:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent leading-tight">
          404
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-semibold mb-3 md:mb-4 px-4">
          Oops! The page you are looking for doesn't exist.
        </p>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-8 md:mb-10 max-w-md mx-auto px-4">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Home Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-xl shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          <FaHome className="text-base sm:text-lg md:text-xl" /> 
          <span>Go Back Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;