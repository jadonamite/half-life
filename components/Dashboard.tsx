'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, ArrowsClockwise, Faders, CheckCircle, Warning, Clock, Lightning, ChartLineUp, ShieldCheck } from '@phosphor-icons/react';
import { ContentFormat, FatigueReport, ProactiveAlert } from '@/lib/types';
import { Wordmark } from '@/components/Wordmark';
import { PillButton } from '@/components/Pill';
import ChatPreview from '@/components/ChatPreview';
import InjectPostModal from '@/components/InjectPostModal';

// Mock chart data for the beautiful curve
const chartData = [
  { time: '00:00', baseline: 50, trailing: 10 },
  { time: '04:00', baseline: 60, trailing: 15 },
  { time: '08:00', baseline: 55, trailing: 35 },
  { time: '12:00', baseline: 80, trailing: 90 },
  { time: '16:00', baseline: 120, trailing: 110 },
  { time: '20:00', baseline: 130, trailing: 100 },
  { time: '23:59', baseline: 125, trailing: 70 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-float">
        <p className="text-2xl font-light text-premium-text-main mb-1">
          {((payload[1].value - payload[0].value) > 0 ? '+' : '')}{(((payload[1].value - payload[0].value) / payload[0].value) * 100).toFixed(2)}%
        </p>
        <p className="text-xs text-premium-text-muted">Trailing Engagement (vs Baseline)</p>
      </div>
    );
  }
  return null;
};

