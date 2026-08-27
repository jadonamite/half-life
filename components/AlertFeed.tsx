import React from 'react';
import { ProactiveAlert } from '@/lib/types';

interface Props {
  alerts: ProactiveAlert[];
  onAcknowledge: (alertId: string) => void;
}

export function AlertFeed({ alerts, onAcknowledge }: Props) {
  return (
    <div className="rounded-2xl bg-card border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-danger animate-ping" />
          <h2 className="text-xl font-serif text-ink">Autonomous Fatigue Alerts</h2>
        </div>
        <span className="text-xs font-mono text-muted bg-surface px-2.5 py-1 rounded-full border border-border">
          {alerts.length} unprompted notification{alerts.length !== 1 ? 's' : ''}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="py-8 text-center text-xs font-mono text-muted border border-dashed border-border rounded-xl">
          ✓ All active formats operating within safe decay boundaries. No proactive alerts triggered.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const isCritical = alert.severity === 'CRITICAL';
            return (
              <div
                key={alert.id}
                className={`p-5 rounded-xl border transition-all ${
                  isCritical
                    ? 'bg-danger/5 border-danger/40'
                    : 'bg-warning/5 border-warning/40'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          isCritical
                            ? 'bg-danger/20 text-danger'
                            : 'bg-warning/20 text-warning'
                        }`}
                      >
                        {alert.severity} PROACTIVE DISPATCH
                      </span>
                      <span className="text-xs font-mono text-muted">
                        Format: <strong className="text-ink">{alert.formatName}</strong>
                      </span>
                    </div>
                    <p className="text-sm font-sans text-ink leading-relaxed">
                      {alert.message}
                    </p>
                  </div>

                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="self-start sm:self-center shrink-0 px-3 py-1.5 rounded-lg bg-surface border border-border text-xs font-mono text-muted hover:text-ink hover:border-accent transition-colors"
                  >
                    Acknowledge
                  </button>
                </div>

                {alert.suggestedPivots && alert.suggestedPivots.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-border/40">
                    <div className="text-[10px] font-mono uppercase text-muted mb-1.5">
                      Suggested Autonomous Rotations:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {alert.suggestedPivots.map((pivot, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md bg-surface text-xs font-sans text-ink/80 border border-border"
                        >
                          ↳ {pivot}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
