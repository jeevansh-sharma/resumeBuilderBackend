import type { Request, Response } from 'express'
import Resume from '../models/Resume.js';
import { resumeAnalysisQueue } from '../redis.js';

export const uploadResume = async (req: Request & { files?: any }, res: Response) => {
   try {
      if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
         return res.status(400).json({ message: 'No files uploaded' })
      }
    const uploadedResume = [];
        for (const file of req.files) {
           const resume = new Resume({
            filename: file.filename,
            originalName: file.originalname,
            fileSize: file.size,
            mimeType: file.mimetype,
            filePath: file.path,
            status: "pending",
           });
           await resume.save();
           uploadedResume.push(resume);
           const job = await resumeAnalysisQueue.add('extract-text', {
            resumeId: resume._id.toString(),
            filePath: resume.filePath,
            originalName: resume.originalName,

           },{
            jobId: `resume-${resume._id.toString()}`,
            priority: 10,
           })
           resume.jobId = job.id || null;
           await resume.save();
           

        }
        

    
      // handle uploaded files (implementation-specific)
      return res.status(201).json({ message: 'Resume is saved successfully', files: req.files })
   } catch (error) {
      return res.status(500).json({ message: 'Server error', error })
   }
}