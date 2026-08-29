'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MagicWand, Link as LinkIcon, PaperPlaneRight } from '@phosphor-icons/react';

interface InjectPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InjectPostModal({ isOpen, onClose }: InjectPostModalProps) {
  const [url, setUrl] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const handleInject = () => {
    if (!url) return;
    setIsSimulating(true);
    
    // Simulate ingestion time
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationComplete(true);
      
      // Auto close after showing success
      setTimeout(() => {
        setSimulationComplete(false);
        setUrl('');
        onClose();
      }, 2000);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-premium-glass backdrop-blur-2xl border-l border-premium-glass-border shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-premium-glass-border">
              <div>
                <h2 className="text-xl font-medium tracking-tight text-ink">Inject Post Data</h2>
                <p className="text-sm text-ink-2 mt-1">Calibrate decay engine with a live URL</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 border border-white hover:bg-white transition-colors"
              >
                <X weight="bold" className="text-ink" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
              
              {!simulationComplete ? (
                <div className="space-y-8">
                  {/* URL Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-ink flex items-center gap-2">
                      <LinkIcon weight="bold" /> Content URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://x.com/jadonamite/status/123..."
                        className="w-full bg-white/50 border border-white focus:border-accent outline-none rounded-2xl px-5 py-4 text-sm shadow-sm transition-all text-ink placeholder:text-ink-2/50"
                        disabled={isSimulating}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-mono font-bold bg-white px-2 py-1 rounded-md text-ink-2 border border-black/5">
                        Required
                      </div>
                    </div>
                  </div>

                  {/* Manual Overrides */}
                  <div className="space-y-3 opacity-50 pointer-events-none">
                    <label className="text-sm font-medium text-ink">Manual Override (Optional)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Impressions"
                        className="w-full bg-white/30 border border-transparent rounded-xl px-4 py-3 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Engagements"
                        className="w-full bg-white/30 border border-transparent rounded-xl px-4 py-3 text-sm"
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-accent/5 border border-accent/10 rounded-2xl p-5 flex gap-4">
                    <MagicWand weight="fill" className="text-accent text-xl shrink-0 mt-0.5" />
                    <p className="text-sm text-ink/80 leading-relaxed">
                      Halflife will autonomously scrape the metric payload, cross-reference your baseline <span className="font-mono text-xs">E₀</span>, and immediately update the trailing decay curve for this format.
                    </p>
                  </div>
                </div>
              ) : (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                    <MagicWand weight="fill" className="text-3xl" />
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight">Payload Ingested</h3>
                  <p className="text-sm text-ink-2">The decay curve has been re-calibrated. Recalculating runway...</p>
                </motion.div>
              )}

            </div>

            {/* Footer Action */}
            <div className="p-6 sm:p-8 border-t border-premium-glass-border bg-white/30">
              <button
                onClick={handleInject}
                disabled={!url || isSimulating || simulationComplete}
                className="relative w-full h-[52px] rounded-full bg-ink text-white font-medium text-sm flex items-center justify-center gap-2 overflow-hidden transition-all hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSimulating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Ingesting Telemetry...
                  </span>
                ) : simulationComplete ? (
                  <span>Success</span>
                ) : (
                  <>
                    <PaperPlaneRight weight="bold" />
                    <span>Run Engine Audit</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
