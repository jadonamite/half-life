import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ShowcaseGrid from '@/components/ShowcaseGrid';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Architecture from '@/components/Architecture';
import Timeline from '@/components/Timeline';
import TermsCard from '@/components/TermsCard';
import Faq from '@/components/Faq';

import Dashboard from '@/components/Dashboard'; // just checking if it was fully removed
import Footer from '@/components/Footer';
import TerminalPreview from '@/components/TerminalPreview';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased selection:bg-accent selection:text-paper">
      {/* 1. Header Navigation */}
      <Nav />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Product Showcase Masonry & Badge (Peeking smoothly below hero) */}
        <ShowcaseGrid />

        {/* 4. Problem & 3D Floating Chips */}
        <Problem />

        {/* 5. Process with Tilted Cards & Red Doodle Strings */}
        <Process />

        {/* 6. Guarantees & Architectural Boundaries */}
        <Architecture />

        {/* 7. Build Timeline */}
        <Timeline />

        {/* 8. Decay Thresholds Card */}
        <TermsCard />

        {/* 9. Badge Strip */}

        {/* 10. FAQ Accordion */}
        <Faq />

        {/* 11. Conversational Terminal Section */}
        <section className="px-6 py-24 bg-paper">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl sm:text-5xl font-medium text-ink tracking-[-0.03em] mb-12 text-center">
              The Agent Interface
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-medium text-ink mb-4">Real-time Decay Audits</h3>
                <p className="text-ink-2 mb-6">Talk directly to Halflife. Ask for current format health, decay ratios, or portfolio stability. The engine responds with precision data pulled from your persistent cross-session memory.</p>
                <div className="bg-ink text-white font-mono text-sm p-6 rounded-card border border-[#2e2e36] shadow-dark">
                  <div className="text-accent mb-2">$ halflife --audit portfolio</div>
                  <div className="text-ink-3">&gt; Analyzing 4 registered formats...</div>
                  <div className="text-accent-emerald mt-2">[HEALTHY] "Deep Dive Architecture" (88% baseline retention)</div>
                  <div className="text-accent-emerald">[HEALTHY] "Tooling Tips" (92% baseline retention)</div>
                  <div className="text-accent-amber mt-2">[FATIGUING] "Quick Opinion Hot Takes" (41% drop below baseline)</div>
                  <div className="text-accent-amber">&gt; WARNING: "Quick Opinion" projected to hit terminal decay in 3 posts.</div>
                  <div className="text-ink-3 mt-4">&gt; End of audit.</div>
                </div>
              </div>
              <div>
                <TerminalPreview />
              </div>
            </div>
          </div>
        </section>

        {/* 12. Dashboard Link Section */}
        <section id="try-it" className="relative px-6 py-24 md:py-36 overflow-hidden text-center">
          <h2 className="text-3xl sm:text-5xl font-medium text-neutral-900 tracking-[-0.03em] mb-8">
            Ready to track creative fatigue?
          </h2>
          <a href="/dashboard" className="inline-block bg-[#1391E2] text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity">
            Open Dashboard
          </a>
        </section>
      </main>

      {/* 12. Footer Section */}
      <Footer />
    </div>
  );
}
