import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { jobSchema } from '../utils/validationSchemas';
import { useJobStore } from '../store/jobStore';
import { toast } from 'react-toastify';

const AddJob = () => {
  const navigate = useNavigate();
  const { createJob, loading, error } = useJobStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobSchema),
    defaultValues: {
      company: '',
      position: '',
      status: 'applied',
      location: '',
      jobType: 'full-time',
      salary: '',
      notes: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await createJob(data);
      toast.success('Job added successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to add job. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-primary mb-8">
            Add New Job Application
          </h2>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Row 1: Company & Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.company ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Google"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  {...register('position')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.position ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Frontend Developer"
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
                )}
              </div>
            </div>

            {/* Row 2: Status & Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  {...register('status')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.status ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  {...register('jobType')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.jobType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="contract">Contract</option>
                </select>
                {errors.jobType && (
                  <p className="text-red-500 text-sm mt-1">{errors.jobType.message}</p>
                )}
              </div>
            </div>

            {/* Row 3: Location & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  {...register('location')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.location ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Remote, Lagos, New York"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary (Optional)
                </label>
                <input
                  type="text"
                  {...register('salary')}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.salary ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="e.g., $80k - $100k"
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                {...register('notes')}
                rows="4"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-y ${
                  errors.notes ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Interview notes, referrals, follow-ups..."
              />
              {errors.notes && (
                <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Max 500 characters</p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-60"
              >
                {loading ? 'Adding...' : 'Add Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJob;