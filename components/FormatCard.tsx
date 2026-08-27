import React from 'react';
import { FatigueReport, HealthStatus } from '@/lib/types';

interface Props {
  report: FatigueReport;
}

export function FormatCard({ report }: Props) {
  const getStatusBadge = (status: HealthStatus) => {
    switch (status) {
      case 'HEALTHY':
        return <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-success/10 text-success border border-success/30">● Healthy (≥85%)</span>;
      case 'STABLE':
        return <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-accent/10 text-accent border border-accent/30">● Stable (70-84%)</span>;
      case 'FATIGUING':
        return <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-warning/10 text-warning border border-warning/30 animate-pulse">▲ Fatiguing (50-69%)</span>;
      case 'DECAYED':
        return <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-danger/10 text-danger border border-danger/30 animate-pulse">✖ Decayed (&lt;50%)</span>;
      case 'PROBATION':
      default:
        return <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-muted/10 text-muted border border-muted/30">◌ Probation (&lt;5 posts)</span>;
    }
  };

  const isProbation = report.status === 'PROBATION';
  const decayRateColor =
    report.decayPercentage > 0
      ? 'text-success'
      : report.decayPercentage > -30
      ? 'text-ink'
      : report.decayPercentage > -50
      ? 'text-warning'
      : 'text-danger';

  return (
    <div className="rounded-2xl bg-card border border-border p-6 flex flex-col justify-between hover:border-accent/40 transition-all duration-200">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-muted tracking-wider">
              {report.archetype}
            </span>
            <h3 className="text-xl font-serif text-ink mt-0.5">{report.formatName}</h3>
          </div>
          {getStatusBadge(report.status)}
        </div>

        {isProbation ? (
          <div className="my-5 p-4 rounded-xl bg-surface border border-border/80">
            <div className="text-xs font-mono text-warning flex items-center gap-1.5 mb-1.5">
              <span>⚠️ Statistical Confidence Floor Active</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {report.postCount}/5 required posts recorded. Baseline calculation is paused to prevent false-positive fatigue warnings.
            </p>
          </div>
        ) : (
          <div className="my-5 grid grid-cols-3 gap-2 p-3.5 rounded-xl bg-surface border border-border/60">
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">Baseline</div>
              <div className="text-sm font-mono font-semibold text-ink mt-0.5">
                {(report.baselineRate * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">Trailing</div>
              <div className="text-sm font-mono font-semibold text-ink mt-0.5">
                {(report.trailingRate * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-muted uppercase">Decay (Δ)</div>
              <div className={`text-sm font-mono font-bold mt-0.5 ${decayRateColor}`}>
                {report.decayPercentage >= 0 ? '+' : ''}
                {report.decayPercentage}%
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2 text-xs">
          {!isProbation && (
            <div className="flex items-center justify-between text-muted border-b border-border/40 pb-2">
              <span>Half-Life Projected:</span>
              <span className="font-mono text-ink">
                {report.halfLifePostsRemaining !== null
                  ? `~${report.halfLifePostsRemaining} posts remaining`
                  : 'N/A (Steady/Growth)'}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-muted border-b border-border/40 pb-2">
            <span>Posts Monitored:</span>
            <span className="font-mono text-ink">{report.postCount} total</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="text-[11px] font-mono uppercase text-muted mb-1">Recommendation</div>
        <p className="text-xs text-ink/90 leading-relaxed font-sans">{report.recommendedAction}</p>
      </div>
    </div>
  );
}
