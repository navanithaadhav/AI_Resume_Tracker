import {
  UploadResponse,
  AnalyzeResponse,
  QuickScoreResponse,
  ErrorResponse,
} from '../types';

// Use environment variable or fallback to Render URL
const API_BASE_URL: string =
  process.env.REACT_APP_API_URL || 'https://ai-resume-tracker-joun.onrender.com/api';

console.log('API URL:', API_BASE_URL); // Debug log

/**
 * Upload resume file
 */
export const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch(`${API_BASE_URL}/resume/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Failed to upload resume');
  }

  return await response.json();
};

/**
 * Analyze resume against job description
 */
export const analyzeResume = async (
  resumeText: string,
  jobDescription: string
): Promise<AnalyzeResponse> => {
  const response = await fetch(`${API_BASE_URL}/analysis/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resumeText,
      jobDescription,
    }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Failed to analyze resume');
  }

  return await response.json();
};

/**
 * Get quick resume score
 */
export const getQuickScore = async (
  resumeText: string,
  jobDescription: string
): Promise<QuickScoreResponse> => {
  const response = await fetch(`${API_BASE_URL}/analysis/quick-score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resumeText,
      jobDescription,
    }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error || 'Failed to get score');
  }

  return await response.json();
};

/**
 * Check backend health
 */
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:10000/api/health');
    return response.ok;
  } catch (error) {
    return false;
  }
};
