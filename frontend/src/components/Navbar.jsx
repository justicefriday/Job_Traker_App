import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow sticky-top" style={{background: 'linear-gradient(135deg, #1B3C53 0%, #234C6A 100%)'}}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold fs-4">
          📊 Job Tracker
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {user ? (
              // Logged in
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link px-3">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/jobs/add" className="nav-link px-3">
                    Add Job
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link px-3 text-white-50">
                    Welcome, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={handleLogout} 
                    className="btn btn-outline-light btn-sm ms-2 mt-2 mt-lg-0"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // Not logged in
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link px-3">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-primary btn-sm ms-2 mt-2 mt-lg-0">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;