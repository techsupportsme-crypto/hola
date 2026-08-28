/*
 * HOLA PAJE — VillaModal
 * Design: Montserrat-only, linen/charcoal palette
 * Full-screen slide-in from right.
 * Left rail (320px): villa label, name, statement, area table, Register Interest CTA
 * Right stage: unified horizontal single-image slider for BOTH Gallery and Floor Plans tabs.
 *   - One image at a time, fills the stage
 *   - Prev/Next arrow buttons (above tab bar, hidden on VIDEO tab)
 *   - Dot breadcrumb trail + numeric counter
 *   - Touch swipe (left/right/up/down) to navigate
 *   - Mouse wheel scroll to navigate (debounced)
 *   - Keyboard arrow keys to navigate
 * Tab order: VIDEO (default) | IMAGES | PLANS
 * Escape key closes. Mobile: stacked column.
 */

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import type { VillaType } from '@/lib/villaData';
import { ContactFormModal } from '@/components/ContactFormModal';

interface VillaModalProps {
  villa: VillaType | null;
  onClose: () => void;
  onEnquire: () => void;
}

type TabId = 'gallery' | 'plans' | 'video';

// Detect mobile viewport (matches Navigation.tsx breakpoint)
function useIsMobile() {
  const [mobile, setMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 1024);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

// Native video player component — uses CDN URLs directly
// Plays with audio by default; mute button overlaid; replay button on end
// Exposes a `stopPlayback()` method via ref so the parent can pause+mute on close/tab-switch
interface NativeVideoHandle {
  stopPlayback: () => void;
}

const NativeVideo = forwardRef<NativeVideoHandle, { src16x9: string; src1x1?: string; isMobile: boolean }>(
  function NativeVideo({ src16x9, src1x1, isMobile }, ref) {
  const videoSrc = (isMobile && src1x1) ? src1x1 : src16x9;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);

  // Expose stopPlayback so parent can pause+mute without prop-drilling
  useImperativeHandle(ref, () => ({
    stopPlayback() {
      const v = videoRef.current;
      if (!v) return;
      v.pause();
      v.muted = true;
      setMuted(true);
    },
  }));

  // Reset ended state when src changes
  useEffect(() => {
    setEnded(false);
    setMuted(false);
  }, [videoSrc]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(m => !m);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setEnded(false);
    }
  };

  // On mobile with a 1:1 source, use square wrapper so video fills full width
  const wrapClass = (isMobile && src1x1) ? 'square' : 'landscape';

  return (
    <div className={`hp-modal-video-wrap ${wrapClass}`} style={{ position: 'relative' }}>
      <video
        ref={videoRef}
        key={videoSrc}
        className="hp-modal-video-player"
        src={videoSrc}
        autoPlay
        muted={muted}
        playsInline
        controls={false}
        onEnded={() => setEnded(true)}
      />
      {/* Mute / unmute button — bottom-right corner */}
      <button
        className="hp-modal-video-mute-btn"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          // Speaker crossed out
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // Speaker with waves
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
      {/* Replay button — centred, appears when video ends */}
      {ended && (
        <button
          className="hp-modal-video-replay-btn"
          onClick={handleReplay}
          aria-label="Replay video"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="11" fill="rgba(0,0,0,0.55)" stroke="rgba(242,237,230,0.7)" strokeWidth="1.2" />
            <polygon points="10,8 18,12 10,16" fill="rgba(242,237,230,0.95)" />
          </svg>
        </button>
      )}
    </div>
  );
});

