import { GoogleGenerativeAI } from '@google/generative-ai';

// Type definitions
export interface ResumeAnalysis {
  score: number;
  missing_skills: string[];
  improvements: string[];
  ats_keywords: string[];
  strengths: string[];
  summary: string;
}

export interface ImprovementSuggestions {
  content_improvements: string[];
  keyword_optimization: string[];
  formatting_tips: string[];
  priority_changes: string[];
}

// Validate API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize model - using gemini-2.5-flash (latest available in 2026)
console.log('DEBUG: Initializing Gemini model with ID: gemini-2.5-flash');
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash'
});

// Use mock API for development/testing
const USE_MOCK_API = process.env.USE_MOCK_API === 'true';

/**
 * Helper function for sleep/delay
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Analyze resume against job description
 */
export async function analyzeResume(resumeText: string, jobDescription: string): Promise<ResumeAnalysis> {
  const maxRetries = 3;
  let retryCount = 0;

  // Mock mode for testing without valid API key
  if (USE_MOCK_API) {
    console.log('Using mock API response...');
    return {
      score: 75,
      missing_skills: [
        'Kubernetes',
        'Docker',
        'CI/CD pipelines',
        'AWS advanced services'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Highlight leadership experience',
        'Include industry certifications',
        'Detail specific project impacts with metrics'
      ],
      ats_keywords: [
        'Full Stack Developer',
        'REST API',
        'Agile methodology',
        'Cloud computing',
        'Database optimization'
      ],
      strengths: [
        'Strong programming fundamentals',
        'Relevant industry experience',
        'Good communication skills',
        'Problem-solving abilities'
      ],
      summary: 'Good match with room for growth. Candidate demonstrates solid technical skills but would benefit from cloud platform expertise and more quantifiable project results.'
    };
  }

  while (retryCount <= maxRetries) {
    try {
      const userPrompt = `You are an expert HR recruiter and resume reviewer with extensive experience in talent acquisition and career development.

Please analyze the following resume against the job description provided.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed analysis in the following JSON format:
{
  "score": <number 0-100>,
  "missing_skills": [<list of missing technical and soft skills>],
  "improvements": [<actionable suggestions to improve resume>],
  "ats_keywords": [<recommended ATS optimization keywords>],
  "strengths": [<key strengths relevant to the job>],
  "summary": "<brief overall assessment>"
}

Be specific and practical in your recommendations.`;

      // Use Google Generative AI
      const response = await model.generateContent(userPrompt);
      let analysisText = response.response.text();

      // Extract JSON from response if wrapped in markdown code blocks
      const jsonMatch = analysisText.match(/```json\n([\s\S]*?)\n```/) ||
        analysisText.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        analysisText = jsonMatch[1];
      }

      const analysis: ResumeAnalysis = JSON.parse(analysisText);
      return analysis;
    } catch (error) {
      console.error(`Analysis attempt ${retryCount + 1} failed:`, error);

      const err = error as Error;
      const isRateLimit = err.message?.includes('429') || err.message?.toLowerCase().includes('rate limit');
      const isServiceUnavailable = err.message?.includes('503') || err.message?.toLowerCase().includes('service unavailable');

      if ((isRateLimit || isServiceUnavailable) && retryCount < maxRetries) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 2s, 4s, 8s
        console.log(`Gemini API is busy (503/429). Retrying in ${delay}ms... (Attempt ${retryCount}/${maxRetries})`);
        await sleep(delay);
        continue;
      }

      if (error instanceof SyntaxError) {
        throw new Error(`Failed to parse AI response: ${error.message}`);
      }
      if (err.message?.includes('API key')) {
        throw new Error('Invalid Gemini API Key. Please check your GEMINI_API_KEY in .env');
      }

      if (isServiceUnavailable) {
        throw new Error('The AI model is currently experiencing high traffic. Please try again in 1-2 minutes.');
      }

      throw error;
    }
  }
  throw new Error('Failed to analyze resume after multiple attempts due to high AI service traffic.');
}

/**
 * Generate improvement suggestions
 */
export async function generateImprovementSuggestions(resumeText: string, jobDescription: string): Promise<ImprovementSuggestions> {
  const maxRetries = 2; // Slightly fewer retries for secondary step
  let retryCount = 0;

  // Mock mode for testing without valid API key
  if (USE_MOCK_API) {
    console.log('Using mock API response...');
    return {
      content_improvements: [
        'Add specific metrics to project descriptions (e.g., "Reduced load time by 40%")',
        'Include timeline for each achievement',
        'Expand role descriptions with key responsibilities',
        'Add links to portfolio or GitHub projects'
      ],
      keyword_optimization: [
        'Add "Full Stack Development" to skills section',
        'Include "Scalable Systems" and "Distributed Systems"',
        'Incorporate "RESTful APIs" and "Microservices"',
        'Add cloud provider certifications if applicable'
      ],
      formatting_tips: [
        'Use consistent date formats (MM/YYYY)',
        'Implement clear section headers with larger font',
        'Use bullet points for better readability',
        'Keep margins at 0.5-1 inch on all sides'
      ],
      priority_changes: [
        '1. Add quantifiable metrics to existing achievements',
        '2. Expand technical skills section with specific technologies',
        '3. Add professional certifications and courses',
        '4. Highlight leadership or mentoring experience'
      ]
    };
  }

  while (retryCount <= maxRetries) {
    try {
      const userPrompt = `Based on this resume and job description, provide specific improvement suggestions:

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Provide suggestions in this JSON format:
{
  "content_improvements": [<improvements to resume content and structure>],
  "keyword_optimization": [<keywords to add for better ATS score>],
  "formatting_tips": [<formatting suggestions>],
  "priority_changes": [<most important changes to make first>]
}`;

      // Use Google Generative AI
      const response = await model.generateContent(userPrompt);
      let suggestionsText = response.response.text();

      const jsonMatch = suggestionsText.match(/```json\n([\s\S]*?)\n```/) ||
        suggestionsText.match(/```\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        suggestionsText = jsonMatch[1];
      }

      const suggestions: ImprovementSuggestions = JSON.parse(suggestionsText);
      return suggestions;
    } catch (error) {
      console.error(`Suggestions attempt ${retryCount + 1} failed:`, error);

      const err = error as Error;
      const isRateLimit = err.message?.includes('429') || err.message?.toLowerCase().includes('rate limit');
      const isServiceUnavailable = err.message?.includes('503') || err.message?.toLowerCase().includes('service unavailable');

      if ((isRateLimit || isServiceUnavailable) && retryCount < maxRetries) {
        retryCount++;
        const delay = Math.pow(2, retryCount) * 1000;
        console.log(`Gemini API is busy (503/429). Retrying in ${delay}ms... (Attempt ${retryCount}/${maxRetries})`);
        await sleep(delay);
        continue;
      }

      if (error instanceof SyntaxError) {
        throw new Error(`Failed to parse suggestions: ${error.message}`);
      }
      if (err.message?.includes('API key')) {
        throw new Error('Invalid Gemini API Key');
      }

      if (isServiceUnavailable) {
        throw new Error('The AI service is busy. Please try again later.');
      }

      throw error;
    }
  }
  throw new Error('Failed to generate suggestions due to high AI service traffic.');
}

export default {
  analyzeResume,
  generateImprovementSuggestions
};
