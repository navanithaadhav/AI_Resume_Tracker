import React, { useState } from 'react';
import Header from './components/Header';
import ResumeUpload from './components/ResumeUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import ResultsDashboard from './components/ResultsDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { AnalysisResult, SuggestionsResult } from './types';
import './index.css';

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionsResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleResumeUpload = (text: string): void => {
    setResumeText(text);
    setError('');
  };

  const handleJobDescriptionChange = (text: string): void => {
    setJobDescription(text);
  };

  const handleAnalyze = async (): Promise<void> => {
    if (!resumeText.trim()) {
      setError('Please upload a resume first');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let API_BASE_URL = process.env.REACT_APP_API_URL ?? 'https://ai-resume-tracker-1.onrender.com/api';
      if (!API_BASE_URL.endsWith('/api')) {
        API_BASE_URL = API_BASE_URL.replace(/\/$/, '') + '/api';
      }
      const response = await fetch(`${API_BASE_URL}/analysis/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: resumeText,
          jobDescription: jobDescription,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setSuggestions(data.suggestions);
    } catch (err) {
      const error = err as Error;
      setError(
        error.message ||
        'Failed to analyze resume. Please check your backend connection.'
      );
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (): void => {
    setResumeText('');
    setJobDescription('');
    setAnalysis(null);
    setSuggestions(null);
    setError('');
  };

  return (

    <div className="min-h-screen transition-colors duration-500">
      <div className="mesh-bg" />
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {error && (
          <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-md border border-red-200 rounded-2xl shadow-sm fade-in-up">
            <div className="flex items-center gap-3">
              <span className="text-red-500 text-xl">⚠️</span>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
            <ResumeUpload
              onResumeUpload={handleResumeUpload}
              isLoading={isLoading}
            />
          </div>
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <JobDescriptionInput
              onJobDescriptionChange={handleJobDescriptionChange}
              jobDescription={jobDescription}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !resumeText || !jobDescription}
            className={`flex-[2] py-4 rounded-xl text-lg flex items-center justify-center gap-2 ${isLoading || !resumeText || !jobDescription
              ? 'bg-surface-300 text-surface-500 cursor-not-allowed shadow-none'
              : 'btn-primary'
              }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              '✨ Analyze My Resume'
            )}
          </button>
          {(analysis || suggestions) && (
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="flex-1 btn-secondary py-4"
            >
              ↺ Reset Fields
            </button>
          )}
        </div>

        {isLoading && (
          <div className="fade-in-up">
            <LoadingSpinner message="AI is carefully reviewing your resume..." />
          </div>
        )}

        {!isLoading && (analysis || suggestions) && (
          <div className="fade-in-up">
            <ResultsDashboard
              analysis={analysis}
              suggestions={suggestions}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      <footer className="bg-surface-900 text-surface-400 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6 flex justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">R</div>
            <span className="text-white font-bold text-xl font-outfit">AI Resume Analyzer</span>
          </div>
          <p className="mb-4">
            AI Resume Analyzer © {new Date().getFullYear()} | Professional Career Intelligence
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-surface-800 rounded-full">Powered by Gemini AI</span>
            <span className="px-3 py-1 bg-surface-800 rounded-full">ATS Optimized</span>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default App;