// Unified slider hook — handles index, animation, touch, wheel
function useSlider(total: number) {
  const [index, setIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null);
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const wheelAccum = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useCallback((dir: 'left' | 'right') => {
    if (animating || total <= 1) return;
    // Haptic confirmation on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(12);
    }
    setSlideDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex(i => dir === 'left'
        ? (i + 1) % total
        : (i - 1 + total) % total
      );
      setSlideDir(null);
      setAnimating(false);
    }, 300);
  }, [animating, total]);

  const goTo = useCallback((target: number) => {
    if (animating || target === index || total <= 1) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(12);
    }
    const dir = target > index ? 'left' : 'right';
    setSlideDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex(target);
      setSlideDir(null);
      setAnimating(false);
    }, 300);
  }, [animating, index, total]);

  const goNext = useCallback(() => navigate('left'), [navigate]);
  const goPrev = useCallback(() => navigate('right'), [navigate]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const threshold = 40;
    if (absDx < threshold && absDy < threshold) return;
    // Horizontal swipe takes priority; vertical swipe also works
    if (absDx >= absDy) {
      dx < 0 ? goNext() : goPrev();
    } else {
      dy < 0 ? goNext() : goPrev();
    }
  }, [goNext, goPrev]);

  // Wheel handler — accumulate delta, fire once threshold crossed
  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    wheelAccum.current += delta;
    if (wheelTimer.current) clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => { wheelAccum.current = 0; }, 400);
    if (Math.abs(wheelAccum.current) > 60) {
      wheelAccum.current > 0 ? goNext() : goPrev();
      wheelAccum.current = 0;
    }
  }, [goNext, goPrev]);

  return { index, setIndex, slideDir, goNext, goPrev, goTo, onTouchStart, onTouchEnd, onWheel };
}

