export default function Timeline() {
  const steps = [
    {
      role: 'Core Problem Formalization',
      organization: 'Creative Minds Jam #1',
      period: 'Track A Pick',
      description: 'Applied 70-year performance marketing creative-fatigue detection to creator content formats to prevent audience burnout.',
    },
    {
      role: 'Decay Engine & Math Suite',
      organization: 'TypeScript / Node.js',
      period: '5/5 Tests Passing',
      description: 'Implemented exponential decay lambda computation, rolling median baselines, and half-life post runway estimation.',
    },
    {
      role: 'Persistent Memory Store',
      organization: 'Minds Architecture',
      period: 'Cross-Session State',
      description: 'Built cross-session format registry and post history persistence with unprompted alert dispatch queuing.',
    },
    {
      role: 'Minds Bazaar Skill Integration',
      organization: 'Animoca Brands / Minds',
      period: 'Skill: Half-Life',
      description: 'Authored "Half-Life" skill with format audit, post ingestion, and autonomous proactive fatigue alerting tools.',
    },
  ];

  return (
    <section id="about" className="relative px-6 py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
          <span className="h-[1px] w-12 bg-neutral-400/40" />
          <span>About the Build</span>
          <span className="h-[1px] w-12 bg-neutral-400/40" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-16 sm:mb-20">
          From first idea to persistent Mind
        </h2>

        {/* Timeline Stack matching Hanzo career list */}
        <div className="space-y-4">
          {steps.map(step => (
            <div
              key={step.role}
              className="rounded-2xl bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900">{step.role}</h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                    {step.organization}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>

              <div className="text-xs font-mono font-medium text-neutral-400 whitespace-nowrap sm:text-right">
                {step.period}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
