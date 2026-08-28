'use client';

import React, { useState } from 'react';

export default function TerminalPreview() {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'What is the current health of my Quick Opinion Hot Takes format?'
    },
    {
      sender: 'mind',
      text: "⚠️ Fatigue Alert: 'Quick Opinion Hot Takes' engagement has dropped 41.5% below baseline. Exponential half-life: ~3 posts remaining before terminal decay. Recommendation: Rotate or pause this format for 30 days."
    }
  ]);
  const [query, setQuery] = useState('');
  const [thinking, setThinking] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setQuery('');
    setThinking(true);
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'mind', text: 'Analyzing cross-session memory... format metrics stable.' }
      ]);
      setThinking(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-card shadow-float border border-hairline overflow-hidden my-16">
      <div className="flex items-center justify-between p-4 border-b border-hairline bg-paper-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-ink-3 rounded-full" />
          <span className="text-sm font-medium text-ink-2">Minds Terminal — Halflife Agent</span>
        </div>
        <div className="flex gap-1">
          <span className="w-[10px] h-[10px] bg-accent rounded-chip opacity-30" />
          <span className="w-[10px] h-[10px] bg-accent rounded-chip opacity-60" />
          <span className="w-[10px] h-[10px] bg-accent rounded-chip" />
        </div>
      </div>
      
      <div className="p-6 h-64 overflow-y-auto flex flex-col gap-4 bg-paper">
        {messages.map((m, i) => (
          <div 
            key={i}
            className={`max-w-[85%] p-4 rounded-xl text-[15px] ${
              m.sender === 'user' 
                ? 'bg-white border border-hairline self-end text-ink' 
                : 'bg-accent-3 border border-accent-2 self-start text-ink font-mono text-sm'
            }`}
          >
            {m.text}
          </div>
        ))}
        {thinking && (
          <div className="self-start text-sm text-ink-3 italic font-mono animate-pulse">
            Halflife is typing...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-hairline bg-white flex gap-3">
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask Halflife..."
          className="flex-1 bg-paper border border-hairline rounded-pill px-4 py-2 text-ink outline-none focus:border-accent transition-colors"
        />
        <button type="submit" disabled={thinking} className="bg-pill text-white px-5 py-2 rounded-pill font-medium flex items-center gap-2 hover:-translate-y-[1px] transition-transform">
          <span className="w-5 h-5 bg-accent rounded-chip flex items-center justify-center text-xs ml-[-8px]">›</span>
          Send
        </button>
      </form>
    </div>
  );
}
