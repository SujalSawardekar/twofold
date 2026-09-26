'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactFAQ from '@/components/contact/ContactFAQ';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './page.module.css';

const PRODUCT_CHIPS = [
  'Exercise Books',
  'Composition Books',
  'Spiral Bound',
  'Double Wire Bound',
  'Hard Cover Gally',
  'Soft Cover Notebooks',
  'Centre Stitched',
  'Glue Bound / Perfect',
  'Subject & Dividers',
  'Drawing & Sketch Pads',
  'Paper Packaging',
  'Custom OEM / Private Label',
];

function ContactContent() {
  const searchParams = useSearchParams();
  const { playClick, playSuccess } = useSound();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedProduct: 'Exercise Books',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const productParam = searchParams.get('product') || searchParams.get('sample');
    if (productParam) {
      const match = PRODUCT_CHIPS.find(
        (opt) => opt.toLowerCase() === productParam.toLowerCase() ||
                 productParam.toLowerCase().includes(opt.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, selectedProduct: match }));
      }
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    playClick?.();

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      playSuccess?.();
    }, 900);
  };

  return (
    <main className={styles.pageWrap}>

      {/* ── 1. Light Hero Header (Let's Build Your Next Export Partnership) ── */}
      <section className={styles.topHeader}>
        <div className={styles.container}>
          <h1 className={styles.topHeaderTitle}>
            Let&apos;s Build Your<br />
            <em>Next Export Partnership</em>
          </h1>

          <div className={styles.headerBodyText}>
            <p>
              Twofold manufactures high-volume paper stationery as per customized specifications for importers, distributors, wholesalers, retailers, educational institutions, and private-label brands across global markets.
            </p>
            <p>
              Whether you&apos;re looking for OEM manufacturing, bulk exports, private labeling, or customized stationery solutions, our export team is ready to assist.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Main Contact Layout Section (Form Left + Info Card Right) ── */}
      <section className={styles.mainSection}>
        <div className={styles.container}>
          
          <div className={styles.mainGrid}>

            {/* ── Left Column: Inquiry Form ── */}
            <div className={styles.formCol}>
              
              {/* Section Header with Rotating Stamp Seal */}
              <div className={styles.formHeaderRow}>
                <div className={styles.formHeaderLeft}>
                  <div className={styles.eyebrowWrap}>
                    <span className={styles.dash} />
                    <span className={styles.eyebrow}>Contact Us</span>
                  </div>
                  <h2 className={styles.mainHeadline}>
                    Join Us in Creating<br />Something Great
                  </h2>
                </div>

                {/* Rotating Badge Seal */}
                <div className={styles.sealWrap} aria-hidden="true">
                  <svg className={styles.sealSvg} viewBox="0 0 100 100">
                    <path
                      id="sealCirclePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className={styles.sealText}>
                      <textPath href="#sealCirclePath" startOffset="0%">
                        TWOFOLD EXPORT · PALGHAR FACILITY ·
                      </textPath>
                    </text>
                  </svg>
                  <div className={styles.sealCenterDot} />
                </div>
              </div>

              {submitted ? (
                <div className={styles.successState}>
                  <div className={styles.successIconWrap}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Inquiry Successfully Dispatched</h3>
                  <p className={styles.successMessage}>
                    Thank you, <strong>{formData.firstName} {formData.lastName}</strong>. Your inquiry has been forwarded to our Palghar Export Desk. A technical specialist will review your specifications and respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        selectedProduct: 'Exercise Books',
                        message: '',
                      });
                    }}
                    className={styles.resetBtn}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.inquiryForm}>
                  
                  {/* Row 1: First Name & Last Name */}
                  <div className={styles.formRow2}>
                    <div className={styles.fieldGroup}>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name *"
                        required
                        className={styles.textInput}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name / Company *"
                        required
                        className={styles.textInput}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone Number */}
                  <div className={styles.formRow2}>
                    <div className={styles.fieldGroup}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email *"
                        required
                        className={styles.textInput}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number *"
                        required
                        className={styles.textInput}
                      />
                    </div>
                  </div>

                  {/* Row 3: Product Interest Select */}
                  <div className={styles.fieldGroup}>
                    <div className={styles.selectWrap}>
                      <select
                        id="selectedProduct"
                        name="selectedProduct"
                        value={formData.selectedProduct}
                        onChange={handleChange}
                        className={styles.selectInput}
                      >
                        {PRODUCT_CHIPS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className={styles.selectArrow}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Message Textarea */}
                  <div className={styles.fieldGroup}>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message *"
                      rows={5}
                      required
                      className={styles.textArea}
                    />
                  </div>

                  {/* Action Pill Submit Button with Arrow Icon Circle */}
                  <div className={styles.submitRow}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={styles.pillSubmitBtn}
                    >
                      <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                      <span className={styles.arrowCircle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </button>
                  </div>

                </form>
              )}
            </div>

            {/* ── Right Column: Rounded Golden Info Card ── */}
            <div className={styles.infoCard}>
              
              {/* Address Section */}
              <div className={styles.infoBlock}>
                <h3 className={styles.infoBlockTitle}>Address</h3>
                <p className={styles.infoBlockBody}>
                  Palghar Industrial Zone, Palghar West,<br />
                  Maharashtra 401404, India
                </p>
                <span className={styles.infoBlockSub}>
                  (90 mins transit corridor to Nhava Sheva / JNPT Seaport)
                </span>
              </div>

              {/* Contact Section */}
              <div className={styles.infoBlock}>
                <h3 className={styles.infoBlockTitle}>Contact</h3>
                <p className={styles.infoBlockBody}>
                  Phone: <a href="tel:+912228881988" className={styles.cardLink}>+91 (0) 22 2888 1988</a><br />
                  Email: <a href="mailto:export@twofold.in" className={styles.cardLink}>export@twofold.in</a>
                </p>
              </div>

              {/* Open Time Section */}
              <div className={styles.infoBlock}>
                <h3 className={styles.infoBlockTitle}>Open Time</h3>
                <p className={styles.infoBlockBody}>
                  Monday – Saturday : 09:00 – 19:00 IST
                </p>
              </div>

              {/* Stay Connected Social Icons Section */}
              <div className={styles.infoBlock}>
                <h3 className={styles.infoBlockTitle}>Stay Connected</h3>
                <div className={styles.socialIconsRow}>
                  
                  {/* Phone / Call */}
                  <a href="tel:+912228881988" aria-label="Call Twofold" className={styles.socialCircle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </a>

                  {/* Email */}
                  <a href="mailto:export@twofold.in" aria-label="Email Twofold" className={styles.socialCircle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialCircle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.75a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/>
                    </svg>
                  </a>

                  {/* WhatsApp */}
                  <a href="https://wa.me/912228881988" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={styles.socialCircle}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.82 14.1c-.25.7-1.47 1.34-2.04 1.42-.52.07-1.2.1-1.92-.13-.44-.14-1.01-.33-1.74-.65-3.07-1.33-5.07-4.42-5.23-4.63-.15-.2-1.25-1.66-1.25-3.17 0-1.51.79-2.25 1.07-2.55.28-.3.61-.37.81-.37.2 0 .4 0 .58.01.19.01.44-.07.69.53.25.6.86 2.09.93 2.24.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.32.38-.46.51-.15.15-.3.31-.13.61.17.3 1.04 1.71 2.23 2.77 1.53 1.37 2.82 1.79 3.22 1.99.4.2.63.17.86-.1.23-.27.99-1.15 1.25-1.55.26-.4.52-.33.87-.2.35.13 2.23 1.05 2.61 1.24.38.19.63.29.72.44.09.15.09.87-.16 1.57z"/>
                    </svg>
                  </a>

                </div>
              </div>

            </div>

          </div>

          {/* ── 4. Full-Width Interactive Facility Map Card (Reference Bottom) ── */}
          <div className={styles.mapCard}>
            <div className={styles.mapIframeFrame}>
              <iframe
                title="Twofold Palghar Facility Map"
                src="https://maps.google.com/maps?q=Palghar%2C%20Maharashtra%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className={styles.mapIframe}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={styles.mapFooterStats}>
              <div className={styles.mapStatItem}>
                <span className={styles.mapStatLabel}>SEAPORT PROXIMITY</span>
                <span className={styles.mapStatVal}>90 Mins to JNPT (Nhava Sheva)</span>
              </div>
              <div className={styles.mapStatItem}>
                <span className={styles.mapStatLabel}>HIGHWAY CORRIDOR</span>
                <span className={styles.mapStatVal}>NH-48 Golden Quadrilateral</span>
              </div>
              <div className={styles.mapStatItem}>
                <span className={styles.mapStatLabel}>FACILITY COORDINATES</span>
                <span className={styles.mapStatVal}>19°41&apos;49&quot;N 72°45&apos;50&quot;E</span>
              </div>
              <div className={styles.mapStatItem}>
                <span className={styles.mapStatLabel}>QUALITY CERTIFICATIONS</span>
                <span className={styles.mapStatVal}>ISO 9001:2015 · AQL 2.5 Sampling</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. Common Procurement FAQs Accordion ── */}
      <ContactFAQ />

    </main>
  );
}

export default function ContactUsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#FAF8F5' }} />}>
      <ContactContent />
    </Suspense>
  );
}
