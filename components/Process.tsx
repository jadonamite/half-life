export default function Process() {
  return (
    <section id="how-it-works" className="relative px-6 py-32 md:py-52 overflow-hidden bg-[#f0eff5]">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
          <span className="h-[1px] w-12 bg-neutral-300" />
          <span>Our Process, Explained</span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-20 sm:mb-28">
          Here&rsquo;s how it works
        </h2>

        {/* 3 Staggered Tilted Cards with Connecting Red Thread SVGs */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
          
          {/* Card 1 (Tilted Left, Double Container) */}
          <div className="relative p-[10px] rounded-[2.5rem] bg-white/60 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-white md:-rotate-2 hover:rotate-0 transition-transform duration-300 z-10">
            <div className="relative rounded-[2rem] bg-white p-8 sm:p-10 border border-black/[0.04] shadow-sm h-full">
              <span className="text-6xl sm:text-7xl font-light text-neutral-900 tracking-tight block mb-12 sm:mb-16">
                1
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight mb-2">
                Ingest & Baseline
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500 font-normal">
                Publish content normally. The first 5 posts in an archetype establish the median benchmark yield (E₀) without arbitrary assumptions.
              </p>
            </div>
          </div>

          {/* SVG Doodle String 1 (Desktop Connection between Card 1 and Card 2) */}
          <div className="hidden md:block absolute left-[28%] top-[10%] w-[16%] h-24 pointer-events-none z-20">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 160 80" fill="none">
              <path
                d="M 10,65 C 30,10 90,5 150,20"
                stroke="#eb5939"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="65" r="4" fill="white" stroke="#eb5939" strokeWidth="2.5" />
              <circle cx="150" cy="20" r="4" fill="white" stroke="#eb5939" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Card 2 (Tilted Right, Double Container) */}
          <div className="relative p-[10px] rounded-[2.5rem] bg-white/60 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-white md:rotate-2 hover:rotate-0 transition-transform duration-300 z-10 md:translate-y-4">
            <div className="relative rounded-[2rem] bg-white p-8 sm:p-10 border border-black/[0.04] shadow-sm h-full">
              <span className="text-6xl sm:text-7xl font-light text-neutral-900 tracking-tight block mb-12 sm:mb-16">
                2
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight mb-2">
                Model Half-Life
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500 font-normal">
                The decay engine fits incoming performance to E(n) = E₀·e^(-λn), projecting the exact number of posts remaining before terminal 50% decay.
              </p>
            </div>
          </div>

          {/* SVG Doodle String 2 (Desktop Looped Connection between Card 2 and Card 3) */}
          <div className="hidden md:block absolute left-[61%] top-[35%] w-[16%] h-28 pointer-events-none z-20">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 160 100" fill="none">
              <path
                d="M 10,20 C 60,10 50,110 100,50 C 120,20 135,40 150,35"
                stroke="#eb5939"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="20" r="4" fill="white" stroke="#eb5939" strokeWidth="2.5" />
              <circle cx="150" cy="35" r="4" fill="white" stroke="#eb5939" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Card 3 (Slightly Tilted Right, Double Container) */}
          <div className="relative p-[10px] rounded-[2.5rem] bg-white/60 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.06)] border border-white md:rotate-1 hover:rotate-0 transition-transform duration-300 z-10">
            <div className="relative rounded-[2rem] bg-white p-8 sm:p-10 border border-black/[0.04] shadow-sm h-full">
              <span className="text-6xl sm:text-7xl font-light text-neutral-900 tracking-tight block mb-12 sm:mb-16">
                3
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 tracking-tight mb-2">
                Autonomous Rotation
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500 font-normal">
                When fatigue triggers (&gt;35% drop), the Mind interrupts unprompted with recommended rotations before your audience churns.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
