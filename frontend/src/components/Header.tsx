import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
                   <h1 className="text-4xl font-bold">AI Resume Analyzer</h1>
        </div>
        <p className="text-blue-100 text-lg">
          Get AI-powered insights on how your resume matches the job description
        </p>
      </div>
    </header>
  );
};

export default Header;
