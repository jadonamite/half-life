export default function Hero() {
  const avatars = [
    '/images/avatar-1.jpg',
    '/images/avatar-2.jpg',
    '/images/hero-mockup-1.jpg',
    '/images/hero-mockup-2.jpg',
    '/images/hero-mockup-3.jpg',
  ];

  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-36 px-6 overflow-hidden hero-ambient-lights">
      <div className="mx-auto max-w-5xl text-center relative z-10">
        
        {/* Main Headline with Embedded Badges (Exact Hanzo Layout & Proportions) */}
        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem] font-extrabold tracking-[-0.04em] text-neutral-900 leading-[1.08] select-none">
          
          {/* Top Line: Winning + [3D Half-Life Decay Card] + Formats */}
          <span className="inline-flex items-center flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-5">
            <span className="font-sans font-extrabold text-neutral-900">
              Winning
            </span>
            
            {/* Custom 3D Angled Decay Card Representing Half-Life */}
            <span className="relative inline-flex items-center justify-center p-1.5 sm:p-2 bg-gradient-to-b from-[#1c1c24] to-[#0c0c10] rounded-2xl sm:rounded-3xl shadow-[0_16px_36px_rgba(0,0,0,0.32),0_4px_12px_rgba(0,0,0,0.18)] border border-neutral-700/60 -rotate-3 hover:rotate-0 transition-transform duration-300 transform -translate-y-1">
              <div className="w-13 h-10 sm:w-18 sm:h-14 md:w-20 md:h-14 rounded-xl sm:rounded-2xl bg-[#141418] p-2 flex flex-col justify-between overflow-hidden relative">
                {/* Mini format decay status */}
                <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono font-semibold">
                  <span className="text-amber-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    -41%
                  </span>
                  <span className="text-neutral-400">t₁/₂</span>
                </div>
                {/* Decay Curve Vector */}
                <svg className="w-full h-4 sm:h-5 overflow-visible" viewBox="0 0 60 20" fill="none">
                  <path
                    d="M 2,4 C 18,5 34,14 58,18"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </span>
            
            <span className="font-sans font-light text-[#95949d]">
              Formats
            </span>
          </span>
          
          <br className="hidden sm:inline" />

          {/* Bottom Line: have a + [Matte Black Embossed Pill] + Half-Life */}
          <span className="inline-flex items-center flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-5 mt-2 sm:mt-4">
            <span className="font-serif italic font-light text-neutral-500 text-6xl sm:text-8xl md:text-[6.75rem] lg:text-[7.5rem] mr-0.5 transform -translate-y-1">
              have a
            </span>
            
            {/* Matte Black 3D Embossed Project Pill */}
            <span className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3.5 bg-gradient-to-b from-[#1e1e24] via-[#111115] to-[#08080a] rounded-2xl sm:rounded-3xl shadow-[0_14px_30px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.18)] border border-black/80 rotate-1 hover:rotate-0 transition-transform duration-300">
              <span className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-mono font-bold tracking-wider text-neutral-200">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-white">λ</span>
              </span>
            </span>

            <span className="font-sans font-extrabold text-neutral-900">
              Half-Life
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg leading-relaxed text-[#5c5b66] font-normal">
          We help creators and autonomous agents model when content formats begin to decay, projecting exponential half-life curves and alerting you before audience churn hits.
        </p>

        {/* CTA & Social Proof Group (Exact Hanzo Layout) */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <a
            href="#try-it"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-neutral-950 text-white text-sm font-medium shadow-[0_12px_28px_rgba(0,0,0,0.24)] hover:bg-neutral-800 hover:shadow-[0_16px_36px_rgba(0,0,0,0.32)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch Fatigue Simulator</span>
            <span className="text-neutral-400">→</span>
          </a>

          {/* Avatar Cluster with "Join The Senior Creators" */}
          <div className="inline-flex items-center gap-3.5">
            <div className="flex -space-x-2.5 overflow-hidden p-0.5">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  className="inline-block h-8 w-8 sm:h-9 sm:w-9 rounded-full ring-2 ring-[#ebeaef] object-cover"
                  src={src}
                  alt={`Senior Creator ${i + 1}`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-700">
              Join The Senior Creators
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
