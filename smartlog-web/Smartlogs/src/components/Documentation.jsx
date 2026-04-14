import React from 'react';
import CodeBlock from './CodeBlock';

export default function Documentation() {
  return (
    <section id="docs" className="max-w-3xl mx-auto px-6 py-24">
      <h2 className="text-2xl font-semibold tracking-tight text-white mb-8">Installation Guide</h2>
      
      <div className="mb-12">
        <h3 className="text-base font-medium text-white mb-2">1. Deploy the Arsenal (Dashboard)</h3>
        <p className="text-sm text-neutral-400 mb-4">Before writing Node.js code, spin up our pre-configured Docker stack. This contains Prometheus and Grafana connected out of the box.</p>
        <CodeBlock 
          language="bash" 
          code={`git clone https://github.com/Taranikrish/smartlogs.git\ncd smartlogs\ncp .env.example .env\ndocker-compose up -d`}
        />
      </div>

      <div className="mb-12">
        <h3 className="text-base font-medium text-white mb-2">2. Install the Package</h3>
        <p className="text-sm text-neutral-400 mb-4">Inside your fresh or existing Node.js Express application, install our NPM client wrapper.</p>
        <CodeBlock language="bash" code={`npm install smartlogs-client`} />
      </div>

      <div className="mb-16">
        <h3 className="text-base font-medium text-white mb-2">3. Initialize the Engine</h3>
        <p className="text-sm text-neutral-400 mb-4">Hook SmartLogs into your Express pipeline. We will instantly begin tracking and exporting data.</p>
        <CodeBlock 
          language="javascript" 
          code={`import express from 'express';\nimport { init, middleware, metricsEndpoint } from 'smartlogs-client';\n\nconst app = express();\n\n// Initialize engine & expose /metrics\ninit();\napp.get('/metrics', metricsEndpoint());\n\n// Track all downstream routes\napp.use(middleware());\n\napp.get('/', (req, res) => res.send('Monitoring is live!'));\napp.listen(5000);`} 
        />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-white mb-8 border-t border-neutral-800 pt-16">API Reference</h2>
      
      <div className="mb-12">
        <h3 className="text-base font-mono text-white mb-2">trackPerformance()</h3>
        <p className="text-sm text-neutral-400 mb-4">A highly optimized bottleneck profiler. Tracks exactly how long a block of code took resolving down to the millisecond, and automatically captures the exact file and line number.</p>
        <CodeBlock language="javascript" code={`import { trackPerformance } from 'smartlogs-client';\n\napp.get('/heavy-task', async (req, res) => {\n  const data = await trackPerformance('db_query', async () => {\n      return await db.query('SELECT * FROM users');\n  });\n  res.json(data);\n});`} />
      </div>

      <div className="mb-12">
        <h3 className="text-base font-mono text-white mb-2">logError()</h3>
        <p className="text-sm text-neutral-400 mb-4">Manually logs structured application crashes and exceptions. Reverse-engineers the error's stack trace to extract the exact file name and line number instantly.</p>
        <CodeBlock language="javascript" code={`import { logError } from 'smartlogs-client';\n\ntry {\n  await processPayment();\n} catch (err) {\n  logError(err, { route: '/checkout' });\n}`} />
      </div>
    </section>
  );
}
