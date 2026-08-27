export default function TrustBar() {
  const partners = [
    { name: 'Minds Protocol', badge: 'Animoca Brands' },
    { name: 'Exponential Decay', badge: 'E(n) = E₀·e^(-λn)' },
    { name: 'Cross-Session State', badge: 'Persistent Memory' },
    { name: 'Autonomous Push', badge: 'Unprompted Alerts' },
    { name: 'Statistical Floor', badge: 'N ≥ 5 Calibration' },
  ];

  return (
    <section className="border-y border-neutral-300/40 bg-white/50 backdrop-blur-sm py-6">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-xs font-mono font-medium uppercase tracking-widest text-neutral-500">
          Architecture & Rigor
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {partners.map(p => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-neutral-800 tracking-tight">
                {p.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-200/60 text-neutral-600">
                {p.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
