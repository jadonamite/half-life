import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ShowcaseGrid from '@/components/ShowcaseGrid';
import Problem from '@/components/Problem';
import Process from '@/components/Process';
import Architecture from '@/components/Architecture';
import Timeline from '@/components/Timeline';
import TermsCard from '@/components/TermsCard';
import BadgeStrip from '@/components/BadgeStrip';
import Faq from '@/components/Faq';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#ebeaef] text-[#121214] font-sans antialiased selection:bg-neutral-900 selection:text-white">
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
        <BadgeStrip />

        {/* 10. FAQ Accordion */}
        <Faq />

        {/* 11. Interactive "Try It" Live App Section */}
        <section id="try-it" className="relative px-6 py-24 md:py-36 overflow-hidden">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-center gap-4 text-neutral-400 font-serif italic text-xl mb-4">
              <span className="h-[1px] w-12 bg-neutral-400/40" />
              <span>Interactive Simulator</span>
              <span className="h-[1px] w-12 bg-neutral-400/40" />
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-900 tracking-[-0.03em] text-center mb-12 sm:mb-16">
              The same product the Mind talks to
            </h2>

            <div className="rounded-[2.5rem] overflow-hidden border border-neutral-800 shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
              <Dashboard />
            </div>
          </div>
        </section>
      </main>

      {/* 12. Footer Section */}
      <Footer />
    </div>
  );
}
