import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-glass">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg transform rotate-3">R</div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-surface-900 to-surface-600 font-outfit">
              AI Resume Analyzer
            </h1>
            <p className="text-[10px] text-surface-500 font-bold uppercase tracking-[0.2em]">Professional Intelligence</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm font-medium text-surface-600 hover:text-primary transition-colors cursor-pointer">How it works</span>
          <span className="text-sm font-medium text-surface-600 hover:text-primary transition-colors cursor-pointer">Pricing</span>
          <button className="px-5 py-2 bg-surface-900 text-white text-sm font-semibold rounded-lg hover:bg-surface-800 transition-all active:scale-95 shadow-lg">Get Started</button>
        </div>
      </div>
    </header>

  );
};

export default Header;
