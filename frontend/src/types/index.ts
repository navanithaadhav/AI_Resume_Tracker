// API Response Types
export interface AnalysisResult {
  score: number;
  summary: string;
  strengths: string[];
  missing_skills: string[];
  ats_keywords: string[];
}

export interface SuggestionsResult {
  priority_changes: string[];
  content_improvements: string[];
  formatting_tips: string[];
}

export interface UploadResponse {
  success: boolean;
  filename: string;
  originalName: string;
  resumeText: string;
  fileSize: number;
  uploadedAt: string;
}

export interface AnalyzeResponse {
  analysis: AnalysisResult;
  suggestions: SuggestionsResult;
}

export interface QuickScoreResponse {
  score: number;
  summary: string;
}

export interface ErrorResponse {
  error: string;
}
