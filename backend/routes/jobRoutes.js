import express from 'express';
import { createJob, getJobs, getSingleJob, updateJob, deleteJob } from '../controllers/jobController.js';

const router = express.Router();

// create a new job

router.post('/',  createJob);

router.get('/',  getJobs);

router.get('/:id',  getSingleJob);

router.put('/:id', updateJob);

router.delete('/:id',  deleteJob);

export default router;