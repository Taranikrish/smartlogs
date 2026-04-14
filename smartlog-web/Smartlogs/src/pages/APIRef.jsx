import React from 'react';

const CodeBlock = ({ code }) => (
  <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 my-4">
    <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed scrollbar-hide font-mono">
      <code className="text-secondary" dangerouslySetInnerHTML={{ __html: code }}></code>
    </pre>
  </div>
);

const APICard = ({ name, description, signature, params = [], usage, example }) => (
  <div className="bg-surface-container-low rounded-2xl border border-outline-variant/10 p-8 hover:bg-surface-container-high transition-all group border-l-4 border-l-transparent hover:border-l-primary mb-12 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-mono font-bold text-secondary group-hover:text-primary transition-colors">{name}</h3>
      <span className="text-[10px] bg-secondary-container/20 text-secondary px-2 py-0.5 rounded uppercase font-bold tracking-widest border border-secondary/20">Function</span>
    </div>
    <p className="text-on-surface-variant mb-6 text-base leading-relaxed font-medium transition-colors group-hover:text-on-surface">{description}</p>
    
    <div className="space-y-6">
      <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 transition-colors">
        <div className="text-[10px] text-outline uppercase font-bold mb-3 tracking-widest">Method Signature</div>
        <code className="text-sm font-mono text-primary flex flex-wrap gap-2">
          {signature}
        </code>
      </div>

      {params.length > 0 && (
        <div className="py-4 border-t border-outline-variant/10">
          <h4 className="text-[10px] uppercase tracking-widest text-outline font-bold mb-6">Parameter Schema</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {params.map(p => (
              <div key={p.name} className="flex flex-col gap-1.5 border-l-2 border-outline-variant/10 pl-4 py-1">
                <span className="text-sm font-mono text-tertiary-fixed font-bold">{p.name}</span>
                <span className="text-[10px] text-outline font-bold tracking-widest uppercase italic opacity-60">{p.type}</span>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-1 group-hover:text-on-surface-variant transition-colors">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {example && (
        <div className="py-4 border-t border-outline-variant/10">
          <h4 className="text-[10px] uppercase tracking-widest text-outline font-bold mb-4">Full Implementation Example</h4>
          <CodeBlock code={example} />
        </div>
      )}

      {usage && (
        <div className="mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <h4 className="text-[11px] uppercase tracking-widest text-primary font-bold mb-2 flex items-center gap-2">
             <span className="material-symbols-outlined text-sm">lightbulb</span> Architect's Note
          </h4>
          <p className="text-xs text-on-surface-variant italic leading-relaxed">{usage}</p>
        </div>
      )}
    </div>
  </div>
);

export default function APIRef() {
  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="mb-16">
        <span className="text-outline text-xs uppercase tracking-widest font-bold">Comprehensive Documentation</span>
        <h1 className="text-5xl font-bold text-on-surface mt-2 mb-6 tracking-tight">API Core Reference</h1>
        <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl font-medium">
          Behind the simplicity of SmartLog is a robust, production-grade telemetry engine. We've exposed the core primitives so you can customize your observability.
        </p>
      </header>

      <div className="space-y-4 pb-32">
        <APICard 
          name="init()"
          description="Initializes the SmartLogs monitoring engine and binds to default Node.js metrics like CPU percentage, Memory usage, and Event Loop lag."
          signature="init();"
          usage="Always call this at the very first line of your entry point (app.js or server.js) to ensure metrics collection starts before other modules load."
          example={`// Standard initialization\nimport { init } from 'smartlogs-client';\n\ninit();\n// Your app starts here...`}
        />

        <APICard 
          name="middleware()"
          description="Plug-and-play Express middleware. It captures request count, HTTP status codes, and P95 latency while protecting your app from memory leak exploits."
          signature="app.use(middleware());"
          usage="Place this after metricsEndpoint but before your routes. It handles all cardinality protection automatically."
          example={`// Mount as global middleware\nimport { middleware } from 'smartlogs-client';\n\napp.use(middleware());\n\napp.get('/api/users', (req, res) => { ... });`}
        />

        <APICard 
          name="trackPerformance()"
          description="Measures the execution time of any asynchronous operation and tags it with the caller's file and line number context."
          signature="await trackPerformance(name: string, asyncFunction: Function)"
          params={[
            { name: 'name', type: 'String', desc: 'A label for the metric (e.g., db_query).' },
            { name: 'asyncFunction', type: 'Function', desc: 'The async code to measure.' }
          ]}
          usage="Ideal for database queries, external API calls, or complex calculations that occur inside a route."
          example={`// Profile a slow API call\nconst profile = await trackPerformance('auth0_login', async () => {\n  return await authClient.authorize(user);\n});`}
        />

        <APICard 
          name="logError()"
          description="Logs structured exceptions and records full stack trace visibility. Reverse-engineers the error's source to show you app.js:102 on Grafana."
          signature="logError(error: Error, meta: { route: string })"
          params={[
            { name: 'error', type: 'Error', desc: 'The caught exception.' },
            { name: 'meta.route', type: 'String', desc: 'The route or controller name.' }
          ]}
          usage="Use inside catch blocks to track incident counts and crash locations for your on-call team."
          example={`try {\n  await paymentProcessor();\n} catch (err) {\n  logError(err, { route: '/checkout' });\n  res.status(500).send('Critical Error');\n}`}
        />

        <APICard 
          name="trackFailure()"
          description="Records valid logic failures (like wrong passwords) that don't crash the server but indicate user-experience friction."
          signature="trackFailure({ route: string, reason: string, severity: 'low'|'med'|'high' })"
          params={[
            { name: 'route', type: 'String', desc: 'Context of the failure.' },
            { name: 'reason', type: 'String', desc: 'The failure slug (e.g., auth_failure).' },
            { name: 'severity', type: 'String', desc: 'Impact level for alerting.' }
          ]}
          usage="Use this to monitor security threats or high validation-fail rates on critical forms."
          example={`if (!validPass) {\n  trackFailure({ \n    route: '/login', \n    reason: 'invalid_credentials', \n    severity: 'low' \n  });\n}`}
        />
      </div>
    </div>
  );
}
