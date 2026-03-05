import express from 'express';
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected (need to be logged in)
router.get('/',protect,getJobs)
router.post('/',protect, createJob);
router.put('/:id',protect,updateJob)
router.delete('/:id',protect, deleteJob);

export default router;