import express, { Request, Response, Router } from 'express';
import upload from '../utils/multerConfig';
import { parseResumeFile } from '../utils/fileParser';
import fs from 'fs/promises';

const router: Router = express.Router();

// Extended Request interface for multer
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// Response interfaces
interface UploadSuccessResponse {
  success: boolean;
  filename: string;
  originalName: string;
  resumeText: string;
  fileSize: number;
  uploadedAt: Date;
}

interface ErrorResponse {
  error: string;
}

/**
 * POST /api/resume/upload
 * Upload and parse resume file
 */
router.post('/upload', upload.single('resume'), async (req: MulterRequest, res: Response<UploadSuccessResponse | ErrorResponse>) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse the resume file
    const resumeText = await parseResumeFile(req.file.path);

    res.json({
      success: true,
      filename: req.file.filename,
      originalName: req.file.originalname,
      resumeText: resumeText,
      fileSize: req.file.size,
      uploadedAt: new Date()
    });
  } catch (error) {
    // Clean up uploaded file if parsing fails
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    const err = error as Error;
    res.status(400).json({
      error: err.message || 'Failed to upload and parse resume'
    });
  }
});

export default router;
