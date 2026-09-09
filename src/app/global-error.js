'use client';

import React, { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{
        margin: 0,
        backgroundColor: '#11172D',
        color: '#F9FAF5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '500px' }}>
          <span style={{
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C9A24A',
            fontWeight: 600,
            display: 'block',
            marginBottom: '1rem'
          }}>
            TWOFOLD · ERROR RECOVERY
          </span>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 400,
            marginBottom: '1rem'
          }}>
            Application Error
          </h1>
          <p style={{
            color: 'rgba(249, 250, 245, 0.7)',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            An unexpected error occurred. Please try reloading the application.
          </p>
          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#C9A24A',
              color: '#11172D',
              border: 'none',
              padding: '0.9rem 2rem',
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              borderRadius: '2px'
            }}
          >
            RELOAD APPLICATION
          </button>
        </div>
      </body>
    </html>
  );
}
