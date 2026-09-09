import React, { Suspense } from 'react';
import ContactHero from '@/components/contact/ContactHero';
import ContactEnquiry from '@/components/contact/ContactEnquiry';
import ContactLocation from '@/components/contact/ContactLocation';
import ContactSocial from '@/components/contact/ContactSocial';
import ContactFAQ from '@/components/contact/ContactFAQ';
import ContactClosingCTA from '@/components/contact/ContactClosingCTA';

export const metadata = {
  title: 'Contact Us | B2B Stationery Manufacturing & Export Desk | Twofold',
  description: 'Initiate an export inquiry or bespoke notebook manufacturing partnership with Twofold. Direct access to our Palghar facility and global export desk.',
};

export default function ContactUsPage() {
  return (
    <main style={{ backgroundColor: '#F9FAF5', minHeight: '100vh' }}>
      {/* 1. Hero / Page Intro */}
      <ContactHero />

      {/* 2. Contact + Enquiry Experience (Split Direct Channels & Order Document Form) */}
      <Suspense fallback={<div style={{ minHeight: '700px', backgroundColor: '#11172D' }} />}>
        <ContactEnquiry />
      </Suspense>

      {/* 3. Location / Palghar Facility & Connectivity */}
      <ContactLocation />

      {/* 4. Social Connection (Minimal Typography Links) */}
      <ContactSocial />

      {/* 5. Common Questions / Before We Begin (Spacious Editorial Accordion) */}
      <ContactFAQ />

      {/* 6. Final Call to Action */}
      <ContactClosingCTA />
    </main>
  );
}
