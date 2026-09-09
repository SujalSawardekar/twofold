'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NotebookShelf.module.css';

const products = [
  {
    id: 0,
    name: "Center-Pinned",
    eyebrow: "Center-pinned exercise books",
    headline: 'Millions of pages,<br /><span class="accent">precision</span>-stapled.',
    sub: "High-volume staple-bound exercise books manufactured for institutional and export order sizes with high tensile wire staples.",
    image: "/images/products/exercise-book.jpg",
    color: "linear-gradient(160deg, #caa465, #8f6c34)",
    code: "VOL. 01",
    edition: "STAPLE-BOUND",
    stat1: "90 GSM",
    stat1Label: "Paper Spec",
    stat2: "100k+",
    stat2Label: "Daily Capacity"
  },
  {
    id: 1,
    name: "Center-Stitched",
    eyebrow: "Center-stitched notebooks",
    headline: 'Stitched to<br />outlast the <span class="accent">semester</span>.',
    sub: "Classic thread-stitched exercise books built for volume-conscious retail procurement, educational tenders, and archival durability.",
    image: "/images/products/centre-stitched.jpg",
    color: "linear-gradient(160deg, #c24b44, #7c211d)",
    code: "VOL. 02",
    edition: "SADDLE-STITCHED",
    stat1: "Thread",
    stat1Label: "Saddle-Stitched",
    stat2: "100%",
    stat2Label: "Flat Lay"
  },
  {
    id: 2,
    name: "Spiral Bound",
    eyebrow: "Spiral bound series",
    headline: 'Coiled for<br />the <span class="accent">long haul</span>.',
    sub: "Durable single-loop wire binding engineered for 360-degree page rotation and smooth, flat writing favored by students and working professionals.",
    image: "/images/products/spiral-bound.jpg",
    color: "linear-gradient(160deg, #3b5aa0, #1c2f5e)",
    code: "VOL. 03",
    edition: "SINGLE WIRE",
    stat1: "360°",
    stat1Label: "Page Rotation",
    stat2: "Perforated",
    stat2Label: "Easy Tear"
  },
  {
    id: 3,
    name: "Wiro Bound",
    eyebrow: "Double wire / wiro bound",
    headline: 'Built to survive<br />the <span class="accent">daily</span> commute.',
    sub: "Reinforced double-loop twin wire construction with rigid polypropylene and heavy card covers for high-intensity corporate use.",
    image: "/images/products/wiro-bound.jpg",
    color: "linear-gradient(160deg, #33363c, #17181b)",
    code: "VOL. 04",
    edition: "TWIN WIRE",
    stat1: "Twin-Wire",
    stat1Label: "Double Loop",
    stat2: "Heavy Duty",
    stat2Label: "Grade"
  },
  {
    id: 4,
    name: "Perfect Bound",
    eyebrow: "Perfect bound journals",
    headline: 'Glued, trimmed,<br /><span class="accent">boardroom</span>-ready.',
    sub: "Clean hot-melt polyurethane adhesive bound notebooks featuring a pristine flat square spine offering a modern minimal desk presence.",
    image: "/images/products/perfect-bound.jpg",
    color: "linear-gradient(160deg, #22999b, #0f5657)",
    code: "VOL. 05",
    edition: "FLAT SPINE",
    stat1: "Flat Spine",
    stat1Label: "PUR Adhesive",
    stat2: "Executive",
    stat2Label: "Finish"
  },
  {
    id: 5,
    name: "Hardcover",
    eyebrow: "Hardcover / casebound",
    headline: 'Cased in quality<br />that <span class="accent">lasts</span>.',
    sub: "Premium rigid-board casebound notebooks with foil stamping, ribbon bookmarks, and archival binding crafted for executive distinction.",
    image: "/images/products/hardcover.jpg",
    color: "linear-gradient(160deg, #3f7a48, #1f3c25)",
    code: "VOL. 06",
    edition: "CASEBOUND",
    stat1: "Casebound",
    stat1Label: "Rigid Board",
    stat2: "Foil Stamping",
    stat2Label: "Customization"
  }
];

const defaultInfo = {
  eyebrow: "Binding Showcase",
  headline: 'Six bindings.<br /><span class="accent">One</span> uncompromising standard.',
  sub: "Since 1988, we've manufactured and exported high-volume paper stationery from our ISO 9001:2015 certified facility — bound, stitched, and shipped worldwide.",
  stat1: "10+",
  stat1Label: "Export Markets",
  stat2: "1988",
  stat2Label: "Established"
};

export default function NotebookShelf() {
  const [activeIndex, setActiveIndex] = useState(null);

  const activeData = activeIndex !== null ? products[activeIndex] : defaultInfo;

  return (
    <section className={styles.section} id="notebook-shelf">
      <div className={styles.gridOverlay} />
      
      <div className={styles.inner}>
        <div className={styles.body}>
          {/* Left Column: Dynamic Info */}
          <div className={styles.copy}>
            <div className={styles.eyebrow}>
              {activeData.eyebrow}
            </div>

            <h2 
              className={styles.headline} 
              dangerouslySetInnerHTML={{ __html: activeData.headline }} 
            />

            <p className={styles.sub}>
              {activeData.sub}
            </p>

            <div className={styles.ctas}>
              <Link href="/products" className={styles.btnPrimary}>
                Explore Range
              </Link>
              <Link href="/contact-us" className={styles.btnGhost}>
                Request Samples
              </Link>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <b>{activeData.stat1}</b>
                <span>{activeData.stat1Label}</span>
              </div>
              <div className={styles.stat}>
                <b>{activeData.stat2}</b>
                <span>{activeData.stat2Label}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Shelf */}
          <div 
            className={styles.shelfContainer}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <div className={styles.shelfBaseline} />

            <div className={styles.shelf}>
              {products.map((p, i) => {
                const isActive = activeIndex === i;

                return (
                  <div
                    key={p.id}
                    className={styles.bookSlot}
                    data-idx={i}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className={`${styles.book3D} ${isActive ? styles.active : ''}`}>
                      
                      {/* Spine View (Default 3D Side Angle View) */}
                      <div className={styles.spineFace} style={{ background: p.color }}>
                        <div className={styles.spineShine} />
                        <div className={styles.spineGroove} />
                        <span className={styles.mark}>P</span>
                        <span className={styles.label}>{p.name}</span>
                      </div>

                      {/* Front Cover Face (Rotates 3D Forward on Hover) */}
                      <div className={styles.frontCoverFace} style={{ background: p.color }}>
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 768px) 180px, 260px"
                          className={styles.coverImg}
                        />
                        <div className={styles.frontCoverOverlay}>
                          <div className={styles.frontHeader}>
                            <span className={styles.frontCode}>{p.code}</span>
                            <span className={styles.frontBrand}>PAPERFORCE</span>
                          </div>
                          <div className={styles.frontTitleGroup}>
                            <h3 className={styles.frontTitle}>{p.name}</h3>
                            <p className={styles.frontEdition}>{p.edition}</p>
                          </div>
                          <div className={styles.frontFooter}>
                            <span className={styles.frontBadge}>FINE PAPER</span>
                            <span className={styles.frontYear}>EST. 1988</span>
                          </div>
                        </div>
                      </div>

                      {/* Paper Pages 3D Stack Edge */}
                      <div className={styles.paperEdge} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
