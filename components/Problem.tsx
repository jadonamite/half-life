"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  SquaresFour, 
  TrendUp, 
  BellRing, 
  Function, 
  ShieldCheck, 
  ArrowsClockwise 
} from '@phosphor-icons/react';

function RevealWord({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  // Color transitions from a distinct light grey to solid black
  const color = useTransform(progress, range, ["#c4c4ce", "#171717"]);
  return (
    <motion.span style={{ color }} className="mr-[0.25em] inline-block transition-colors duration-75">
      {children}
    </motion.span>
  );
}

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll for the entire section to drive text reveal and parallax
  // ADJUSTED TIMING: Starts earlier (start 95%) and finishes earlier (center 55%)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 95%", "center 55%"]
  });

  // Dynamic parallax for the floating pills
  const yTop = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yBot = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const leftChips = [
    {
      title: 'Design systems',
      color: 'bg-[#FF5A36]', // Match the orange from the screenshot
      y: yTop,
      rotate: -5,
      icon: <SquaresFour weight="fill" size={16} className="text-[#FFEFEA]" />,
    },
    {
      title: 'Decay Continuity',
      color: 'bg-[#18181d]',
      y: yMid,
      rotate: -2,
      icon: <TrendUp weight="bold" size={16} className="text-emerald-400" />,
    },
    {
      title: 'Autonomous Alert',
      color: 'bg-[#00B2FF]',
      y: yBot,
      rotate: -6,
      icon: <BellRing weight="fill" size={16} className="text-white" />,
    },
  ];

  const rightChips = [
    {
      title: 'Decay Math (λ)',
      color: 'bg-[#00D084]',
      y: yTop,
      rotate: 4,
      icon: <Function weight="bold" size={16} className="text-white" />,
    },
    {
      title: 'N ≥ 5 Confidence',
      color: 'bg-[#FF4081]',
      y: yMid,
      rotate: 2,
      icon: <ShieldCheck weight="fill" size={16} className="text-white" />,
    },
    {
      title: 'Format Rotation',
      color: 'bg-[#FFB300]',
      y: yBot,
      rotate: 5,
      icon: <ArrowsClockwise weight="bold" size={16} className="text-white" />,
    },
  ];

  const statementText = "We help creators and autonomous agents to model format decay curves before creative fatigue turns into audience churn";
  const words = statementText.split(" ");

  return (
    <section ref={containerRef} id="the-problem" className="relative px-6 py-28 md:py-48 overflow-hidden bg-[#f0eff5]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-16 sm:mb-24">
          <span className="h-[1px] w-12 bg-neutral-300" />
          <span>Hello!</span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        {/* Core Layout: Centered Statement with Floating Crescent 3D Chips */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Floating Chips */}
          <div className="hidden lg:flex flex-col gap-8 items-end w-72 z-20">
            {leftChips.map((chip, idx) => (
              <motion.div
                key={chip.title}
                style={{ y: chip.y }}
                initial={{ x: idx === 1 ? 24 : 0, rotate: chip.rotate }}
                whileHover={{ scale: 1.05 }}
                className="group p-[6px] rounded-full bg-black/[0.04] backdrop-blur-md shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] border border-white/40 cursor-pointer"
              >
                {/* Inner Crisp Button */}
                <div className="flex items-center gap-3 pl-2 pr-5 py-2 bg-white rounded-full border border-black/[0.04] shadow-sm transition-colors group-hover:bg-neutral-50">
                  <div className={`w-[28px] h-[28px] rounded-full ${chip.color} flex items-center justify-center shadow-inner`}>
                    {chip.icon}
                  </div>
                  <span className="text-[14px] font-medium text-neutral-800 tracking-tight whitespace-nowrap">
                    {chip.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Central Main Statement with Scroll Reveal Effect */}
          <div className="max-w-4xl text-center z-10 px-4">
            <h2 className="text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-medium tracking-[-0.04em] leading-[1.25]">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <RevealWord key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </RevealWord>
                );
              })}
            </h2>
          </div>

          {/* Right Floating Chips */}
          <div className="hidden lg:flex flex-col gap-8 items-start w-72 z-20">
            {rightChips.map((chip, idx) => (
              <motion.div
                key={chip.title}
                style={{ y: chip.y }}
                initial={{ x: idx === 1 ? -24 : 0, rotate: chip.rotate }}
                whileHover={{ scale: 1.05 }}
                className="group p-[6px] rounded-full bg-black/[0.04] backdrop-blur-md shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] border border-white/40 cursor-pointer"
              >
                {/* Inner Crisp Button */}
                <div className="flex items-center gap-3 pl-2 pr-5 py-2 bg-white rounded-full border border-black/[0.04] shadow-sm transition-colors group-hover:bg-neutral-50">
                  <div className={`w-[28px] h-[28px] rounded-full ${chip.color} flex items-center justify-center shadow-inner`}>
                    {chip.icon}
                  </div>
                  <span className="text-[14px] font-medium text-neutral-800 tracking-tight whitespace-nowrap">
                    {chip.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Mobile Chips Row (Simplified for mobile) */}
        <div className="mt-16 flex lg:hidden flex-wrap items-center justify-center gap-4">
          {[...leftChips, ...rightChips].map(chip => (
            <div
              key={chip.title}
              className="p-[4px] rounded-full bg-black/[0.04] border border-white/40"
            >
              <div className="flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 bg-white rounded-full border border-black/[0.04] shadow-sm">
                <div className={`w-[24px] h-[24px] rounded-full ${chip.color} flex items-center justify-center`}>
                  {chip.icon}
                </div>
                <span className="text-[13px] font-medium text-neutral-800 tracking-tight">
                  {chip.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
