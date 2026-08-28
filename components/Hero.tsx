"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const avatars = [
    '/images/avatar-1.jpg',
    '/images/avatar-2.jpg',
    '/images/hero-mockup-1.jpg',
    '/images/hero-mockup-2.jpg',
    '/images/hero-mockup-3.jpg',
  ];

  return (
    <section 
      ref={containerRef}
      id="top" 
      className="relative pt-32 pb-24 md:pt-44 md:pb-48 px-6 overflow-hidden bg-[#f0eff5]"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-soft-light" 
           style={{
             backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 100px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.8) 140px, transparent 140px, transparent 240px, rgba(0,0,0,0.03) 240px, rgba(0,0,0,0.03) 280px)',
             backgroundSize: '100% 100%'
           }} 
      />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="mx-auto max-w-[1200px] text-center relative z-10 flex flex-col items-center">
        
        <h1 
          className="flex flex-col items-center gap-1 sm:gap-2 text-[3.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] tracking-tight leading-[1.1] select-none"
          aria-label="Winning formats have a halflife"
        >
          
          <span aria-hidden="true" className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-4 md:gap-5">
            <span className="font-sans font-normal text-neutral-900 tracking-[-0.04em]">
              Winning
            </span>
            
            {/* BLOCK 1: Image Block */}
            <motion.span 
              style={{ y: y1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              initial={{ rotate: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative inline-flex flex-shrink-0 items-center justify-center w-[100px] h-[73px] sm:w-[150px] sm:h-[110px] md:w-[180px] md:h-[132px] rounded-[1.25rem] sm:rounded-[2rem] bg-[#111] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5),0_16px_32px_-8px_rgba(0,0,0,0.4)] border-[2.5px] border-black z-20 mx-1 sm:mx-2 cursor-grab active:cursor-grabbing"
            >
              <div className="absolute inset-0 rounded-inherit pointer-events-none shadow-[inset_0_3px_5px_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1)] z-10" />
              <img src="/images/dashboard-analytics.jpg" className="w-full h-full object-cover" alt="SaaS Analytics Dashboard" />
            </motion.span>
            
            <span className="font-sans font-normal text-neutral-400 tracking-[-0.04em]">
              Formats
            </span>
          </span>

          <span aria-hidden="true" className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-4 md:gap-5 mt-0 sm:mt-2">
            <span className="font-serif italic font-light text-neutral-400 text-[4rem] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[8.5rem] transform translate-y-1 sm:translate-y-2">
              have a
            </span>
            
            {/* BLOCK 2: Dark Grey Illustration Block */}
            <motion.span 
              style={{ y: y2 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              initial={{ rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative inline-flex flex-shrink-0 items-center justify-center w-[100px] h-[73px] sm:w-[150px] sm:h-[110px] md:w-[180px] md:h-[132px] rounded-[1.25rem] sm:rounded-[2rem] bg-gradient-to-b from-[#2a2a2a] to-[#151515] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5),0_16px_32px_-8px_rgba(0,0,0,0.4)] border-[2.5px] border-black z-20 mx-1 sm:mx-2 cursor-grab active:cursor-grabbing"
            >
              <div className="absolute inset-0 rounded-inherit pointer-events-none shadow-[inset_0_3px_5px_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.1)] z-10" />
              
              <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-neutral-400 flex-shrink-0" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6" fill="none" />
                <text x="50" y="55" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="64" textAnchor="middle" dominantBaseline="central" fill="currentColor">λ</text>
              </svg>
            </motion.span>

            <span className="font-sans font-normal text-neutral-900 tracking-[-0.04em]">
              Halflife
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-10 sm:mt-12 max-w-2xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#5c5b66] font-normal tracking-tight">
          Model exactly when your content formats will decay. Project exponential half-life curves, and alert your team before audience churn hits.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          
          <div className="relative p-1.5 sm:p-2 rounded-full bg-black/5 border border-black/10 shadow-[0_8px_24px_rgba(0,0,0,0.05)] backdrop-blur-md flex-shrink-0">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#try-it"
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-neutral-950 text-white text-base font-medium shadow-[0_4px_12px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              <span className="relative z-10">Launch simulator</span>
              <span className="relative z-10 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
            </motion.a>
          </div>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {avatars.map((src, i) => (
                <motion.img
                  key={i}
                  whileHover={{ y: -4, zIndex: 10 }}
                  className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-black/10 object-cover aspect-square bg-white shadow-sm flex-shrink-0"
                  src={src}
                  alt=""
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-medium text-neutral-500 tracking-tight">
              Join The Senior Creators
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
