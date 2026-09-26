import Hero from '@/components/home/Hero';
import TrustMetrics from '@/components/home/TrustMetrics';
import WhoWeAre from '@/components/home/WhoWeAre';
import WhyBuyers from '@/components/home/WhyBuyers';
import ProductRange from '@/components/home/ProductRange';
import NotebookShelf from '@/components/home/NotebookShelf';
import QualityAssurance from '@/components/home/QualityAssurance';
import GlobalReach from '@/components/home/GlobalReach';
import WhoWeServe from '@/components/home/WhoWeServe';
import Insights from '@/components/home/Insights';
import HomeFoldIntro from '@/components/home/HomeFoldIntro';
import SectionFoldReveal from '@/components/home/SectionFoldReveal';

export const metadata = {
  title: 'Twofold — Manufacturing Quality Paper Stationery for the World',
  description: 'Twofold is an Indian manufacturer and exporter of notebooks and paper stationery. A decade of manufacturing experience with family roots in the paper trade since 1988.',
};

export default function HomePage() {
  return (
    <main>
      {/* Gate-fold intro overlay — renders null on server and after first animation */}
      <HomeFoldIntro />

      {/*
       * SectionFoldReveal wraps each section in a lightweight positioning
       * context (position:relative div with no margin/padding). Panels are
       * client-only (mounted guard) so SSR output is unchanged.
       *
       * gateWithIntro on Hero: on a fresh session the intro will play, so
       * Hero's fold is skipped (sessionStorage key absent = intro will play).
       * On subsequent same-session visits to "/" the fold plays normally.
       */}
      <SectionFoldReveal gateWithIntro>
        <Hero />
      </SectionFoldReveal>

      <SectionFoldReveal>
        <TrustMetrics />
      </SectionFoldReveal>

      <SectionFoldReveal>
        <WhoWeAre />
      </SectionFoldReveal>

      <WhyBuyers />
      <ProductRange />
      <NotebookShelf />
      <QualityAssurance />
      <GlobalReach />
      <WhoWeServe />
      <Insights />
    </main>
  );
}
