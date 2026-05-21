import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    default: 'application/pdf'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'analyzing', 'completed', 'failed'],
    default: 'pending'
  },
  jobId: {
    type: String,
    ref: 'Job'
  },
  extractedText: {
    type: String,
    default: null
  },
  metadata: {
    pages: Number,
    language: String,
    isScanned: Boolean
  },
  userId: {
    type: String,
    // For future implementation with authentication
  },
  tags: [String],
  isDeleted: {
    type: Boolean,
    default: false
  }},{
    timestamps: true,
  }
);
resumeSchema.index({ uploadedAt: -1 });
resumeSchema.index({ jobId: 1 });
resumeSchema.index({ userId: 1 });
resumeSchema.index({ status: 1 });
const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;