/*
 * HOLA PAJE — Thank You Page
 * URL: /thank-you
 * Purpose: Lead generation campaign destination (Google Ads, Meta, HighLevel)
 * Design: Matches site design system — Montserrat, linen/charcoal/teal palette
 * Nav: Full site navigation (same as homepage)
 * Brochure: When ?brochure=1 is present, auto-triggers the PDF download on load
 */

import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { Navigation } from '@/components/Navigation';

// URL of the brochure PDF — same one used in the ContactFormModal
const BROCHURE_URL = '/manus-storage/HOLABROCHURE20260730_f190947d.pdf';

export default function ThankYou() {
  const [isBrochure, setIsBrochure] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('brochure') === '1') {
      setIsBrochure(true);
      // Trigger the download automatically
      const link = document.createElement('a');
      link.href = BROCHURE_URL;
      link.download = 'Hola-Paje-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, []);

  return (
    <div className="hp-ty-page">

      {/* ── FULL SITE NAVIGATION ── */}
      <Navigation />

      {/* ── HERO CONTENT ── */}
      <main className="hp-ty-main">

        {/* Background image — beach arrival */}
        <div className="hp-ty-bg" aria-hidden="true">
          <img
            src="/manus-storage/1781710397653_4d4c70f6.webp"
            alt=""
            className="hp-ty-bg-img"
          />
          <div className="hp-ty-bg-overlay" />
        </div>

        {/* Content panel */}
        <div className="hp-ty-content">
          <p className="hp-ty-eyebrow">Hola Paje · Paje, Zanzibar</p>
          <h1 className="hp-ty-headline">
            Thank you.<br />
            We'll be in touch shortly.
          </h1>
          {isBrochure ? (
            <p className="hp-ty-body">
              Your brochure is downloading now. A member of our team will also be in touch within 24 hours. In the meantime, explore the collection or reach us directly on WhatsApp.
            </p>
          ) : (
            <p className="hp-ty-body">
              A member of our team will contact you within 24 hours. In the meantime, explore the collection or reach us directly on WhatsApp.
            </p>
          )}

          {/* CTAs */}
          <div className="hp-ty-ctas">
            {isBrochure && (
              <a
                href={BROCHURE_URL}
                download="Hola-Paje-Brochure.pdf"
                className="hp-ty-btn hp-ty-btn--primary"
              >
                Download again
              </a>
            )}
            <Link href="/#villas" className={isBrochure ? 'hp-ty-btn hp-ty-btn--outline' : 'hp-ty-btn hp-ty-btn--primary'}>
              Explore the villas
            </Link>
            <a
              href="https://wa.me/27600193891?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20Hola%20Paje%20luxury%20residences."
              target="_blank"
              rel="noopener noreferrer"
              className="hp-ty-btn hp-ty-btn--outline"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Key stats — reassurance */}
          <div className="hp-ty-stats">
            <div className="hp-ty-stat">
              <span className="hp-ty-stat-num">50</span>
              <span className="hp-ty-stat-label">Residences</span>
            </div>
            <div className="hp-ty-stat-divider" aria-hidden="true" />
            <div className="hp-ty-stat">
              <span className="hp-ty-stat-num">3</span>
              <span className="hp-ty-stat-label">Villa types</span>
            </div>
            <div className="hp-ty-stat-divider" aria-hidden="true" />
            <div className="hp-ty-stat">
              <span className="hp-ty-stat-num">2028</span>
              <span className="hp-ty-stat-label">Completion</span>
            </div>
          </div>
        </div>

      </main>

      {/* ── FOOTER ── */}
      <footer className="hp-ty-footer">
        <div className="hp-ty-footer-inner">
          <a
            href="https://flotonzanzibar.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Floton Africa"
          >
            <img
              src="/manus-storage/floton-wordmark-light_72474dfd.png"
              alt="Floton Africa"
              className="hp-ty-floton-logo"
            />
          </a>
          <p className="hp-ty-footer-copy">
            &copy; 2026 Floton Africa Limited &nbsp;·&nbsp;{' '}
            <a href="/privacy-policy" className="hp-ty-footer-link">Privacy Policy</a>
          </p>
        </div>
      </footer>

      {/* ── WHATSAPP FLOATING BUTTON ── */}
      <a
        href="https://wa.me/27600193891?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20Hola%20Paje%20luxury%20residences."
        className="hp-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#7dd3d0" aria-hidden="true" focusable="false">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </div>
  );
}
