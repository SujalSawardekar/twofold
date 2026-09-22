import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutMission from '@/components/about/AboutMission';
import AboutVision from '@/components/about/AboutVision';
import AboutTimeline from '@/components/about/AboutTimeline';
import AboutFacility from '@/components/about/AboutFacility';
import AboutInfrastructure from '@/components/about/AboutInfrastructure';
import AboutGlobalReach from '@/components/about/AboutGlobalReach';
import AboutQuality from '@/components/about/AboutQuality';
import AboutInsights from '@/components/about/AboutInsights';

export const metadata = {
  title: 'About Us & Infrastructure — Twofold Paper Stationery Manufacturer',
  description: 'Twofold is a Palghar-based notebook and stationery manufacturer built on paper-trade heritage since 1988, hands-on production experience, and container-load export capability.',
};

export default function AboutUsPage() {
  return (
    <main>
      {/* 01 — PAGE INTRO / HERO */}
      <AboutHero />

      {/* 02 — OUR STORY */}
      <AboutStory />

      {/* 03 — OUR MISSION (Moved next to Our Story) */}
      <AboutMission />

      {/* 04 — OUR VISION (Moved next to Our Story) */}
      <AboutVision />

      {/* 05 — HERITAGE / TIMELINE */}
      <AboutTimeline />

      {/* 06 — OUR MANUFACTURING FACILITY */}
      <AboutFacility />

      {/* 07 — INFRASTRUCTURE */}
      <AboutInfrastructure />

      {/* 08 — STEP-BY-STEP WORKFLOW */}
      <AboutGlobalReach />

      {/* 09 — QUALITY & COMPLIANCE */}
      <AboutQuality />

      {/* 10 — DEDICATED INSIGHTS */}
      <AboutInsights />
    </main>
  );
}
