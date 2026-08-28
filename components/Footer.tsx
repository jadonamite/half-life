const GITHUB_URL = 'https://github.com/jadonamite/half-life';
const X_URL = 'https://x.com/jadonamite';

export default function Footer() {
  return (
    <footer className="relative bg-[#08080a] text-white pt-28 pb-14 px-6 overflow-hidden">
      
      {/* Irradiance / Light Ray Effect (Hanzo Top-Left God Rays) */}
      <div className="absolute -top-[20%] -left-[10%] w-[100%] sm:w-[70%] h-[200%] bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent origin-top-left -rotate-[25deg] blur-2xl pointer-events-none" />
      <div className="absolute -top-[10%] left-[5%] w-[40%] h-[200%] bg-gradient-to-b from-white/[0.06] to-transparent origin-top -rotate-45 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-20%,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl relative z-10 text-center">
        
        {/* Subtitle with Accent Lines */}
        <div className="flex items-center justify-center gap-4 text-white/40 font-serif italic text-sm sm:text-base mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-white/10" />
          <span>2 spots available</span>
          <span className="h-[1px] w-8 sm:w-12 bg-white/10" />
        </div>

        {/* Giant Heading */}
        <h2 className="text-6xl sm:text-7xl md:text-8xl font-medium tracking-[-0.04em] text-white mb-6 leading-tight">
          Let&rsquo;s <span className="text-white/60">Connect</span>
        </h2>

        {/* Subtext */}
        <p className="mx-auto max-w-lg text-sm sm:text-base text-neutral-400 font-normal leading-relaxed mb-10">
          Feel free to contact me if having any questions.<br/>
          I&apos;m available for new projects or just for chatting.
        </p>

        {/* Pill CTA Button (Hanzo Style) */}
        <div className="flex justify-center mb-28">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/10 text-white text-sm font-medium transition-all"
          >
            <span>Book a free intro call</span>
            <span className="text-white/60">→</span>
          </a>
        </div>

        {/* Bottom Bar: Copyright & Circular Social/Link Icons */}
        <div className="pt-0 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          
          {/* Copyright Top & Bottom Border Style (Hanzo Match) */}
          <div className="border-y border-white/10 py-3 font-sans text-[11px] sm:text-[13px] text-white/80 tracking-wide">
            @HALFLIFE2026
          </div>

          {/* Circular Social & Explorer Links */}
          <div className="flex items-center gap-3">
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              title="X (Twitter)"
              className="w-10 h-10 rounded-full border border-white/10 bg-transparent hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-white/70"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              title="GitHub Repository"
              className="w-10 h-10 rounded-full border border-white/10 bg-transparent hover:bg-white/10 hover:text-white flex items-center justify-center transition-colors text-white/70"
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
