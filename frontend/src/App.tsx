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
      const response = await fetch('http://localhost:10000/api/analysis/analyze', {
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ResumeUpload
            onResumeUpload={handleResumeUpload}
            isLoading={isLoading}
          />
          <JobDescriptionInput
            onJobDescriptionChange={handleJobDescriptionChange}
            jobDescription={jobDescription}
            isLoading={isLoading}
          />
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !resumeText || !jobDescription}
            className={`flex-1 ${isLoading || !resumeText || !jobDescription
                ? 'bg-gray-400 cursor-not-allowed'
                : 'btn-primary'
              }`}
          >
            {isLoading ? 'Analyzing...' : '🔍 Analyze Resume'}
          </button>
          {(analysis || suggestions) && (
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="flex-1 btn-secondary"
            >
              ↺ Reset
            </button>
          )}
        </div>

        {isLoading && <LoadingSpinner message="Analyzing your resume..." />}

        {!isLoading && (analysis || suggestions) && (
          <ResultsDashboard
            analysis={analysis}
            suggestions={suggestions}
            isLoading={isLoading}
          />
        )}
      </main>

      <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>
            AI Resume Analyzer © {new Date().getFullYear()} | Powered by Google
            Gemini AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
