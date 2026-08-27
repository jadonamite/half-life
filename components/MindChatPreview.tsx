'use client';

import React, { useState } from 'react';
import { FatigueReport } from '@/lib/types';

interface Props {
  reports: FatigueReport[];
}

export function MindChatPreview({ reports }: Props) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'mind'; text: string; time: string }>>([
    {
      sender: 'user',
      text: 'How is my System Architecture Deep-Dives format holding up this month?',
      time: '10:14 AM',
    },
    {
      sender: 'mind',
      text: "Your 'System Architecture Deep-Dives' format is healthy (5.3% engagement vs baseline 5.2%). Trailing decay is +1.5% (steady/growth). You have 6 healthy posts recorded across sessions.",
      time: '10:14 AM',
    },
    {
      sender: 'user',
      text: 'What about Quick Opinion Hot Takes?',
      time: '10:15 AM',
    },
    {
      sender: 'mind',
      text: "⚠️ Fatigue Alert: 'Quick Opinion Hot Takes' engagement has dropped 41.5% below baseline (3.8% vs 6.5%). Exponential half-life: ~3 posts remaining before terminal fatigue. I recommend rotating to a technical breakdown or pausing this format for 30 days.",
      time: '10:15 AM',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [thinking, setThinking] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || thinking) return;

    const userText = inputQuery.trim();
    setInputQuery('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);

    setThinking(true);

    try {
      // Fetch fresh audit report
      const res = await fetch('/api/format/audit?creatorId=jadoncreator');
      const data = await res.json();

      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('all') || lower.includes('portfolio') || lower.includes('summary')) {
        reply = data.portfolioSummary;
      } else if (lower.includes('podcast') || lower.includes('clip')) {
        const podReport = data.reports.find((r: any) => r.formatId.includes('pod'));
        reply = podReport ? podReport.plainNarrative : "Format is in PROBATION. Need 5 posts for baseline.";
      } else if (lower.includes('hot') || lower.includes('opinion')) {
        const hotReport = data.reports.find((r: any) => r.formatId.includes('hot'));
        reply = hotReport ? hotReport.plainNarrative : "Format not found.";
      } else if (lower.includes('deep') || lower.includes('architecture')) {
        const deepReport = data.reports.find((r: any) => r.formatId.includes('deep'));
        reply = deepReport ? deepReport.plainNarrative : "Format is healthy.";
      } else {
        reply = `I have audited your active formats from cross-session memory: ${data.portfolioSummary}`;
      }

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'mind', text: reply, time: 'Just now' },
        ]);
        setThinking(false);
      }, 500);
    } catch {
      setThinking(false);
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div>
          <div className="text-[10px] font-mono uppercase text-muted">Minds Skill: The Half-Life</div>
          <h2 className="text-xl font-serif text-ink mt-0.5">Conversational Mind Narration</h2>
        </div>
        <span className="text-xs font-mono text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/30">
          ● Agent Online: JadonCreator
        </span>
      </div>

      <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[11px] font-mono text-muted">
              <span>{m.sender === 'user' ? 'You' : 'JadonCreator (Mind)'}</span>
              <span>•</span>
              <span>{m.time}</span>
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-sans leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-accent/15 text-ink border border-accent/30 rounded-tr-none'
                  : 'bg-surface text-ink/90 border border-border rounded-tl-none font-mono text-xs'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span className="animate-spin">⏳</span>
            <span>JadonCreator reading cross-session format memory...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Ask JadonCreator: 'What is my current portfolio health?'"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="flex-1 rounded-xl bg-surface border border-border px-4 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={thinking || !inputQuery.trim()}
          className="rounded-xl bg-accent px-5 py-2.5 text-xs font-mono font-semibold text-paper hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          Ask Mind →
        </button>
      </form>
    </div>
  );
}