// Half-circle SVG Gauge component
const ArcGauge = ({ percentage, color, label, subLabel }: { percentage: number, color: string, label: string, subLabel: string }) => {
  const radius = 40;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-14 overflow-hidden mb-2">
        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Background Arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#E5E7EB" strokeWidth="8" strokeLinecap="round" />
          {/* Foreground Arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute bottom-0 w-full text-center">
          <span className="text-lg font-medium text-premium-text-main">{percentage}%</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-premium-text-muted">{label}</span>
      <span className="text-[10px] text-premium-text-muted mt-1">{subLabel}</span>
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isInjectModalOpen, setIsInjectModalOpen] = useState(false);
  const [formats, setFormats] = useState<ContentFormat[]>([]);
  const [reports, setReports] = useState<FatigueReport[]>([]);
  const [alerts, setAlerts] = useState<ProactiveAlert[]>([]);
  const [selectedFormatId, setSelectedFormatId] = useState<string>('fmt-hottakes');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fmtRes = await fetch('/api/format/list?creatorId=jadoncreator');
      const fmtData = await fmtRes.json();
      if (fmtData.success) setFormats(fmtData.formats);

      const auditRes = await fetch('/api/format/audit?creatorId=jadoncreator');
      const auditData = await auditRes.json();
      if (auditData.success) setReports(auditData.reports);

      const alertRes = await fetch('/api/alerts/pending?creatorId=jadoncreator');
      const alertData = await alertRes.json();
      if (alertData.success) setAlerts(alertData.alerts);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAcknowledge = async (alertId: string) => {
    try {
      await fetch('/api/alerts/acknowledge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alertId }) });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-premium-glass font-sans selection:bg-premium-button-dark selection:text-white flex flex-col relative z-10">
        
        {/* Top Navigation */}
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-10 p-5 sm:p-8 border-b border-premium-glass-border bg-white/30 backdrop-blur-md">
          <div className="flex w-full xl:w-auto justify-between items-center">
            <Wordmark className="!text-ink !text-[22px]" />
          </div>

          <nav
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'var(--card)',
              padding: 3,
              borderRadius: 9999,
              border: '1px solid var(--hairline)',
            }}
            className="hidden md:flex"
          >
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 500,
                background: activeTab === 'dashboard' ? 'var(--card-raised)' : 'transparent',
                color: activeTab === 'dashboard' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: activeTab === 'dashboard' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 200ms ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ChartLineUp weight={activeTab === 'dashboard' ? 'bold' : 'regular'} /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('formats')}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 500,
                background: activeTab === 'formats' ? 'var(--card-raised)' : 'transparent',
                color: activeTab === 'formats' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: activeTab === 'formats' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 200ms ease',
              }}
            >
              Formats
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 500,
                background: activeTab === 'logs' ? 'var(--card-raised)' : 'transparent',
                color: activeTab === 'logs' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: activeTab === 'logs' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 200ms ease',
              }}
            >
              Engine Logs
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 500,
                background: activeTab === 'chat' ? 'var(--card-raised)' : 'transparent',
                color: activeTab === 'chat' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: activeTab === 'chat' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 200ms ease',
              }}
            >
              Agent Chat
            </button>
            <button
              onClick={() => setActiveTab('api')}
              style={{
                padding: '6px 16px',
                borderRadius: 9999,
                fontSize: 13.5,
                fontWeight: 500,
                background: activeTab === 'api' ? 'var(--card-raised)' : 'transparent',
                color: activeTab === 'api' ? 'var(--ink)' : 'var(--ink-2)',
                boxShadow: activeTab === 'api' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 200ms ease',
              }}
            >
              API Keys
            </button>
          </nav>

          <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto justify-start xl:justify-end">
            <PillButton variant="ghost" mark={<ArrowsClockwise weight="bold" />}>Sync</PillButton>
            <PillButton variant="ghost" mark={<Faders weight="bold" />}>Filter</PillButton>
            <PillButton onClick={() => setIsInjectModalOpen(true)} mark={<Plus weight="bold" />}>Inject Post</PillButton>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 flex-1">
          {/* Title & Stats Row */}
          <div className="mb-10">
          <h1 className="text-4xl font-medium tracking-tight mb-8">Creator Intelligence Center</h1>
          
          <div className="flex flex-wrap gap-8 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-6xl font-light tracking-tighter mb-2">
                {reports.length}
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Lightning size={16} weight="bold" />
                </div>
              </div>
              <span className="text-sm font-medium text-premium-text-muted uppercase tracking-wider">Formats Tracked</span>
            </div>
            
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden md:block" />

            <div>
              <div className="flex items-center gap-2 text-6xl font-light tracking-tighter mb-2">
                {reports.filter(r => r.status === 'HEALTHY' || r.status === 'PROBATION').length}
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Warning size={16} weight="bold" />
                </div>
              </div>
              <span className="text-sm font-medium text-premium-text-muted uppercase tracking-wider">Healthy Formats</span>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden lg:block" />

            <div>
              <div className="flex items-center gap-2 text-6xl font-light tracking-tighter mb-2">
                {formats.reduce((acc, f) => acc + f.postCount, 0)}
              </div>
              <span className="text-sm font-medium text-premium-text-muted uppercase tracking-wider">Total Posts Ingested</span>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent hidden xl:block" />

            <div>
              <div className="flex items-center gap-2 text-6xl font-light tracking-tighter mb-2">
                98%
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle size={16} weight="fill" />
                </div>
              </div>
              <span className="text-sm font-medium text-premium-text-muted uppercase tracking-wider">Engine Confidence</span>
            </div>
          </div>
        </div>

        {/* Main View Area */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column (Chart + Alerts) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              {/* Chart Area */}
              <div className="bg-white/40 border border-white/60 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-premium-text-main">Format Decay Curve</h3>
                  <div className="bg-white/60 p-1 rounded-full flex text-xs font-medium border border-white">
                    <button className="bg-premium-button-dark text-white px-4 py-1.5 rounded-full shadow-sm">Trailing</button>
                    <button className="text-premium-text-muted px-4 py-1.5 rounded-full">Baseline</button>
                    <button className="text-premium-text-muted px-4 py-1.5 rounded-full">Projection</button>
                  </div>
                </div>
                
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#673AB7" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#673AB7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTrailing" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#E66F42" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#E66F42" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#7A7B7E', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#7A7B7E', fontSize: 12}} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="baseline" stroke="#673AB7" strokeWidth={2} fillOpacity={1} fill="url(#colorBaseline)" />
                      <Area type="monotone" dataKey="trailing" stroke="#E66F42" strokeWidth={2} fillOpacity={1} fill="url(#colorTrailing)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Alerts Feed */}
              <div className="bg-white/40 border border-white/60 rounded-3xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-premium-text-main">Live Proactive Alerts</h3>
                  <div className="flex gap-2">
                    <span className="bg-premium-button-dark text-white px-3 py-1 text-xs rounded-full">All</span>
                    <span className="bg-white text-premium-text-muted border border-white px-3 py-1 text-xs rounded-full">Warning</span>
                    <span className="bg-white text-premium-text-muted border border-white px-3 py-1 text-xs rounded-full">Safe</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-2">
                  {alerts.length === 0 ? (
                    <div className="text-center py-6 text-sm text-premium-text-muted">No pending alerts from Halflife.</div>
                  ) : (
                    alerts.map(a => (
                      <div key={a.id} className="bg-white/70 border border-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#DC2626] shrink-0">
                            <Warning size={20} weight="fill" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-premium-text-main mb-1">Fatigue Alert: {a.severity}</h4>
                            <p className="text-xs text-premium-text-muted leading-relaxed">{a.message}</p>
                          </div>
                        </div>
                        <button onClick={() => handleAcknowledge(a.id)} className="bg-white border border-gray-200 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors shrink-0">
                          Dismiss
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="flex flex-col gap-6">
              
              {/* Format Health Gauges */}
              <div className="bg-white/40 border border-white/60 rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-medium text-premium-text-main mb-6">Format Health</h3>
                
                <div className="bg-white/70 border border-white rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-premium-text-main">Quick Opinion Hot Takes</span>
                    <span className="text-[10px] font-bold text-[#E66F42] uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-full">Fatiguing</span>
                  </div>
                  <div className="text-xs text-premium-text-muted">Last calibrated: 2 hours ago</div>
                </div>

                <div className="flex justify-between px-2 mb-6">
                  <ArcGauge percentage={41} color="#E66F42" label="Decay Drop" subLabel="vs Baseline" />
                  <ArcGauge percentage={85} color="#673AB7" label="Reliability" subLabel="Model Conf." />
                  <ArcGauge percentage={12} color="#16A34A" label="Runway" subLabel="3 Posts Left" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <PillButton variant="ghost" className="!h-10 !text-xs w-full" mark={<ArrowsClockwise weight="bold" />}>Recalibrate</PillButton>
                  <PillButton className="!h-10 !text-xs w-full" mark={<ShieldCheck weight="bold" />}>Rotate</PillButton>
                </div>
              </div>

              {/* Input Injection Block */}
              <div className="bg-white/40 border border-white/60 rounded-3xl p-6 shadow-sm flex-1">
                <h3 className="text-lg font-medium text-premium-text-main mb-4">Manual Input Sync</h3>
                
                <div className="flex flex-col gap-4">
                  <div className="bg-white/70 border border-white rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Clock size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-premium-text-main">Impressions</div>
                        <div className="text-[10px] text-premium-text-muted">Raw reach metric</div>
                      </div>
                    </div>
                    <input type="text" placeholder="15,000" className="w-20 bg-transparent border-b border-gray-300 text-right text-sm font-mono focus:outline-none focus:border-premium-button-dark" />
                  </div>

                  <div className="bg-white/70 border border-white rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Lightning size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-premium-text-main">Engagements</div>
                        <div className="text-[10px] text-premium-text-muted">Likes, replies, rt</div>
                      </div>
                    </div>
                    <input type="text" placeholder="570" className="w-20 bg-transparent border-b border-gray-300 text-right text-sm font-mono focus:outline-none focus:border-premium-button-dark" />
                  </div>
                </div>

                <PillButton className="w-full mt-6" mark={<Plus weight="bold" />}>Run Engine Audit</PillButton>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'formats' && (
          <div className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-medium tracking-tight mb-2">Registered Formats</h2>
                <p className="text-premium-text-muted">Manage your content archetypes and view their high-level decay trajectories.</p>
              </div>
              <PillButton mark={<Plus weight="bold" />}>New Format</PillButton>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'System Architecture Teardowns', status: 'HEALTHY', desc: 'Deep-dive text threads breaking down complex systems.', posts: 18, baseline: '4.2%', retention: '92%', runway: '24+ Posts' },
                { name: '1-Sentence Hot Takes', status: 'FATIGUED', desc: 'High-variance engagement bait statements.', posts: 8, baseline: '6.5%', retention: '41%', runway: '~3 Posts' },
                { name: '30s Podcast Video Snippets', status: 'CALIBRATING', desc: 'Short form vertical video clips from long-form.', posts: 3, baseline: 'N/A', retention: 'N/A', runway: 'Hold (N<5)' },
                { name: 'Tooling & Workflow Tips', status: 'HEALTHY', desc: 'Practical setup and productivity guides.', posts: 12, baseline: '3.8%', retention: '88%', runway: '15+ Posts' },
                { name: 'Weekly Newsletter Teaser', status: 'WARNING', desc: 'Top-of-funnel conversion posts for the newsletter.', posts: 24, baseline: '2.1%', retention: '65%', runway: '~8 Posts' },
              ].map((f, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-white/20 group-hover:to-white/40 rounded-full blur-2xl transition-all" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <h4 className="text-lg font-medium text-premium-text-main leading-tight pr-4">{f.name}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${f.status === 'HEALTHY' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : f.status === 'FATIGUED' ? 'bg-red-50 text-red-700 border border-red-200/50' : f.status === 'WARNING' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' : 'bg-neutral-100 text-neutral-600 border border-neutral-200'}`}>
                        {f.status}
                      </span>
                    </div>
                    <p className="text-sm text-premium-text-muted mb-8 relative z-10">{f.desc}</p>
                  </div>
                  
                  <div className="flex justify-between items-end border-t border-black/5 pt-5 relative z-10">
                    <div>
                      <div className="text-2xl font-light text-premium-text-main">{f.posts}</div>
                      <div className="text-[10px] text-premium-text-muted font-mono uppercase tracking-wider">Posts</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light text-premium-text-main">{f.retention}</div>
                      <div className="text-[10px] text-premium-text-muted font-mono uppercase tracking-wider">Retention</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between relative z-10">
                     <span className="text-xs text-premium-text-muted">Runway Projection:</span>
                     <span className={`text-sm font-semibold ${f.status === 'FATIGUED' ? 'text-red-600' : 'text-premium-text-main'}`}>{f.runway}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-2xl font-medium tracking-tight mb-2">Engine Logs</h2>
                <p className="text-premium-text-muted">Real-time ingestion feed and decay calculation traces.</p>
              </div>
              <div className="flex gap-2">
                 <PillButton variant="plain" className="bg-ink text-white">All Logs</PillButton>
                 <PillButton variant="ghost" className="!h-auto !py-1.5 !px-4">Warnings</PillButton>
                 <PillButton variant="ghost" className="!h-auto !py-1.5 !px-4">Ingestion</PillButton>
              </div>
            </div>

            <div className="bg-[#0B0B0E] rounded-3xl p-6 font-mono text-sm shadow-2xl overflow-hidden h-[600px] flex flex-col border border-white/10 relative">
              
              {/* Terminal Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <div className="text-white/80 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> 
                  <span className="font-semibold tracking-wider text-xs">HALFLIFE ENGINE &middot; CORE DUMP</span>
                </div>
                <div className="flex gap-4 text-[10px] text-white/40 uppercase tracking-widest">
                  <span>Uptime: 24d 14h</span>
                  <span>CPU: 4%</span>
                  <button className="hover:text-white transition-colors">Clear</button>
                </div>
              </div>
              
              {/* Terminal Logs */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:44.102</span> <span>[SYSTEM] Polling connected social APIs for new content from jadoncreator...</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:45.891</span> <span className="text-cyan-400">[INGEST] Found 1 new post matching format ID "hot_takes_1"</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:45.920</span> <span>[METRICS] Extracting 24h performance: Impressions: 12,400 | Engagements: 210 | Saves: 45</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:46.005</span> <span>[MATH] Calculating decay delta...</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:46.012</span> <span className="text-white">Engagement Rate: 1.69% (Baseline: 3.20%)</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:46.104</span> <span className="text-amber-400">[WARNING] Decay curve steeply accelerating. &lambda; = 0.16.</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:46.110</span> <span className="text-red-400 font-bold">[ALERT] Adjusting half-life projection to ~3 posts remaining.</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:46.300</span> <span>[STATE] Persisting updated matrix to format registry...</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:02:46.350</span> <span className="text-emerald-400">[SUCCESS] State saved. Queuing proactive notification to Minds Bazaar Agent.</span></div>
                
                <div className="text-white/40 flex gap-4 mt-6"><span className="shrink-0 text-white/20">15:10:00.001</span> <span>[SYSTEM] Running scheduled probabilistic audit on all active formats...</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:10:00.045</span> <span>[AUDIT] "System Architecture Teardowns" maintaining robust retention (92%). &lambda; = 0.02.</span></div>
                <div className="text-white/40 flex gap-4"><span className="shrink-0 text-white/20">15:10:00.080</span> <span>[AUDIT] "30s Podcast Video Snippets" N=3. Holding in calibration lock.</span></div>
                
                <div className="text-white/40 flex gap-4 mt-6 animate-pulse"><span className="shrink-0 text-white/20">15:14:22.999</span> <span className="text-white/80">_</span></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-4xl mx-auto h-[600px] flex flex-col items-center justify-center pt-8">
             <ChatPreview />
          </div>
        )}

        {activeTab === 'api' && (
          <div className="max-w-4xl mx-auto bg-white/40 border border-white/60 rounded-3xl p-8 shadow-sm">
            <div className="mb-8 border-b border-white/50 pb-6">
              <h2 className="text-2xl font-medium text-premium-text-main mb-2">API Configuration</h2>
              <p className="text-premium-text-muted">Manage your secret keys to interact with the Halflife ingestion engine programmatically.</p>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-premium-text-main">Production Secret Key</h3>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Active</span>
              </div>
              <p className="text-sm text-premium-text-muted mb-4">This key gives full access to ingest posts and trigger decay audits. Do not expose it in client-side code.</p>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap select-all relative">
                  hl_live_***********************************9f2a
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
                </div>
                <PillButton variant="ghost">Copy</PillButton>
                <PillButton>Roll Key</PillButton>
              </div>
            </div>

            <div className="bg-white/70 rounded-2xl p-6 border border-white">
              <h3 className="text-lg font-medium text-premium-text-main mb-2">Webhook URL</h3>
              <p className="text-sm text-premium-text-muted mb-4">Receive real-time payloads when a format hits terminal decay.</p>
              <div className="flex gap-3">
                <input 
                  type="url" 
                  placeholder="https://api.yourdomain.com/webhooks/halflife"
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-premium-button-dark"
                  defaultValue="https://api.namite.xyz/webhooks/halflife"
                />
                <PillButton variant="ghost">Save</PillButton>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Footer (Xenia format) */}
        <footer
          className="mt-12 pt-6"
          style={{
            borderTop: '1px solid var(--premium-glass-border)',
            borderColor: 'rgba(255,255,255,0.4)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              fontSize: 13,
              color: 'var(--premium-text-muted)',
            }}
          >
            <span>© 2026 Halflife &bull; Autonomous Creative Fatigue Detection</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                Engine Config
              </a>
              <span aria-hidden style={{ opacity: 0.4 }}>|</span>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                Docs
              </a>
              <span aria-hidden style={{ opacity: 0.4 }}>|</span>
              <a
                href="#"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Modals */}
      <InjectPostModal isOpen={isInjectModalOpen} onClose={() => setIsInjectModalOpen(false)} />
    </div>
  );
}
