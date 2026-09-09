import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F9FAF5',
      color: '#11172D',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, sans-serif)'
    }}>
      <span style={{
        fontSize: '0.75rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: '#C9A24A',
        fontWeight: 600,
        marginBottom: '1rem'
      }}>
        404 · NOT FOUND
      </span>
      <h1 style={{
        fontFamily: 'var(--font-heading, "The Youngest Serif", Georgia, serif)',
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: 400,
        margin: '0 0 1rem 0'
      }}>
        Page Not Found
      </h1>
      <p style={{
        maxWidth: '450px',
        color: 'rgba(17, 23, 45, 0.65)',
        lineHeight: 1.6,
        marginBottom: '2rem'
      }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#11172D',
          color: '#F9FAF5',
          padding: '0.9rem 2rem',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          textDecoration: 'none',
          textTransform: 'uppercase',
          fontWeight: 600,
          borderRadius: '2px'
        }}
      >
        RETURN HOME
      </Link>
    </div>
  );
}
