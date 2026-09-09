'use client';

import React, { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('App Error:', error);
  }, [error]);

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
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: '#C9A24A',
        fontWeight: 600,
        marginBottom: '1rem'
      }}>
        SYSTEM NOTICE
      </span>
      <h2 style={{
        fontFamily: 'var(--font-heading, "The Youngest Serif", Georgia, serif)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 400,
        margin: '0 0 1rem 0',
        color: '#11172D'
      }}>
        Something went wrong
      </h2>
      <p style={{
        maxWidth: '480px',
        color: 'rgba(17, 23, 45, 0.65)',
        lineHeight: 1.6,
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        We encountered an unexpected error while loading this section. Please refresh or try again.
      </p>
      <Button variant="primary" onClick={() => reset()}>
        TRY AGAIN
      </Button>
    </div>
  );
}
