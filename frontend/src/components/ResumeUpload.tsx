import React, { useState } from 'react';
import '../index.css';

interface ResumeUploadProps {
  onResumeUpload: (text: string) => void;
  isLoading: boolean;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({
  onResumeUpload,
  isLoading,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');

    if (selectedFile) {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF or DOCX file');
        return;
      }

      if (selectedFile.size > maxSize) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('resume', file);

      let API_BASE_URL = process.env.REACT_APP_API_URL ?? 'https://ai-resume-tracker-1.onrender.com/api';
      if (!API_BASE_URL.endsWith('/api')) {
        API_BASE_URL = API_BASE_URL.replace(/\/$/, '') + '/api';
      }
      const response = await fetch(`${API_BASE_URL}/resume/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      onResumeUpload(data.resumeText);
      setFile(null);
      setError('');
    } catch (err) {
      const error = err as Error;
      setError(error.message);
    }
  };

  return (
    <div className="card h-full flex flex-col">
      <h2 className="section-title">Resume Source</h2>

      <div className="flex-1 space-y-6">
        <div className="relative group">
          <label className="block text-surface-700 font-bold mb-3 text-sm uppercase tracking-wider">
            Upload Document
          </label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx"
              disabled={isLoading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${file ? 'border-primary bg-primary/5' : 'border-surface-200 bg-surface-50 group-hover:border-primary/50 group-hover:bg-primary/[0.02]'
              }`}>
              <div className="mb-4 flex justify-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${file ? 'bg-primary text-white' : 'bg-surface-200 text-surface-500'
                  }`}>
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-surface-900 font-semibold mb-1">
                {file ? file.name : 'Click or drag resume here'}
              </p>
              <p className="text-surface-500 text-sm">PDF or DOCX (Max 10MB)</p>
            </div>
          </div>
        </div>

        {file && !error && (
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-primary">✨</span>
              <span className="text-surface-700 font-medium text-sm truncate max-w-[200px]">{file.name}</span>
            </div>
            <span className="text-[10px] font-bold text-primary bg-white px-2 py-1 rounded-md shadow-sm">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-danger/10 rounded-xl border border-danger/20 flex items-center gap-3 animate-shake">
            <span className="text-danger">⚠️</span>
            <p className="text-danger-dark font-medium text-sm">{error}</p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <button
          onClick={handleUpload}
          disabled={!file || isLoading}
          className={`w-full py-4 text-base ${isLoading || !file ? 'bg-surface-200 text-surface-400 cursor-not-allowed' : 'btn-primary'
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            'Parse Resume Information'
          )}
        </button>
      </div>
    </div>

  );
};

export default ResumeUpload;
