import React from 'react';

interface JobDescriptionInputProps {
  onJobDescriptionChange: (text: string) => void;
  jobDescription: string;
  isLoading: boolean;
}

const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  onJobDescriptionChange,
  jobDescription,
  isLoading,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onJobDescriptionChange(e.target.value);
  };

  const handleSampleJob = () => {
    const sampleJob = `Senior Full Stack Developer

About the Role:
We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining both frontend and backend components of our applications.

Responsibilities:
- Design and implement scalable web applications using React and Node.js
- Develop RESTful APIs and database schemas
- Collaborate with UI/UX designers to implement responsive designs
- Optimize applications for performance and scalability
- Participate in code reviews and contribute to team knowledge sharing
- Troubleshoot and debug applications
- Write clean, well-documented code

Required Skills:
- 5+ years of JavaScript/TypeScript experience
- Proficiency in React.js and Node.js
- Strong understanding of SQL and NoSQL databases
- Experience with Git version control
- Knowledge of RESTful API design
- Familiarity with Docker and microservices
- Strong problem-solving skills
- Excellent communication abilities

Nice to Have:
- Experience with AWS or cloud platforms
- Knowledge of CI/CD pipelines
- Contribution to open-source projects
- Experience with GraphQL`;

    onJobDescriptionChange(sampleJob);
  };

  return (
    <div className="card h-full flex flex-col">
      <h2 className="section-title">Target Context</h2>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-surface-700 font-bold text-sm uppercase tracking-wider">
            Job Description / Requirements
          </label>
          <button
            onClick={handleSampleJob}
            type="button"
            className="text-primary hover:text-primary-dark text-xs font-bold px-3 py-1 bg-primary/5 rounded-full transition-colors border border-primary/10"
          >
            Load Example
          </button>
        </div>

        <div className="relative flex-1">
          <textarea
            value={jobDescription}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Paste the complete requirements or role description here for high-accuracy analysis..."
            className="input-field h-[280px] lg:h-full min-h-[200px] resize-none pb-10"
          />
          <div className="absolute bottom-3 right-4 flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-1 rounded ${jobDescription.length > 500 ? 'text-primary bg-primary/5' : 'text-surface-400 bg-surface-100'
              }`}>
              {jobDescription.length.toLocaleString()} characters
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 p-3 bg-surface-50 rounded-xl border border-surface-100 italic">
          <span className="text-primary">💡</span>
          <p className="text-surface-500 text-xs">
            Tip: Include both technical skills and responsibilities for best results.
          </p>
        </div>
      </div>
    </div>

  );
};

export default JobDescriptionInput;
