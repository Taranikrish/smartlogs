import React from 'react';
import { Link } from 'react-router-dom';

export default function TopNav() {
  return (
    <header className="bg-surface/80 backdrop-blur-md text-primary w-full sticky top-0 z-50 shadow-[0_32px_64px_-15px_rgba(192,193,255,0.06)] border-b border-outline-variant/10">
      <div className="flex items-center justify-between px-8 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">analytics</span>
            SmartLog
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <Link to="/" className="text-secondary font-semibold border-b-2 border-secondary pb-1">Docs</Link>
            <Link to="/architecture" className="text-slate-400 hover:text-primary transition-colors">Architecture</Link>
            <a href="https://github.com/Taranikrish/smartlogs" className="text-slate-400 hover:text-primary transition-colors">Project</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-high rounded-md transition-all scale-98 active:opacity-80">
            <span className="material-symbols-outlined">terminal</span>
          </button>
          <a href="https://github.com/Taranikrish/smartlogs" target="_blank" rel="noreferrer" className="bg-primary text-on-primary px-4 py-1.5 rounded-xl font-medium hover:opacity-90 transition-all text-sm">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
