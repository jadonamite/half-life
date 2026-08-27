export default function Problem() {
  const leftChips = [
    {
      title: 'Persistent Memory',
      color: 'bg-orange-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      title: 'Decay Continuity',
      color: 'bg-emerald-600',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Autonomous Alert',
      color: 'bg-blue-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ];

  const rightChips = [
    {
      title: 'Decay Formula',
      color: 'bg-teal-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'N ≥ 5 Confidence',
      color: 'bg-fuchsia-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Format Rotation',
      color: 'bg-amber-500',
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  return (
    <section id="the-problem" className="relative px-6 py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header (Exact Hanzo style from Image 2) */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-8 md:mb-12">
          <span className="h-[1px] w-12 bg-neutral-400/40" />
          <span>The Core Problem</span>
          <span className="h-[1px] w-12 bg-neutral-400/40" />
        </div>

        {/* Core Layout: Centered Statement with Floating 3D Chips */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Floating Chips (Desktop) */}
          <div className="hidden lg:flex flex-col gap-6 items-end w-64 z-20">
            {leftChips.map((chip, idx) => (
              <div
                key={chip.title}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.07)] border border-black/[0.04] text-xs font-semibold text-neutral-800 transform hover:-translate-y-1 transition-all duration-200"
                style={{ transform: `translateX(${idx === 1 ? '16px' : '0px'})` }}
              >
                <span className={`w-7 h-7 rounded-xl ${chip.color} flex items-center justify-center shadow-sm`}>
                  {chip.icon}
                </span>
                <span>{chip.title}</span>
              </div>
            ))}
          </div>

          {/* Central Main Statement */}
          <div className="max-w-3xl text-center z-10">
            <h2 className="text-3xl sm:text-4xl md:text-[3.25rem] font-medium text-neutral-900 tracking-[-0.03em] leading-[1.25]">
              We help creators model the decay curve of their winning formats before audience creative fatigue turns into irreversible channel churn
            </h2>
          </div>

          {/* Right Floating Chips (Desktop) */}
          <div className="hidden lg:flex flex-col gap-6 items-start w-64 z-20">
            {rightChips.map((chip, idx) => (
              <div
                key={chip.title}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.07)] border border-black/[0.04] text-xs font-semibold text-neutral-800 transform hover:-translate-y-1 transition-all duration-200"
                style={{ transform: `translateX(${idx === 1 ? '-16px' : '0px'})` }}
              >
                <span className={`w-7 h-7 rounded-xl ${chip.color} flex items-center justify-center shadow-sm`}>
                  {chip.icon}
                </span>
                <span>{chip.title}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile Chips Row */}
        <div className="mt-10 flex lg:hidden flex-wrap items-center justify-center gap-3">
          {[...leftChips, ...rightChips].map(chip => (
            <div
              key={chip.title}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.04] text-xs font-semibold text-neutral-800"
            >
              <span className={`w-6 h-6 rounded-lg ${chip.color} flex items-center justify-center shadow-sm`}>
                {chip.icon}
              </span>
              <span>{chip.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
