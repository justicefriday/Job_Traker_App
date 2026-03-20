import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#1B3C53] to-[#234C6A] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-white text-xl md:text-2xl font-bold hover:opacity-90 transition"
            onClick={() => setIsOpen(false)}
          >
            Job Tracker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-200 font-medium transition relative group"
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
                </Link>
                <Link
                  to="/jobs/add"
                  className="text-white hover:text-gray-200 font-medium transition relative group"
                >
                  Add Job
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all"></span>
                </Link>
                <span className="text-white text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-white hover:bg-primary-dark px-4 py-2 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/jobs/add"
                  className="block text-white hover:bg-primary-dark px-4 py-2 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Add Job
                </Link>
                <div className="px-4 py-2 text-white text-sm">
                  Welcome, {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-white hover:bg-primary-dark px-4 py-2 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;