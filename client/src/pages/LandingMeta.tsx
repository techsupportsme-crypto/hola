/*
 * HOLA PAJE — Meta Landing Page (Deep Long-Form)
 * URL: /landing-meta
 * Purpose: High-quality lead generation for Meta & Google paid media campaigns
 * Structure: Hero → Trust icons → Development overview → Investment case →
 *            Why Zanzibar/Paje → Villa types with pricing → Three steps → Inline form → Footer
 * Design: No navigation, Montserrat, linen/charcoal/bronze palette
 * On form submission: HighLevel redirects to /thank-you or /thank-you?brochure=1
 */

import { useEffect, useRef } from 'react';

// HighLevel form URLs
const HL_ENQUIRY_FORM = 'https://app.flotonzanzibar.com/widget/form/9l5fiiloIWCfq4TtQ2q9';
const HL_SCRIPT = 'https://app.flotonzanzibar.com/js/form_embed.js';

// Aerial hero image
const AERIAL_IMG = '/manus-storage/hero-aerial_b1b70375.png';

// Villa hero images
const TERRACE_IMG = '/manus-storage/terrace-villa-pool-scene_9a33c469.webp';
const ISLAND_IMG = '/manus-storage/island-villa-exterior_785fb775.webp';
const CONTEMPORARY_IMG = '/manus-storage/contemporary-villa-pool_bd8a9b57.webp';

