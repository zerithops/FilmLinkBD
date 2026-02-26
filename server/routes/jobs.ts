import express from 'express';
import { Job } from '../models/Job.js';
import { authMiddleware } from './users.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { role, location, isPaid } = req.query;
    
    const query: any = { status: 'Open' };
    if (role) query.requiredRole = role;
    if (location) query.location = location;
    if (isPaid !== undefined) query.isPaid = isPaid === 'true';

    const jobs = await Job.find(query)
      .populate('postedBy', 'name profilePhoto')
      .sort({ createdAt: -1 });
      
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name profilePhoto bio');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create job
router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user._id;
    const job = new Job({
      ...req.body,
      postedBy: userId
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get jobs posted by user
router.get('/user/me', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user._id;
    const jobs = await Job.find({ postedBy: userId }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
