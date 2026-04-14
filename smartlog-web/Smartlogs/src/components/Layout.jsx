import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30">
      <TopNav />
      <div className="flex max-w-[1440px] mx-auto min-h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-1 px-8 lg:px-16 py-12 bg-surface min-h-full">
          <Outlet />
          
          <footer className="w-full py-12 mt-20 border-t border-outline-variant/15">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-sm text-slate-400">© 2026 SmartLog Toolkit. Built for the open-source community.</p>
              <div className="flex gap-8 text-sm">
                <a className="text-slate-500 hover:text-secondary transition-all underline underline-offset-4 decoration-secondary" href="#">Privacy Policy</a>
                <a className="text-slate-500 hover:text-secondary transition-all underline underline-offset-4 decoration-secondary" href="#">License</a>
                <a className="text-slate-500 hover:text-secondary transition-all underline underline-offset-4 decoration-secondary" href="#">Security</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
