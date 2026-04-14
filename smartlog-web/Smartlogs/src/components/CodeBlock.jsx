import React, { useState } from 'react';

export default function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg overflow-hidden border border-neutral-800 bg-[#0a0a0a] my-4 group">
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/50">
        <span className="text-xs text-neutral-400 font-mono">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-[13px] font-mono text-neutral-300 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
