export default function TermsCard() {
  const perks = [
    '≥85% Baseline Yield: Healthy format, safe as primary pillar',
    '70% - 84% Yield: Stable yield, subtle hook experimentation',
    '50% - 69% Yield: Fatigue warning threshold, rotation required',
    '<50% Yield: Terminal decay, mandatory 30-day format cooldown',
    'N ≥ 5 Posts: Strict statistical baseline confidence floor',
    'Unprompted Alerts: Autonomous dispatch when decay breaches gate',
  ];

  return (
    <section id="terms" className="relative px-6 py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
          <span className="h-[1px] w-12 bg-neutral-400/40" />
          <span>Decay Thresholds</span>
          <span className="h-[1px] w-12 bg-neutral-400/40" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-16 sm:mb-20">
          Deterministic thresholds, zero guesswork
        </h2>

        {/* Big Terms Card (Exact Hanzo Pricing Card style) */}
        <div className="rounded-[2.5rem] bg-white p-8 sm:p-12 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/[0.04] relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-100">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Calibration Engine
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                Creative Fatigue Classification
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Mathematical boundaries separating healthy content pillars from fatiguing formats.
              </p>
            </div>

            <div className="md:text-right">
              <div className="flex items-baseline md:justify-end gap-1">
                <span className="text-5xl sm:text-6xl font-bold text-neutral-900 tracking-tight">
                  35%
                </span>
                <span className="text-neutral-500 text-sm font-medium">/drop</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 mt-1 block">
                Warning Gate: E(n) &lt; 0.65 E₀
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map(perk => (
              <div key={perk} className="flex items-start gap-3 text-sm text-neutral-700">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="leading-snug">{perk}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-500 font-mono text-center sm:text-left">
              Minds Persistent Agent:{' '}
              <span className="text-neutral-800 font-medium select-all">
                JadonCreator (f16e513e-f36b)
              </span>
            </div>

            <a
              href="#try-it"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-neutral-950 text-white text-sm font-medium hover:bg-neutral-800 shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-all"
            >
              <span>Audit Formats Now</span>
              <span>→</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
