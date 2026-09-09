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

export const metadata = {
  title: 'Twofold — Manufacturing Quality Paper Stationery for the World',
  description: 'Twofold is an Indian manufacturer and exporter of notebooks and paper stationery. A decade of manufacturing experience with family roots in the paper trade since 1988.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustMetrics />
      <WhoWeAre />
      <WhyBuyers />
      <ProductRange />
      <NotebookShelf />
      <QualityAssurance />
      <GlobalReach />
      <WhoWeServe />
      <Insights />
    </>
  );
}
