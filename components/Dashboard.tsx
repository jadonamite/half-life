'use client';

import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CaretRight, Plus, ArrowsClockwise, Faders, CheckCircle, Warning, Clock, Activity, ChartLineUp, ShieldCheck } from '@phosphor-icons/react';
import { ContentFormat, FatigueReport, ProactiveAlert } from '@/lib/types';

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
    <div className="min-h-screen bg-[#EBECEE] text-premium-text-main font-sans selection:bg-premium-button-dark selection:text-white p-4 sm:p-8 relative overflow-hidden flex items-center justify-center">
      
      {/* Background Organic Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Glass Panel */}
      <div className="w-full max-w-[1400px] bg-premium-glass backdrop-blur-2xl border border-premium-glass-border rounded-[2.5rem] shadow-glass flex flex-col p-8 relative z-10">
        
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-premium-button-dark rounded-xl flex items-center justify-center text-white">
              <Activity weight="bold" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Halflife</span>
          </div>

          <div className="hidden md:flex bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white">
            <button className="bg-premium-button-dark text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <ChartLineUp weight="bold" /> Dashboard
            </button>
            <button className="text-premium-text-muted hover:text-premium-text-main px-5 py-2 rounded-full text-sm font-medium transition-colors">
              Formats
            </button>
            <button className="text-premium-text-muted hover:text-premium-text-main px-5 py-2 rounded-full text-sm font-medium transition-colors">
              Engine Logs
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="bg-white/60 hover:bg-white p-2.5 rounded-full text-premium-text-main border border-white/80 transition-colors">
              <ArrowsClockwise weight="bold" />
            </button>
            <button className="bg-white/60 hover:bg-white px-4 py-2.5 rounded-full text-premium-text-main border border-white/80 text-sm font-medium flex items-center gap-2 transition-colors">
              <Faders weight="bold" /> Filter
            </button>
            <button className="bg-premium-button-dark hover:bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Plus weight="bold" /> Inject Post
            </button>
          </div>
        </div>

        {/* Title & Stats Row */}
        <div className="mb-10">
          <h1 className="text-4xl font-medium tracking-tight mb-8">Creator Intelligence Center</h1>
          
          <div className="flex flex-wrap gap-8 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 text-6xl font-light tracking-tighter mb-2">
                {reports.length}
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Activity size={16} weight="bold" />
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
                {formats.reduce((acc, f) => acc + f.postHistory.length, 0)}
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

        {/* Main Grid Content */}
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
                {/* Mock healthy feed item just for aesthetics if no alerts */}
                {alerts.length === 0 && (
                  <div className="bg-white/70 border border-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#16A34A]">
                        <CheckCircle size={20} weight="fill" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-premium-text-main mb-1">Deep-Dive Format</h4>
                        <p className="text-xs text-premium-text-muted">Analyzed 12 posts. Retaining 92% baseline engagement. Safe.</p>
                      </div>
                    </div>
                    <span className="bg-[#F0FDF4] text-[#16A34A] text-xs font-medium px-3 py-1 rounded-full border border-[#BBF7D0]">Healthy</span>
                  </div>
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
                <button className="bg-white border border-gray-200 text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-gray-50 flex items-center justify-center gap-2">
                  <ArrowsClockwise size={14} weight="bold" /> Recalibrate
                </button>
                <button className="bg-premium-button-dark text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm flex items-center justify-center gap-2">
                  <ShieldCheck size={14} weight="bold" /> Rotate
                </button>
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
                      <Activity size={16} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-premium-text-main">Engagements</div>
                      <div className="text-[10px] text-premium-text-muted">Likes, replies, rt</div>
                    </div>
                  </div>
                  <input type="text" placeholder="570" className="w-20 bg-transparent border-b border-gray-300 text-right text-sm font-mono focus:outline-none focus:border-premium-button-dark" />
                </div>
              </div>

              <button className="w-full mt-6 bg-premium-button-dark text-white rounded-full py-3 text-sm font-medium hover:bg-black transition-colors flex justify-center items-center gap-2 shadow-float">
                <Plus weight="bold" /> Run Engine Audit
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
