const GITHUB_URL = 'https://github.com/jadonamite/half-life';

export default function Footer() {
  return (
    <footer className="relative bg-[#0b0b0e] text-white pt-28 pb-14 px-6 overflow-hidden">
      
      {/* Diagonal Subtle Light Ray Effect */}
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-20%,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl relative z-10 text-center">
        
        {/* Subtitle with Accent Lines */}
        <div className="flex items-center justify-center gap-4 text-white/50 font-serif italic text-lg mb-6">
          <span className="h-[1px] w-10 bg-white/20" />
          <span>Creative Minds Jam #1</span>
          <span className="h-[1px] w-10 bg-white/20" />
        </div>

        {/* Giant Heading */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.04em] text-white mb-6 leading-tight">
          Let&rsquo;s <span className="text-white/70">Connect</span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto max-w-xl text-base sm:text-lg text-neutral-400 font-normal leading-relaxed mb-10">
          Experience autonomous creative fatigue modeling. Query the Minds Bazaar Skill, track format half-life decay curves, or launch the interactive live simulator.
        </p>

        {/* Pill CTA Button */}
        <div className="flex justify-center mb-24">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Launch Live Simulator</span>
            <span className="text-neutral-300">→</span>
          </a>
        </div>

        {/* Bottom Bar: Copyright & Circular Social/Link Icons */}
        <div className="pt-10 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          
          {/* Luxury Wordmark & Copyright */}
          <div className="flex items-center gap-4">
            <div className="font-serif italic font-medium text-2xl tracking-tight text-white">
              Halflife
            </div>
            <div className="px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/60 font-mono flex items-center">
              <span>@Copyright 2026</span>
            </div>
          </div>

          {/* Circular Social & Explorer Links */}
          <div className="flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              title="GitHub Repository"
              className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
