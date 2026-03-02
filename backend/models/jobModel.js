import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // links to the User model
    },
    company: {
      type: String,
      required: [true, 'Please add a company name'],
    },
    position: {
      type: String,
      required: [true, 'Please add a position'],
    },
    status: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'rejected'],
      default: 'applied',
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'contract'],
      default: 'full-time',
    },
    salary: {
      type: String,
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model('Job', jobSchema);

export default Job;