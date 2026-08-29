'use client';

import React, { useState } from 'react';
import { Lightning, PaperPlaneRight } from '@phosphor-icons/react';
import { PillButton } from '@/components/Pill';

export default function ChatPreview() {
  const [messages, setMessages] = useState([
    {
      sender: 'user',
      text: 'What is the current health of my "Quick Opinion Hot Takes" format?'
    },
    {
      sender: 'mind',
      text: "⚠️ Fatigue Alert: 'Quick Opinion Hot Takes' engagement has dropped 41.5% below baseline. Exponential half-life: ~3 posts remaining before terminal decay. \n\nRecommendation: Rotate or pause this format for 30 days."
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
        { sender: 'mind', text: 'Analyzing cross-session memory... format metrics are stable across the past 5 posts.' }
      ]);
      setThinking(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl overflow-hidden relative" style={{
      background: 'rgba(255,255,255,0.4)',
      backdropFilter: 'blur(40px)',
      border: '1px solid rgba(255,255,255,0.6)',
      boxShadow: '0 24px 48px -12px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/40 bg-white/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-ink flex items-center justify-center text-white">
            <Lightning weight="bold" />
          </div>
          <span className="text-sm font-semibold text-ink tracking-tight">Halflife Engine</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
        </div>
      </div>
      
      {/* Messages */}
      <div className="p-6 h-80 overflow-y-auto flex flex-col gap-5 bg-gradient-to-b from-transparent to-white/10">
        {messages.map((m, i) => (
          <div 
            key={i}
            className={`max-w-[85%] p-4 rounded-2xl text-[14px] shadow-sm ${
              m.sender === 'user' 
                ? 'bg-white text-ink self-end rounded-tr-sm border border-white' 
                : 'bg-ink text-white self-start rounded-tl-sm border border-black/80 font-mono text-sm leading-relaxed whitespace-pre-wrap'
            }`}
          >
            {m.text}
          </div>
        ))}
        {thinking && (
          <div className="self-start text-sm text-ink-3 italic font-mono animate-pulse bg-white/50 px-4 py-2 rounded-xl">
            Processing telemetry...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/40 bg-white/50 flex gap-3 items-center backdrop-blur-md">
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Ask Halflife for an audit..."
          className="flex-1 bg-white/80 border border-white rounded-full px-5 py-3 text-sm text-ink outline-none focus:border-accent transition-colors shadow-inner"
        />
        <PillButton type="submit" disabled={thinking} mark={<PaperPlaneRight weight="fill" />}>Send</PillButton>
      </form>
    </div>
  );
}
