'use client';

import { useState } from 'react';
import Button from './Button';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phone: '',
    productInterest: '',
    approxOrderQuantity: '',
    message: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally handle form submission here
    console.log('Form submitted:', formData);
    setStatus('success');
    setFormData({
      fullName: '',
      companyName: '',
      country: '',
      email: '',
      phone: '',
      productInterest: '',
      approxOrderQuantity: '',
      message: '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="fullName" className={styles.label}>Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className={styles.input}
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="companyName" className={styles.label}>Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          className={styles.input}
          value={formData.companyName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country" className={styles.label}>Country *</label>
        <input
          type="text"
          id="country"
          name="country"
          className={styles.input}
          value={formData.country}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>Phone/WhatsApp</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={styles.input}
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="approxOrderQuantity" className={styles.label}>Approx. Order Quantity</label>
        <input
          type="text"
          id="approxOrderQuantity"
          name="approxOrderQuantity"
          className={styles.input}
          value={formData.approxOrderQuantity}
          onChange={handleChange}
          placeholder="e.g. 5000 units"
        />
      </div>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        <label htmlFor="productInterest" className={styles.label}>Product Interest *</label>
        <select
          id="productInterest"
          name="productInterest"
          className={styles.select}
          value={formData.productInterest}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a product category</option>
          <option value="Exercise Books">Exercise Books</option>
          <option value="Spiral Bound">Spiral Bound</option>
          <option value="Double Wire Bound">Double Wire Bound</option>
          <option value="Hard Cover Gally Bound">Hard Cover Gally Bound</option>
          <option value="Centre Stitched">Centre Stitched</option>
          <option value="Glue Bound">Glue Bound</option>
          <option value="Paper Packaging">Paper Packaging</option>
        </select>
      </div>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        <label htmlFor="message" className={styles.label}>Message / Details</label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          value={formData.message}
          onChange={handleChange}
          placeholder="Please describe your specific requirements..."
        />
      </div>

      <div className={styles.submitWrapper}>
        <Button variant="primary" size="large" type="submit" fullWidth>
          Submit Enquiry
        </Button>
        {status === 'success' && (
          <p style={{ color: 'var(--color-success)', marginTop: 'var(--space-sm)', textAlign: 'center' }}>
            Thank you for your enquiry. We will get back to you soon.
          </p>
        )}
      </div>
    </form>
  );
}
