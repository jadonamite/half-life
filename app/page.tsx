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



        {/* 12. Dashboard Link Section */}
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
