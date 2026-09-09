import UnderConstruction from '@/components/common/UnderConstruction';

export const metadata = {
  title: 'Contact Us — Twofold Stationery',
  description: 'Connect directly with Twofold export desk for institutional pricing and samples.',
};

export default function ContactPage() {
  return (
    <UnderConstruction
      eyebrow="05 — Procurement & Export Desk"
      title="Direct Inquiry & Sample Orders"
      description="Our automated quotation portal is launching soon. For immediate orders, institutional tenders, and custom manufacturing inquiries, our direct export desk is available via phone and email."
      statusText="Online Portal Coming Soon"
      primaryCtaText="Return to Home"
      primaryCtaLink="/"
      secondaryCtaText="See Contact Details"
      secondaryCtaLink="/#footer"
    />
  );
}
