export default function ShowcaseGrid() {
  return (
    <section id="work-showcase" className="relative px-4 sm:px-6 py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        
        {/* Dark Container Shell (Exact Hanzo style from Reference) */}
        <div className="relative rounded-[2.5rem] bg-[#111114] border border-neutral-800/80 shadow-[0_30px_70px_rgba(0,0,0,0.45)] p-6 sm:p-10 md:p-14 overflow-hidden">
          
          {/* Subtle background radial glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Center Badge (Exact Hanzo "See Recent Work" Folder Badge) */}
          <div className="relative flex flex-col items-center justify-center -mt-2 mb-10 sm:mb-14 z-20">
            <div className="mb-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-[11px] font-medium text-neutral-300 shadow-md">
              See Live Audits
            </div>
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#e3dfd8] text-neutral-900 flex items-center justify-center shadow-xl border border-white/60 transform hover:scale-105 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
          </div>

          {/* Masonry Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
            
            {/* Left Column */}
            <div className="flex flex-col gap-6 sm:gap-8">
              
              {/* Card 1: Evergreen Healthy Format Audit */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 p-5 border border-neutral-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      HEALTHY · N = 18 POSTS
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      t₁/₂ &gt; 24 Posts
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-neutral-400 font-mono mb-1">ARCHETYPE: BREAKDOWN</div>
                    <div className="text-sm font-semibold text-white">System Architecture Deep-Dives</div>
                  </div>

                  {/* Stable Trend Line Visual */}
                  <div className="bg-[#121217] rounded-xl p-3 border border-neutral-800/60 mb-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs text-neutral-400 font-mono">Baseline Rate: 5.2%</span>
                      <span className="text-xs font-mono font-bold text-emerald-400">+4.1% Trailing</span>
                    </div>
                    <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 40" fill="none">
                      <path
                        d="M 5,28 C 30,26 60,30 90,24 C 120,20 150,22 195,18"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <line x1="5" y1="28" x2="195" y2="28" stroke="#333" strokeDasharray="3 3" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1 border-t border-neutral-800/60">
                    <span>24.8k Impressions</span>
                    <span className="text-white">1,290 Engagements</span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Longitudinal Format Stability</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    Formats with consistent hook variance maintain stable reach. Halflife tracks the rolling median baseline across months to distinguish natural noise from true decay.
                  </p>
                </div>
              </div>

              {/* Card 2: Fatiguing Format with Downward Half-Life Curve */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 p-5 border border-amber-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      FATIGUE ALERT · N = 8 POSTS
                    </span>
                    <span className="font-mono text-[11px] text-amber-400 font-bold">
                      -41.5% Yield
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-neutral-400 font-mono mb-1">ARCHETYPE: OPINION</div>
                    <div className="text-sm font-semibold text-white">1-Sentence Controversial Hot Takes</div>
                  </div>

                  {/* Steep Decay Curve Visual */}
                  <div className="bg-[#121217] rounded-xl p-3 border border-neutral-800/60 mb-3">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-xs text-neutral-400 font-mono">Baseline: 6.5% → Trailing: 3.8%</span>
                      <span className="text-xs font-mono font-bold text-amber-400">λ = 0.16</span>
                    </div>
                    <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 40" fill="none">
                      <path
                        d="M 5,8 C 45,10 90,26 195,36"
                        stroke="#f59e0b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <line x1="5" y1="8" x2="195" y2="8" stroke="#444" strokeDasharray="3 3" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-300/80 pt-1 border-t border-neutral-800/60">
                    <span>Runway to 50% decay:</span>
                    <span className="font-bold text-amber-400">~3 Posts Remaining</span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Exponential Decay Modeling</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    Exponential decay curves mathematically project the remaining runway before audience saturation turns into permanent subscriber unfollows.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 sm:gap-8 md:mt-10">
              
              {/* Card 3: Autonomous Mind Interception Dispatch */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 p-5 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
                      MINDS PROTOCOL · AUTONOMOUS DISPATCH
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">
                      Unprompted
                    </span>
                  </div>

                  {/* Conversational Message Bubble */}
                  <div className="bg-[#121217] rounded-xl p-3.5 border border-cyan-500/20 mb-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>JadonCreator (Persistent Mind)</span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                      &ldquo;⚠️ Fatigue Alert: &apos;Quick Hot Takes&apos; has dropped 41.5% below your 6.5% baseline. Recommend immediate 30-day rotation into &apos;System Architecture Teardowns&apos;.&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700">
                      Auto-Logged to Session Memory
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Unprompted Autonomous Alerts</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    The Mind does not wait for human prompting. When decay breaches the 35% warning gate, it autonomously sends actionable rotation playbooks.
                  </p>
                </div>
              </div>

              {/* Card 4: Honest Statistical Confidence Floor */}
              <div className="group relative rounded-3xl bg-[#18181d] border border-neutral-800 p-5 sm:p-6 overflow-hidden hover:border-neutral-700 transition-all duration-300 shadow-lg">
                <div className="relative rounded-2xl overflow-hidden bg-neutral-950/80 p-5 border border-neutral-800/80">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded-full border border-neutral-700">
                      STATISTICAL GUARD · N = 3 POSTS
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500">
                      Confidence: 60%
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-xs text-neutral-400 font-mono mb-1">ARCHETYPE: VIDEO CURATION</div>
                    <div className="text-sm font-semibold text-white">30-Second Podcast Video Snippets</div>
                  </div>

                  {/* Calibration Bar */}
                  <div className="bg-[#121217] rounded-xl p-3 border border-neutral-800/60 mb-3 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-neutral-400">
                      <span>Baseline Calibration:</span>
                      <span className="text-white">3 / 5 Minimum Posts</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="w-[60%] h-full bg-cyan-400 rounded-full" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pt-1 border-t border-neutral-800/60">
                    <span>Decay Engine Status:</span>
                    <span className="text-neutral-300 font-semibold">HOLDING FOR CALIBRATION</span>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-white">Honest N ≥ 5 Confidence Gate</h3>
                  <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
                    Halflife strictly refuses to hallucinate decay on 1 or 2 posts. Formats remain in probationary calibration until 5 posts establish a robust empirical median.
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
