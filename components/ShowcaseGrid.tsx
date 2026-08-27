export default function ShowcaseGrid() {
  return (
    <section id="work-showcase" className="relative px-4 sm:px-6 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        
        {/* Dark Container Shell (Exact Hanzo style from Image 1) */}
        <div className="relative rounded-[2.5rem] bg-[#111114] border border-neutral-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.45)] p-6 sm:p-10 md:p-14 overflow-hidden">
          
          {/* Subtle background radial glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Center Badge (Exact Hanzo "See Recent Work" Folder Badge) */}
          <div className="relative flex flex-col items-center justify-center -mt-2 mb-10 sm:mb-14 z-20">
            <div className="mb-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-[11px] font-medium text-neutral-300 shadow-md">
              See Format Intelligence in Action
            </div>
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#e3dfd8] text-neutral-900 flex items-center justify-center shadow-xl border border-white/60 transform hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>

          {/* Masonry / Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6 sm:gap-8">
              
              {/* Card 1: Live Decay Tracking */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/60 aspect-[4/3] flex items-center justify-center">
                  <img
                    src="/images/hero-mockup-3.jpg"
                    alt="Format Fatigue Stream"
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 bg-black/70 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      Baseline: 5.2% Yield
                    </span>
                    <span className="font-mono text-neutral-300 bg-black/70 px-2.5 py-1 rounded-full">
                      Trailing: 3.8% (-41%)
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Longitudinal Decay Tracking</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    Zero guesswork. Incoming post impressions and engagements continuously update the rolling median and compute exact decay deltas.
                  </p>
                </div>
              </div>

              {/* Card 2: Persistent Memory */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/60 aspect-[16/10] flex items-center justify-center">
                  <img
                    src="/images/case-1.png"
                    alt="Cross-Session Memory State"
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Cross-Session Persistent Memory</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    The Mind remembers past format milestones, baseline records, and individual post histories across conversations without re-uploading spreadsheets.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 sm:gap-8 md:mt-10">
              
              {/* Card 3: Autonomous Mind Alerting */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/60 aspect-[16/10] flex items-center justify-center">
                  <img
                    src="/images/hero-mockup-2.jpg"
                    alt="Minds Bazaar Skill: Half-Life"
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="font-mono text-[11px] font-semibold text-blue-400 bg-neutral-900/90 border border-blue-500/30 px-3 py-1 rounded-full shadow-md">
                      Minds Skill: Half-Life
                    </span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Unprompted Autonomous Alerts</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    When a format crosses into <code>FATIGUING</code> or <code>DECAYED</code>, the Mind interrupts unprompted with recommended rotation formats.
                  </p>
                </div>
              </div>

              {/* Card 4: Statistical Floor Enforcement */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/60 aspect-[4/3] flex items-center justify-center">
                  <img
                    src="/images/case-4.png"
                    alt="Honest Cold-Start Floor"
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Honest N ≥ 5 Confidence Gate</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    Under-sampled formats (&lt;5 posts) are held in probation, proudly refusing to hallucinate premature fatigue curves until confidence is reached.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
