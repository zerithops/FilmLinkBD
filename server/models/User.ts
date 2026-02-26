import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Director / Producer', 'Writer', 'Cinematographer', 'Actor', 'Editor', 'Music Producer'],
    required: true 
  },
  profilePhoto: { type: String, default: '' },
  experienceLevel: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Professional'],
    default: 'Beginner'
  },
  district: { type: String },
  bio: { type: String, default: '' },
  portfolioUrl: { type: String, default: '' },
  isAvailableForFree: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
