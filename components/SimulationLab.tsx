'use client';

import React, { useState } from 'react';
import { ContentFormat, FatigueReport } from '@/lib/types';

interface Props {
  formats: ContentFormat[];
  reports: FatigueReport[];
  onDataChanged: () => void;
}

export function SimulationLab({ formats, reports, onDataChanged }: Props) {
  const [selectedFormatId, setSelectedFormatId] = useState<string>(formats[0]?.id || 'fmt-hottakes');
  const [postTitle, setPostTitle] = useState('');
  const [impressions, setImpressions] = useState('15000');
  const [engagements, setEngagements] = useState('500');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Quick preset triggers
  const handlePreset = async (type: 'healthy' | 'fatigue' | 'viral') => {
    const format = formats.find((f) => f.id === selectedFormatId);
    if (!format) return;

    let imp = 15000;
    let eng = 750; // 5.0%

    if (type === 'healthy') {
      imp = 16000;
      eng = Math.round(imp * (format.baselineEngagementRate || 0.05));
    } else if (type === 'fatigue') {
      imp = 15000;
      eng = Math.round(imp * (format.baselineEngagementRate ? format.baselineEngagementRate * 0.45 : 0.025));
    } else if (type === 'viral') {
      imp = 30000;
      eng = Math.round(imp * (format.baselineEngagementRate ? format.baselineEngagementRate * 1.5 : 0.08));
    }

    await submitPost(format.id, `Simulated ${type.toUpperCase()} Post #${Date.now().toString().slice(-4)}`, imp, eng);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imp = parseInt(impressions);
    const eng = parseInt(engagements);
    if (!selectedFormatId || isNaN(imp) || isNaN(eng)) return;
    await submitPost(selectedFormatId, postTitle || 'Interactive Simulation Post', imp, eng);
  };

  const submitPost = async (fmtId: string, title: string, imp: number, eng: number) => {
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch('/api/post/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formatId: fmtId,
          creatorId: 'jadoncreator',
          title,
          impressions: imp,
          engagements: eng,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback(`✓ Ingested: ${title} (${((eng / imp) * 100).toFixed(1)}% rate). Recalibrated format '${data.formatUpdated.name}' → Status: ${data.formatUpdated.status}`);
        onDataChanged();
      } else {
        setFeedback(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setFeedback(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-accent/10 text-accent border border-accent/20">
            Interactive Test Harness
          </div>
          <h2 className="text-2xl font-serif text-ink mt-1">Decay Simulation Lab</h2>
          <p className="text-xs text-muted mt-0.5">
            Inject synthetic post performance directly into the decay engine to observe real-time health recalibration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePreset('healthy')}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-surface text-xs font-mono text-success border border-border hover:border-success/50 transition-colors disabled:opacity-50"
          >
            + Healthy Post
          </button>
          <button
            onClick={() => handlePreset('fatigue')}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-surface text-xs font-mono text-warning border border-border hover:border-warning/50 transition-colors disabled:opacity-50"
          >
            - Fatigue Drop
          </button>
        </div>
      </div>

      <form onSubmit={handleManualSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-[11px] font-mono uppercase text-muted mb-1.5">Target Format</label>
          <select
            value={selectedFormatId}
            onChange={(e) => setSelectedFormatId(e.target.value)}
            className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none"
          >
            {formats.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.status})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono uppercase text-muted mb-1.5">Post Title (Optional)</label>
          <input
            type="text"
            placeholder="e.g. My new hook format test"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-ink placeholder:text-muted/40 focus:border-accent focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-mono uppercase text-muted mb-1.5">Views / Imp</label>
            <input
              type="number"
              value={impressions}
              onChange={(e) => setImpressions(e.target.value)}
              className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase text-muted mb-1.5">Engagements</label>
            <input
              type="number"
              value={engagements}
              onChange={(e) => setEngagements(e.target.value)}
              className="w-full rounded-xl bg-surface border border-border px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent text-paper font-mono text-xs font-semibold py-2.5 px-4 hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Evaluating...' : 'Ingest & Recalibrate →'}
          </button>
        </div>
      </form>

      {feedback && (
        <div className="mt-4 p-3 rounded-xl bg-surface border border-border text-xs font-mono text-ink">
          {feedback}
        </div>
      )}
    </div>
  );
}
