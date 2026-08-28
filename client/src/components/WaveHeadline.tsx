/**
 * WaveHeadline — Line-by-line staggered entrance
 *
 * Each line of the headline fades in and rises as a complete unit,
 * with a configurable stagger between lines. A thin gold rule draws
 * in beneath the last line after the text settles.
 *
 * Replaces the word-by-word wave with a more considered, cinematic
 * treatment — each line lands with weight before the next arrives.
 *
 * Special: pass baseDelay={-1} to disable the IntersectionObserver
 * entirely. The parent component (e.g. HeroCrossfade) can then
 * trigger the animation manually by adding .wh-line--visible and
 * .wh-rule--visible classes to the DOM elements.
 */
import { useEffect, useRef, type JSX } from 'react';

interface WaveHeadlineLine {
  text: string;
}
interface WaveHeadlineProps {
  lines: WaveHeadlineLine[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Base delay in ms before the first line animates (default 300).
   *  Pass -1 to disable auto-trigger entirely. */
  baseDelay?: number;
  /** Stagger between lines in ms (default 200) */
  stagger?: number;
  /** Use dark text (for light-background panels) */
  dark?: boolean;
  /** Show gold rule beneath the headline (default true) */
  showRule?: boolean;
}

export function WaveHeadline({
  lines,
  as: Tag = 'h2',
  className = 'hp-seq-headline',
  baseDelay = 300,
  stagger = 200,
  dark = false,
  showRule = true,
}: WaveHeadlineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // baseDelay = -1 means: disable auto-trigger entirely.
    // The parent (e.g. HeroCrossfade) will trigger manually via DOM.
    if (baseDelay === -1) return;

    const lineEls = wrap.querySelectorAll<HTMLElement>('.wh-line');
    const ruleEl = wrap.querySelector<HTMLElement>('.wh-rule');

    const trigger = () => {
      if (fired.current) return;
      fired.current = true;

      lineEls.forEach((el, i) => {
        const delay = baseDelay + i * stagger;
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('wh-line--visible');
      });

      if (ruleEl) {
        // Rule draws in after the last line has settled
        const ruleDelay = baseDelay + (lineEls.length - 1) * stagger + 380;
        ruleEl.style.transitionDelay = `${ruleDelay}ms`;
        ruleEl.classList.add('wh-rule--visible');
      }
    };

    // Use document.documentElement as root — html is the scroll container
    // when any descendant has overflow/contain properties.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trigger();
            observer.disconnect();
          }
        });
      },
      { root: document.documentElement, threshold: 0.1 }
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [baseDelay, stagger]);

  const lineEls: JSX.Element[] = lines.map((line, i) => (
    <span key={i} className="wh-line" style={{ display: 'block' }}>
      {line.text}
    </span>
  ));

  return (
    <div ref={wrapRef} className="wh-wrap">
      <Tag className={`${className}${dark ? ' hp-seq-headline--dark' : ''}`}>
        {lineEls}
      </Tag>
      {showRule && <span className="wh-rule" aria-hidden="true" />}
    </div>
  );
}
