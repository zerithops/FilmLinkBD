import express from 'express';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { authMiddleware } from './users.js';

const router = express.Router();

// Apply for a job
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const userId = (req as any).user._id;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if already applied
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      applicant: userId,
      coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for a job (only job poster can see)
router.get('/job/:jobId', authMiddleware, async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = (req as any).user._id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email role profilePhoto portfolioUrl district experienceLevel')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's applications
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user._id;
    const applications = await Application.find({ applicant: userId })
      .populate('job', 'title location isPaid status')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const userId = (req as any).user._id;

    const application = await Application.findById(id).populate('job');
    if (!application) return res.status(404).json({ message: 'Application not found' });

    const job = application.job as any;
    if (job.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
