import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default function Timeline() {
  const steps = [
    {
      title: 'Core Problem Formalization',
      pills: ['Strategy', 'Research'],
      description: 'Applied 70-year performance marketing creative-fatigue detection to creator content formats to prevent audience burnout.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Decay Engine & Math Suite',
      pills: ['TypeScript', 'Math'],
      description: 'Implemented exponential decay lambda computation, rolling median baselines, and half-life post runway estimation.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Persistent Memory Store',
      pills: ['Database', 'Architecture'],
      description: 'Built cross-session format registry and post history persistence with unprompted alert dispatch queuing.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Minds Bazaar Integration',
      pills: ['AI', 'Agent'],
      description: 'Authored "Half-Life" skill with format audit, post ingestion, and autonomous proactive fatigue alerting tools.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200'
    },
  ];

  return (
    <section id="about" className="relative px-6 py-24 md:py-36 overflow-hidden bg-[#f0eff5]">
      <div className="mx-auto max-w-6xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
          <span className="h-[1px] w-12 bg-neutral-300" />
          <span>About the Build</span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-16 sm:mb-20">
          From first idea to persistent Mind
        </h2>

        {/* Timeline Stack matching the uploaded dark UI reference */}
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row bg-[#0a0a0a] rounded-[2rem] border border-white/10 overflow-hidden"
            >
              
              {/* Left Column: Title + Arrow */}
              <div className="flex flex-col justify-between p-8 md:p-12 md:w-[35%] border-b md:border-b-0 md:border-r border-white/10">
                <h3 className="text-3xl md:text-4xl font-medium text-white tracking-[-0.02em] leading-tight">
                  {step.title}
                </h3>
                
                <div className="mt-12 md:mt-auto">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors cursor-pointer">
                    <ArrowUpRight size={20} weight="bold" />
                  </div>
                </div>
              </div>

              {/* Middle Column: Text + Pills */}
              <div className="flex flex-col justify-between p-8 md:p-12 md:w-[35%] border-b md:border-b-0 md:border-r border-white/10">
                <p className="text-neutral-300 text-base md:text-lg leading-relaxed">
                  {step.description}
                </p>
                
                <div className="mt-12 md:mt-auto flex flex-wrap gap-3">
                  {step.pills.map(pill => (
                    <span key={pill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white tracking-wide">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="md:w-[30%] relative min-h-[250px] md:min-h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50" />
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
