import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../store/jobStore';
import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaChartLine, FaList } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Analytics from '../components/Analytics';

const Dashboard = () => {
  const { jobs, getJobs, deleteJob, loading } = useJobStore();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('all');
  const [view, setView] = useState('jobs');

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

  const filteredJobs = jobs.filter((job) => {
    return statusFilter === 'all' || job.status === statusFilter;
  });

  const stats = {
    total: jobs.length,
    applied: jobs.filter((j) => j.status === 'applied').length,
    interview: jobs.filter((j) => j.status === 'interview').length,
    offer: jobs.filter((j) => j.status === 'offer').length,
    rejected: jobs.filter((j) => j.status === 'rejected').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-primary text-center hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeIn">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stats.total}</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium">Total Applications</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-[#1976d2] text-center hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-3xl md:text-4xl font-bold text-[#1976d2] mb-2">{stats.applied}</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium">Applied</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-[#f57c00] text-center hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-3xl md:text-4xl font-bold text-[#f57c00] mb-2">{stats.interview}</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium">Interviews</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-[#388e3c] text-center hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-3xl md:text-4xl font-bold text-[#388e3c] mb-2">{stats.offer}</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium">Offers</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border-l-4 border-[#d32f2f] text-center hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-3xl md:text-4xl font-bold text-[#d32f2f] mb-2">{stats.rejected}</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium">Rejected</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white p-2 rounded-xl shadow-md w-full md:w-fit mb-8">
          <button
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition ${
              view === 'jobs'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setView('jobs')}
          >
            <FaList /> <span className="hidden sm:inline">Jobs List</span><span className="sm:hidden">Jobs</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-semibold transition ${
              view === 'analytics'
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setView('analytics')}
          >
            <FaChartLine /> <span className="hidden sm:inline">Summary</span><span className="sm:hidden">Overview</span>
          </button>
        </div>

        {/* Jobs View */}
        {view === 'jobs' ? (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-gray-300 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary transition"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => navigate('/jobs/add')}
                className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition shadow-md hover:shadow-lg"
              >
                + Add New Job
              </button>
            </div>

            {/* Jobs List */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">
                Your Applications ({filteredJobs.length}
                {filteredJobs.length !== jobs.length && ` of ${jobs.length}`})
              </h3>

              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 md:p-16 text-center">
                  <p className="text-gray-500 text-base md:text-lg mb-6">
                    {jobs.length === 0
                      ? 'No jobs yet. Add your first application!'
                      : 'No jobs match this status.'}
                  </p>
                  {jobs.length === 0 && (
                    <button
                      onClick={() => navigate('/jobs/add')}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
                    >
                      Add Job
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {filteredJobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white p-5 md:p-6 rounded-xl shadow-md border-l-4 border-primary hover:shadow-xl transition transform hover:-translate-y-2 animate-fadeIn"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <h4 className="text-lg md:text-xl font-bold text-primary flex-1">
                          {job.position}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            job.status === 'applied'
                              ? 'bg-[#e3f2fd] text-[#1976d2]'
                              : job.status === 'interview'
                              ? 'bg-[#fff3e0] text-[#f57c00]'
                              : job.status === 'offer'
                              ? 'bg-[#e8f5e9] text-[#388e3c]'
                              : 'bg-[#ffebee] text-[#d32f2f]'
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>

                      {/* Company */}
                      <p className="text-gray-800 font-semibold mb-3">
                        {job.company}
                      </p>

                      {/* Info */}
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <p className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 flex-shrink-0" />
                          {job.location}
                        </p>
                        <p className="flex items-center">
                          <FaBriefcase className="mr-2 flex-shrink-0" />
                          {job.jobType}
                        </p>
                        {job.salary && (
                          <p className="flex items-center">
                            <FaDollarSign className="mr-2 flex-shrink-0" />
                            {job.salary}
                          </p>
                        )}
                      </div>

                      {/* Date */}
                      <p className="text-xs text-gray-500 italic mb-3">
                        Applied{' '}
                        {new Date(job.applicationDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>

                      {/* Notes */}
                      {job.notes && (
                        <p className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 border-l-2 border-accent mb-4">
                          {job.notes}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => handleEdit(job._id)}
                          className="flex-1 bg-secondary text-white py-2 rounded-lg font-semibold hover:bg-[#37536b] transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="flex-1 bg-[#d32f2f] text-white py-2 rounded-lg font-semibold hover:bg-[#b71c1c] transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <Analytics jobs={jobs} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;