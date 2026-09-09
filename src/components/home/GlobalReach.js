'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import * as d3Geo from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import styles from './GlobalReach.module.css';

const LOCATIONS = [
  { id: 'jnpt', name: 'India', coords: [72.95, 18.95], isOrigin: true },
  { id: 'usa', name: 'USA', coords: [-95.71, 37.09], isOrigin: false },
  { id: 'uk', name: 'United Kingdom', coords: [-2.24, 53.48], isOrigin: false },
  { id: 'africa', name: 'Nigeria', coords: [3.37, 6.52], isOrigin: false },
  { id: 'uae', name: 'UAE', coords: [55.27, 25.20], isOrigin: false },
  { id: 'asia', name: 'China', coords: [121.47, 31.23], isOrigin: false },
];

export default function GlobalReach() {
  const [activeLocation, setActiveLocation] = useState(null);

  // Generate 100% Real Geographic SVG Paths from Natural Earth TopoJSON
  const { paths, projection } = useMemo(() => {
    // Equal Earth Geographic Projection focused cleanly for side-by-side right column
    const proj = d3Geo
      .geoEqualEarth()
      .scale(215)
      .translate([490, 260]);

    const pathGen = d3Geo.geoPath().projection(proj);
    const countryFeatures = feature(worldData, worldData.objects.countries).features;

    const countryPaths = countryFeatures
      .filter((c) => c.id !== '010') // Exclude Antarctica for clean layout whitespace
      .map((c, i) => ({
        id: c.id || i,
        d: pathGen(c) || '',
      }));

    return { paths: countryPaths, projection: proj };
  }, []);

  return (
    <section className={styles.section} id="global-reach">
      <div className={styles.inner}>
        <div className={styles.layout}>
          
          {/* ── LEFT COLUMN: ALL INFO & STATISTICS ── */}
          <div className={styles.infoCol}>
            <span className={styles.eyebrow}>GLOBAL REACH</span>
            <h2 className={styles.headline}>
              Made in India.<br />
              Shipped Worldwide.
            </h2>
            <p className={styles.copy}>
              From West Africa to the Middle East, the UK to the Americas — 
              Twofold manufactures and exports high-volume paper stationery 
              through Nhava Sheva (JNPT), India's premier container port.
            </p>

            <Link href="/about-us" className={styles.ctaBtn}>
              See Our Global Reach →
            </Link>

            {/* Statistics Grid on Left Column below text */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>1000+</span>
                <p className={styles.statLabel}>
                  Total workforce working across manufacturing lines.
                </p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>10+</span>
                <p className={styles.statLabel}>
                  Global export destinations served annually.
                </p>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statNumber}>100k+</span>
                <p className={styles.statLabel}>
                  Daily notebook output capacity.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: REAL GEOGRAPHIC MAP WITH BLINKING COUNTRY POINTS ── */}
          <div className={styles.mapCol}>
            <div className={styles.mapFrame}>
              <svg
                className={styles.worldMapSvg}
                viewBox="0 0 980 520"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Geographically Accurate Real World Map"
              >
                {/* Real Geographic Country Paths */}
                <g className={styles.countriesGroup}>
                  {paths.map((country) => (
                    <path
                      key={country.id}
                      d={country.d}
                      className={styles.countryPath}
                    />
                  ))}
                </g>

                {/* Shipping Arcs from India */}
                {(() => {
                  const originCoords = projection([72.95, 18.95]);
                  if (!originCoords) return null;

                  return LOCATIONS.filter((l) => !l.isOrigin).map((loc) => {
                    const targetCoords = projection(loc.coords);
                    if (!targetCoords) return null;

                    const midX = (originCoords[0] + targetCoords[0]) / 2;
                    const midY = (originCoords[1] + targetCoords[1]) / 2 - 35;
                    const d = `M ${originCoords[0]} ${originCoords[1]} Q ${midX} ${midY}, ${targetCoords[0]} ${targetCoords[1]}`;

                    return (
                      <path
                        key={`route-${loc.id}`}
                        d={d}
                        className={styles.shippingRoute}
                      />
                    );
                  });
                })()}

                {/* Geographically Accurate Blinking Points showing Country Name on Hover */}
                {LOCATIONS.map((loc) => {
                  const projected = projection(loc.coords);
                  if (!projected) return null;
                  const [cx, cy] = projected;
                  const isHovered = activeLocation?.id === loc.id;
                  const pillWidth = Math.max(loc.name.length * 11 + 32, 90);
                  const pillHeight = 32;

                  return (
                    <g
                      key={loc.id}
                      transform={`translate(${cx}, ${cy})`}
                      className={`${styles.markerGroup} ${isHovered ? styles.activeMarker : ''} ${loc.isOrigin ? styles.originMarker : ''}`}
                      onMouseEnter={() => setActiveLocation(loc)}
                      onMouseLeave={() => setActiveLocation(null)}
                    >
                      {/* Transparent Large Hover Hitbox (28px radius) */}
                      <circle r="28" fill="transparent" style={{ cursor: 'pointer' }} />

                      {/* Animated Pulse Ring */}
                      <circle r="14" className={styles.pulseRing} />

                      {/* Outer Dark Ring */}
                      <circle r="8" className={styles.markerOuter} />

                      {/* White Separation Ring */}
                      <circle r="5" className={styles.markerInnerWhite} />

                      {/* Black Center */}
                      <circle r="3" className={styles.markerCenter} />

                      {/* Prominent, Large Country Name Tag Label (Reveals on hover) */}
                      <g className={styles.countryTagGroup}>
                        <rect
                          rx="8"
                          ry="8"
                          x="16"
                          y="-16"
                          width={pillWidth}
                          height={pillHeight}
                          className={styles.countryLabelBg}
                        />
                        <text
                          x={16 + pillWidth / 2}
                          y="0"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className={styles.countryLabelText}
                        >
                          {loc.name}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
