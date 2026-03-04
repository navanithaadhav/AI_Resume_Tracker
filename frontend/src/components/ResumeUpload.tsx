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

      const response = await fetch('http://localhost:5001/api/resume/upload', {
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
    <div className="card fade-in">
      <h2 className="section-title">Upload Your Resume</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Select Resume File (PDF or DOCX)
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx"
          disabled={isLoading}
          className="input-field"
        />
        <p className="text-gray-500 text-sm mt-2">Maximum file size: 10MB</p>
      </div>

      {file && (
        <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-blue-800">
            <strong>Selected:</strong> {file.name}
          </p>
          <p className="text-blue-600 text-sm">
            Size: {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 rounded border border-red-200">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || isLoading}
        className={`w-full ${
          isLoading || !file ? 'bg-gray-400 cursor-not-allowed' : 'btn-primary'
        }`}
      >
        {isLoading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  );
};

export default ResumeUpload;