export function VillaModal({ villa, onClose, onEnquire }: VillaModalProps) {
  // IMAGES is the default tab
  const [activeTab, setActiveTab] = useState<TabId>('gallery');
  const isMobile = useIsMobile();
  const [showContactForm, setShowContactForm] = useState(false);
  const isOpen = villa !== null;
  const railRef = useRef<HTMLDivElement>(null);
  // Ref to the NativeVideo instance so we can stop it on close/tab-switch
  const nativeVideoRef = useRef<NativeVideoHandle>(null);

  // Helper: pause and mute the video if it is currently playing
  const stopVideo = useCallback(() => {
    nativeVideoRef.current?.stopPlayback();
  }, []);

  // Build flat plans array: floor plans first, then axos
  const plansImages = villa
    ? [
        ...villa.floorplanImages,
        ...villa.axoImages,
      ]
    : [];

  const gallerySlider = useSlider(villa ? villa.galleryImages.length : 0);
  const plansSlider = useSlider(plansImages.length);

  const activeSlider = activeTab === 'gallery' ? gallerySlider : plansSlider;
  const activeImages: Array<{ src: string; alt: string; objectPosition?: string }> = activeTab === 'gallery'
    ? (villa ? villa.galleryImages : [])
    : plansImages;

  // Reset state when villa changes
  useEffect(() => {
    if (villa) {
      // Always default to gallery (images) tab
      setActiveTab('gallery');
      setShowContactForm(false);
      gallerySlider.setIndex(0);
      plansSlider.setIndex(0);
      if (railRef.current) railRef.current.scrollTop = 0;
    }
  }, [villa?.id]);

  // Pause+mute video when modal closes
  const handleClose = useCallback(() => {
    stopVideo();
    onClose();
  }, [stopVideo, onClose]);

  // Pause+mute video when switching away from the video tab
  const handleTabChange = useCallback((tab: TabId) => {
    if (activeTab === 'video' && tab !== 'video') {
      stopVideo();
    }
    setActiveTab(tab);
  }, [activeTab, stopVideo]);

  // Escape + keyboard arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') activeSlider.goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') activeSlider.goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose, activeSlider]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleRegisterInterest = () => setShowContactForm(true);

  const totalImages = activeImages.length;
  const showNavControls = activeTab !== 'video' && totalImages > 1;
  const showEnquiry = false; // kept for CSS class compat — form is now a separate modal

  // Shared tab renderer — tab order: IMAGES | PLANS | VIDEO
  const renderTabs = (prefix: string, tabClass: string, activeTabClass: string) => (
    <div className={`${prefix}-tabs`} role="tablist">
      <button
        role="tab"
        aria-selected={activeTab === 'gallery'}
        className={`${tabClass}${activeTab === 'gallery' ? ` ${activeTabClass}` : ''}`}
        onClick={() => handleTabChange('gallery')}
      >
        Images
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'plans'}
        className={`${tabClass}${activeTab === 'plans' ? ` ${activeTabClass}` : ''}`}
        onClick={() => handleTabChange('plans')}
      >
        Plans
      </button>
      {villa?.videos && (
        <button
          role="tab"
          aria-selected={activeTab === 'video'}
          className={`${tabClass}${activeTab === 'video' ? ` ${activeTabClass}` : ''}`}
          onClick={() => handleTabChange('video')}
        >
          Video
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`hp-modal-backdrop${isOpen ? ' open' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Close button — outside the transformed modal so position:fixed works */}
      {isOpen && (
        <button
          className="hp-modal-close"
          onClick={handleClose}
          aria-label="Close villa details"
        >
          ✕
        </button>
      )}

      {/* Modal panel — full screen */}
      <div
        className={`hp-modal${isOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={villa ? `${villa.tabLabel} details` : 'Villa details'}
      >

        {villa && (
          <>
            {/* LEFT RAIL */}
            <div className="hp-modal-rail" ref={railRef}>
              {/* ── SCROLLABLE UPPER ZONE — price, name, statement, area table ── */}
              <div className="hp-modal-rail-scroll">
                <p className="hp-modal-villa-label">
                  {villa.fromPrice}
                </p>
                <h2 className="hp-modal-villa-name">
                  {villa.tabLabel}
                </h2>
                <p className="hp-modal-statement">
                  {villa.statementBody}
                </p>
                {/* Area table */}
                <table className="hp-modal-area-table" aria-label={`${villa.tabLabel} area breakdown`}>
                  <tbody>
                    {villa.areas.map((row) => (
                      <tr key={row.label} className={row.isTotal ? 'total' : ''}>
                        <td>{row.label}</td>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── PINNED CONTROLS ZONE — always visible at bottom of rail ── */}
              <div className="hp-modal-rail-controls">
                {/* Nav controls (prev/next) — ABOVE the tab bar, only when IMAGES or PLANS */}
                <div className={`hp-modal-rail-nav-group${showEnquiry ? ' hidden' : ''}`}>
                  {showNavControls && (
                    <div className="hp-modal-rail-nav">
                      <button
                        className="hp-modal-rail-arrow"
                        onClick={activeSlider.goPrev}
                        aria-label="Previous image"
                      >
                        ←
                      </button>
                      <span className="hp-modal-rail-counter" aria-live="polite">
                        {activeSlider.index + 1} / {totalImages}
                      </span>
                      <button
                        className="hp-modal-rail-arrow"
                        onClick={activeSlider.goNext}
                        aria-label="Next image"
                      >
                        →
                      </button>
                    </div>
                  )}
                  {/* Tab bar: VIDEO | IMAGES | PLANS */}
                  {renderTabs('hp-modal-rail', 'hp-modal-rail-tab', 'active')}
                </div>

                {/* Register Interest button — opens ContactFormModal */}
                <button
                  className="hp-modal-register-btn"
                  onClick={handleRegisterInterest}
                >
                  Register Interest
                </button>
              </div>
            </div>

            {/* MOBILE-ONLY CONTROLS — single horizontal row: ← [IMAGES|PLANS|VIDEO] → */}
            <div className={`hp-modal-stage-controls${showEnquiry ? ' hidden' : ''}`}>
              <div className="hp-modal-stage-combined-row">
                {/* Left arrow — visible when IMAGES or PLANS, invisible (but space-holding) for VIDEO */}
                <button
                  className={`hp-modal-stage-arrow${!showNavControls ? ' invisible' : ''}`}
                  onClick={activeSlider.goPrev}
                  aria-label="Previous image"
                  tabIndex={showNavControls ? 0 : -1}
                >
                  ←
                </button>
                {/* Tab bar centred between arrows */}
                {renderTabs('hp-modal-stage', 'hp-modal-stage-tab', 'active')}
                {/* Right arrow */}
                <button
                  className={`hp-modal-stage-arrow${!showNavControls ? ' invisible' : ''}`}
                  onClick={activeSlider.goNext}
                  aria-label="Next image"
                  tabIndex={showNavControls ? 0 : -1}
                >
                  →
                </button>
              </div>
            </div>

            {/* RIGHT STAGE — pure display surface */}
            <div
              className={`hp-modal-stage${activeTab === 'video' ? ' video-active' : ''}${activeTab === 'plans' ? ' plans-mode' : ''}`}
              onTouchStart={(e) => { (window as any)._dismissSwipeX = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const dx = e.changedTouches[0].clientX - ((window as any)._dismissSwipeX ?? 0);
                if (dx > 80) handleClose();
              }}
            >
              {/* VIDEO PANEL — shown only when video tab is active */}
              {activeTab === 'video' && villa.videos && (
                <div className="hp-modal-video-stage" role="tabpanel" aria-label="Villa video">
                  <NativeVideo
                    ref={nativeVideoRef}
                    src16x9={villa.videos.video16x9}
                    src1x1={villa.videos.video1x1}
                    isMobile={isMobile}
                  />
                </div>
              )}

              {/* IMAGE SLIDER — hidden when video tab is active */}
              <div
                className={`hp-modal-gallery-slider${activeTab === 'plans' ? ' plans-mode' : ''}${activeTab === 'video' ? ' hidden' : ''}`}
                role="tabpanel"
                aria-label={activeTab === 'gallery' ? 'Villa images' : 'Floor plans'}
                aria-hidden={activeTab === 'video'}
                onTouchStart={activeSlider.onTouchStart}
                onTouchEnd={activeSlider.onTouchEnd}
                onWheel={activeSlider.onWheel}
              >
                {/* Image frame — fills the stage */}
                <div className="hp-modal-gallery-frame">
                  {activeImages.map((img, i) => {
                    const isActive = i === activeSlider.index;
                    const isNext = activeSlider.slideDir === 'left' && i === (activeSlider.index + 1) % totalImages;
                    const isPrev = activeSlider.slideDir === 'right' && i === (activeSlider.index - 1 + totalImages) % totalImages;
                    const stateClass = isActive ? ' active' : isNext ? ' next' : isPrev ? ' prev' : '';
                    if (activeTab === 'plans') {
                      // For plans/axos: wrap in an absolutely-positioned padded div
                      // so the img is genuinely inset from all four edges of the frame.
                      // object-fit:contain on the img then centres within that padded area.
                      return (
                        <div
                          key={img.src + i}
                          className={`hp-modal-plan-wrapper${stateClass}`}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="hp-modal-plan-img"
                            loading={i === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      );
                    }
                    return (
                      <img
                        key={img.src + i}
                        src={img.src}
                        alt={img.alt}
                        className={`hp-modal-gallery-slide${stateClass}`}
                        style={img.objectPosition ? { objectPosition: img.objectPosition } : undefined}
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    );
                  })}
                </div>
                {/* Minimal breadcrumb dots — image overlay, auto colour */}
                {totalImages > 1 && (
                  <div
                    className={`hp-modal-overlay-dots${activeTab === 'plans' ? ' dark' : ''}`}
                    aria-hidden="true"
                  >
                    {activeImages.map((_, i) => (
                      <span
                        key={i}
                        className={`hp-modal-overlay-dot${i === activeSlider.index ? ' active' : ''}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Contact Form Modal — opens over the villa modal when Register Interest is clicked */}
      <ContactFormModal
        open={showContactForm}
        villaName={villa?.tabLabel}
        source="villa"
        onClose={() => setShowContactForm(false)}
      />
    </>
  );
}
