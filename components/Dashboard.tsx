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
    <div className="dashboard-embed" style={{ padding: '2.5rem 1.75rem 3rem' }}>
      {/* Top Bar matching Advance Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-dim)', fontWeight: 600 }}>
            Live Minds AI Decay Engine
          </span>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.25rem 0 0', color: 'var(--text-main)' }}>
            Creator Fatigue Intelligence Console
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-minds">Minds Agent: JadonCreator</span>
          <span className="badge badge-live">Audience Growth</span>
        </div>
      </div>

      {/* Grid 1: Monitored Formats Cards */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600 }}>
          Cross-Session Format Memory ({reports.length} Active)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {reports.map((r) => {
            const isProbation = r.status === 'PROBATION';
            const isFatiguing = r.status === 'FATIGUING' || r.status === 'DECAYED';
            return (
              <div key={r.formatId} className="card" style={{ borderColor: isFatiguing ? 'var(--accent-amber)' : 'var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {r.archetype}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', margin: '0.1rem 0' }}>
                      {r.formatName}
                    </h3>
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      backgroundColor: isProbation
                        ? 'rgba(148, 163, 184, 0.15)'
                        : isFatiguing
                        ? 'rgba(245, 158, 11, 0.15)'
                        : 'rgba(16, 185, 129, 0.15)',
                      color: isProbation
                        ? 'var(--text-muted)'
                        : isFatiguing
                        ? 'var(--accent-amber)'
                        : 'var(--accent-emerald)',
                      border: `1px solid ${
                        isProbation
                          ? 'rgba(148, 163, 184, 0.3)'
                          : isFatiguing
                          ? 'rgba(245, 158, 11, 0.4)'
                          : 'rgba(16, 185, 129, 0.3)'
                      }`,
                    }}
                  >
                    {r.status}
                  </span>
                </div>

                {isProbation ? (
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                    {r.postCount}/5 baseline posts. Fatigue analysis paused for calibration.
                  </p>
                ) : (
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', margin: '0.75rem 0', background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>BASELINE</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                          {(r.baselineRate * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>TRAILING</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                          {(r.trailingRate * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>DECAY Δ</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: r.decayPercentage >= 0 ? 'var(--accent-emerald)' : isFatiguing ? 'var(--accent-amber)' : 'var(--text-main)' }}>
                          {r.decayPercentage >= 0 ? '+' : ''}{r.decayPercentage}%
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      <span>Runway to 50%:</span>
                      <span style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
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

      {/* Grid 2: Simulator + Proactive Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Simulation Injection */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              Inject Post Metrics
            </h3>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                onClick={() => handlePreset('healthy')}
                disabled={loading}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--accent-emerald)' }}
              >
                + Healthy
              </button>
              <button
                onClick={() => handlePreset('fatigue')}
                disabled={loading}
                className="btn btn-secondary"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--accent-amber)' }}
              >
                - Fatigue
              </button>
            </div>
          </div>

          <form onSubmit={handleManualSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.25rem' }}>
                Select Format
              </label>
              <select
                value={selectedFormatId}
                onChange={(e) => setSelectedFormatId(e.target.value)}
                className="input-field"
              >
                {formats.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.status})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.25rem' }}>
                  Impressions
                </label>
                <input
                  type="number"
                  value={impressions}
                  onChange={(e) => setImpressions(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.25rem' }}>
                  Engagements
                </label>
                <input
                  type="number"
                  value={engagements}
                  onChange={(e) => setEngagements(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
              {loading ? 'Evaluating...' : 'Ingest & Recalibrate →'}
            </button>
          </form>

          {feedback && (
            <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', background: 'var(--bg-surface)', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', border: '1px solid var(--border-subtle)' }}>
              {feedback}
            </div>
          )}
        </div>

        {/* Autonomous Alert Queue */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              Autonomous Alert Dispatch
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
              {alerts.length} Pending Unprompted
            </span>
          </div>

          {alerts.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem', border: '1px dashed var(--border-subtle)', borderRadius: '8px' }}>
              ✓ All monitored formats within safe decay bounds.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '240px', overflowY: 'auto' }}>
              {alerts.map((a) => (
                <div key={a.id} style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
                      ⚠️ {a.severity} FATIGUE ALERT
                    </span>
                    <button
                      onClick={() => handleAcknowledge(a.id)}
                      className="btn btn-secondary"
                      style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                    >
                      Dismiss
                    </button>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-main)', margin: '0.25rem 0', lineHeight: 1.4 }}>
                    {a.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid 3: Conversational Minds Agent Preview */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)', margin: 0 }}>
              Minds Conversational Terminal
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Query JadonCreator directly from persistent format memory
            </span>
          </div>
          <span className="badge badge-minds">Skill: Half-Life</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem', paddingRight: '0.5rem' }}>
          {chatMessages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: m.sender === 'user' ? 'var(--bg-surface)' : 'rgba(0, 242, 254, 0.08)',
                border: `1px solid ${m.sender === 'user' ? 'var(--border-subtle)' : 'rgba(0, 242, 254, 0.25)'}`,
                fontSize: '0.8rem',
                color: 'var(--text-main)',
                fontFamily: m.sender === 'mind' ? 'var(--font-mono)' : 'inherit',
              }}
            >
              {m.text}
            </div>
          ))}
          {chatThinking && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              JadonCreator reading persistent memory...
            </div>
          )}
        </div>

        <form onSubmit={handleChatSend} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Ask JadonCreator: 'What is my portfolio decay summary?'"
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            className="input-field"
          />
          <button type="submit" disabled={chatThinking || !chatQuery.trim()} className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Ask Mind →
          </button>
        </form>
      </div>
    </div>
  );
}
