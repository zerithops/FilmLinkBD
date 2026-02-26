import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// Middleware to verify token
export const authMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all users (talents)
router.get('/', async (req, res) => {
  try {
    const { role, district, experienceLevel } = req.query;
    
    const query: any = {};
    if (role) query.role = role;
    if (district) query.district = district;
    if (experienceLevel) query.experienceLevel = experienceLevel;

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).user._id;
    const updates = req.body;
    
    // Don't allow password update through this route
    delete updates.password;
    delete updates.email;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
