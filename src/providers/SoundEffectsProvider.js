'use client';

import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

const SoundContext = createContext({
  isMuted: false,
  toggleSound: () => {},
  playHover: () => {},
  playClick: () => {},
  playSlide: () => {},
  playDrawerOpen: () => {},
  playDrawerClose: () => {},
  playSuccess: () => {},
});

export function useSound() {
  return useContext(SoundContext);
}

export default function SoundEffectsProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const isMutedRef = useRef(false);
  const lastHoverTimeRef = useRef(0);

  // Initialize Audio Context lazily on first interaction
  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;

    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }

    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }

    return audioCtxRef.current;
  }, []);

  // Sync mute state with localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('twofold_sound_muted');
      if (saved !== null) {
        const muted = saved === 'true';
        setIsMuted(muted);
        isMutedRef.current = muted;
      }
    } catch {
      // Ignore localStorage read errors in private browsing
    }

    // Auto-unlock AudioContext on first user interaction anywhere
    const unlockAudio = () => {
      getAudioContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [getAudioContext]);

  const toggleSound = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      isMutedRef.current = next;
      try {
        localStorage.setItem('twofold_sound_muted', String(next));
      } catch {
        // Ignore localStorage write error
      }
      return next;
    });
  }, []);

  // ── 1. Hover Sound: Ultra-soft, delicate paper tick ──
  const playHover = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.028);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Fail silently if audio node creation is blocked
    }
  }, [getAudioContext]);

  // ── 2. Click Sound: Crisp, tactile mechanical stationery snap ──
  const playClick = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;

      // Low punch transient
      const lowOsc = ctx.createOscillator();
      const lowGain = ctx.createGain();
      lowOsc.type = 'sine';
      lowOsc.frequency.setValueAtTime(320, now);
      lowOsc.frequency.exponentialRampToValueAtTime(70, now + 0.042);
      lowGain.gain.setValueAtTime(0.065, now);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);
      lowOsc.connect(lowGain);
      lowGain.connect(ctx.destination);
      lowOsc.start(now);
      lowOsc.stop(now + 0.045);

      // High crisp click transient
      const highOsc = ctx.createOscillator();
      const highGain = ctx.createGain();
      highOsc.type = 'triangle';
      highOsc.frequency.setValueAtTime(1800, now);
      highOsc.frequency.exponentialRampToValueAtTime(900, now + 0.02);
      highGain.gain.setValueAtTime(0.035, now);
      highGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      highOsc.connect(highGain);
      highGain.connect(ctx.destination);
      highOsc.start(now);
      highOsc.stop(now + 0.022);
    } catch {
      // Fail silently
    }
  }, [getAudioContext]);

  // ── 3. Slide / Carousel Navigation Sound: Airy paper glide & whoosh ──
  const playSlide = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.14;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Synthesize soft filtered white/pink noise for crisp paper glide
      let lastVal = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastVal = (lastVal + 0.02 * white) / 1.02;
        data[i] = lastVal * 2.8;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 0.06);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.14);
      filter.Q.setValueAtTime(2.2, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.15);
    } catch {
      // Fail silently
    }
  }, [getAudioContext]);

  // ── 4. Drawer Open: Warm, elegant acoustic bloom ──
  const playDrawerOpen = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(360, now + 0.16);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.05, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.19);
    } catch {
      // Fail silently
    }
  }, [getAudioContext]);

  // ── 5. Drawer Close: Crisp mechanical fold snap ──
  const playDrawerClose = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Fail silently
    }
  }, [getAudioContext]);

  // ── 6. Success Chime: Soft positive harmonic chime ──
  const playSuccess = useCallback(() => {
    if (isMutedRef.current) return;
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + i * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Fail silently
    }
  }, [getAudioContext]);

  // ── 7. Global Event Delegation Across Whole Site ──
  useEffect(() => {
    // PointerEnter delegation: Triggers playHover on any interactive element
    const handlePointerEnter = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const interactive = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], [data-sound="hover"]'
      );

      if (interactive) {
        const now = Date.now();
        // 45ms throttle prevents sonic clutter on rapid cursor gestures
        if (now - lastHoverTimeRef.current > 45) {
          lastHoverTimeRef.current = now;
          playHover();
        }
      }
    };

    // Click delegation: Triggers playClick or custom data-sound actions
    const handleClick = (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const slideTrigger = target.closest('[data-sound="slide"]');
      if (slideTrigger) {
        playSlide();
        return;
      }

      const interactive = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"]'
      );

      if (interactive) {
        playClick();
      }
    };

    document.addEventListener('pointerenter', handlePointerEnter, { capture: true, passive: true });
    document.addEventListener('click', handleClick, { capture: true, passive: true });

    return () => {
      document.removeEventListener('pointerenter', handlePointerEnter, { capture: true });
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [playHover, playClick, playSlide]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleSound,
        playHover,
        playClick,
        playSlide,
        playDrawerOpen,
        playDrawerClose,
        playSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
