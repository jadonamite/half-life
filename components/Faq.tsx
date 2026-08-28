'use client';

import { useState } from 'react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const questions = [
    {
      q: 'How is Half-Life different from standard analytics dashboards?',
      a: 'Standard dashboards are passive and stateless: you have to remember to check them, and they show single-post vanity metrics. Half-Life evaluates the longitudinal health curve of content archetypes across sessions, fits exponential decay parameters, and proactively interrupts you before audience fatigue causes subscriber churn.',
    },
    {
      q: 'Why does the decay engine enforce a 5-post minimum floor?',
      a: 'Statistical calibration. A single post can perform poorly due to time-of-day or temporary algorithm fluctuations. Half-Life uses the median of 5 initial posts to establish a robust baseline (E₀), preventing false-positive fatigue warnings on new formats.',
    },
    {
      q: 'How does the Mind trigger unprompted alerts (Autonomous Follow-Up)?',
      a: 'Whenever new post metrics are ingested or background audit triggers execute, the decay engine checks whether the rolling yield has breached the 35% decay threshold. If triggered, the Mind dispatches a proactive alert containing the decay percentage, half-life runway, and suggested format rotations without waiting for human prompting.',
    },
    {
      q: 'What mathematical formula models the half-life?',
      a: 'We use the classic exponential decay model E(n) = E₀·e^(-λn). The decay constant λ is computed as -ln(E_n / E₀) / n. The half-life runway (posts remaining until a 50% drop from baseline) is derived directly as t₁/₂ = ln(2) / λ.',
    },
    {
      q: 'What should a creator do when a format is flagged as DECAYED?',
      a: 'When a format drops below 50% of its initial baseline yield, audience saturation is high. Half-Life recommends a 30–45 day format cooldown while rotating into an adjacent or healthy pillar, allowing audience psychological fatigue to reset.',
    },
    {
      q: 'How does cross-session memory work within Minds AI?',
      a: 'The Minds Agent (Halflife) maintains a persistent format registry. When you talk to the agent in subsequent sessions, it automatically loads your baseline yields, ongoing decay curves, and previous rotation history without requiring you to re-upload data.',
    },
  ];

  return (
    <section id="faq" className="relative px-6 py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header (Exact Hanzo Image 4 style) */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
          <span className="h-[1px] w-12 bg-neutral-400/40" />
          <span>FAQ</span>
          <span className="h-[1px] w-12 bg-neutral-400/40" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-16 sm:mb-20">
          Your Questions, Answered
        </h2>

        {/* Two-Column Split Layout (Exact Hanzo Image 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Floating Discovery Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl bg-white p-8 sm:p-9 shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-black/[0.04]">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/images/half-life-logo.jpg"
                  alt="Agent Avatar"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-neutral-200"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 leading-tight">
                    Have more questions?
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Query the live Minds Agent
                  </p>
                </div>
              </div>

              <a
                href="/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all"
              >
                <span>Launch Fatigue Simulator</span>
                <span>→</span>
              </a>

              <div className="mt-5 text-center">
                <span className="text-xs text-neutral-500 font-mono">
                  Agent ID:{' '}
                  <span className="text-accent font-semibold">Halflife (Minds)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-7 divide-y divide-neutral-300/50">
            {questions.map((item, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={item.q} className="py-5 first:pt-0 last:pb-0">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 py-2 focus:outline-none group"
                  >
                    <span className="text-base sm:text-lg font-medium text-neutral-900 group-hover:text-neutral-950 transition-colors">
                      {item.q}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-neutral-200/80 group-hover:bg-neutral-300/80 flex items-center justify-center shrink-0 transition-colors text-neutral-800 font-mono text-sm">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="mt-3 pr-8 text-sm leading-relaxed text-neutral-600 font-normal">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
