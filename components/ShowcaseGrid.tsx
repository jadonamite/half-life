export default function ShowcaseGrid() {
  return (
    <section id="work-showcase" className="relative px-4 sm:px-6 py-12 md:py-20 bg-[#f0eff5]">
      <div className="mx-auto max-w-6xl">
        
        {/* Dashboard Teaser Mockup Container */}
        <div className="relative rounded-[2.5rem] bg-[#111114] border border-black/5 shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] flex items-center justify-center group">
          
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

          {/* Center Button */}
          <div className="relative z-10 flex flex-col items-center">
            <a 
              href="/dashboard" 
              className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-white text-black font-semibold tracking-tight text-base sm:text-lg shadow-[0_16px_40px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300"
            >
              See Live Audit
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
