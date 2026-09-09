'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useSound } from '@/providers/SoundEffectsProvider';
import styles from './ContactEnquiry.module.css';

const PRODUCT_OPTIONS = [
  'Exercise Books',
  'Spiral Bound',
  'Double Wire Bound',
  'Hard Cover Gally Bound',
  'Centre Stitched',
  'Glue Bound',
  'Paper Packaging',
  'Multiple Formats / Custom Range'
];

export default function ContactEnquiry() {
  const searchParams = useSearchParams();
  const { playClick, playSuccess } = useSound();

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phone: '',
    productInterest: '',
    approxOrderQuantity: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill product interest if navigated from Products page
  useEffect(() => {
    const productParam = searchParams.get('product') || searchParams.get('sample');
    if (productParam) {
      // Find matching option
      const match = PRODUCT_OPTIONS.find(
        (opt) => opt.toLowerCase() === productParam.toLowerCase() ||
                 productParam.toLowerCase().includes(opt.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, productInterest: match }));
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
    try {
      playClick?.();
    } catch {
      // safe fallback
    }

    // Simulate clean submission handling
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      try {
        playSuccess?.();
      } catch {
        // safe fallback
      }
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      companyName: '',
      country: '',
      email: '',
      phone: '',
      productInterest: '',
      approxOrderQuantity: '',
      message: ''
    });
  };

  return (
    <section 
      id="enquiry"
      className={styles.enquirySection} 
      aria-label="Enquire with Twofold"
    >
      <div className={styles.container}>
        <div className={styles.splitGrid}>

          {/* ── LEFT: Direct Communication ("START A CONVERSATION") ── */}
          <div className={styles.directCol}>
            <div>
              <span className={styles.sectionKicker}>DIRECT CHANNELS</span>
              <h2 className={styles.columnHeading}>
                Start a<br />Conversation.
              </h2>
            </div>

            {/* Facility & Location Block */}
            <div className={styles.facilityBlock}>
              <span className={styles.facilityLabel}>Registered Office & Manufacturing Facility</span>
              <h3 className={styles.facilityName}>Twofold Paper Stationery</h3>
              <p className={styles.facilityAddress}>
                Palghar, Maharashtra, India<br />
                Dedicated Port Transit to JNPT (Nhava Sheva)
              </p>
            </div>

            {/* Direct Channels */}
            <div className={styles.channelsList}>
              <div className={styles.channelItem}>
                <span className={styles.channelLabel}>Export & Sourcing Desk</span>
                <a href="mailto:export@twofoldpaper.com" className={styles.channelLink}>
                  export@twofoldpaper.com
                </a>
              </div>

              <div className={styles.channelItem}>
                <span className={styles.channelLabel}>Telephone (Board Line)</span>
                <a href="tel:+912228549900" className={styles.channelLink}>
                  +91 (022) 2854-9900
                </a>
              </div>

              <div className={styles.channelItem}>
                <span className={styles.channelLabel}>Business WhatsApp</span>
                <a 
                  href="https://wa.me/919820000000?text=Hello%20Twofold%20Team%2C%20I%20would%20like%20to%20inquire%20about%20notebook%20sourcing." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.channelLink}
                >
                  +91 98200 00000
                </a>
              </div>
            </div>

            {/* Interactive WhatsApp Fast Channel Card */}
            <div className={styles.whatsappCard}>
              <div className={styles.whatsappHeader}>
                <svg className={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01C17.18 3.03 14.69 2 12.04 2zm0 18.15c-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.32c-.82-1.31-1.26-2.84-1.26-4.4 0-4.54 3.69-8.24 8.24-8.24 2.2 0 4.26.86 5.82 2.42s2.42 3.62 2.42 5.82c0 4.54-3.7 8.25-8.24 8.25zm4.52-6.17c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.65.81-.8 1-.15.17-.3.19-.55.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.12.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.3z" />
                </svg>
                <h4 className={styles.whatsappTitle}>Prefer a Direct Conversation?</h4>
              </div>
              <p className={styles.whatsappText}>
                Connect directly with our export desk via WhatsApp for rapid specification review, sample status, and factory scheduling.
              </p>
              <a 
                href="https://wa.me/919820000000?text=Hello%20Twofold%20Team%2C%20I%20would%20like%20to%20inquire%20about%20notebook%20sourcing." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappButton}
              >
                Chat on WhatsApp →
              </a>
            </div>
          </div>

          {/* ── RIGHT: Editorial Order Form ("ENQUIRE WITH TWOFOLD") ── */}
          <div className={styles.formCol}>
            <div className={styles.formHeader}>
              <span className={styles.sectionKicker}>SPECIFICATION DOCUMENT</span>
              <h2 className={styles.columnHeading}>Enquire with Twofold.</h2>
              <p className={styles.formSubtitle}>
                Complete the specification sheet below. Our manufacturing and logistics trade desk will analyze your request and reply within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className={styles.confirmationBox}>
                <div className={styles.confirmIcon}>
                  <svg width="24" height="24" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className={styles.confirmHeading}>Enquiry Received</h3>
                <p className={styles.confirmMessage}>
                  Thank you for contacting Twofold Paper Stationery. Our export management desk in Palghar has received your notebook specifications and will reach out shortly with quotation schedules and sample terms.
                </p>
                <button type="button" className={styles.newEnquiryBtn} onClick={handleReset} suppressHydrationWarning>
                  Submit Another Enquiry →
                </button>
              </div>
            ) : (
              <form className={styles.documentForm} onSubmit={handleSubmit} suppressHydrationWarning>
                {/* Row 1: Name & Company */}
                <div className={styles.formRowTwo}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="fullName" className={styles.label}>Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="e.g. Marcus Vance"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className={styles.input}
                      suppressHydrationWarning
                    />
                    <span className={styles.focusBorderLine} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="companyName" className={styles.label}>Company Name *</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      placeholder="e.g. Vanguard Stationery Wholesale"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className={styles.input}
                      suppressHydrationWarning
                    />
                    <span className={styles.focusBorderLine} />
                  </div>
                </div>

                {/* Row 2: Country, Email, Phone */}
                <div className={styles.formRowThree}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="country" className={styles.label}>Country *</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      placeholder="e.g. United Kingdom"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={styles.input}
                      suppressHydrationWarning
                    />
                    <span className={styles.focusBorderLine} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>Business Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="marcus@vanguard.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={styles.input}
                      suppressHydrationWarning
                    />
                    <span className={styles.focusBorderLine} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+44 7911 123456"
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.input}
                      suppressHydrationWarning
                    />
                    <span className={styles.focusBorderLine} />
                  </div>
                </div>

                {/* Row 3: Product Interest & Approx Quantity */}
                <div className={styles.formRowTwo}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="productInterest" className={styles.label}>Primary Product Interest *</label>
                    <select
                      id="productInterest"
                      name="productInterest"
                      required
                      value={formData.productInterest}
                      onChange={handleChange}
                      className={styles.select}
                      suppressHydrationWarning
                    >
                      <option value="" disabled>Select a notebook category</option>
                      {PRODUCT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span className={styles.focusBorderLine} />
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="approxOrderQuantity" className={styles.label}>Approx. Order Quantity / MOQ</label>
                    <input
                      type="text"
                      id="approxOrderQuantity"
                      name="approxOrderQuantity"
                      placeholder="e.g. 50,000 units / 1 Full Container (FCL)"
                      value={formData.approxOrderQuantity}
                      onChange={handleChange}
                      className={styles.input}
                      suppressHydrationWarning
                    />
                    <span className={styles.focusBorderLine} />
                  </div>
                </div>

                {/* Row 4: Message / Requirements */}
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>Message / Ruling & Binding Specifications</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Provide details regarding page count, GSM preferences, binding type, destination port, or private label requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    suppressHydrationWarning
                  />
                  <span className={styles.focusBorderLine} />
                </div>

                {/* Action Area */}
                <div className={styles.formActionArea}>
                  <Button
                    type="submit"
                    variant="primary"
                    hasArrow
                    disabled={submitting}
                    suppressHydrationWarning
                  >
                    {submitting ? 'Submitting...' : 'Send Enquiry'}
                  </Button>

                  <span className={styles.disclaimerText}>
                    All specifications are handled directly by Twofold's export trade desk in Palghar. NDA agreements available upon request.
                  </span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
