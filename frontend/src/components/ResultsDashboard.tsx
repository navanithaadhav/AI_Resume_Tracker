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
      <div className="card fade-in-up">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-20 h-20 bg-surface-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl text-surface-300">📊</span>
          </div>
          <p className="text-surface-500 font-medium max-w-xs">
            Ready for analysis. Please provide your documents above to view detailed insights.
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-danger';
  };

  const getScoreBgColor = (score: number): string => {
    if (score >= 80) return 'bg-success/10 border-success/20';
    if (score >= 60) return 'bg-warning/10 border-warning/20';
    return 'bg-danger/10 border-danger/20';
  };

  const getScoreIndicator = (score: number): string => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Work';
  };

  return (
    <div className="card shadow-glass relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-surface-900 font-outfit">Intelligence Dashboard</h2>
            <p className="text-surface-500 text-sm mt-1 uppercase tracking-widest font-bold">Analysis Profile</p>
          </div>
          <div className="flex items-center gap-3 bg-surface-100 p-1 rounded-xl">
            <button className="px-4 py-2 bg-white shadow-sm rounded-lg text-xs font-bold text-surface-800 transition-all">Report</button>
            <button className="px-4 py-2 text-xs font-bold text-surface-500 hover:text-surface-800 transition-all">Details</button>
          </div>
        </div>

        {/* Score Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className={`col-span-1 lg:col-span-1 rounded-3xl p-8 border-2 ${getScoreBgColor(analysis.score)} flex flex-col items-center justify-center text-center`}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-surface-600">Match Integrity</span>
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-surface-200" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 58} strokeDashoffset={2 * Math.PI * 58 * (1 - analysis.score / 100)} className={getScoreColor(analysis.score)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold font-outfit ${getScoreColor(analysis.score)} transition-all duration-1000`}>
                  {analysis.score}%
                </span>
              </div>
            </div>
            <span className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getScoreBgColor(analysis.score)} ${getScoreColor(analysis.score)}`}>
              {getScoreIndicator(analysis.score)}
            </span>
          </div>

          <div className="col-span-1 lg:col-span-2 bg-surface-50 rounded-3xl p-8 border border-surface-100 flex flex-col justify-center">
            <h3 className="text-lg font-bold text-surface-900 mb-2">Executive Summary</h3>
            <p className="text-surface-600 leading-relaxed text-sm italic">
              "{analysis.summary}"
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-medium text-surface-500">ATS Validated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_{colors.primary.DEFAULT}]" />
                <span className="text-xs font-medium text-surface-500">AI Verified Match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Improved Tabs Style */}
        <div className="flex border-b border-surface-100 mb-8 gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: 'overview', icon: '📝', label: 'Overview' },
            { id: 'skills', icon: '⚡', label: 'Technical Gap' },
            { id: 'improvements', icon: '📈', label: 'Strategic Pivot' },
            { id: 'ats', icon: '🤖', label: 'ATS Tuning' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-bold text-xs uppercase tracking-widest transition-all relative ${activeTab === tab.id
                  ? 'text-primary'
                  : 'text-surface-400 hover:text-surface-600 hover:bg-surface-50'
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-full shadow-[0_-2px_8px_rgba(5,150,105,0.4)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content with Premium Styles */}
        <div className="min-h-[300px]">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-success/10 text-success flex items-center justify-center">🏆</div>
                  <h3 className="font-bold text-lg text-surface-900 font-outfit">Core Strengths</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.strengths && analysis.strengths.length > 0 ? (
                    analysis.strengths.map((strength, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-white border border-surface-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
                      >
                        <span className="w-6 h-6 rounded-full bg-success/10 text-success flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">✓</span>
                        <span className="text-surface-700 text-sm font-medium leading-relaxed">{strength}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-surface-400">Analysis pending...</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center">🎯</div>
                  <h3 className="font-bold text-lg text-surface-900 font-outfit">Priority Gaps Identified</h3>
                </div>
                {analysis.missing_skills && analysis.missing_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {analysis.missing_skills.map((skill, idx) => (
                      <span key={idx} className="badge-error bg-danger/5 hover:bg-danger/10 transition-colors py-2 px-4">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-success/5 rounded-3xl border border-dashed border-success/30">
                    <p className="text-success font-bold">Incredible Coverage! 🌟</p>
                    <p className="text-success/70 text-sm mt-1">Your resume aligns with every technical requirement detected.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'improvements' && (
            <div className="space-y-8 animate-fade-in-up">
              {suggestions && suggestions.priority_changes && (
                <div>
                  <h3 className="font-bold text-lg mb-6 text-surface-900 font-outfit flex items-center gap-2">
                    <span className="text-primary">01.</span> Critical Adjustments
                  </h3>
                  <div className="space-y-3">
                    {suggestions.priority_changes.map((change, idx) => (
                      <div key={idx} className="p-4 bg-surface-50 border-l-4 border-primary rounded-r-xl text-surface-700 text-sm font-medium">
                        {change}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {suggestions && suggestions.content_improvements && (
                <div>
                  <h3 className="font-bold text-lg mb-6 text-surface-900 font-outfit flex items-center gap-2">
                    <span className="text-secondary">02.</span> Strategic Enhancements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.content_improvements.map((improvement, idx) => (
                      <div key={idx} className="flex gap-3 p-4 border border-surface-100 rounded-xl bg-white shadow-sm hover:border-secondary/20 transition-all">
                        <span className="text-secondary">↗</span>
                        <p className="text-surface-600 text-sm">{improvement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ats' && (
            <div className="space-y-8 animate-fade-in-up">
              <div>
                <h3 className="font-bold text-lg mb-6 text-surface-900 font-outfit">Keyword Optimization</h3>
                {analysis.ats_keywords && analysis.ats_keywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.ats_keywords.map((keyword, idx) => (
                      <span key={idx} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl text-sm font-bold shadow-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-surface-400">Keyword profile looks solid.</p>
                )}
              </div>
              {suggestions && suggestions.formatting_tips && (
                <div className="bg-surface-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <h3 className="font-bold text-lg mb-6 font-outfit relative z-10">Formatting Intelligence</h3>
                  <div className="space-y-4 relative z-10">
                    {suggestions.formatting_tips.map((tip, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-surface-300 text-sm bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                        <span className="text-primary text-xl">💡</span>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
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
