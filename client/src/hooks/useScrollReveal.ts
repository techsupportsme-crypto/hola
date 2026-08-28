import { useEffect } from 'react';

/**
 * useScrollReveal
 * Adds the 'visible' class to any element with the 'reveal' class
 * when it enters the viewport. Uses getBoundingClientRect on scroll
 * instead of IntersectionObserver — works reliably on all browsers
 * and devices regardless of which element is the scroll container.
 */
export function useScrollReveal(offsetPx = 60) {
  useEffect(() => {
    const check = () => {
      const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.visible)');
      const vh = window.innerHeight || document.documentElement.clientHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < vh - offsetPx) {
          el.classList.add('visible');
        }
      });
    };

    // Run once immediately to reveal elements already in view
    requestAnimationFrame(check);

    // Listen on both window and document.documentElement to cover
    // all browsers (some scroll on html, some on window)
    window.addEventListener('scroll', check, { passive: true });
    document.documentElement.addEventListener('scroll', check, { passive: true });

    return () => {
      window.removeEventListener('scroll', check);
      document.documentElement.removeEventListener('scroll', check);
    };
  }, [offsetPx]);
}
