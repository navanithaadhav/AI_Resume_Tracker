import express, { Request, Response, Router } from 'express';
import { analyzeResume, generateImprovementSuggestions, ResumeAnalysis, ImprovementSuggestions } from '../services/aiService';

const router: Router = express.Router();

// Request body interface
interface AnalysisRequestBody {
  resumeText: string;
  jobDescription: string;
}

// Response interfaces
interface AnalysisResponse {
  success: boolean;
  analysis: ResumeAnalysis;
  suggestions: ImprovementSuggestions;
  analyzedAt: Date;
}

interface QuickScoreResponse {
  success: boolean;
  score: number;
  summary: string;
  missingSkillsCount: number;
}

interface ErrorResponse {
  error: string;
}

/**
 * POST /api/analysis/analyze
 * Analyze resume against job description
 */
router.post('/analyze', async (req: Request<{}, AnalysisResponse | ErrorResponse, AnalysisRequestBody>, res: Response) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Both resumeText and jobDescription are required'
      });
    }

    if (resumeText.length < 50) {
      return res.status(400).json({
        error: 'Resume text is too short. Please provide a proper resume.'
      });
    }

    if (jobDescription.length < 50) {
      return res.status(400).json({
        error: 'Job description is too short. Please provide a complete job description.'
      });
    }

    // Analyze resume
    const analysis = await analyzeResume(resumeText, jobDescription);

    // Generate additional suggestions
    const suggestions = await generateImprovementSuggestions(resumeText, jobDescription);

    res.json({
      success: true,
      analysis: analysis,
      suggestions: suggestions,
      analyzedAt: new Date()
    });
  } catch (error) {
    console.error('Analysis error:', error);
    
    const err = error as Error;
    if (err.message?.includes('API key')) {
      return res.status(500).json({
        error: 'Gemini API configuration error. Please check your API key.'
      });
    }

    res.status(500).json({
      error: err.message || 'Failed to analyze resume'
    });
  }
});

/**
 * POST /api/analysis/quick-score
 * Get quick resume score without detailed analysis
 */
router.post('/quick-score', async (req: Request<{}, QuickScoreResponse | ErrorResponse, AnalysisRequestBody>, res: Response) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Both resumeText and jobDescription are required'
      });
    }

    // Quick analysis with smaller response
    const analysis = await analyzeResume(resumeText, jobDescription);

    res.json({
      success: true,
      score: analysis.score,
      summary: analysis.summary,
      missingSkillsCount: analysis.missing_skills.length
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      error: err.message || 'Failed to calculate score'
    });
  }
});

export default router;
