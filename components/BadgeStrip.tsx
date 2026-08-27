export default function BadgeStrip() {
  const badges = [
    'Exponential decay model',
    'Unprompted proactive alerts',
    'Cross-session memory',
    'Longitudinal continuity',
    'N ≥ 5 statistical floor',
    'Half-life runway projection',
    'Creative fatigue detection',
    'Audience churn prevention',
    'Minds Bazaar Native',
  ];

  return (
    <section className="py-10 border-y border-neutral-300/40 bg-white/40 backdrop-blur-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {badges.map((badge, i) => (
            <div
              key={badge}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-black/[0.04] text-xs font-medium text-neutral-700"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
              <span>{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
