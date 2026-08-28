"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function RevealWord({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const color = useTransform(progress, range, ["#c4c4ce", "#171717"]);
  return (
    <motion.span style={{ color }} className="mr-[0.25em] inline-block transition-colors duration-150">
      {children}
    </motion.span>
  );
}

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll for the entire section to drive text reveal and parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  // Dynamic parallax for the floating pills
  const yTop = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const yBot = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const leftChips = [
    {
      title: 'Persistent Memory',
      color: 'bg-orange-500',
      y: yTop,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      title: 'Decay Continuity',
      color: 'bg-[#18181d]',
      y: yMid,
      icon: (
        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Autonomous Alert',
      color: 'bg-cyan-500',
      y: yBot,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
  ];

  const rightChips = [
    {
      title: 'Decay Math (λ)',
      color: 'bg-emerald-500',
      y: yTop,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'N ≥ 5 Confidence',
      color: 'bg-pink-500',
      y: yMid,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Format Rotation',
      color: 'bg-amber-500',
      y: yBot,
      icon: (
        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ];

  const statementText = "We help creators and autonomous agents to model format decay curves before creative fatigue turns into audience churn";
  const words = statementText.split(" ");

  return (
    <section ref={containerRef} id="the-problem" className="relative px-6 py-28 md:py-48 overflow-hidden bg-[#f0eff5]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header (Exact Hanzo "Hello!" style from Reference) */}
        <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-16 sm:mb-24">
          <span className="h-[1px] w-12 bg-neutral-300" />
          <span>Hello!</span>
          <span className="h-[1px] w-12 bg-neutral-300" />
        </div>

        {/* Core Layout: Centered Statement with Floating Crescent 3D Chips */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Floating Chips */}
          <div className="hidden lg:flex flex-col gap-8 items-end w-64 z-20">
            {leftChips.map((chip, idx) => (
              <motion.div
                key={chip.title}
                style={{ y: chip.y }}
                className="inline-flex items-center gap-3.5 px-5 py-3 rounded-full bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.08)] border border-black/[0.02] text-[13px] font-semibold text-neutral-800"
                initial={{ x: idx === 1 ? 24 : 0 }} // Static offset for crescent shape
              >
                <span className={`w-8 h-8 rounded-full ${chip.color} flex items-center justify-center shadow-sm`}>
                  {chip.icon}
                </span>
                <span>{chip.title}</span>
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
          <div className="hidden lg:flex flex-col gap-8 items-start w-64 z-20">
            {rightChips.map((chip, idx) => (
              <motion.div
                key={chip.title}
                style={{ y: chip.y }}
                className="inline-flex items-center gap-3.5 px-5 py-3 rounded-full bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.08)] border border-black/[0.02] text-[13px] font-semibold text-neutral-800"
                initial={{ x: idx === 1 ? -24 : 0 }}
              >
                <span className={`w-8 h-8 rounded-full ${chip.color} flex items-center justify-center shadow-sm`}>
                  {chip.icon}
                </span>
                <span>{chip.title}</span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Mobile Chips Row */}
        <div className="mt-16 flex lg:hidden flex-wrap items-center justify-center gap-4">
          {[...leftChips, ...rightChips].map(chip => (
            <div
              key={chip.title}
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white shadow-[0_16px_32px_-8px_rgba(0,0,0,0.12)] border border-black/[0.03] text-xs font-semibold text-neutral-800"
            >
              <span className={`w-7 h-7 rounded-full ${chip.color} flex items-center justify-center shadow-sm`}>
                {chip.icon}
              </span>
              <span>{chip.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
