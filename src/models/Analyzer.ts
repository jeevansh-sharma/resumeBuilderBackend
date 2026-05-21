import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume',
    required: true
  },
  jobId: {
    type: String,
    ref: 'Job'
  },
  scores: {
    overallScore: {
      type: Number,
      min: 0,
      max: 100
    },
    skillsMatch: {
      type: Number,
      min: 0,
      max: 100
    },
    experienceMatch: {
      type: Number,
      min: 0,
      max: 100
    },
    educationMatch: {
      type: Number,
      min: 0,
      max: 100
    },
    formattingScore: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  extractedData: {
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedIn: String,
      website: String
    },
    summary: String,
    skills: [String],
    experience: [{
      title: String,
      company: String,
      duration: String,
      description: String
    }],
    education: [{
      degree: String,
      field: String,
      institution: String,
      graduationYear: String
    }],
    certifications: [String],
    languages: [String]
  },
  recommendations: {
    strengths: [String],
    weaknesses: [String],
    improvements: [String],
    keywordSuggestions: [String]
  },
  atsCompatibility: {
    isAtsCompatible: Boolean,
    issues: [String],
    suggestions: [String]
  },
  jobMatchAnalysis: {
    matchPercentage: Number,
    matchedSkills: [String],
    missingSkills: [String],
    relevantExperience: [String]
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  error: {
    type: String,
    default: null
  },
  processedAt: Date,
  processingTime: Number, // in milliseconds
  userId: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
analysisSchema.index({ resumeId: 1 });
analysisSchema.index({ jobId: 1 });
analysisSchema.index({ userId: 1 });
analysisSchema.index({ createdAt: -1 });
analysisSchema.index({ 'scores.overallScore': -1 });
const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
