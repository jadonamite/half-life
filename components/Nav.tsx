'use client';

import { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-5 md:p-8">
      <div className="mx-auto max-w-7xl flex items-center justify-between pointer-events-auto">
        {/* Luxury Word Mark Logo (No Pill Enclosure) */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="font-serif italic text-2xl sm:text-[1.75rem] font-medium text-neutral-900 tracking-[-0.02em] select-none">
            Half—Life
          </span>
        </a>

        {/* Hamburger / Menu Action Button (Exact Hanzo circular button) */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md shadow-[0_2px_14px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col items-center justify-center gap-1.5 hover:bg-white transition-all transform hover:scale-105 focus:outline-none"
          >
            <span
              className={`w-4 h-[1.5px] bg-neutral-900 transition-transform duration-200 ${
                isOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`w-4 h-[1.5px] bg-neutral-900 transition-transform duration-200 ${
                isOpen ? '-rotate-45 -translate-y-[1.5px]' : ''
              }`}
            />
          </button>

          {/* Clean Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-3 w-60 rounded-3xl bg-white/95 backdrop-blur-2xl shadow-[0_20px_45px_rgba(0,0,0,0.14)] border border-black/[0.05] p-3 flex flex-col gap-1 z-50">
              <a
                href="#how-it-works"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              >
                How it works
              </a>
              <a
                href="#work-showcase"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              >
                Format Showcase
              </a>
              <a
                href="#architecture"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              >
                Guarantees & Math
              </a>
              <a
                href="#terms"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              >
                Decay Thresholds
              </a>
              <a
                href="#faq"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 rounded-2xl text-sm font-medium text-neutral-700 hover:bg-neutral-100/80 transition-colors"
              >
                FAQ
              </a>
              <div className="my-1.5 h-[1px] bg-neutral-100" />
              <a
                href="#try-it"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-neutral-950 text-white text-center hover:bg-neutral-800 transition-colors"
              >
                Launch Simulator →
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