export default function LandingMeta() {
  const scriptLoadedRef = useRef(false);

  // Load HighLevel embed script once on mount
  useEffect(() => {
    if (scriptLoadedRef.current) return;
    if (document.querySelector(`script[src="${HL_SCRIPT}"]`)) {
      scriptLoadedRef.current = true;
      return;
    }
    const script = document.createElement('script');
    script.src = HL_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
    scriptLoadedRef.current = true;
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('lp-form-anchor');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="lp-page">

      {/* ── LOGO-ONLY HEADER ── */}
      <header className="lp-header">
        <div className="lp-logo-lockup">
          <span className="lp-logo-hola">HOLA</span>
          <span className="lp-logo-paje">PAJE</span>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO — full-screen aerial shot
      ══════════════════════════════════════════════ */}
      <section className="lp-hero" aria-label="Hola Paje — aerial view of the development">
        <div className="lp-hero-bg">
          <img
            src={AERIAL_IMG}
            alt="Aerial view of Hola Paje luxury residences, Paje, Zanzibar — 50 private villas set among palm trees with the Indian Ocean beach beyond"
            className="lp-hero-img"
          />
          <div className="lp-hero-overlay" />
        </div>
        <div className="lp-hero-content">
          <p className="lp-eyebrow">Paje, Zanzibar · Indian Ocean</p>
          <h1 className="lp-hero-headline">
            Fifty private villas.<br />
            One extraordinary<br />
            address.
          </h1>
          <p className="lp-hero-sub">
            Hola Paje. Where the Indian Ocean meets your investment horizon.
          </p>
          <div className="lp-hero-ctas">
            <button className="lp-btn lp-btn--primary" onClick={scrollToForm}>
              Register your interest
            </button>
            <button className="lp-btn lp-btn--outline" onClick={scrollToForm}>
              Get the investment pack
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST PILLARS — elegant Hola Paje treatment
          Thin gold rule + numeral/icon + spaced label — no heavy circles
      ══════════════════════════════════════════════ */}
      <section className="lp-trust" aria-label="Investor protection highlights">
        <div className="lp-trust-inner">

          <div className="lp-trust-item">
            <div className="lp-trust-rule" aria-hidden="true" />
            <div className="lp-trust-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <path d="M18 3L5 8.5V18C5 25.18 10.68 31.9 18 33.5C25.32 31.9 31 25.18 31 18V8.5L18 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <path d="M13 18L16.5 21.5L23 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="lp-trust-label">Insurance-backed<br />deposit protection</p>
          </div>

          <div className="lp-trust-divider" aria-hidden="true" />

          <div className="lp-trust-item">
            <div className="lp-trust-rule" aria-hidden="true" />
            <div className="lp-trust-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <rect x="8" y="16" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M12 16V12C12 8.686 14.686 6 18 6C21.314 6 24 8.686 24 12V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="18" cy="23" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <p className="lp-trust-label">Independent<br />escrow controls</p>
          </div>

          <div className="lp-trust-divider" aria-hidden="true" />

          <div className="lp-trust-item">
            <div className="lp-trust-rule" aria-hidden="true" />
            <div className="lp-trust-icon-wrap">
              <span className="lp-trust-yield-display">8%</span>
            </div>
            <p className="lp-trust-label">Guaranteed minimum<br />net rental yield · 5 years</p>
          </div>

          <div className="lp-trust-divider" aria-hidden="true" />

          <div className="lp-trust-item">
            <div className="lp-trust-rule" aria-hidden="true" />
            <div className="lp-trust-icon-wrap">
              <svg width="22" height="22" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <path d="M6 30V16L18 6L30 16V30" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                <rect x="13" y="20" width="10" height="10" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
            </div>
            <p className="lp-trust-label">Professionally managed<br />from handover</p>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INTRO STAT LINE
      ══════════════════════════════════════════════ */}
      <div className="lp-stat-line">
        From USD 270,000 &nbsp;·&nbsp; 50 Residences &nbsp;·&nbsp; Completion 2028
      </div>

      {/* ══════════════════════════════════════════════
          DEVELOPMENT OVERVIEW
      ══════════════════════════════════════════════ */}
      <section className="lp-section lp-section--linen" aria-label="Development overview">
        <div className="lp-section-inner">
          <p className="lp-section-eyebrow">The development · Paje, Zanzibar</p>
          <h2 className="lp-section-headline">
            A boutique collection<br />
            built for the long game.
          </h2>
          <p className="lp-section-body lp-section-body--lead">
            Hola Paje is a carefully considered collection of just <strong>fifty 2 and 3-bedroom villas</strong> set within a landscaped precinct on the south-east coast of Zanzibar. Developed by Floton Africa, it is the first residential development on the island to combine insurance-backed deposit protection, independent escrow controls, and a contractually guaranteed minimum 8% net rental yield for five years.
          </p>
          <p className="lp-section-body">
            Every residence is designed to blur the boundary between inside and out — private pools, open-plan living spaces, open-air bathrooms — with direct access to one of the most coveted stretches of Indian Ocean coastline in East Africa.
          </p>
          <p className="lp-section-body">
            From handover, each villa enters our professionally managed hospitality programme. You decide when to use it. We take care of everything else.
          </p>

          {/* Amenities */}
          <div className="lp-amenities">
            <p className="lp-amenities-label">Precinct amenities</p>
            <ul className="lp-amenities-list">
              <li>Resort-style swimming pool</li>
              <li>Wellness and fitness facilities</li>
              <li>Tropical landscaped gardens</li>
              <li>Hospitality-grade reception &amp; concierge</li>
              <li>Co-working lounge</li>
              <li>24-hour security</li>
              <li>Secure residents' parking</li>
            </ul>
          </div>

          <button className="lp-btn lp-btn--primary lp-btn--mt" onClick={scrollToForm}>
            Register your interest
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INVESTMENT CASE
      ══════════════════════════════════════════════ */}
      <section className="lp-section lp-section--charcoal" aria-label="The investment case">
        <div className="lp-section-inner">
          <p className="lp-section-eyebrow lp-section-eyebrow--gold">Capital protection · Floton Africa</p>
          <h2 className="lp-section-headline">
            Built-in protection.<br />
            Built-in returns.
          </h2>
          <p className="lp-section-body lp-section-body--muted">
            No other development in Zanzibar offers all three of these investor protections simultaneously:
          </p>

          <div className="lp-protection-cards">
            <div className="lp-protection-card">
              <div className="lp-protection-card-icon">
                <div className="lp-protection-card-rule" />
                <svg className="lp-protection-card-icon-svg" width="22" height="22" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <path d="M18 3L5 8.5V18C5 25.18 10.68 31.9 18 33.5C25.32 31.9 31 25.18 31 18V8.5L18 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M13 18L16.5 21.5L23 14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="lp-protection-card-title">Insurance-Backed Deposit Protection</h3>
              <p className="lp-protection-card-body">Your capital is protected throughout the construction period. In the unlikely event of a developer default, your deposit is insured and recoverable.</p>
            </div>

            <div className="lp-protection-card">
              <div className="lp-protection-card-icon">
                <div className="lp-protection-card-rule" />
                <svg className="lp-protection-card-icon-svg" width="22" height="22" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                  <rect x="8" y="16" width="20" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M12 16V12C12 8.686 14.686 6 18 6C21.314 6 24 8.686 24 12V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="18" cy="23" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="lp-protection-card-title">Independent Escrow Controls</h3>
              <p className="lp-protection-card-body">All funds are held independently and released only as construction milestones are verified by an independent third party. Your money moves with the build, not before it.</p>
            </div>

            <div className="lp-protection-card">
              <div className="lp-protection-card-icon">
                <div className="lp-protection-card-rule" />
                <span className="lp-protection-card-yield">8%</span>
              </div>
              <h3 className="lp-protection-card-title">Guaranteed Minimum 8% Net Rental Yield for 5 Years</h3>
              <p className="lp-protection-card-body">On designated managed residences, contractually committed by the developer. You receive a minimum of 8% net per annum for five years from handover — regardless of occupancy.</p>
            </div>
          </div>

          <button className="lp-btn lp-btn--charcoal lp-btn--mt" onClick={scrollToForm}>
            Get the investment pack
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHY ZANZIBAR / WHY PAJE
      ══════════════════════════════════════════════ */}
      <section className="lp-section lp-section--linen" aria-label="Why Zanzibar and Paje">
        <div className="lp-section-inner">
          <p className="lp-section-eyebrow">Location &amp; opportunity</p>
          <h2 className="lp-section-headline">
            The island. The village.<br />
            The moment.
          </h2>

          <div className="lp-why-grid">
            <div className="lp-why-item">
              <span className="lp-why-bullet" aria-hidden="true">—</span>
              <div>
                <strong>Zanzibar's trajectory is unmistakable</strong><br />
                Visitor arrivals have grown from 260,000 in 2020 to over 917,000 in 2025. New direct routes from Europe, the Gulf, and Southern Africa are opening every season. The demand curve is steep — and still rising.
              </div>
            </div>
            <div className="lp-why-item">
              <span className="lp-why-bullet" aria-hidden="true">—</span>
              <div>
                <strong>No other island offers this range</strong><br />
                The Indian Ocean on one side, the African wilderness on the other. From Paje, the Serengeti is less than an hour by air. Kilimanjaro sits on the horizon. Stone Town — a UNESCO World Heritage Site — is a short drive up the coast.
              </div>
            </div>
            <div className="lp-why-item">
              <span className="lp-why-bullet" aria-hidden="true">—</span>
              <div>
                <strong>Ownership without the overhead</strong><br />
                Rental bookings, housekeeping, maintenance, and guest services are all managed on your behalf from the moment of handover. You decide when to arrive. Everything else is handled.
              </div>
            </div>
            <div className="lp-why-item">
              <span className="lp-why-bullet" aria-hidden="true">—</span>
              <div>
                <strong>Paje is structurally supply-constrained</strong><br />
                The Paje corridor consistently outperforms the rest of the island for luxury residential values. Prime coastal land is finite. Hola Paje is one of a very small number of boutique developments in this precise location.
              </div>
            </div>
            <div className="lp-why-item">
              <span className="lp-why-bullet" aria-hidden="true">—</span>
              <div>
                <strong>Paje changes people's plans</strong><br />
                A shallow turquoise lagoon. Consistent south-easterly winds. The Indian Ocean's most celebrated kitesurf destination. What begins as a week's holiday becomes a conversation about staying longer, investing smarter, and owning something genuinely rare.
              </div>
            </div>
            <div className="lp-why-item">
              <span className="lp-why-bullet" aria-hidden="true">—</span>
              <div>
                <strong>Fifty residences. No more.</strong><br />
                Hola Paje will never be expanded. Pre-launch pricing is available now across three villa types. Enquiries have been strong — and that was before we introduced our escrow controls and rental guarantee.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VILLA TYPES WITH PRICING
      ══════════════════════════════════════════════ */}
      <section className="lp-section lp-section--linen-dark" aria-label="Villa types and pricing">
        <div className="lp-section-inner">
          <p className="lp-section-eyebrow lp-section-eyebrow--gold">The residences</p>
          <h2 className="lp-section-headline">
            Choose your villa.<br />
            Own your piece of Paje.
          </h2>
          <p className="lp-section-body lp-section-body--muted">
            Three distinct architectures. One shared standard: private pool, open-plan living, and direct access to the Indian Ocean coastline.
          </p>

          <div className="lp-villas-grid">

            {/* Terrace Villa */}
            <div className="lp-villa-card">
              <div className="lp-villa-card-img-wrap">
                <img src={TERRACE_IMG} alt="Terrace Villa — private pool terrace, Hola Paje" className="lp-villa-card-img" loading="lazy" />
              </div>
              <div className="lp-villa-card-body">
                <p className="lp-villa-card-type">Terrace Villa</p>
                <p className="lp-villa-card-price">From USD 270,000</p>
                <ul className="lp-villa-card-specs">
                  <li>2 bedrooms · 2 bathrooms</li>
                  <li>138 sqm total area</li>
                  <li>Private plunge pool</li>
                  <li>Open-plan living &amp; dining</li>
                  <li>Floor-to-ceiling glazing</li>
                </ul>
                <p className="lp-villa-card-desc">
                  Clean horizontal lines, warm timber entry doors, and floor-to-ceiling glazing that brings the sky directly into the living room — and the living room directly to your private pool.
                </p>
              </div>
            </div>

            {/* Island Villa */}
            <div className="lp-villa-card">
              <div className="lp-villa-card-img-wrap">
                <img src={ISLAND_IMG} alt="Island Villa — dramatic pitched roof facade, Hola Paje" className="lp-villa-card-img" loading="lazy" />
              </div>
              <div className="lp-villa-card-body">
                <p className="lp-villa-card-type">Island Villa</p>
                <p className="lp-villa-card-price">From USD 320,000</p>
                <ul className="lp-villa-card-specs">
                  <li>2 bedrooms · 3 bathrooms</li>
                  <li>182 sqm total area</li>
                  <li>Private pool &amp; pool deck</li>
                  <li>Soaring pitched timber roof</li>
                  <li>Full-height glass facade</li>
                </ul>
                <p className="lp-villa-card-desc">
                  A soaring pitched roof finished in dark timber shingles. A full-height glass facade that dissolves the boundary between the living space and the pool garden.
                </p>
              </div>
            </div>

            {/* Contemporary Villa */}
            <div className="lp-villa-card">
              <div className="lp-villa-card-img-wrap">
                <img src={CONTEMPORARY_IMG} alt="Contemporary Villa — arched facade and pool terrace, Hola Paje" className="lp-villa-card-img" loading="lazy" />
              </div>
              <div className="lp-villa-card-body">
                <p className="lp-villa-card-type">Contemporary Villa</p>
                <p className="lp-villa-card-price">From USD 370,000</p>
                <ul className="lp-villa-card-specs">
                  <li>3 bedrooms · 3 bathrooms</li>
                  <li>243 sqm total area</li>
                  <li>Wrap-around pool terrace</li>
                  <li>Arched windows &amp; rounded forms</li>
                  <li>Most architecturally distinctive</li>
                </ul>
                <p className="lp-villa-card-desc">
                  Arched windows. Rounded forms. A pool terrace that wraps the ground floor in light and water. The most architecturally distinctive residence in the collection.
                </p>
              </div>
            </div>

          </div>

          <button className="lp-btn lp-btn--charcoal lp-btn--mt" onClick={scrollToForm}>
            Request pricing &amp; availability
          </button>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          THREE STEPS
      ══════════════════════════════════════════════ */}
      <section className="lp-section lp-section--linen" aria-label="How to get started">
        <div className="lp-section-inner">
          <p className="lp-section-eyebrow">How it works</p>
          <h2 className="lp-section-headline">
            From interest to ownership.<br />
            Simpler than you think.
          </h2>

          <div className="lp-steps">
            <div className="lp-step">
              <span className="lp-step-num">01</span>
              <h3 className="lp-step-title">Register your interest</h3>
              <p className="lp-step-body">Takes 60 seconds. No commitment required. Just your name, email, and mobile.</p>
            </div>
            <div className="lp-step-arrow" aria-hidden="true">→</div>
            <div className="lp-step">
              <span className="lp-step-num">02</span>
              <h3 className="lp-step-title">Receive the full pack</h3>
              <p className="lp-step-body">Brochure, floor plans, pricing, and current availability — straight to your inbox within 24 hours.</p>
            </div>
            <div className="lp-step-arrow" aria-hidden="true">→</div>
            <div className="lp-step">
              <span className="lp-step-num">03</span>
              <h3 className="lp-step-title">Speak with our team</h3>
              <p className="lp-step-body">A personal consultation, online or on-site in Zanzibar. We will recommend the right residence for your objectives and walk you through the investment structure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INLINE FORM — bottom of page
      ══════════════════════════════════════════════ */}
      <section className="lp-form-section" id="lp-form-anchor" aria-label="Register your interest">
        <div className="lp-form-inner">
          <div className="lp-form-copy">
            <p className="lp-section-eyebrow lp-section-eyebrow--gold">No commitment required</p>
            <h2 className="lp-form-headline">
              Ready to find out more?
            </h2>
            <p className="lp-form-body">
              Leave your details and we will send you the full Hola Paje investment pack — brochure, floor plans, pricing, and current availability — within 24 hours. Our team is available for a personal consultation online or in Zanzibar.
            </p>
            {/* Repeat trust icons in compact form */}
            <ul className="lp-form-trust-list">
              <li><span>—</span> Insurance-backed deposit protection</li>
              <li><span>—</span> Independent escrow controls</li>
              <li><span>—</span> Guaranteed minimum 8% net yield for 5 years</li>
              <li><span>—</span> Professionally managed from handover</li>
            </ul>
          </div>
          <div className="lp-form-embed">
            <iframe
              src={HL_ENQUIRY_FORM}
              style={{ width: '100%', minHeight: '480px', border: 'none' }}
              title="Register your interest — Hola Paje"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════ */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <p className="lp-footer-brand">
            Hola Paje &nbsp;·&nbsp; Paje, Zanzibar &nbsp;·&nbsp; A Floton Africa Development &nbsp;·&nbsp; Completion 2028
          </p>
          <p className="lp-footer-contact">
            <a href="mailto:invest@flotonafrica.com" className="lp-footer-link">invest@flotonafrica.com</a>
            &nbsp;·&nbsp;
            <a href="https://holapaje.com" className="lp-footer-link">holapaje.com</a>
          </p>
          <p className="lp-footer-copy">
            <a href="/privacy-policy" className="lp-footer-link">Privacy Policy</a>
          </p>
          <p className="lp-footer-disclaimer">
            All visualisations are indicative of the final development. Prices, availability and specifications are confirmed individually upon enquiry and subject to change without notice. The guaranteed minimum 8% net rental yield applies to designated managed residences as defined in the Sale Agreement. Payment plans and terms are subject to change. Please refer to the Sale Agreement for full details.
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
