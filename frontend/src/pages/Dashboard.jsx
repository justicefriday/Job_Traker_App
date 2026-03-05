import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { jobs, getJobs, deleteJob, loading } = useJobStore();
  const navigate = useNavigate();

  useEffect(() => {
    getJobs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/jobs/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
      toast.success('Job deleted successfully!');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header-section">
          <h2>Your Job Applications</h2>
          <button
            onClick={() => navigate('/jobs/add')}
            className="btn-primary"
          >
            + Add New Job
          </button>
        </div>

        <div className="jobs-list">
          {loading ? (
            <p>Loading...</p>
          ) : jobs.length === 0 ? (
            <div className="no-jobs">
              <p>No jobs yet. Add your first application!</p>
              <button
                onClick={() => navigate('/jobs/add')}
                className="btn-primary"
              >
                Add Job
              </button>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="job-header">
                    <h4>{job.position}</h4>
                    <span className={`status-badge status-${job.status}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="job-company">{job.company}</p>
                  <p className="job-info">
                    <FaMapMarkerAlt className="me-2" />
                    {job.location}
                  </p>
                  <p className="job-info">
                    <FaBriefcase className="me-2" />
                    {job.jobType}
                  </p>
                  {job.salary && (
                    <p className="job-info">
                      <FaDollarSign className="me-2" />
                      {job.salary}
                    </p>
                  )}
                  {job.notes && <p className="job-notes">{job.notes}</p>}
                  <div className="job-actions">
                    <button
                      onClick={() => handleEdit(job._id)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;