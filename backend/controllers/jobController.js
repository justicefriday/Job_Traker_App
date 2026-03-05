import Job from '../models/jobModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all jobs for logged-in user
// @route   GET /api/jobs
// @access  Private
export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(jobs);
});

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
export const createJob = asyncHandler(async (req, res) => {
  const { company, position, status, location, jobType, salary, applicationDate, notes } = req.body;

  const job = await Job.create({
    user: req.user._id,
    company,
    position,
    status,
    location,
    jobType,
    salary,
    applicationDate,
    notes,
  });

  res.status(201).json(job);
});

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  // Make sure user owns this job
  if (job.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedJob);
});

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  // Make sure user owns this job
  if (job.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await Job.findByIdAndDelete(req.params.id);

  res.json({ message: 'Job removed' });
});