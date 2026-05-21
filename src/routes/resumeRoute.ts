import express from 'express'
const router = express.Router()
import upload from '../middleware/upload.js'
import * as resumeController from '../controllers/resumeController.js'
console.log("Resume route loaded.. . . . . . . . . . . . . . . . . .")
router.post('/upload', upload.array('resumes', 5), resumeController.uploadResume);

export default router