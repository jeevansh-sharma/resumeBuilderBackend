import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  
  // Main JD text - that's all we need!
  jobDescription: {
    type: String,
    required: true
  },
  
  // Optional metadata
  location: String,
  salary: {
    min: Number,
    max: Number,
    currency: String
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  },
  
  // Parsed by OpenAI (cached for performance)
  parsedInfo: {
    extractedSkills: [String],
    requiredExperience: String,
    educationLevel: String,
    responsibilities: [String],
    benefits: [String],
    parsedAt: Date
  },
  
  source: {
    type: String,
    enum: ['manual', 'linkedin', 'indeed', 'other'],
    default: 'manual'
  },
  
  sourceUrl: String,
  expiresAt: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  userId: String
}, { timestamps: true });

jobSchema.index({ isActive: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ company: 1 });

export default mongoose.model('Job', jobSchema);