/**
 * useCountUp
 * Counts a numeric value from 0 to `target` once the referenced element
 * scrolls into the viewport. Supports an optional `suffix` (e.g. "+" or "M")
 * that is appended after the number, and an optional `prefix` (e.g. "$").
 * Uses easeOutCubic for a snappy deceleration.
 */
import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;   // ms, default 1800
  prefix?: string;     // e.g. "$"
  suffix?: string;     // e.g. "+" or "M"
  offsetPx?: number;   // viewport offset before trigger, default 80
}

export function useCountUp({
  target,
  duration = 1800,
  prefix = '',
  suffix = '',
  offsetPx = 80,
}: UseCountUpOptions): [string, React.RefObject<HTMLElement | null>] {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const ref = useRef<HTMLElement | null>(null);
  const started = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const startAnimation = () => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const current = Math.round(eased * target);
        setDisplay(`${prefix}${current}${suffix}`);
        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(`${prefix}${target}${suffix}`);
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    };

    const check = () => {
      if (started.current) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh - offsetPx) {
        startAnimation();
      }
    };

    // Run once immediately in case already in view
    requestAnimationFrame(check);
    window.addEventListener('scroll', check, { passive: true });
    document.documentElement.addEventListener('scroll', check, { passive: true });

    return () => {
      window.removeEventListener('scroll', check);
      document.documentElement.removeEventListener('scroll', check);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, prefix, suffix, offsetPx]);

  return [display, ref];
}
