/**
 * HeroCrossfade — Scroll-pinned cinematic crossfade hero
 *
 * The outer container is 300vh tall. Inside, a sticky inner wrapper
 * stays pinned at 100vh while the user scrolls. Each panel's opacity
 * is driven by scroll progress — creating a smooth cinematic dissolve
 * from panel 1 → 2 → 3. The headline animation fires per-panel when
 * that panel becomes dominant (opacity > 0.5).
 *
 * Scroll map (each panel owns 100vh of scroll travel):
 *   0–100vh:   Panel 1 fully visible, fading out at 80–100vh
 *   80–180vh:  Panel 2 fading in (80–100vh), fully visible (100–160vh), fading out (160–180vh)
 *   160–300vh: Panel 3 fading in (160–180vh), fully visible thereafter
 */
import { useEffect, useRef, useCallback } from "react";
import { WaveHeadline } from "./WaveHeadline";

interface HeroPanel {
  src: string;
  alt: string;
  lines: { text: string }[];
  loading?: "eager" | "lazy";
}

const PANELS: HeroPanel[] = [
  {
    src: "/manus-storage/Kitesurfhero-4x_4ad00f95.webp",
    alt: "Kitesurf at sunset on the Indian Ocean, Paje, Zanzibar",
    lines: [
      { text: "Six in the morning." },
      { text: "The tide is in." },
      { text: "And the kites are up." },
    ],
    loading: "eager",
  },
  {
    src: "/manus-storage/brochure-cover-villa_a37d0940.jpg",
    alt: "Contemporary villa exterior at sunset — tropical landscaping, Hola Paje, Paje, Zanzibar",
    lines: [{ text: "500 metres away." }, { text: "Your own private villa." }],
    loading: "lazy",
  },
  {
    src: "/manus-storage/hero-aerial_b1b70375.png",
    alt: "Aerial view of the Hola Paje development with kite surfers on the Indian Ocean and Paje beach, Zanzibar",
    lines: [{ text: "Paje, Zanzibar." }, { text: "Village living perfected." }],
    loading: "lazy",
  },
];

// Scroll map:
//   Panel 1: 0–100vh (fades out 72–100vh)
//   Panel 2: 72–200vh (fades in 72–100vh, fully visible 100–172vh, fades out 172–200vh)
//   Panel 3: 172–380vh (fades in 172–200vh, fully visible 200–380vh — extra 80vh dwell)
//
// PANEL_HEIGHT = 1 viewport height per panel for panels 1 & 2.
// LAST_PANEL_DWELL adds extra scroll travel so panel 3 lingers before the map arrives.
const PANEL_HEIGHT = 1; // in viewport heights
const FADE_ZONE = 0.28; // fraction of panel height used for crossfade
const LAST_PANEL_DWELL = 0.6; // extra vh of dwell added to the final panel
// Panel 3 stays fully visible for 60vh after it arrives, then fades out
// quickly so the user only needs one scroll gesture to exit the hero.

// Total sequence height in svh units (used for the outer container)
export const SEQUENCE_HEIGHT_SVH = PANELS.length * 100 + LAST_PANEL_DWELL * 100;

function getPanelOpacity(panelIndex: number, progress: number): number {
  // progress: 0 = top of sequence, (PANELS.length + LAST_PANEL_DWELL) = bottom
  const start = panelIndex * PANEL_HEIGHT;
  const end = start + PANEL_HEIGHT;
  const fadeIn = start - FADE_ZONE;
  const fadeOut = end - FADE_ZONE;

  if (progress <= fadeIn) return panelIndex === 0 ? 1 : 0;

  // Last panel: stays fully visible through the extended dwell
  if (panelIndex === PANELS.length - 1) {
    if (progress < start) return Math.max(0, (progress - fadeIn) / FADE_ZONE);
    return 1;
  }

  if (progress >= end) return 0;

  if (panelIndex === 0) {
    // Panel 1: always starts at 1, fades out
    if (progress < fadeOut) return 1;
    return 1 - (progress - fadeOut) / FADE_ZONE;
  }

  // Fade in
  if (progress < start) {
    return Math.max(0, (progress - fadeIn) / FADE_ZONE);
  }
  // Fully visible
  if (progress < fadeOut) return 1;
  // Fade out
  return 1 - (progress - fadeOut) / FADE_ZONE;
}

// The sticky wrapper fades out over the last EXIT_ZONE of the sequence,
// giving continuous visual feedback during the panel 3 dwell so scroll
// momentum never feels stalled.
const EXIT_ZONE = 0.55; // fraction of LAST_PANEL_DWELL used for the fade-out

