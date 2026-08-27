import React from 'react';

export function ArchitectureSection() {
  return (
    <section className="mt-16 rounded-2xl bg-card border border-border p-6 lg:p-10">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-surface text-muted border border-border mb-3">
          Deep Architecture
        </div>
        <h2 className="text-3xl font-serif text-ink tracking-tight">
          How Half-Life Solves Creative Fatigue
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          The mathematical decay engine transforms subjective creative anxiety into deterministic, actionable signals.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-surface border border-border/80">
          <div className="text-xs font-mono uppercase text-accent mb-2">01 · Exponential Decay Model</div>
          <h3 className="text-base font-serif text-ink mb-2">E(n) = E₀ · e^(-λn)</h3>
          <p className="text-xs text-muted leading-relaxed">
            Measures engagement attenuation per iteration. The exponential constant <code className="text-ink font-mono">λ</code> models the rate of audience desensitization relative to baseline <code className="text-ink font-mono">E₀</code>.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-surface border border-border/80">
          <div className="text-xs font-mono uppercase text-accent mb-2">02 · Half-Life Projection</div>
          <h3 className="text-base font-serif text-ink mb-2">t₁/₂ = ln(2) / λ</h3>
          <p className="text-xs text-muted leading-relaxed">
            Projects the remaining number of posts before the format loses 50% of its initial baseline yield—giving creators weeks of advance warning before reach collapses.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-surface border border-border/80">
          <div className="text-xs font-mono uppercase text-accent mb-2">03 · Honest Statistical Floor</div>
          <h3 className="text-base font-serif text-ink mb-2">N ≥ 5 Post Confidence</h3>
          <p className="text-xs text-muted leading-relaxed">
            An agent that hallucinates fatigue on 1 post is a toy. Half-Life enforces a strict 5-post median window before computing health—proudly reporting cold-start boundaries.
          </p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-border/60">
        <div className="text-xs font-mono uppercase text-muted mb-3">Hackathon Rubric Verification Matrix</div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-border/60 text-muted">
                <th className="py-2.5 pr-4">Rubric Criterion</th>
                <th className="py-2.5 px-4">Requirement</th>
                <th className="py-2.5 pl-4">Half-Life Implementation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 text-ink">
              <tr>
                <td className="py-3 pr-4 font-semibold text-accent">Audience Growth Track</td>
                <td className="py-3 px-4 text-muted">Prevent audience churn & fatigue</td>
                <td className="py-3 pl-4">Detects decaying formats before audience retention drops</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-accent">Memory (Cross-Session)</td>
                <td className="py-3 px-4 text-muted">Remember context across sessions</td>
                <td className="py-3 pl-4">Stores format registry, baselines, and historical metrics in persistent store</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-accent">Continuity</td>
                <td className="py-3 px-4 text-muted">Picks up where left off</td>
                <td className="py-3 pl-4">Resumes monitoring continuous longitudinal decay trajectories</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-accent">Autonomous Follow-Up</td>
                <td className="py-3 px-4 text-muted">Action without constant prompting</td>
                <td className="py-3 pl-4">Dispatches proactive fatigue alerts unprompted when decay threshold is breached</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
