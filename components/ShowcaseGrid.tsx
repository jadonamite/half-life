export default function ShowcaseGrid() {
  return (
    <section id="work-showcase" className="relative px-4 sm:px-6 py-12 md:py-20 bg-[#f0eff5]">
      <div className="mx-auto max-w-6xl">
        
        {/* Dashboard Teaser Mockup Container */}
        <div className="relative rounded-[2.5rem] bg-[#111114] border border-black/5 shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group cursor-pointer" onClick={() => window.location.href = '/dashboard'}>
          
          {/* Background Dashboard Mockup Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="/dashboard-ui.jpeg" 
              alt="Dashboard Preview" 
              className="w-full h-full object-cover object-top blur-[5px] opacity-90 group-hover:blur-[8px] group-hover:opacity-75 transition-all duration-700 ease-out scale-105" 
            />
            {/* Subtle dark gradient overlay to make the button pop */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-700 ease-out" />
          </div>

          {/* Floating Action Button (Hanzo Style) */}
          <div className="relative z-10 flex flex-col items-center justify-center -mt-8 transition-transform duration-500 group-hover:scale-105">
            {/* Tooltip Pill */}
            <div className="relative mb-3 px-4 py-2 rounded-full bg-[#111] border border-neutral-700 text-[11px] font-semibold text-white tracking-wide shadow-xl">
              See Live Audit
              {/* Tooltip Triangle */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111] border-b border-r border-neutral-700 rotate-45" />
            </div>
            
            {/* Circular Base with Lambda Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#e3dfd8] text-neutral-950 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/60">
              <svg className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none" />
                <text x="50" y="55" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="64" textAnchor="middle" dominantBaseline="central" fill="currentColor">λ</text>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
