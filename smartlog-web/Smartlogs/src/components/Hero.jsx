import React from 'react';

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center border-b border-neutral-800">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 text-xs mb-8">
        Smartlogs Node Client v1.0.0
      </div>
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white mb-6">
        Node.js monitoring, <br className="hidden md:block" />
        <span className="text-neutral-500">without the configuration.</span>
      </h1>
      <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Deploy a professional-grade Prometheus and Grafana stack in 60 seconds. Connect your Express application with a single line of code.
      </p>
      <div className="flex justify-center gap-4 mb-20">
        <a href="#docs" className="h-10 px-6 rounded-md bg-white text-black font-medium flex items-center justify-center hover:bg-neutral-200 transition-colors text-sm">
          Documentation
        </a>
        <a href="https://github.com/Taranikrish/smartlogs" className="h-10 px-6 rounded-md border border-neutral-800 bg-[#0a0a0a] text-white font-medium flex items-center justify-center hover:bg-neutral-900 transition-colors text-sm">
          View on GitHub
        </a>
      </div>
      
      {/* 
         USER INSTRUCTION: 
         Add a screenshot of your Grafana dashboard. 
         Place your image file inside the 'public' folder as 'dashboard.png'.
      */}
      <div className="relative rounded-xl border border-neutral-800 bg-neutral-900 aspect-video overflow-hidden mt-8">
        <img 
          src="/dashboard.png" 
          alt="Grafana Dashboard Preview" 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 flex-col items-center justify-center text-neutral-500 hidden">
          <p className="font-mono text-sm mb-2 text-white">Missing Dashboard Image</p>
          <p className="text-xs">Drag and drop your Grafana screenshot into `public/dashboard.png`</p>
        </div>
      </div>
    </section>
  );
}
