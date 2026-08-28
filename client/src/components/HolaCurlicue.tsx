/**
 * HolaCurlicue — the calligraphic brushstroke flourish from the Hola Paje logo.
 *
 * Uses the actual extracted PNG from the master logo file.
 * Two colour variants: 'gold' (#B8922A) and 'white' (#F2EDE6).
 * Aspect ratio ~2.33:1 (420×180 source). Use sparingly as a decorative accent.
 *
 * Usage:
 *   <HolaCurlicue />                     — gold, medium (24px tall)
 *   <HolaCurlicue color="white" />       — white on dark bg
 *   <HolaCurlicue size="sm" />           — 16px tall
 *   <HolaCurlicue size="lg" />           — 36px tall
 */

interface HolaCurlicueProps {
  color?: 'gold' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-hidden'?: boolean;
}

const GOLD_URL = '/manus-storage/curlicue-gold_209ccd87.png';
const WHITE_URL = '/manus-storage/curlicue-white_90b0f600.png';

export function HolaCurlicue({
  color = 'gold',
  size = 'md',
  className = '',
  'aria-hidden': ariaHidden = true,
}: HolaCurlicueProps) {
  const heights = { sm: 16, md: 24, lg: 36 };
  const h = heights[size];
  // Source is 420×180, aspect ratio = 420/180 = 2.333
  const w = Math.round(h * (420 / 180));

  return (
    <img
      src={color === 'white' ? WHITE_URL : GOLD_URL}
      width={w}
      height={h}
      alt=""
      aria-hidden={ariaHidden}
      role="presentation"
      className={className}
      style={{ display: 'block', userSelect: 'none' }}
    />
  );
}
