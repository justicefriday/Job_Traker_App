import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { jobs, getJobs, deleteJob, loading } = useJobStore();
  const navigate = useNavigate();

  // Filter state
  const [statusFilter, setStatusFilter] = useState('all');

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

  // Filter jobs by status only
  const filteredJobs = jobs.filter((job) => {
    return statusFilter === 'all' || job.status === statusFilter;
  });

  // Calculate stats
  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === 'applied').length,
    interview: jobs.filter((j) => j.status === 'interview').length,
    offer: jobs.filter((j) => j.status === 'offer').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        {/* Stats Cards */}
        <div className="stats-grid mb-4">
          <div className="stat-card stat-total">
            <h3>{stats.total}</h3>
            <p>Total Applications</p>
          </div>
          <div className="stat-card stat-applied">
            <h3>{stats.applied}</h3>
            <p>Applied</p>
          </div>
          <div className="stat-card stat-interview">
            <h3>{stats.interview}</h3>
            <p>Interviews</p>
          </div>
          <div className="stat-card stat-offer">
            <h3>{stats.offer}</h3>
            <p>Offers</p>
          </div>
          <div className="stat-card stat-rejected">
            <h3>{stats.rejected}</h3>
            <p>Rejected</p>
          </div>
        </div>

        {/* Filter and Add Button */}
        <div className="dashboard-controls">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={() => navigate('/jobs/add')}
            className="btn-primary"
          >
            + Add New Job
          </button>
        </div>

        {/* Jobs List */}
        <div className="jobs-list">
          <h3>
            Your Applications ({filteredJobs.length}
            {filteredJobs.length !== jobs.length && ` of ${jobs.length}`})
          </h3>
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="no-jobs">
              <p>
                {jobs.length === 0
                  ? 'No jobs yet. Add your first application!'
                  : 'No jobs match this status.'}
              </p>
              {jobs.length === 0 && (
                <button
                  onClick={() => navigate('/jobs/add')}
                  className="btn-primary"
                >
                  Add Job
                </button>
              )}
            </div>
          ) : (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
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
                  <p className="job-date">
                    Applied {new Date(job.applicationDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
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