import React from 'react';

const CodeBlock = ({ title, code }) => (
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
    <pre className="p-6 overflow-x-auto text-sm leading-relaxed scrollbar-hide font-mono">
      <code className="text-secondary" dangerouslySetInnerHTML={{ __html: code }}></code>
    </pre>
  </div>
);

export default function GetStarted() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <div className="flex items-center gap-2 mb-4 font-bold text-[10px] uppercase tracking-[0.2em] text-outline">
          <span className="w-8 h-px bg-outline-variant/30"></span>
          Hands-on Guide
        </div>
        <h1 className="text-4xl font-bold text-on-surface mt-2 mb-6 tracking-tight">Instrument a Todo API</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed font-medium max-w-2xl">
          Learn how to implement high-fidelity tracking in a real project. We'll build a simple API and see how SmartLogs captures performance data and logic faults.
        </p>
      </header>

      <section className="space-y-20 pb-40">
        <div className="group">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary font-black text-lg opacity-20 group-hover:opacity-100 transition-opacity">01</span>
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">Initial Setup</h2>
          </div>
          <p className="text-on-surface-variant mb-6 leading-relaxed max-w-xl">
            Prepare your project environment and pull the required dependencies from NPM.
          </p>
          <CodeBlock 
            title="Terminal"
            code={`mkdir todo-api\ncd todo-api\nnpm init -y\nnpm install express smartlogs`}
          />
        </div>

        <div className="group">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-primary font-black text-lg opacity-20 group-hover:opacity-100 transition-opacity">02</span>
            <h2 className="text-2xl font-bold text-on-surface tracking-tight">The Monitored Server</h2>
          </div>
          <p className="text-on-surface-variant mb-4 leading-relaxed max-w-xl">
            Configure your Express application to utilize the SmartLogs telemetry engine. Ensure you are using ES modules.
          </p>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl mb-6 flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-sm">info</span>
             <p className="text-xs text-on-surface-variant italic font-medium">Add <code className="bg-surface-container-highest px-1.5 rounded text-secondary">"type": "module"</code> to your package.json</p>
          </div>
          <CodeBlock 
            title="app.js"
            code={`import express from 'express';\nimport { init, middleware, metricsEndpoint, trackPerformance, trackFailure } from 'smartlogs';\n\nconst app = express();\napp.use(express.json());\n\n<span class="text-outline">// Initialize telemetry</span>\ninit();\napp.get('/metrics', metricsEndpoint());\n\n<span class="text-outline">// Start traffic tracking</span>\napp.use(middleware());\n\nlet todos = [];\n\n<span class="text-outline">// Profile performance</span>\napp.get('/todos', async (req, res) => {\n  const results = await trackPerformance('fetch_todos', async () => {\n    await new Promise(r => setTimeout(r, 100)); // Simulate DB latency\n    return todos;\n  });\n  res.json(results);\n});\n\n<span class="text-outline">// Track logical failures</span>\napp.post('/todos', (req, res) => {\n  const { task } = req.body;\n  if (!task) {\n    trackFailure({ route: '/todos', reason: 'empty_task', severity: 'low' });\n    return res.status(400).send('Task is required');\n  }\n  todos.push({ id: Date.now(), task });\n  res.status(201).json({ message: 'Todo added' });\n});\n\napp.listen(5000);`}
          />
        </div>

        <div className="bg-surface-container rounded-3xl p-10 border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-primary opacity-5 group-hover:opacity-10 transition-all pointer-events-none group-hover:scale-110">
            <span className="material-symbols-outlined text-[140px]">visibility</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-on-surface mb-6 tracking-tight">Verification</h3>
            <div className="space-y-6 max-w-xl">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-sm">check</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed transition-colors group-hover:text-on-surface">
                  Visit <span className="text-primary font-bold">localhost:3058</span> to access the live dashboard.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-sm">check</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed transition-colors group-hover:text-on-surface">
                   Performance metrics for <span className="text-primary font-bold">fetch_todos</span> will appear in the Function Performance table.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-sm">check</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed transition-colors group-hover:text-on-surface">
                   Trigger a validation error to see <span className="text-primary font-bold">empty_task</span> populate the Logic Failures panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
