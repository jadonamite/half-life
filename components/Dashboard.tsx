'use client';

import React, { useState, useEffect } from 'react';
import { ContentFormat, FatigueReport, ProactiveAlert } from '@/lib/types';

export default function Dashboard() {
  const [formats, setFormats] = useState<ContentFormat[]>([]);
  const [reports, setReports] = useState<FatigueReport[]>([]);
  const [alerts, setAlerts] = useState<ProactiveAlert[]>([]);
  const [selectedFormatId, setSelectedFormatId] = useState<string>('fmt-hottakes');
  const [postTitle, setPostTitle] = useState('');
  const [impressions, setImpressions] = useState('15000');
  const [engagements, setEngagements] = useState('570');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Chat preview state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'mind'; text: string; time: string }>>([
    {
      sender: 'user',
      text: 'What is the current health of my Quick Opinion Hot Takes format?',
      time: '10:14 AM',
    },
    {
      sender: 'mind',
      text: "⚠️ Fatigue Alert: 'Quick Opinion Hot Takes' engagement has dropped 41.5% below baseline (3.8% vs 6.5%). Exponential half-life: ~3 posts remaining before terminal decay. Recommendation: Rotate or pause this format for 30 days.",
      time: '10:14 AM',
    },
  ]);
  const [chatQuery, setChatQuery] = useState('');
  const [chatThinking, setChatThinking] = useState(false);

  const fetchData = async () => {
    try {
      const fmtRes = await fetch('/api/format/list?creatorId=jadoncreator');
      const fmtData = await fmtRes.json();
      if (fmtData.success) {
        setFormats(fmtData.formats);
      }

      const auditRes = await fetch('/api/format/audit?creatorId=jadoncreator');
      const auditData = await auditRes.json();
      if (auditData.success) {
        setReports(auditData.reports);
      }

      const alertRes = await fetch('/api/alerts/pending?creatorId=jadoncreator');
      const alertData = await alertRes.json();
      if (alertData.success) {
        setAlerts(alertData.alerts);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePreset = async (type: 'healthy' | 'fatigue' | 'viral') => {
    const format = formats.find((f) => f.id === selectedFormatId);
    if (!format) return;

    let imp = 15000;
    let eng = 750;

    if (type === 'healthy') {
      imp = 16000;
      eng = Math.round(imp * (format.baselineEngagementRate || 0.052));
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
    await submitPost(selectedFormatId, postTitle || 'Interactive Post Injection', imp, eng);
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
        setFeedback(`✓ Ingested: ${title} (${((eng / imp) * 100).toFixed(1)}% rate). Format '${data.formatUpdated.name}' status: ${data.formatUpdated.status}`);
        await fetchData();
      } else {
        setFeedback(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setFeedback(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      await fetch('/api/alerts/acknowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery.trim() || chatThinking) return;

    const userText = chatQuery.trim();
    setChatQuery('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText, time: 'Just now' },
    ]);

    setChatThinking(true);

    try {
      const res = await fetch('/api/format/audit?creatorId=jadoncreator');
      const data = await res.json();
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('all') || lower.includes('portfolio') || lower.includes('summary')) {
        reply = data.portfolioSummary;
      } else if (lower.includes('podcast') || lower.includes('clip')) {
        const podReport = data.reports.find((r: any) => r.formatId.includes('pod'));
        reply = podReport ? podReport.plainNarrative : 'Format is in PROBATION. Need 5 posts for baseline.';
      } else if (lower.includes('hot') || lower.includes('opinion')) {
        const hotReport = data.reports.find((r: any) => r.formatId.includes('hot'));
        reply = hotReport ? hotReport.plainNarrative : 'Format not found.';
      } else if (lower.includes('deep') || lower.includes('architecture')) {
        const deepReport = data.reports.find((r: any) => r.formatId.includes('deep'));
        reply = deepReport ? deepReport.plainNarrative : 'Format is healthy.';
      } else {
        reply = `Cross-session memory audit: ${data.portfolioSummary}`;
      }

      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'mind', text: reply, time: 'Just now' },
        ]);
        setChatThinking(false);
      }, 400);
    } catch {
      setChatThinking(false);
    }
  };

  return (
    <div className="bg-paper p-8 lg:p-12 w-full text-ink">
      <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
        <div>
          <div className="text-accent text-[13px] font-semibold uppercase tracking-wide mb-1">
            Live Minds AI Decay Engine
          </div>
          <h2 className="text-3xl font-medium m-0">
            Creator Fatigue Intelligence Console
          </h2>
        </div>
        <div className="flex gap-2">
          <span className="bg-paper-2 border border-hairline text-ink-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
            Minds Agent: Halflife
          </span>
          <span className="bg-accent-3 border border-accent-2 text-accent px-3 py-1 rounded-full text-xs font-medium tracking-wide">
            Audience Growth
          </span>
        </div>
      </div>

      <div className="mb-12">
        <div className="text-ink-3 text-xs uppercase tracking-wider font-semibold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent" />
          Cross-Session Format Memory ({reports.length} Active)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r) => {
            const isProbation = r.status === 'PROBATION';
            const isFatiguing = r.status === 'FATIGUING' || r.status === 'DECAYED';
            return (
              <div key={r.formatId} className={`bg-card-raised rounded-card p-6 border ${isFatiguing ? 'border-[#FCA5A5]' : 'border-hairline'} shadow-sm relative overflow-hidden`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[11px] text-ink-3 uppercase tracking-wider font-mono mb-1">{r.archetype}</div>
                    <h3 className="text-[22px] font-medium leading-tight">{r.formatName}</h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${
                    isProbation ? 'bg-paper-2 text-ink-2 border-hairline' :
                    isFatiguing ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]' :
                    'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                  }`}>
                    {r.status}
                  </span>
                </div>

                {isProbation ? (
                  <p className="text-ink-2 text-sm mt-4">
                    {r.postCount}/5 baseline posts. Fatigue analysis paused for calibration.
                  </p>
                ) : (
                  <div>
                    <div className="grid grid-cols-3 gap-3 my-4 bg-paper p-3 rounded-lg border border-hairline">
                      <div>
                        <div className="text-[10px] text-ink-3 uppercase tracking-wide">Baseline</div>
                        <div className="text-sm font-bold font-mono">{(r.baselineRate * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-ink-3 uppercase tracking-wide">Trailing</div>
                        <div className="text-sm font-bold font-mono">{(r.trailingRate * 100).toFixed(1)}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-ink-3 uppercase tracking-wide">Decay Δ</div>
                        <div className={`text-sm font-bold font-mono ${r.decayPercentage >= 0 ? 'text-[#16A34A]' : isFatiguing ? 'text-[#DC2626]' : 'text-ink'}`}>
                          {r.decayPercentage >= 0 ? '+' : ''}{r.decayPercentage}%
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-ink-2">Runway to 50%:</span>
                      <span className="font-mono font-medium">
                        {r.halfLifePostsRemaining !== null ? `~${r.halfLifePostsRemaining} posts` : 'Stable'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-card-raised border border-hairline rounded-panel p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-medium">Inject Post Metrics</h3>
            <div className="flex gap-2">
              <button onClick={() => handlePreset('healthy')} disabled={loading} className="px-3 py-1 text-xs border border-hairline rounded-full hover:bg-paper transition-colors text-[#16A34A]">
                + Healthy
              </button>
              <button onClick={() => handlePreset('fatigue')} disabled={loading} className="px-3 py-1 text-xs border border-hairline rounded-full hover:bg-paper transition-colors text-[#DC2626]">
                - Fatigue
              </button>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-ink-2 uppercase tracking-wide mb-2">Select Format</label>
              <select value={selectedFormatId} onChange={(e) => setSelectedFormatId(e.target.value)} className="w-full bg-paper border border-hairline rounded-pill px-4 py-3 text-sm outline-none focus:border-accent">
                {formats.map((f) => (
                  <option key={f.id} value={f.id}>{f.name} ({f.status})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-2 uppercase tracking-wide mb-2">Impressions</label>
                <input type="number" value={impressions} onChange={(e) => setImpressions(e.target.value)} className="w-full bg-paper border border-hairline rounded-pill px-4 py-3 text-sm outline-none focus:border-accent" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-2 uppercase tracking-wide mb-2">Engagements</label>
                <input type="number" value={engagements} onChange={(e) => setEngagements(e.target.value)} className="w-full bg-paper border border-hairline rounded-pill px-4 py-3 text-sm outline-none focus:border-accent" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="mt-2 bg-pill text-white rounded-pill px-6 py-3 font-medium flex items-center justify-center gap-3 hover:-translate-y-[1px] transition-transform w-full">
              <span className="w-6 h-6 bg-accent rounded-chip flex items-center justify-center text-sm">›</span>
              {loading ? 'Evaluating...' : 'Ingest & Recalibrate'}
            </button>
          </form>

          {feedback && (
            <div className="mt-5 bg-paper p-4 rounded-xl text-sm font-mono border border-hairline text-ink-2">
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-card-raised border border-hairline rounded-panel p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-medium">Autonomous Alert Dispatch</h3>
            <span className="text-xs font-mono font-bold text-[#DC2626]">{alerts.length} Pending</span>
          </div>

          {alerts.length === 0 ? (
            <div className="p-8 text-center text-ink-3 text-sm border border-dashed border-hairline rounded-2xl bg-paper">
              ✓ All monitored formats within safe decay bounds.
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2">
              {alerts.map((a) => (
                <div key={a.id} className="p-5 bg-[#FEF2F2] border border-[#FECACA] rounded-2xl relative">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-[#DC2626] font-mono uppercase">
                      ⚠️ {a.severity} FATIGUE ALERT
                    </span>
                    <button onClick={() => handleAcknowledge(a.id)} className="text-xs font-medium text-ink-2 hover:text-ink underline">
                      Dismiss
                    </button>
                  </div>
                  <p className="text-sm text-ink leading-relaxed">
                    {a.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
