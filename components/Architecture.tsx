export default function Architecture() {
  const guarantees = [
    {
      id: 'FR-003',
      tag: 'Mathematical Rigor',
      title: 'Deterministic Decay Modeling',
      quote:
        'Fatigue is not a subjective vibe—it is modeled via exponential decay E(n) = E₀·e^(-λn). The half-life runway t₁/₂ = ln(2)/λ provides weeks of warning before audience saturation.',
      rule: 'Mathematical Invariant: lambda = -ln(E_n / E_0) / n_posts.',
      avatar: '/images/avatar-1.jpg',
      author: 'Decay Engine Specification',
      role: 'Deterministic Performance Math',
    },
    {
      id: 'FR-006',
      tag: 'Agent Persistence',
      title: 'Real State, Zero Hallucinations',
      quote:
        'The Minds Agent queries persistent format memory across sessions. It recalls your historical baselines, previous fatigue alerts, and past rotations without re-teaching.',
      rule: 'Minds Native Integration: JadonCreator cross-session state.',
      avatar: '/images/avatar-2.jpg',
      author: 'Minds Bazaar Agent',
      role: 'Autonomous AI Integration',
    },
    {
      id: 'FR-005',
      tag: 'Statistical Floor',
      title: 'Strict N ≥ 5 Confidence Gate',
      quote:
        'An agent that hallucinates fatigue on 1 or 2 posts is a toy. Formats with under 5 posts are held in probation, proudly refusing to compute decay until baseline confidence is met.',
      rule: 'Calibration Guard: minBaselinePosts >= 5.',
      avatar: '/images/hero-mockup-1.jpg',
      author: 'Statistical Governance',
      role: 'Cold-Start Guard',
    },
  ];

  return (
    <section id="architecture" className="relative px-6 py-24 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
          <span className="h-[1px] w-12 bg-neutral-400/40" />
          <span>Core Guarantees</span>
          <span className="h-[1px] w-12 bg-neutral-400/40" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-16 sm:mb-20">
          Not vague promises. Programmatic rules.
        </h2>

        {/* 3 Guarantee Cards matching Hanzo Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {guarantees.map(g => (
            <div
              key={g.id}
              className="rounded-3xl bg-white p-8 shadow-[0_16px_36px_rgba(0,0,0,0.05)] border border-black/[0.04] flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-500/20">
                    {g.id}
                  </span>
                  <span className="text-neutral-400 text-xs font-mono">{g.tag}</span>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 mb-3">{g.title}</h3>
                
                <p className="text-sm text-neutral-600 leading-relaxed italic font-normal">
                  &ldquo;{g.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center gap-3">
                <img
                  src={g.avatar}
                  alt={g.author}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-neutral-200"
                />
                <div>
                  <div className="text-xs font-semibold text-neutral-900">{g.author}</div>
                  <div className="text-[11px] text-neutral-500 font-mono">{g.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Architectural Context */}
        <div className="mt-14 max-w-2xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-mono">
            <span className="text-neutral-800 font-semibold">Honest architectural boundary:</span>{' '}
            Requires at least 5 posts per format to establish a baseline. It cannot predict fatigue on a format&rsquo;s first appearance. The system proudly embraces this as a statistical necessity rather than guessing.
          </p>
        </div>

      </div>
    </section>
  );
}
