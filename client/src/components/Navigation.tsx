import React, { useState, useEffect, useCallback } from 'react';

interface NavigationProps {
  onVillaOpen?: (villaId: string) => void;
  /** Called when either BROCHURE button is clicked — parent opens the gated form */
  onBrochureClick?: () => void;
}

export function Navigation({ onVillaOpen: _onVillaOpen, onBrochureClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll(); // run once on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Resize detection
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Body scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = useCallback((id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  const handleBrochureClick = useCallback(() => {
    setMenuOpen(false);
    if (onBrochureClick) onBrochureClick();
  }, [onBrochureClick]);

  // ─── NAV STYLES (all inline, no CSS classes for state) ───────────────────
  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 1.25rem' : '0 5vw',
    height: isMobile ? (scrolled ? '60px' : '72px') : (scrolled ? '72px' : '108px'),
    background: scrolled ? 'rgba(28, 25, 23, 0.95)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
    transition: 'background 0.4s ease, height 0.4s ease, backdrop-filter 0.4s ease',
    boxSizing: 'border-box',
  };

  const logoStyle: React.CSSProperties = {
    height: isMobile ? (scrolled ? '2rem' : '3.4rem') : (scrolled ? '2.6rem' : '5.4rem'),
    width: 'auto',
    display: 'block',
    transition: 'height 0.4s ease',
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 400,
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: scrolled ? 'rgba(242, 237, 230, 0.9)' : 'rgba(242, 237, 230, 0.96)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    transition: 'opacity 0.2s ease',
  };

  const ctaStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 500,
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: scrolled ? 'rgba(242, 237, 230, 0.9)' : 'rgba(242, 237, 230, 0.9)',
    background: 'transparent',
    border: scrolled ? '1px solid rgba(242, 237, 230, 0.4)' : '1px solid rgba(242, 237, 230, 0.5)',
    cursor: 'pointer',
    padding: '0.55rem 1.2rem',
    borderRadius: '1px',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };

  // Hamburger lines: always light/white — the nav sits over the dark hero image at the top,
  // and once scrolled the nav background goes dark (scrolled state) so lines stay light.
  const hamburgerLineColor = 'rgba(242, 237, 230, 0.9)';

  const hamburgerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    background: 'none',
    border: 'none',
    padding: '12px',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    flexShrink: 0,
  };

  const lineStyle: React.CSSProperties = {
    display: 'block',
    width: '24px',
    height: '2px',
    borderRadius: '1px',
    background: hamburgerLineColor,
    transition: 'background 0.3s ease',
  };

  // ─── OVERLAY STYLES ───────────────────────────────────────────────────────
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    background: 'rgba(28, 25, 23, 0.97)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem',
    opacity: menuOpen ? 1 : 0,
    pointerEvents: menuOpen ? 'all' : 'none',
    transition: 'opacity 0.3s ease',
  };

  const closeBtnStyle: React.CSSProperties = {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.2rem',
    color: 'rgba(242, 237, 230, 0.7)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.5rem',
    WebkitTapHighlightColor: 'transparent',
  };

  const menuLinkStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 300,
    fontSize: '1.4rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'rgba(242, 237, 230, 0.9)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.75rem 2rem',
    WebkitTapHighlightColor: 'transparent',
  };

  return (
    <>
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }} aria-label="Hola Paje Luxury Residences — home">
          <img
            src="/manus-storage/logo-white-short_8fae0a65.png"
            alt="Hola Paje Luxury Residences"
            style={logoStyle}
          />
        </a>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <button style={linkStyle} onClick={() => scrollToSection('island')}>Island</button>
            <button style={linkStyle} onClick={() => scrollToSection('place')}>Paje</button>
            <button style={linkStyle} onClick={() => scrollToSection('villas')}>Villas</button>
            <button style={linkStyle} onClick={() => scrollToSection('lifestyle')}>Living</button>
            <button style={linkStyle} onClick={() => scrollToSection('owning')}>Owning</button>
            <button style={linkStyle} onClick={() => scrollToSection('developer')}>Developer</button>
          </div>
        )}

        {/* Desktop CTAs */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              style={ctaStyle}
              onClick={handleBrochureClick}
              aria-label="Download Hola Paje brochure"
            >
              Brochure
            </button>
            <button style={ctaStyle} onClick={() => scrollToSection('contact')} aria-label="Enquire about Hola Paje">
              Enquire
            </button>
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button style={hamburgerStyle} onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">
            <span style={lineStyle} />
            <span style={lineStyle} />
            <span style={lineStyle} />
          </button>
        )}
      </nav>

      {/* Mobile overlay */}
      <div style={overlayStyle} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button style={closeBtnStyle} onClick={() => setMenuOpen(false)} aria-label="Close navigation menu">✕</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('island')}>Island</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('place')}>Paje</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('villas')}>Villas</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('lifestyle')}>Living</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('owning')}>Owning</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('developer')}>Developer</button>
        <button style={menuLinkStyle} onClick={() => scrollToSection('contact')}>Contact</button>
        <button
          style={{ ...menuLinkStyle, color: 'var(--hp-gold, #C9A96E)' }}
          onClick={handleBrochureClick}
          aria-label="Download Hola Paje brochure"
        >
          Brochure
        </button>
      </div>
    </>
  );
}
