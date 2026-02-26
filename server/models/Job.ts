import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredRole: { type: String, required: true },
  budget: { type: String },
  isPaid: { type: Boolean, default: true },
  location: { type: String, required: true },
  deadline: { type: Date, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

export const Job = mongoose.model('Job', jobSchema);
