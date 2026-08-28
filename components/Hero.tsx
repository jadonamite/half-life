"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Subtle parallax effects for the 3D objects
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
      {/* Diagonal Window Blind / Light Ray Environment */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-soft-light" 
           style={{
             backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 100px, rgba(255,255,255,0.8) 100px, rgba(255,255,255,0.8) 140px, transparent 140px, transparent 240px, rgba(0,0,0,0.03) 240px, rgba(0,0,0,0.03) 280px)',
             backgroundSize: '100% 100%'
           }} 
      />
      
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="mx-auto max-w-[1200px] text-center relative z-10 flex flex-col items-center">
        
        <h1 
          className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 text-[3.5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[7.5rem] font-semibold tracking-[-0.04em] text-neutral-900 leading-[1.05] select-none"
          aria-label="Winning formats have a halflife"
        >
          
          {/* TOP LINE */}
          <span aria-hidden="true" className="inline-flex items-center flex-wrap justify-center gap-3 sm:gap-6 md:gap-8">
            <span className="font-sans font-semibold text-neutral-900">
              Winning
            </span>
            
            {/* 3D Service Mockup Card (Chunky & Diffuse Shadow) */}
            <motion.span 
              style={{ y: y1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              initial={{ rotate: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative inline-flex items-center justify-center p-1.5 sm:p-2 bg-[#dfdee5] rounded-3xl sm:rounded-[2.5rem] border border-white/40 shadow-[0_8px_16px_rgba(0,0,0,0.04),0_16px_32px_rgba(0,0,0,0.06),0_32px_80px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.8)] z-20 cursor-grab active:cursor-grabbing"
            >
              <div className="w-[110px] h-[70px] sm:w-[160px] sm:h-[100px] md:w-[200px] md:h-[120px] rounded-2xl sm:rounded-[2rem] bg-gradient-to-tr from-[#15151c] to-[#242430] p-3 flex flex-col justify-between overflow-hidden relative border border-neutral-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono">
                  <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    -41%
                  </span>
                  <span className="text-neutral-400 font-medium">t₁/₂: 3</span>
                </div>
                <svg className="w-full h-8 sm:h-12 overflow-visible" viewBox="0 0 60 20" fill="none">
                  <path d="M 2,4 C 16,5 32,13 58,18" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 2px 4px rgba(245,158,11,0.4))' }} />
                  <path d="M 2,12 C 20,12 40,11 58,10" stroke="#10b981" strokeWidth="2" strokeDasharray="2 3" strokeLinecap="round" />
                </svg>
              </div>
            </motion.span>
            
            <span className="font-sans font-light text-neutral-400">
              Formats
            </span>
          </span>

          {/* BOTTOM LINE */}
          <span aria-hidden="true" className="inline-flex items-center flex-wrap justify-center gap-3 sm:gap-6 md:gap-8 mt-[-10px] sm:mt-[-20px]">
            <span className="font-serif italic font-light text-neutral-500 text-[4rem] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[8.5rem] transform -translate-y-1 sm:-translate-y-4">
              have a
            </span>
            
            {/* 3D Matte Black Pill (Extreme Specular Lighting & Ambient Occlusion) */}
            <motion.span 
              style={{ y: y2 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              initial={{ rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="relative inline-flex items-center justify-center px-6 py-3 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-gradient-to-b from-[#2e2e2e] to-[#0a0a0a] rounded-full border border-[#111] shadow-[0_16px_40px_rgba(0,0,0,0.3),0_8px_16px_rgba(0,0,0,0.2),0_32px_80px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.4),inset_0_-3px_6px_rgba(0,0,0,0.8)] z-20 cursor-grab active:cursor-grabbing"
            >
              <svg className="w-10 h-5 sm:w-16 sm:h-8 md:w-20 md:h-10 text-neutral-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" viewBox="0 0 40 16" fill="none">
                <circle cx="10" cy="8" r="4.5" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="30" cy="8" r="4.5" stroke="currentColor" strokeWidth="2.5" />
                <path d="M 14.5,8 Q 20,3 25.5,8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </motion.span>

            <span className="font-sans font-semibold text-neutral-900">
              Halflife
            </span>
          </span>
        </h1>

        <p className="mx-auto mt-12 sm:mt-16 max-w-2xl text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#5c5b66] font-medium tracking-tight">
          Model exactly when your content formats will decay. Project exponential half-life curves, and alert your team before audience churn hits.
        </p>

        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#try-it"
            className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-neutral-950 text-white text-base font-semibold shadow-[0_12px_28px_rgba(0,0,0,0.24)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] overflow-hidden transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            <span className="relative z-10">Launch simulator</span>
            <span className="relative z-10 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
          </motion.a>

          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex -space-x-3 overflow-hidden p-1">
              {avatars.map((src, i) => (
                <motion.img
                  key={i}
                  whileHover={{ y: -4, zIndex: 10 }}
                  className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-4 ring-[#f0eff5] object-cover aspect-square bg-white shadow-sm"
                  src={src}
                  alt=""
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-neutral-500 tracking-tight">
              Join The Senior Creators
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
