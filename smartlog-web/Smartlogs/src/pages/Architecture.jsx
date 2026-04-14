import React from 'react';
import customLogImg from '../assets/custom-log.png';

export default function Architecture() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-12 text-left">
        <span className="text-outline text-xs uppercase tracking-widest font-bold">Internal Logic</span>
        <h1 className="text-4xl font-bold text-on-surface mt-2 mb-4">Internal Architecture</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl font-medium">
          SmartLogs isn't just a library—it's a distributed data pipeline. Here is how your application metrics travel from raw code to high-fidelity charts.
        </p>
      </header>

      {/* Visual Flow */}
      <section className="relative py-24 px-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 shadow-2xl overflow-hidden mb-20 group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50 transition-opacity duration-700 group-hover:opacity-100"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 font-mono">
          <div className="flex flex-col items-center gap-4 group/node">
            <div className="w-24 h-24 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-secondary shadow-lg group-hover/node:border-secondary transition-all">
              <span className="material-symbols-outlined text-4xl">javascript</span>
            </div>
            <span className="text-xs text-secondary font-bold uppercase tracking-widest">Node.js Engine</span>
            <span className="text-[10px] text-outline">Pulls metrics internally</span>
          </div>

          <span className="material-symbols-outlined text-outline animate-pulse hidden md:block">arrow_forward</span>

          <div className="flex flex-col items-center gap-4 group/node">
            <div className="w-24 h-24 rounded-2xl bg-surface-container-high border-2 border-primary flex items-center justify-center text-primary shadow-2xl group-hover/node:scale-105 transition-all">
              <span className="material-symbols-outlined text-4xl">database</span>
            </div>
            <span className="text-xs text-primary font-bold uppercase tracking-widest">Prometheus</span>
            <span className="text-[10px] text-outline">Scrapes @ 15s intervals</span>
          </div>

          <span className="material-symbols-outlined text-outline animate-pulse hidden md:block">arrow_forward</span>

          <div className="flex flex-col items-center gap-4 group/node">
            <div className="w-24 h-24 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-tertiary-fixed shadow-lg group-hover/node:border-tertiary transition-all">
              <span className="material-symbols-outlined text-4xl">query_stats</span>
            </div>
            <span className="text-xs text-tertiary-fixed font-bold uppercase tracking-widest">Grafana UI</span>
            <span className="text-[10px] text-outline">Visualizes data viz</span>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-2xl font-bold text-on-surface mb-4 underline decoration-secondary/30 underline-offset-4">The Pull-Based Model</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-6">
            Traditional logging libraries "push" data every time a log event occurs, which can significantly impact CPU usage during traffic spikes.  
            <br /><br />
            SmartLog utilizes a <span className="text-secondary font-bold">Pull Architecture</span>. Your application maintains lightweight counters in memory, which Prometheus then "pulls" at regular 15-second intervals. This results in <span className="text-primary font-bold">negligible overhead</span> for your core application logic.
          </p>
          <div className="p-4 bg-secondary-container/10 rounded-xl border border-secondary/20">
             <p className="text-xs text-secondary font-bold italic">" observability should never cost you performance. "</p>
          </div>
        </div>
        <div className="rounded-2xl border border-outline-variant/20 shadow-2xl overflow-hidden bg-surface-container-highest">
          <img src={customLogImg} alt="Architecture Preview" className="w-full opacity-80" />
        </div>
      </div>

      <div className="p-10 bg-surface-container-low rounded-3xl border border-outline-variant/10 mb-32">
        <h3 className="text-xl font-bold text-on-surface mb-6">Protected Routing</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
           One of SmarLog's most powerful features is internal cardinality protection. If an attacker tries to flood your app with random URLs (e.g., `wp-admin.php`, `config.json`), SmartLog recognizes these as unmapped and groups them into a single metric. This prevents your Prometheus database from exploding in size during a security incident.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
           <div className="p-4 bg-surface-dim rounded-xl border border-outline-variant/20">
              <span className="text-xs font-bold text-outline uppercase tracking-widest block mb-2">Unprotected</span>
              <span className="text-sm text-error font-mono">/user/1, /user/2, /user/3...</span>
           </div>
           <div className="p-4 bg-surface-dim rounded-xl border border-outline-variant/20">
              <span className="text-xs font-bold text-outline uppercase tracking-widest block mb-2">SmartLog Protected</span>
              <span className="text-sm text-secondary font-mono">/user/:id</span>
           </div>
        </div>
      </div>
    </div>
  );
}
