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
    <div className="card fade-in">
      <h2 className="section-title">Job Description</h2>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-gray-700 font-semibold">
            Paste the Job Description
          </label>
          <button
            onClick={handleSampleJob}
            type="button"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Use Sample
          </button>
        </div>
        <textarea
          value={jobDescription}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Paste the complete job description here..."
          className="input-field h-48 resize-none"
        />
        <p className="text-gray-500 text-sm mt-2">
          Character count: {jobDescription.length}
        </p>
      </div>
    </div>
  );
};

export default JobDescriptionInput;
