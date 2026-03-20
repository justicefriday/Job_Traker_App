import express from 'express';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
import { jobValidation, validate } from '../middleware/validationMiddleware.js';

const router = express.Router();

// All routes are protected (need to be logged in)
router.route('/')
  .get(protect, getJobs)
  .post(protect, jobValidation, validate, createJob);

router.route('/:id')
  .put(protect, jobValidation, validate, updateJob)
  .delete(protect, deleteJob);

export default router;