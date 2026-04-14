import React from 'react';

export default function Navbar() {
  return (
    <nav className="border-b border-neutral-800 bg-[#0a0a0a] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white text-black font-bold flex items-center justify-center text-[10px] rounded-sm">SL</div>
          <span className="font-medium text-sm text-neutral-200 tracking-tight">SmartLogs</span>
        </div>
        <div className="flex gap-6 text-sm text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
          <a href="https://github.com/Taranikrish/smartlogs" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </nav>
  );
}
