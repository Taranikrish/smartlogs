import React from 'react';

const StrategyCard = ({ title, type, description, config }) => (
  <div className={`p-8 bg-surface-container rounded-2xl border border-outline-variant/10 transition-all hover:translate-x-1 ${type === 'danger' ? 'border-l-4 border-l-error' : 'border-l-4 border-l-secondary'}`}>
    <h3 className={`text-xl font-bold mb-3 tracking-tight ${type === 'danger' ? 'text-error' : 'text-secondary'}`}>{title}</h3>
    <p className="text-on-surface-variant text-sm mb-6 leading-relaxed font-medium">{description}</p>
    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/5 shadow-inner">
      <div className="text-[10px] text-outline uppercase font-bold mb-3 tracking-[0.15em]">Configuration Snippet</div>
      <pre className="text-xs font-mono text-primary leading-relaxed overflow-x-auto">
        {config}
      </pre>
    </div>
  </div>
);

export default function Installation() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4 font-bold text-[10px] uppercase tracking-[0.2em] text-outline">
          <span className="w-8 h-px bg-outline-variant/30"></span>
          Environment Setup
        </div>
        <h1 className="text-4xl font-bold text-on-surface mt-2 mb-6 tracking-tight">System Logistics</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed font-medium max-w-2xl">
          Guidelines for deploying the SmartLogs observability stack across different infrastructure tiers.
        </p>
      </header>

      <div className="mb-12 p-6 bg-surface-container-high/40 rounded-2xl border border-primary/20 flex flex-col md:flex-row items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary">terminal</span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-on-surface font-bold text-sm mb-1 uppercase tracking-widest">Global Requirement</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            The infrastructure stack is containerized. You must have <span className="text-secondary font-bold">Docker</span> and <span className="text-secondary font-bold">Docker Desktop</span> installed to deploy the dashboard.
          </p>
        </div>
        <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noreferrer" className="px-4 py-2 bg-surface-container-highest rounded-lg text-[10px] font-bold text-primary uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all">Get Docker</a>
      </div>

      <section className="space-y-16 pb-40">
        <div className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 relative overflow-hidden group shadow-xl">
          <div className="absolute top-0 right-0 p-8 text-primary opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none group-hover:rotate-12 duration-700">
            <span className="material-symbols-outlined text-[180px]">dns</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-6 relative z-10 tracking-tight">Local Deployment</h2>
          <p className="text-on-surface-variant mb-10 relative z-10 max-w-xl leading-relaxed font-medium">
            Spin up the core services using our containerized stack. This ensures all tools are correctly networked with pre-authenticated datasources.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm">
              <span className="text-primary font-black text-xl">9090</span>
              <p className="text-[10px] text-outline uppercase font-bold mt-2 tracking-widest">Prometheus</p>
            </div>
            <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm">
              <span className="text-secondary font-black text-xl">3058</span>
              <p className="text-[10px] text-outline uppercase font-bold mt-2 tracking-widest">Grafana UI</p>
            </div>
            <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm col-span-2 md:col-span-1">
              <span className="text-tertiary font-black text-xl">5000</span>
              <p className="text-[10px] text-outline uppercase font-bold mt-2 tracking-widest">Application</p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">Production Scaling</h2>
            <div className="flex-1 h-px bg-outline-variant/5"></div>
          </div>
          <p className="text-on-surface-variant max-w-2xl leading-relaxed">
            Choose the scraping strategy that best fits your cloud architecture. Security and network latency are the primary considerations.
          </p>
          
          <div className="grid gap-8">
            <StrategyCard 
              title="Internal Network Scrape"
              description="Recommended for apps and metrics engines on the same VPC. This keeps telemetry traffic entirely off the public internet."
              config={`scrape_configs:\n  - job_name: 'smartlogs-node'\n    static_configs:\n      - targets: ['10.0.0.12:5000']`}
            />

            <StrategyCard 
              title="Public Access Scrape"
              type="danger"
              description="Allows external monitoring engines to access your metrics. Warning: This requires strict IP whitelisting to prevent sensitive data leaks."
              config={`scrape_configs:\n  - job_name: 'external-monitoring'\n    static_configs:\n      - targets: ['api.smartlog.xyz']`}
            />
          </div>
        </div>

        <div className="p-10 bg-surface-container rounded-3xl border border-outline-variant/10 shadow-inner group">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <div>
              <h3 className="text-on-surface font-bold text-lg mb-2 tracking-tight">Security Hardening</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Before final deployment, ensure you have initialized your <code className="text-primary font-bold">.env</code> file. Do not commit sensitive environment variables to public history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
