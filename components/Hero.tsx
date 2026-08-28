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
        
        {/* Main Headline with Embedded Badges (Exact Hanzo Layout, Proportions & Weights) */}
        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.25rem] font-semibold tracking-[-0.035em] text-neutral-900 leading-[1.1] select-none">
          
          {/* Top Line: Winning + [3D Service Image Card] + Formats */}
          <span className="inline-flex items-center flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-5">
            <span className="font-sans font-semibold text-neutral-900">
              Winning
            </span>
            
            {/* 3D Service Mockup Card with Black Border & Soft Drop Shadow */}
            <span className="relative inline-flex items-center justify-center p-1 sm:p-1.5 bg-[#0f0f13] rounded-2xl sm:rounded-3xl border border-black shadow-[0_16px_36px_rgba(0,0,0,0.28),0_4px_12px_rgba(0,0,0,0.14)] -rotate-3 hover:rotate-0 transition-transform duration-300 transform -translate-y-1">
              <div className="w-14 h-10 sm:w-18 sm:h-13 md:w-22 md:h-15 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#15151c] to-[#242430] p-1.5 flex flex-col justify-between overflow-hidden relative border border-neutral-800">
                {/* Visual of the service: multi-card stack preview */}
                <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono">
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    -41%
                  </span>
                  <span className="text-neutral-400 font-medium">t₁/₂: 3</span>
                </div>
                {/* Miniature service analytics curve */}
                <svg className="w-full h-4 sm:h-5 overflow-visible" viewBox="0 0 60 20" fill="none">
                  <path
                    d="M 2,4 C 16,5 32,13 58,18"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 2,12 C 20,12 40,11 58,10"
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </span>
            
            <span className="font-sans font-light text-neutral-400">
              Formats
            </span>
          </span>
          
          <br className="hidden sm:inline" />

          {/* Bottom Line: have a + [3D Illustration Pill] + Halflife */}
          <span className="inline-flex items-center flex-wrap justify-center gap-2.5 sm:gap-4 md:gap-5 mt-2 sm:mt-4">
            <span className="font-serif italic font-light text-neutral-500 text-6xl sm:text-8xl md:text-[6.5rem] lg:text-[7.25rem] mr-0.5 transform -translate-y-1">
              have a
            </span>
            
            {/* 3D Matte Black Pill with Custom Emblem Illustration & Black Border */}
            <span className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3.5 bg-gradient-to-b from-[#1c1c22] via-[#101014] to-[#08080a] rounded-2xl sm:rounded-3xl border border-black shadow-[0_14px_30px_rgba(0,0,0,0.32),inset_0_1px_1px_rgba(255,255,255,0.15)] rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Custom Halflife Wave Emblem Illustration matching Hanzo oo badge */}
              <svg className="w-7 h-3.5 sm:w-9 sm:h-4 md:w-10 md:h-4.5 text-neutral-400" viewBox="0 0 40 16" fill="none">
                <circle cx="10" cy="8" r="5" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="30" cy="8" r="5" stroke="currentColor" strokeWidth="2.2" />
                <path d="M 15,8 Q 20,4 25,8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </span>

            <span className="font-sans font-semibold text-neutral-900">
              Halflife
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg leading-relaxed text-[#5c5b66] font-normal">
          We help creators and autonomous agents model when content formats begin to decay, projecting exponential half-life curves and alerting you before audience churn hits.
        </p>

        {/* CTA & Social Proof Group (Exact Hanzo Layout: Stacked Social Proof) */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <a
            href="#try-it"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-neutral-950 text-white text-sm font-medium shadow-[0_12px_28px_rgba(0,0,0,0.24)] hover:bg-neutral-800 hover:shadow-[0_16px_36px_rgba(0,0,0,0.32)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch simulator</span>
            <span className="text-neutral-400">→</span>
          </a>

          {/* Social Proof Group: Avatars on top, Tagline stacked underneath */}
          <div className="flex flex-col items-center sm:items-start gap-1">
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
            <span className="text-[11px] sm:text-xs font-medium text-neutral-600 tracking-tight">
              Join The Senior Creators
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
