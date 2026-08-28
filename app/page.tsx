import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ShowcaseGrid from '@/components/ShowcaseGrid';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Architecture from '@/components/Architecture';
import Timeline from '@/components/Timeline';
import TermsCard from '@/components/TermsCard';
import Faq from '@/components/Faq';

import Footer from '@/components/Footer';
import { PillLink } from '@/components/Pill';
import ChatPreview from '@/components/ChatPreview';

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
        {/* 11. Conversational Chat Section */}
        <section className="px-6 py-24 bg-gradient-to-b from-paper to-[#e2e1e9]">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center mb-16">
              <h2 className="text-[2.5rem] sm:text-[3.5rem] font-medium text-ink tracking-[-0.04em] mb-4">
                Talk to your data.
              </h2>
              <p className="text-lg text-ink-2 max-w-2xl mx-auto">
                Audience fatigue is silent. Half-Life detects the decay curve early. Chat with the engine in real-time to audit your content portfolio and pivot before burnout.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <ChatPreview />
              </div>
              <div className="order-1 md:order-2 flex flex-col gap-6 pl-0 md:pl-8">
                <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm">
                  <h3 className="text-lg font-medium text-ink mb-2">Real-time Decay Audits</h3>
                  <p className="text-sm text-ink-2">Ask for current format health, decay ratios, or portfolio stability. The engine responds with precision data pulled from your persistent cross-session memory.</p>
                </div>
                <div className="bg-white/60 p-6 rounded-3xl border border-white shadow-sm">
                  <h3 className="text-lg font-medium text-ink mb-2">Format Re-Calibration</h3>
                  <p className="text-sm text-ink-2">Inject fresh post URLs straight into the chat. The agent autonomously parses the metrics, updates the mathematical baseline, and projects your new runway.</p>
                </div>
              </div>
            </div>
          </div>
        </section>        {/* 12. Dashboard Link Section */}
        <section id="try-it" className="relative px-6 py-24 md:py-36 overflow-hidden text-center">
          <h2 className="text-3xl sm:text-5xl font-medium text-neutral-900 tracking-[-0.03em] mb-8">
            Ready to track creative fatigue?
          </h2>
          <PillLink href="/dashboard" className="!px-8 !py-5 !text-lg">
            Open Dashboard
          </PillLink>
        </section>
      </main>

      {/* 12. Footer Section */}
      <Footer />
    </div>
  );
}
