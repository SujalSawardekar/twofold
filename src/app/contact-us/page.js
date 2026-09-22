'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
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
    name: '',
    phone: '',
    email: '',
    company: '',
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
      
      {/* ── 1. Page Header (Matching Reference: Big Title Left + Subtitle Right) ── */}
      <section className={styles.headerSection}>
        <div className={styles.container}>
          <div className={styles.headerSplit}>
            <div className={styles.headerLeft}>
              <h1 className={styles.mainHeading}>CONTACT US</h1>
            </div>

            <div className={styles.headerRight}>
              <p className={styles.headerDescription}>
                If you have any questions regarding volume manufacturing, container exports,
                bespoke OEM notebook formats, or sample requests, please feel free to get in touch
                with our Palghar facility via phone, email, or the inquiry form below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Main Dashboard Cards Layout (2-Column Grid as in Reference) ── */}
      <section className={styles.dashboardSection}>
        <div className={styles.container}>
          
          <div className={styles.dashboardGrid}>
            
            {/* ── Left Column: "GET IN TOUCH" Form Card ── */}
            <div className={styles.formCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>GET IN TOUCH</h2>
                <span className={styles.cardSubtitle}>Direct factory pricing &amp; technical specification inquiry</span>
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
                    Thank you, <strong>{formData.name}</strong>. Your inquiry has been forwarded to our Palghar Export Desk. A technical specialist will review your specifications and respond promptly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        company: '',
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
                  
                  {/* Row 1: Name & Phone (2 Columns) */}
                  <div className={styles.formRow2}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="name" className={styles.fieldLabel}>NAME</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name*"
                        required
                        className={styles.textInput}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="phone" className={styles.fieldLabel}>PHONE NUMBER</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone with country code*"
                        required
                        className={styles.textInput}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Company (2 Columns) */}
                  <div className={styles.formRow2}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="email" className={styles.fieldLabel}>EMAIL</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter corporate email*"
                        required
                        className={styles.textInput}
                      />
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="company" className={styles.fieldLabel}>COMPANY / BRAND</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        className={styles.textInput}
                      />
                    </div>
                  </div>

                  {/* Row 3: Product Interest Dropdown */}
                  <div className={styles.fieldGroup}>
                    <label htmlFor="selectedProduct" className={styles.fieldLabel}>PRODUCT INTEREST</label>
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
                    <label htmlFor="message" className={styles.fieldLabel}>YOUR MESSAGE / SPECIFICATIONS</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify your required notebook size, page count, ruling format, estimated container volume (e.g. 1x20ft FCL), and target destination port..."
                      rows={4}
                      className={styles.textArea}
                    />
                  </div>

                  {/* Bottom: Solid High-Impact Submit Button */}
                  <div className={styles.formFooter}>
                    <Button
                      type="submit"
                      disabled={submitting}
                      variant="primary"
                      size="default"
                      fullWidth
                    >
                      {submitting ? 'DISPATCHING INQUIRY...' : 'SEND MESSAGE'}
                    </Button>
                  </div>

                </form>
              )}
            </div>

            {/* ── Right Column: Single Full-Height "CONTACT INFORMATION" Card ── */}
            <div className={styles.contactCard}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>CONTACT INFORMATION</h2>
                <span className={styles.cardSubtitle}>Direct factory pricing &amp; technical specification inquiry</span>
              </div>

              <div className={styles.infoList}>
                
                {/* Phone Item */}
                <div className={styles.infoItem}>
                  <div className={styles.infoIconCircle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>PHONE / EXPORT DESK</span>
                    <a href="tel:+912228881988" className={styles.infoValueLink}>
                      +91 (0) 22 2888 1988
                    </a>
                  </div>
                </div>

                {/* Email Item 1 (Export) */}
                <div className={styles.infoItem}>
                  <div className={styles.infoIconCircle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>DIRECT EMAIL</span>
                    <a href="mailto:export@twofold.in" className={styles.infoValueLink}>
                      export@twofold.in
                    </a>
                  </div>
                </div>

                {/* WhatsApp Fast Channel */}
                <div className={styles.infoItem}>
                  <div className={styles.infoIconCircle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>WHATSAPP FAST DESK</span>
                    <a 
                      href="https://wa.me/912228881988" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.infoValueLink}
                    >
                      +91 22 2888 1988
                    </a>
                  </div>
                </div>

                {/* Address Item */}
                <div className={styles.infoItem}>
                  <div className={styles.infoIconCircle}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>MANUFACTURING FACILITY</span>
                    <span className={styles.infoValueText}>
                      Palghar Industrial Zone, Maharashtra 401404, India
                    </span>
                    <span className={styles.infoSubText}>
                      (90 mins direct transit corridor to Nhava Sheva / JNPT Seaport)
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* ── 3. Full-Width Interactive Map Card (Matching Reference Bottom) ── */}
          <div className={styles.mapCard}>
            <div className={styles.mapHeaderBar}>
              <div className={styles.mapTitleGroup}>
                <span className={styles.mapRadarDot} />
                <span className={styles.mapHeading}>PALGHAR MANUFACTURING FACILITY &amp; JNPT EXPORT CORRIDOR</span>
              </div>
              <a
                href="https://maps.google.com/?q=Palghar,+Maharashtra,+India"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapExternalBtn}
              >
                <span>Open in Google Maps</span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 13L13 1M13 1H4M13 1V10" />
                </svg>
              </a>
            </div>

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

      {/* ── 4. Common Procurement FAQs Accordion ── */}
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

