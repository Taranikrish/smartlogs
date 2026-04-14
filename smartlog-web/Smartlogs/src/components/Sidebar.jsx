import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Introduction', path: '/', icon: 'info' },
  { name: 'Get Started', path: '/get-started', icon: 'auto_awesome' },
  { name: 'Installation', path: '/installation', icon: 'download' },
  { name: 'Architecture', path: '/architecture', icon: 'account_tree' },
  { name: 'API Reference', path: '/api', icon: 'terminal' },
];

export default function Sidebar() {
  return (
    <aside className="bg-[#060e20] h-[calc(100vh-64px)] sticky top-16 w-64 overflow-y-auto hidden lg:flex flex-col py-8 gap-1 border-r border-outline-variant/10">
      <div className="px-6 mb-8">
        <h2 className="text-primary font-bold label-sm uppercase tracking-wider">Documentation</h2>
        <p className="text-slate-500 text-xs mt-1">v1.0.0-stable</p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-6 transition-all rounded-r-lg group ${
                isActive
                  ? 'text-secondary font-medium relative before:content-[""] before:absolute before:-left-4 before:w-1 before:h-4 before:bg-secondary before:rounded-full before:shadow-[0_0_8px_#4edea3]'
                  : 'text-slate-500 hover:text-primary hover:bg-surface-container-high/30'
              }`
            }
          >
            <span className="material-symbols-outlined text-lg">{item.icon}</span>
            <span className="label-sm uppercase tracking-wider">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-6 pt-8 pb-4">
        <a href="https://github.com/Taranikrish/smartlogs" target="_blank" rel="noreferrer" className="text-secondary text-xs font-semibold uppercase tracking-widest hover:underline decoration-secondary">
          View Source
        </a>
      </div>
    </aside>
  );
}