export function HeroCrossfade() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Track which panel is currently dominant to avoid re-triggering on every frame
  const dominantRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);

  const resetHeadline = useCallback((index: number) => {
    const wrap = headlineRefs.current[index];
    if (!wrap) return;
    const lineEls = wrap.querySelectorAll<HTMLElement>(".wh-line");
    const ruleEl = wrap.querySelector<HTMLElement>(".wh-rule");
    lineEls.forEach(el => {
      el.style.transitionDelay = "0ms";
      el.classList.remove("wh-line--visible");
    });
    if (ruleEl) {
      ruleEl.style.transitionDelay = "0ms";
      ruleEl.classList.remove("wh-rule--visible");
    }
  }, []);

  const triggerHeadline = useCallback((index: number) => {
    const wrap = headlineRefs.current[index];
    if (!wrap) return;
    const lineEls = wrap.querySelectorAll<HTMLElement>(".wh-line");
    const ruleEl = wrap.querySelector<HTMLElement>(".wh-rule");
    // Shorter delay for crossfade transitions (panels 2+), longer for initial load (panel 1)
    const baseDelay = index === 0 ? 600 : 150;
    const stagger = 260;
    lineEls.forEach((el, i) => {
      el.style.transitionDelay = `${baseDelay + i * stagger}ms`;
      el.classList.add("wh-line--visible");
    });
    if (ruleEl) {
      const ruleDelay = baseDelay + (lineEls.length - 1) * stagger + 380;
      ruleEl.style.transitionDelay = `${ruleDelay}ms`;
      ruleEl.classList.add("wh-rule--visible");
    }
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = outer.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        // How far we've scrolled INTO the sequence (in vh units)
        const scrolled = -rect.top;
        const progress = scrolled / vh; // 0 at top, (PANELS.length + LAST_PANEL_DWELL) at bottom

        // Fade the entire sticky wrapper out over the last EXIT_ZONE of the dwell
        // so scroll always produces visible movement — no dead zone.
        const totalProgress = PANELS.length + LAST_PANEL_DWELL;
        const exitStart = totalProgress - EXIT_ZONE;
        let stickyOpacity = 1;
        if (progress >= exitStart) {
          stickyOpacity = Math.max(0, 1 - (progress - exitStart) / EXIT_ZONE);
        }
        if (stickyRef.current) {
          stickyRef.current.style.opacity = String(stickyOpacity);
        }

        // Find which panel is dominant (opacity > 0.5)
        let newDominant = dominantRef.current;
        PANELS.forEach((_, i) => {
          const opacity = getPanelOpacity(i, progress);
          const panel = panelRefs.current[i];
          if (panel) {
            panel.style.opacity = String(Math.max(0, Math.min(1, opacity)));
          }
          if (opacity > 0.5) newDominant = i;
        });

        // On dominant panel change: reset outgoing headline, trigger incoming
        if (newDominant !== dominantRef.current) {
          const prev = dominantRef.current;
          dominantRef.current = newDominant;
          // Reset the outgoing panel's text (except panel 0 on first load)
          if (prev >= 0) resetHeadline(prev);
          // Small rAF delay so the reset paints before the trigger fires
          requestAnimationFrame(() => triggerHeadline(newDominant));
        }
      });
    };

    // Trigger panel 1 headline immediately on mount (it's already in view)
    dominantRef.current = 0;
    triggerHeadline(0);

    const scrollEl = document.documentElement;
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial paint

    return () => {
      scrollEl.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [triggerHeadline, resetHeadline]);

  return (
    <div
      ref={outerRef}
      className="hp-crossfade-outer"
      aria-label="Hola Paje — opening sequence"
      style={{ height: `${SEQUENCE_HEIGHT_SVH}svh` }}
    >
      {/* Sticky inner — stays pinned at 100svh while outer scrolls */}
      <div className="hp-crossfade-sticky" ref={stickyRef}>
        {PANELS.map((panel, i) => (
          <div
            key={i}
            ref={el => {
              panelRefs.current[i] = el;
            }}
            className="hp-crossfade-panel"
            data-panel={i}
            style={{ opacity: i === 0 ? 1 : 0 }}
            aria-hidden={i !== 0}
          >
            <img
              src={panel.src}
              alt={panel.alt}
              className="hp-seq-bg"
              fetchPriority={panel.loading === "eager" ? "high" : undefined}
              loading={panel.loading}
            />
            <div className="hp-seq-overlay" aria-hidden="true" />
            <div className="hp-seq-content hp-seq-content--headline-only">
              {/* headlineRefs tracks the wh-wrap inside WaveHeadline */}
              <div
                ref={el => {
                  headlineRefs.current[i] = el;
                }}
              >
                <WaveHeadline
                  as={i === 0 ? "h1" : "h2"}
                  lines={panel.lines}
                  baseDelay={
                    -1
                  } /* disabled — triggered manually via triggerHeadline */
                  stagger={280}
                  showRule={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
