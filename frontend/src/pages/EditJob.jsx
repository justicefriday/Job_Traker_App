import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';
import { toast } from 'react-toastify';
const EditJob = () => {
  const { id } = useParams(); // Get job ID from URL
  const navigate = useNavigate();
  const { jobs, updateJob, loading, error } = useJobStore();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'applied',
    location: '',
    jobType: 'full-time',
    salary: '',
    notes: '',
  });

  // Load job data when component mounts
  useEffect(() => {
    const job = jobs.find((j) => j._id === id);
    if (job) {
      setFormData({
        company: job.company,
        position: job.position,
        status: job.status,
        location: job.location,
        jobType: job.jobType,
        salary: job.salary || '',
        notes: job.notes || '',
      });
    } else {
      // If job not found, redirect to dashboard
      navigate('/dashboard');
    }
  }, [id, jobs, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await updateJob(id, formData);
    toast.success('Job updated successfully!');
    navigate('/dashboard');
  } catch (err) {
    toast.error('Failed to update job. Please try again.');
    console.error(err);
  }
};
  return (
    <div className="page-container">
      <div className="page-card">
        <h2>Edit Job Application</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="remote">Remote</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g., $80k - $100k"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="4"
              placeholder="Interview notes, referrals, follow-ups..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Job'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;