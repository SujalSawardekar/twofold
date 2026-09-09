'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './WhoWeServe.module.css';

const SEGMENTS = [
  {
    idx:   '01',
    title: 'Importers & Traders',
    desc:  'Bulk volume supply with reliable, export-ready consistency.',
    img:   '/images/editorial/serve-importers.jpg',
    alt:   'Shrink-wrapped pallets of stationery ready for export',
    rotateClass: 'rotate0',
  },
  {
    idx:   '02',
    title: 'Chain Stores',
    desc:  'Retail-ready products tailored for organised shelf placement.',
    img:   '/images/editorial/serve-chainstores.jpg',
    alt:   'Stationery display shelves in a modern retail store',
    rotateClass: 'rotate1',
  },
  {
    idx:   '03',
    title: 'Stationery Brands',
    desc:  'Private label manufacturing to your exact specifications.',
    img:   '/images/editorial/serve-brands.jpg',
    alt:   'Premium hardcover notebooks arranged for product photography',
    rotateClass: 'rotate2',
  },
  {
    idx:   '04',
    title: 'Educational Institutes',
    desc:  'Direct supply of customised notebooks and exercise books.',
    img:   '/images/editorial/serve-education.jpg',
    alt:   'Exercise books for educational use',
    rotateClass: 'rotate3',
  },
];

export default function WhoWeServe() {
  const [activeIdx, setActiveIdx] = useState(null);

  return (
    <section className={styles.section} id="who-we-serve">
      <div className={styles.inner}>

        {/* Top Header Row */}
        <div className={styles.topRow}>
          <span className={styles.eyebrow}>WHO WE SERVE</span>
          <h2 className={styles.headline}>
            Built for buyers who need a manufacturing partner, not just a vendor.
          </h2>
        </div>

        {/* Compact Typographic List: Fits All 4 Titles on One Screen */}
        <div className={styles.listWrapper}>
          <ul
            className={styles.list}
            role="list"
            onMouseLeave={() => setActiveIdx(null)}
          >
            {SEGMENTS.map((seg, i) => (
              <li
                key={seg.idx}
                className={`${styles.item} ${activeIdx === i ? styles.itemActive : ''} ${activeIdx !== null && activeIdx !== i ? styles.itemDim : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
              >
                <div className={styles.itemMain}>
                  <span className={styles.itemIdx}>{seg.idx}</span>
                  <div className={styles.itemTitleGroup}>
                    <h3 className={styles.itemTitle}>{seg.title}</h3>
                    <p className={styles.itemDesc}>{seg.desc}</p>
                  </div>
                </div>

                {/* Rotated Floating Preview Image (Clean full-bleed photo without text overlay) */}
                <div 
                  className={`${styles.rowImageOverlay} ${styles[seg.rotateClass]} ${activeIdx === i ? styles.rowImageOverlayActive : ''}`}
                >
                  <Image
                    src={seg.img}
                    alt={seg.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 360px"
                    className={styles.cardImg}
                    priority={i === 0}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
