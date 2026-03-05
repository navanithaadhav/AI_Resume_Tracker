import React, { useState } from 'react';
import { AnalysisResult, SuggestionsResult } from '../types';

interface ResultsDashboardProps {
  analysis: AnalysisResult | null;
  suggestions: SuggestionsResult | null;
  isLoading: boolean;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  analysis,
  suggestions,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  if (!analysis) {
    return (
      <div className="card fade-in">
        <p className="text-gray-600 text-center py-8">
          Upload a resume and enter a job description, then click analyze to see
          results.
        </p>
      </div>
    );
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="card fade-in">
      <h2 className="section-title">Analysis Results</h2>

      {/* Score Card */}
      <div
        className={`${getScoreBgColor(analysis.score)} rounded-lg p-6 mb-6 border-2 border-gray-300`}
      >
        <p className="text-gray-700 text-center mb-2">Resume Match Score</p>
        <p
          className={`text-5xl font-bold text-center ${getScoreColor(analysis.score)}`}
        >
          {analysis.score}%
        </p>
        <p className="text-gray-600 text-center mt-2 text-sm">
          {analysis.summary}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 gap-4 overflow-x-auto">
        {['overview', 'skills', 'improvements', 'ats'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Strengths */}
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">
                Strengths
              </h3>
              <div className="space-y-2">
                {analysis.strengths && analysis.strengths.length > 0 ? (
                  analysis.strengths.map((strength, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-green-50 rounded border border-green-200"
                    >
                      <span className="badge-success">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No strengths identified</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-3 text-red-600">
                Missing Skills
              </h3>
              {analysis.missing_skills &&
              analysis.missing_skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.missing_skills.map((skill, idx) => (
                    <span key={idx} className="badge-error">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">All skills match!</p>
              )}
            </div>
          </div>
        )}

        {/* Improvements Tab */}
        {activeTab === 'improvements' && (
          <div className="space-y-4">
            {suggestions && suggestions.priority_changes && (
              <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Priority Changes
                </h3>
                <ol className="list-decimal list-inside space-y-2">
                  {suggestions.priority_changes.map((change, idx) => (
                    <li key={idx} className="text-gray-700">
                      {change}
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {suggestions && suggestions.content_improvements && (
              <div>
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Content Improvements
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {suggestions.content_improvements.map((improvement, idx) => (
                    <li key={idx} className="text-gray-700">
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ATS Tab */}
        {activeTab === 'ats' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-3 text-gray-800">
                ATS Keywords to Add
              </h3>
              {analysis.ats_keywords && analysis.ats_keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.ats_keywords.map((keyword, idx) => (
                    <span key={idx} className="badge-success">
                      {keyword}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No additional keywords needed</p>
              )}
            </div>
            {suggestions && suggestions.formatting_tips && (
              <div className="mt-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800">
                  Formatting Tips
                </h3>
                <ul className="space-y-2">
                  {suggestions.formatting_tips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-blue-50 rounded border border-blue-200"
                    >
                      <span className="badge-success">💡</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Export Button */}
      <div className="mt-8 pt-6 border-t">
        <button
          onClick={() => {
            // Generate professional report
            const date = new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            let report = `
═══════════════════════════════════════════════════════════════════
                    RESUME ANALYSIS REPORT
═══════════════════════════════════════════════════════════════════
Generated: ${date}
Powered by AI Resume Analyzer

───────────────────────────────────────────────────────────────────
                         MATCH SCORE
───────────────────────────────────────────────────────────────────

    ★  Overall Score: ${analysis.score}%  ★
    
    ${analysis.score >= 80 ? '✓ Excellent Match!' : analysis.score >= 60 ? '◐ Good Match - Room for Improvement' : '✗ Needs Significant Improvement'}

Summary:
${analysis.summary}

───────────────────────────────────────────────────────────────────
                         STRENGTHS
───────────────────────────────────────────────────────────────────
`;
            if (analysis.strengths && analysis.strengths.length > 0) {
              analysis.strengths.forEach((strength, idx) => {
                report += `\n  ✓ ${strength}`;
              });
            } else {
              report += '\n  No specific strengths identified.';
            }

            report += `

───────────────────────────────────────────────────────────────────
                      MISSING SKILLS
───────────────────────────────────────────────────────────────────
`;
            if (analysis.missing_skills && analysis.missing_skills.length > 0) {
              analysis.missing_skills.forEach((skill) => {
                report += `\n  ✗ ${skill}`;
              });
            } else {
              report += '\n  ✓ All required skills are present!';
            }

            report += `

───────────────────────────────────────────────────────────────────
                    ATS KEYWORDS TO ADD
───────────────────────────────────────────────────────────────────
`;
            if (analysis.ats_keywords && analysis.ats_keywords.length > 0) {
              report += '\nAdd these keywords to improve ATS compatibility:\n';
              analysis.ats_keywords.forEach((keyword) => {
                report += `\n  • ${keyword}`;
              });
            } else {
              report += '\n  ✓ Good keyword coverage!';
            }

            if (suggestions) {
              report += `

───────────────────────────────────────────────────────────────────
                    PRIORITY IMPROVEMENTS
───────────────────────────────────────────────────────────────────
`;
              if (suggestions.priority_changes && suggestions.priority_changes.length > 0) {
                suggestions.priority_changes.forEach((change, idx) => {
                  report += `\n  ${idx + 1}. ${change}`;
                });
              }

              report += `

───────────────────────────────────────────────────────────────────
                   CONTENT IMPROVEMENTS
───────────────────────────────────────────────────────────────────
`;
              if (suggestions.content_improvements && suggestions.content_improvements.length > 0) {
                suggestions.content_improvements.forEach((improvement) => {
                  report += `\n  → ${improvement}`;
                });
              }

              report += `

───────────────────────────────────────────────────────────────────
                     FORMATTING TIPS
───────────────────────────────────────────────────────────────────
`;
              if (suggestions.formatting_tips && suggestions.formatting_tips.length > 0) {
                suggestions.formatting_tips.forEach((tip) => {
                  report += `\n  💡 ${tip}`;
                });
              }
            }

            report += `

═══════════════════════════════════════════════════════════════════
                     END OF REPORT
═══════════════════════════════════════════════════════════════════

Thank you for using AI Resume Analyzer!
For best results, implement the suggestions above and re-analyze.

`;
            
            const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(report);
            const exportFileDefaultName = `Resume_Analysis_Report_${new Date().toISOString().split('T')[0]}.txt`;
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
          }}
          className="w-full btn-secondary"
        >
          📥 Download Analysis Report
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
