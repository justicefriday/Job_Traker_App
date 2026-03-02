import asyncHandler from 'express-async-handler';
import Job from '../models/jobModel.js';


// CREATE JOB
// @desc    Create new job
// @route   POST /api/jobs
// @access  Private
export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(job);
});


// GET ALL JOBS
// @desc    Get all jobs for the logged-in user
// @route   GET /api/jobs
// @access  Private
export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json(jobs);
});


// GET SINGLE JOB
// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Private
export const getSingleJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(job);
});


// UPDATE JOB
// @desc    Update job by ID
// @route   PUT /api/jobs/:id
// @access  Private
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedJob = await Job.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json(updatedJob);
});


// DELETE JOB
// @desc    Delete job by ID
// @route   DELETE /api/jobs/:id
// @access  Private
export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    res.status(404);
    throw new Error('Job not found');
  }

  if (job.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await job.deleteOne();

  res.status(200).json({ message: 'Job deleted' });
});