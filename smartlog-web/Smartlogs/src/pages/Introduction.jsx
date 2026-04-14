import React from 'react';
import dashboardImg from '../assets/custom-log.png';

const CodeBlock = ({ title, code, lang = 'bash' }) => (
  <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 my-6">
    <div className="bg-surface-container-low px-4 py-2 flex items-center justify-between border-b border-outline-variant/5">
      <span className="text-xs font-mono text-outline">{title}</span>
      <button 
        onClick={() => navigator.clipboard.writeText(code)}
        className="text-secondary text-[10px] uppercase font-bold hover:opacity-80 active:scale-95 transition-all outline-none"
      >
        Copy
      </button>
    </div>
    <pre className="p-6 overflow-x-auto text-sm leading-relaxed scrollbar-hide">
      <code className="text-secondary" dangerouslySetInnerHTML={{ __html: code }}></code>
    </pre>
  </div>
);

export default function Introduction() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-secondary-container/20 text-secondary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter shadow-[0_0_10px_rgba(78,222,163,0.1)]">v1.0.0-Stable</span>
          <span className="text-outline text-xs tracking-wide">Developer Experience</span>
        </div>
        <h1 className="text-5xl font-bold text-on-surface mb-6 tracking-tight leading-tight">
          Modern observability, <br />
          <span className="text-primary underline decoration-primary/30 underline-offset-8 decoration-4 italic">simplified.</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium mb-12">
          SmartLogs is a plug-and-play monitoring engine for Node.js. It removes the friction of configuring Prometheus and Grafana, giving you instant visibility into your application's health.
        </p>
        
        <div className="relative rounded-2xl overflow-hidden border border-outline-variant/20 shadow-2xl bg-surface-container-low mb-16 group">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim to-transparent opacity-40 z-10 pointer-events-none"></div>
          <img src={dashboardImg} alt="SmartLog Dashboard" className="w-full opacity-90 group-hover:opacity-100 transition-opacity duration-700 scale-100 group-hover:scale-[1.02] transition-transform duration-1000" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20 px-1">
          <div className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-primary/20 transition-colors">
            <h3 className="text-primary font-bold text-xl mb-3 tracking-tight">Zero-Config Philosophy</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Manual metric tuning and complex datasource linking are things of the past. SmartLogs handles the plumbing so you can focus on shipping features.
            </p>
          </div>
          <div className="p-8 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-secondary/20 transition-colors">
            <h3 className="text-secondary font-bold text-xl mb-3 tracking-tight">Pin-Point Accuracy</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Every incident is mapped to its exact source. We analyze trace data in real-time to provide the file path and line number of every performance lag or system crash.
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-24 scroll-mt-20" id="quickstart">
        <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
          <h2 className="text-3xl font-bold text-on-surface tracking-tight">The 60-Second Setup</h2>
          <div className="flex-1 h-px bg-outline-variant/10 hidden md:block"></div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
            <span className="material-symbols-outlined text-[14px] text-tertiary">warning</span>
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Prerequisite: Docker Desktop</span>
          </div>
        </div>

        <div className="flex items-start gap-10 group">
          <div className="flex-none w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary font-black text-xl shadow-lg group-hover:border-secondary group-hover:text-secondary group-hover:-translate-y-1 transition-all duration-300">1</div>
          <div className="flex-1 pt-1">
            <h3 className="text-2xl font-semibold mb-4 text-on-surface tracking-tight">Deploy Infrastructure</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed max-w-xl">
              Initialize the monitoring stack environment. Our pre-configured toolkit includes the collector engine and visualization suite.
            </p>
            <CodeBlock 
              title="Terminal"
              code={`git clone <span class="text-primary-fixed">https://github.com/Taranikrish/smartlogs.git</span>\ncd <span class="text-primary-fixed">smartlogs</span>\ncp <span class="text-tertiary-fixed">.env.example .env</span>\ndocker-compose up <span class="text-tertiary-fixed">-d</span>`}
            />
          </div>
        </div>

        <div className="flex items-start gap-10 group">
          <div className="flex-none w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary font-black text-xl shadow-lg group-hover:border-secondary group-hover:text-secondary group-hover:-translate-y-1 transition-all duration-300">2</div>
          <div className="flex-1 pt-1">
            <h3 className="text-2xl font-semibold mb-4 text-on-surface tracking-tight">Integrate Core SDK</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed max-w-xl">
              Install the lightweight client library to start capturing internal telemetry from your application runtime.
            </p>
            <CodeBlock 
              title="Terminal"
              code={`npm install <span class="text-primary-fixed">smartlogs</span>`}
            />
          </div>
        </div>

        <div className="flex items-start gap-10 group">
          <div className="flex-none w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary font-black text-xl shadow-lg group-hover:border-secondary group-hover:text-secondary group-hover:-translate-y-1 transition-all duration-300">3</div>
          <div className="flex-1 pt-1">
            <h3 className="text-2xl font-semibold mb-4 text-on-surface tracking-tight">Activate Monitoring</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed max-w-xl">
              Mount the engine onto your Express pipeline. This instantly begins the data flow from your routes to the dashboard.
            </p>
            <CodeBlock 
              title="app.js"
              code={`import express from 'express';\nimport { <span class="text-on-primary-fixed-variant">init, middleware, metricsEndpoint</span> } from 'smartlogs';\n\nconst <span class="text-on-primary-fixed-variant">app</span> = express();\n\ninit();\napp.get('/metrics', metricsEndpoint());\napp.use(middleware());\n\napp.listen(<span class="text-secondary font-bold">5000</span>);`}
            />
          </div>
        </div>
      </section>

      <aside className="mt-32 p-10 bg-surface-container rounded-3xl border border-outline-variant/10 shadow-inner relative overflow-hidden group hover:border-primary/20 transition-colors">
        <div className="absolute top-[-20px] right-[-20px] opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
          <span className="material-symbols-outlined text-[180px] text-primary">analytics</span>
        </div>
        <div className="flex gap-6 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-3xl">lightbulb</span>
          </div>
          <div>
            <h4 className="font-bold text-on-surface mb-2 tracking-tight text-xl">Cloud Ready</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-lg">
              SmartLogs is designed to scale. Once your local stack is running, you can point any remote Node.js server to your Prometheus endpoint for unified cross-region monitoring.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
