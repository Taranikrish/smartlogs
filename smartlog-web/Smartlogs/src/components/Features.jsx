import React from 'react';

export default function Features() {
  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-24 border-b border-neutral-800">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Instant App Health</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">Zero-config CPU, Memory, and Uptime telemetry out of the box. Visualize exactly how your Node.js server breathes with no complex exporters required.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Bottleneck Profiler</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">Wrap any heavy code block with <code className="text-white bg-neutral-900 border border-neutral-800 font-mono px-1.5 py-0.5 rounded text-xs">trackPerformance()</code> to strictly track its 95th Percentile latency on the dashboard.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-3">"Pin-Point" Error Tracking</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">Auto-reverses stack traces to display the exact file and line number of every crash directly on Grafana incident response boards.</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Secure by Default</h3>
          <p className="text-neutral-400 text-sm leading-relaxed">Aggressively protects your application from memory-crashing Cardinality Explosions triggered by malicious bot network scanning.</p>
        </div>
      </div>
    </section>
  );
}
