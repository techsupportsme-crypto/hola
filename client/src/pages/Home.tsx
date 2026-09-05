/*
 * HOLA PAJE — Home Page
 * Design: Montserrat-only, linen/charcoal palette, atmosphere-first
 * Sections: Nav → Hero → Villa Beat → Overview → Place → Villas → Investment → Developer → Contact → Footer
 * All copy from approved copy deck. Investment copy: kitesurf metaphor, locked June 2026.
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/Navigation";
import { VillaModal } from "@/components/VillaModal";
import { ContactFormModal } from "@/components/ContactFormModal";
import { villas } from "@/lib/villaData";
import type { VillaType } from "@/lib/villaData";
import { useScrollReveal } from "@/hooks/useScrollReveal";

import { HeroCrossfade } from "@/components/HeroCrossfade";
import { HolaCurlicue } from "@/components/HolaCurlicue";
import ZanzibarMap from "@/components/ZanzibarMap";

// ── Wildebeest video panel with crossfade-loop and unmute toggle ──
function WildebeestVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [fading, setFading] = useState(false);

  // Crossfade loop: fade out near end, reset, fade back in
  const handleTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const remaining = vid.duration - vid.currentTime;
    if (remaining <= 0.8 && !fading) {
      setFading(true);
    }
  };

  const handleEnded = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    vid.play().catch(() => {});
    // Brief pause before fade-in to let frame settle
    setTimeout(() => setFading(false), 80);
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setMuted(vid.muted);
  };

  return (
    <div className="hp-safari-image hp-safari-video-wrap reveal">
      <video
        ref={videoRef}
        src="/manus-storage/wildebeest-balloons-audio_e9dec110.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className={`hp-safari-video${fading ? " hp-safari-video--fading" : ""}`}
        aria-label="Wildebeest migration across the Serengeti at dusk, with hot air balloons"
      />
      <button
        className="hp-video-unmute-btn"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        type="button"
      >
        {muted ? (
          // Speaker with X (muted)
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          // Speaker with waves (unmuted)
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function Home() {
  const [activeVilla, setActiveVilla] = useState<VillaType | null>(null);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);

  const openBrochureModal = useCallback(() => setBrochureModalOpen(true), []);
  const closeBrochureModal = useCallback(() => setBrochureModalOpen(false), []);

  useScrollReveal();
  const [, navigate] = useLocation();

  // Load HighLevel form embed script once for the inline enquiry iframe.
  useEffect(() => {
    const scriptSrc = "https://app.flotonzanzibar.com/js/form_embed.js";

    if (document.querySelector(`script[src="${scriptSrc}"]`)) return;

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Listen for HighLevel homepage enquiry form submission and redirect to /thank-you.
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "object" || event.data === null) return;
      const isSubmission =
        event.data.type === "form_submitted" ||
        event.data.event === "form_submitted" ||
        event.data.formSubmitted === true;
      if (!isSubmission) return;
      navigate("/thank-you");
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  const openVilla = useCallback((villaId: string) => {
    const found = villas.find(v => v.id === villaId) ?? null;
    setActiveVilla(found);
  }, []);

  const closeVilla = useCallback(() => {
    setActiveVilla(null);
  }, []);

  const scrollToContact = useCallback(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="hp-page-wrapper">
      {/* ── NAVIGATION ── */}
      <Navigation onVillaOpen={openVilla} onBrochureClick={openBrochureModal} />

      {/* ── OPENING SEQUENCE: Scroll-pinned crossfade hero ── */}
      <HeroCrossfade />

      {/* ── BEACH ARRIVAL IMAGE — emotional landing after the hero ── */}
      <div className="hp-beach-arrival" aria-hidden="false">
        <img
          src="/manus-storage/1781710397653_4d4c70f6.webp"
          alt="Paje beach — turquoise lagoon and Indian Ocean coastline, Zanzibar"
          className="hp-beach-arrival-img"
          loading="eager"
        />
      </div>

      {/* ── OVERVIEW ── */}
      <section
        id="overview"
        className="hp-overview"
        aria-label="Development overview"
      >
        {/* Stats bar — dark band between beach image and body copy, acts as headline */}
        <div className="hp-overview-stats-bar reveal">
          <h2 className="hp-overview-headline hp-overview-headline--bar">
            A considered address
            <br />
            on the Indian Ocean.
          </h2>
          <div className="hp-overview-stats">
            <div className="hp-overview-stat">
              <span className="hp-overview-stat-num">50</span>
              <span className="hp-overview-stat-label">Residences</span>
            </div>
            <div className="hp-overview-stat-divider" aria-hidden="true" />
            <div className="hp-overview-stat">
              <span className="hp-overview-stat-num">3</span>
              <span className="hp-overview-stat-label">Villa types</span>
            </div>
            <div className="hp-overview-stat-divider" aria-hidden="true" />
            <div className="hp-overview-stat">
              <span className="hp-overview-stat-num">2028</span>
              <span className="hp-overview-stat-label">Completion</span>
            </div>
          </div>
        </div>

        {/* Body copy */}
        <div className="hp-overview-body">
          <div className="hp-overview-body-inner">
            <div>
              <p className="hp-body-text reveal reveal-delay-2">
                Hola Paje is a boutique collection of fifty 2 and 3-bedroomed
                villas in Paje, on the southeast coast of Zanzibar. Developed by
                Floton Africa, these exclusive residences will set a new
                standard of luxury in this sought-after location.
              </p>
            </div>
            <div>
              <p className="hp-body-text reveal reveal-delay-2">
                Each residence is designed to dissolve the line between interior
                and exterior — private pools, open-plan living, open-air
                bathrooms — and provide direct access to one of the Indian
                Ocean's most desirable stretches of coastline.
              </p>
            </div>
          </div>
        </div>

        {/* Map moved to the Place/Village section image column */}
      </section>

      {/* ── ISLAND / DESTINATION — Panel 1: Dhows (ocean side) — text LEFT, image RIGHT ── */}
      <section
        id="island"
        className="hp-safari hp-safari--reverse reveal"
        aria-label="Zanzibar — the Indian Ocean and the African wilderness"
      >
        <div className="hp-safari-text">
          <h2 className="hp-safari-headline">
            The only island
            <br />
            that does all of this.
          </h2>
          <p className="hp-safari-body">
            Zanzibar offers something few destinations can rival: the Indian
            Ocean on one side, and the African wilderness on the other. From
            Paje, the Serengeti and the Great Migration are less than an hour
            away by air. Kilimanjaro sits on the horizon. Stone Town — a UNESCO
            World Heritage Site shaped by centuries of trade and culture — is
            within easy reach.
          </p>
        </div>
        <div className="hp-safari-image hp-safari-video-wrap">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hp-safari-video"
            aria-label="Traditional Zanzibar dhow sailing toward Stone Town harbour at golden hour"
          >
            <source
              src="/manus-storage/dhow-v3-final_92f526ff.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      {/* ── ISLAND / DESTINATION — Panel 2: Wildebeest (mainland side) — image LEFT, text RIGHT ── */}
      <section
        className="hp-safari reveal"
        aria-label="East Africa — the Serengeti and the Great Migration within reach"
      >
        <WildebeestVideoPanel />
        <div className="hp-safari-text">
          <h2 className="hp-safari-headline">
            35 kms from the mainland.
            <br />A world away from ordinary.
          </h2>
          <p className="hp-safari-body">
            World-class nature. Barefoot luxury. Cultural depth. International
            accessibility.
          </p>
          <p className="hp-safari-body">
            It is this rare combination that continues to draw a new generation
            of global travellers, lifestyle buyers and long-term investors to
            Zanzibar.
          </p>
        </div>
      </section>

      {/* ── PLACE / VILLAGE ── */}
      <section id="place" className="hp-place" aria-label="Paje, Zanzibar">
        <div className="hp-place-text hp-place--frond">
          {/* Palm shadow — inside text column so it works on both desktop and mobile stacked layout */}
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663202916011/SDqhtPCWEq4aL9UNBxfK3Z/palm-shadow-corner-5JCvA34iLm3vuyFBgNNmwb.webp"
            alt=""
            aria-hidden="true"
            className="hp-palm-shadow hp-palm-shadow--place"
          />
          <h2 className="hp-place-headline reveal">
            Paje. The village
            <br />
            the world is discovering.
          </h2>
          <p className="hp-place-body reveal reveal-delay-2">
            Paje is the kind of place that changes people’s plans. What begins
            as a holiday becomes a conversation about staying longer, investing
            smarter, owning something rare.
          </p>
          <p className="hp-place-body reveal reveal-delay-3">
            Paje sits on Zanzibar’s south-east coast, where a shallow lagoon and
            consistent south-east trade winds have made it the Indian Ocean’s
            most celebrated kitesurf destination. The village has grown quietly
            around that reputation — boutique hotels, open-air restaurants, and
            a community that has retained its character.
          </p>
          <p className="hp-place-body reveal reveal-delay-4">
            Zanzibar International Airport is 45 minutes away. Direct routes
            from Nairobi, Dubai, Doha, and Istanbul are now operating. The
            island received more than 917,000 visitors in 2025.
          </p>
        </div>

        <div className="hp-place-image-pair">
          <div className="hp-place-image hp-place-image--map">
            {/* Custom SVG map — ZanzibarMap v2, no CDN dependency */}
            <ZanzibarMap className="hp-map-svg-component" />
          </div>
        </div>
      </section>

      {/* ── VILLA COLLECTION GRID ── */}
      <section
        id="villas"
        className="hp-villa-collection"
        aria-label="The villa collection"
      >
        {/* Section header */}
        <div className="hp-villa-collection-header reveal">
          <div>
            <p className="hp-section-label">The Collection</p>
            <h2 className="hp-villa-collection-headline">
              Three villas. One address.
            </h2>
          </div>
        </div>

        {/* Three-column portrait card grid */}
        <div className="hp-villa-grid">
          {villas.map(villa => {
            const totalArea = villa.areas.find(a => a.isTotal);
            const bedrooms =
              villa.tabLabel === "Contemporary Villa"
                ? "3 bedrooms"
                : "2 bedrooms";
            const bathrooms = `${villa.bathrooms} bathrooms`;
            return (
              <button
                key={villa.id}
                className="hp-villa-card"
                aria-label={`${villa.tabLabel} — enter villa`}
                onClick={() => openVilla(villa.id)}
              >
                {/* Portrait image */}
                <div className="hp-villa-card-image">
                  <img
                    src={villa.heroImage}
                    alt={villa.heroImageAlt}
                    loading="lazy"
                    style={
                      villa.id === "island"
                        ? { objectPosition: "center bottom" }
                        : undefined
                    }
                  />
                  <div className="hp-villa-card-overlay" aria-hidden="true" />
                  {/* Villa name at bottom of image */}
                  <div className="hp-villa-card-name-bar">
                    <span className="hp-villa-card-name">
                      {villa.tabLabel.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Specs below image */}
                <div className="hp-villa-card-specs">
                  <ul className="hp-villa-card-spec-list">
                    <li>{bedrooms}</li>
                    <li>{bathrooms}</li>
                    <li>{totalArea?.value}</li>
                    <li>Private pool</li>
                  </ul>
                  <div className="hp-villa-card-footer">
                    <span className="hp-villa-card-price">
                      {villa.fromPrice}
                    </span>
                    <span className="hp-villa-card-cta">Enter Villa</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── THE INSPIRATION ── */}
      <section
        id="inspiration"
        className="hp-inspiration hp-inspiration--frond"
        aria-label="The inspiration behind Hola Paje"
      >
        {/* Palm shadow — bleeds in from top-right of the section */}
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663202916011/SDqhtPCWEq4aL9UNBxfK3Z/palm-shadow-corner-5JCvA34iLm3vuyFBgNNmwb.webp"
          alt=""
          aria-hidden="true"
          className="hp-palm-shadow hp-palm-shadow--inspiration"
        />
        <div className="hp-inspiration-inner">
          {/* Left: collage */}
          <div className="hp-inspiration-collage reveal">
            <div className="hp-inspiration-img hp-inspiration-img--door">
              <img
                src="/manus-storage/inspiration-door_7248471e.png"
                alt="Ornate carved Zanzibari door — the architectural soul of the island"
                loading="lazy"
              />
            </div>
            <div className="hp-inspiration-img-pair">
              <div className="hp-inspiration-img hp-inspiration-img--ceramics">
                <img
                  src="/manus-storage/inspiration-ceramics_b8b82952.png"
                  alt="Hand-thrown Zanzibar pottery — earthy materials and organic form"
                  loading="lazy"
                />
              </div>
              <div className="hp-inspiration-img hp-inspiration-img--wood">
                <img
                  src="/manus-storage/inspiration-wood_77081317.png"
                  alt="Warm timber grain — the texture of the island translated into architecture"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          {/* Right: text column */}
          <div className="hp-inspiration-text">
            <p className="hp-section-label reveal">The Inspiration</p>
            <h2 className="hp-inspiration-headline reveal">
              The island
              <br />
              wrote the brief
            </h2>
            <p className="hp-inspiration-body reveal reveal-delay-2">
              The inspiration behind this design comes from the natural beauty
              and soul of Zanzibar — its landscapes, textures, and coastal
              serenity.
            </p>
            <p className="hp-inspiration-body reveal reveal-delay-3">
              The architects drew from the island's rich environment, blending
              organic forms, earthy materials, and open spaces that reflect the
              rhythm of nature.
            </p>
            <p className="hp-inspiration-body reveal reveal-delay-4">
              Every detail is shaped by the harmony between land, sea, and
              culture, creating a timeless connection to the island itself. A
              design rooted in place, inspired by the essence of Zanzibar.
            </p>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE / COMMERCIAL CENTRE ── */}
      <section
        id="lifestyle"
        className="hp-lifestyle"
        aria-label="The lifestyle centre"
      >
        <div className="hp-lifestyle-text">
          <p className="hp-section-label reveal">The Lifestyle Centre</p>
          <h2 className="hp-lifestyle-headline reveal">
            A village within
            <br />
            the village.
          </h2>
          <p className="hp-lifestyle-body reveal reveal-delay-2">
            Most developments give you a gate and a pool. Hola gives you
            something rarer — a place where life actually happens.
          </p>
          <p className="hp-lifestyle-body reveal reveal-delay-3">
            At the centre sits a commercial hub designed around the way people
            live here. A supermarket stocked for real cooking. A gym that earns
            the visit. A café where you linger. Co-working space for the days
            when work doesn't stop because the view is good.
          </p>
          <ul className="hp-lifestyle-amenities reveal reveal-delay-4">
            <li>
              <img
                src="/manus-storage/curlicue-gold_209ccd87.png"
                className="hp-lifestyle-bullet"
                aria-hidden="true"
                alt=""
              />
              Boutique Retail
            </li>
            <li>
              <img
                src="/manus-storage/curlicue-gold_209ccd87.png"
                className="hp-lifestyle-bullet"
                aria-hidden="true"
                alt=""
              />
              Supermarket
            </li>
            <li>
              <img
                src="/manus-storage/curlicue-gold_209ccd87.png"
                className="hp-lifestyle-bullet"
                aria-hidden="true"
                alt=""
              />
              Fitness Centre
            </li>
            <li>
              <img
                src="/manus-storage/curlicue-gold_209ccd87.png"
                className="hp-lifestyle-bullet"
                aria-hidden="true"
                alt=""
              />
              Restaurants &amp; Cafés
            </li>
            <li>
              <img
                src="/manus-storage/curlicue-gold_209ccd87.png"
                className="hp-lifestyle-bullet"
                aria-hidden="true"
                alt=""
              />
              Co-working Hub
            </li>
            <li>
              <img
                src="/manus-storage/curlicue-gold_209ccd87.png"
                className="hp-lifestyle-bullet"
                aria-hidden="true"
                alt=""
              />
              Sea-view Terrace
            </li>
          </ul>
        </div>

        <div className="hp-lifestyle-images">
          <div className="hp-lifestyle-img-main reveal reveal-delay-1">
            <img
              src="/manus-storage/lifestyle-dining_4b047987.webp"
              alt="Friends dining together at the Hola Paje restaurant terrace"
              loading="lazy"
            />
          </div>
          <div className="hp-lifestyle-img-pair">
            <div className="hp-lifestyle-img-sub reveal reveal-delay-2">
              <img
                src="/manus-storage/lifestyle-centre_c5e3753a.jpg"
                alt="Hola Paje commercial hub — glass-fronted lifestyle centre at dusk"
                loading="lazy"
              />
            </div>
            <div className="hp-lifestyle-img-sub reveal reveal-delay-3">
              <img
                src="/manus-storage/gym-treadmill_19d117ee.webp"
                alt="Resident running on treadmill in the Hola Paje gym"
                loading="lazy"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OWNING ── */}
      <section
        id="owning"
        className="hp-owning"
        aria-label="Ownership and payment structures"
      >
        {/* Headline + intro */}
        <div className="hp-owning-header">
          <p className="hp-section-label reveal">Ownership</p>
          <h2 className="hp-owning-headline reveal">
            Own it the way
            <br />
            that works for you.
          </h2>
          <p className="hp-owning-intro reveal reveal-delay-2">
            Two purchase structures are available. Each is designed to give you
            flexibility across the 24-month construction period, with full
            ownership — and full management programme activation — from the date
            of handover in 2028.
          </p>
        </div>

        {/* Payment plan cards */}
        <div className="hp-owning-plans">
          {/* Option 1 */}
          <div
            className="hp-plan-card reveal hp-plan-card--riffle"
            data-plan-num="01"
            style={{ "--riffle-delay": "0ms" } as React.CSSProperties}
          >
            <div className="hp-plan-card-header">
              <span className="hp-plan-number">Construction Linked</span>
              <h3 className="hp-plan-title">
                Progress
                <br />
                Plan
              </h3>
              {/* Curlicue — logo flourish as gold accent on dark teal */}
              <div className="hp-curlicue-accent" aria-hidden="true">
                <span className="hp-curlicue-rule" />
                <HolaCurlicue size="md" color="gold" />
                <span className="hp-curlicue-rule" />
              </div>
            </div>
            <ul className="hp-plan-rows">
              <li className="hp-plan-row">
                <span className="hp-plan-pct">20%</span>
                <span className="hp-plan-desc">
                  Reservation fee upon signing of the Purchase and Sale
                  Agreement.
                </span>
              </li>
              <li className="hp-plan-row">
                <span className="hp-plan-pct">20%</span>
                <span className="hp-plan-desc">
                  Upon completion of foundation footings.
                </span>
              </li>
              <li className="hp-plan-row">
                <span className="hp-plan-pct">30%</span>
                <span className="hp-plan-desc">
                  Upon completion of the roof concrete structure.
                </span>
              </li>
              <li className="hp-plan-row">
                <span className="hp-plan-pct">20%</span>
                <span className="hp-plan-desc">
                  Upon completion of first-fix electrical and plumbing.
                </span>
              </li>
              <li className="hp-plan-row">
                <span className="hp-plan-pct">10%</span>
                <span className="hp-plan-desc">
                  Upon completion of the pre-handover inspection.
                </span>
              </li>
            </ul>
          </div>

          {/* Option 2 */}
          <div
            className="hp-plan-card reveal hp-plan-card--riffle"
            data-plan-num="02"
            style={{ "--riffle-delay": "120ms" } as React.CSSProperties}
          >
            <div className="hp-plan-card-header">
              <span className="hp-plan-number">Investors&rsquo; Favourite</span>
              <h3 className="hp-plan-title">
                Instalment
                <br />
                Plan
              </h3>
              {/* Curlicue accent */}
              <div className="hp-curlicue-accent" aria-hidden="true">
                <span className="hp-curlicue-rule" />
                <HolaCurlicue size="md" color="gold" />
                <span className="hp-curlicue-rule" />
              </div>
            </div>
            <ul className="hp-plan-rows">
              <li className="hp-plan-row">
                <span className="hp-plan-pct">20%</span>
                <span className="hp-plan-desc">Deposit on signing.</span>
              </li>
              <li className="hp-plan-row">
                <span className="hp-plan-pct">80%</span>
                <span className="hp-plan-desc">
                  Balance spread over equal monthly or quarterly instalments
                  during the 24-month construction period.
                </span>
              </li>
            </ul>
            <div className="hp-plan-callout">
              <span className="hp-plan-callout-label">Spread over</span>
              <span className="hp-plan-callout-number">24</span>
              <span className="hp-plan-callout-label">months</span>
            </div>
          </div>
        </div>

        <p className="hp-owning-note reveal reveal-delay-4">
          Payment plans and construction milestones are subject to the Sale
          Agreement and may be adjusted according to the construction programme.
        </p>
      </section>

      {/* ── INTERSTITIAL VIDEO — turtle ── */}
      <div className="hp-interstitial-image" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hp-interstitial-img hp-interstitial-video"
          aria-label="Sea turtle gliding through sunlit Indian Ocean waters off Zanzibar"
        >
          <source
            src="/manus-storage/turtle-loop-cropped_48970c3c.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ── DEVELOPER ── */}
      <section
        id="developer"
        className="hp-developer"
        aria-label="About the developer"
      >
        {/* Dark headline + stats band — eyebrow now lives inside the band */}
        <div className="hp-developer-headline-bar reveal">
          <div className="hp-developer-headline-left">
            <p className="hp-developer-band-eyebrow">Floton Africa</p>
            <h3 className="hp-developer-band-headline">
              A developer that delivers.
            </h3>
          </div>
          <div className="hp-developer-band-stats">
            <div className="hp-developer-band-stat">
              <span className="hp-developer-band-num">140+</span>
              <span className="hp-developer-band-label">
                Active &amp; delivered units
              </span>
            </div>
            <div className="hp-developer-band-divider" aria-hidden="true" />
            <div className="hp-developer-band-stat">
              <span className="hp-developer-band-num">12+</span>
              <span className="hp-developer-band-label">
                Years in East African development
              </span>
            </div>
            <div className="hp-developer-band-divider" aria-hidden="true" />
            <div className="hp-developer-band-stat">
              <span className="hp-developer-band-num">$64M</span>
              <span className="hp-developer-band-label">
                In projects under active development
              </span>
            </div>
          </div>
        </div>
        {/* Two-column body */}
        <div className="hp-developer-body-grid">
          <div className="hp-developer-left reveal reveal-delay-2">
            <p className="hp-developer-body">
              Floton Africa is a real estate development company with an active
              portfolio across Zanzibar. Two completed developments in Paje —
              The Emerald and Emerald Square — have been fully handed over to
              owners. Hola Paje and YOLO Residences are the company's most
              ambitious projects to date.
            </p>
            <p className="hp-developer-body">
              Both completed developments are available for inspection. We
              actively encourage buyers to visit, speak to existing owners, and
              verify every claim independently. Confidence is built through what
              you can see and confirm, not through brochures alone.
            </p>
            <p className="hp-developer-body">
              Floton Africa has operated in Tanzania since 2014, holding Class 1
              licensing as a construction and real estate developer. The
              company's in-house construction expertise and established
              on-ground presence support more than $64 million in active
              developments in Zanzibar — giving investors the confidence of a
              developer with a genuine, verifiable track record in one of East
              Africa's fastest-growing coastal property markets.
            </p>
            <div className="hp-developer-logo-block hp-developer-logo-block--left">
              <img
                src="/manus-storage/floton-logo-charcoal_c2863db3.png"
                alt="Floton Africa — Creating Iconic Destinations, Zanzibar"
                className="hp-floton-logo"
              />
              <p className="hp-developer-credentials">Registered in Tanzania</p>
            </div>
          </div>

          <div className="hp-developer-right reveal reveal-delay-3">
            <div className="hp-developer-portfolio-image">
              <img
                src="/manus-storage/developer-pool-edited_0cd0baf1.png"
                alt="A previous Floton Africa development — luxury villa with private pool, Zanzibar"
                className="hp-developer-portfolio-img"
              />
              <p className="hp-developer-img-caption">
                A PREVIOUS FLOTON AFRICA DEVELOPMENT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY BUY AT LAUNCH ── */}
      <section className="hp-launch-section" aria-label="Why buy at launch">
        {/* Eyebrow + headline block */}
        <div className="hp-launch-top reveal">
          <p className="hp-launch-kicker">First mover advantage</p>
          <h2 className="hp-launch-hero">
            <span className="hp-launch-hero-line">
              Three compelling reasons
            </span>
            <span className="hp-launch-hero-line">to buy at launch.</span>
          </h2>
        </div>
        {/* Three benefit cards */}
        <div className="hp-launch-cards">
          {/* Card 1 — Selection */}
          <div
            className="hp-launch-card reveal hp-launch-card--riffle"
            data-launch-num="01"
            style={{ "--riffle-delay": "0ms" } as React.CSSProperties}
          >
            <div className="hp-launch-card-header">
              <span className="hp-launch-card-eyebrow">Selection</span>
              <h3 className="hp-launch-card-title">
                First
                <br />
                Choice.
              </h3>
              <div className="hp-curlicue-accent" aria-hidden="true">
                <span className="hp-curlicue-rule" />
                <HolaCurlicue size="md" />
                <span className="hp-curlicue-rule" />
              </div>
            </div>
            <div className="hp-launch-stat">50</div>
            <p className="hp-launch-card-body">
              Residences in total. First to reserve has first choice of unit,
              aspect, and villa type — across all three collections.
            </p>
          </div>
          {/* Card 2 — Saving */}
          <div
            className="hp-launch-card hp-launch-card--accent reveal hp-launch-card--riffle"
            data-launch-num="02"
            style={{ "--riffle-delay": "120ms" } as React.CSSProperties}
          >
            <div className="hp-launch-card-header">
              <span className="hp-launch-card-eyebrow">Saving</span>
              <h3 className="hp-launch-card-title">
                Best
                <br />
                Price.
              </h3>
              <div className="hp-curlicue-accent" aria-hidden="true">
                <span className="hp-curlicue-rule" />
                <HolaCurlicue size="md" />
                <span className="hp-curlicue-rule" />
              </div>
            </div>
            <div className="hp-launch-stat">$10,000</div>
            <p className="hp-launch-card-body">
              Launch-period discount applied on reservation. Available
              throughout the launch window. Enquire for details.
            </p>
          </div>
          {/* Card 3 — Growth */}
          <div
            className="hp-launch-card reveal hp-launch-card--riffle"
            data-launch-num="03"
            style={{ "--riffle-delay": "240ms" } as React.CSSProperties}
          >
            <div className="hp-launch-card-header">
              <span className="hp-launch-card-eyebrow">Growth</span>
              <h3 className="hp-launch-card-title">
                Greatest
                <br />
                Reward.
              </h3>
              <div className="hp-curlicue-accent" aria-hidden="true">
                <span className="hp-curlicue-rule" />
                <HolaCurlicue size="md" />
                <span className="hp-curlicue-rule" />
              </div>
            </div>
            <div className="hp-launch-stat">40%</div>
            <p className="hp-launch-card-body">
              Projected capital appreciation from launch to completion in 2028 —
              based on the actual performance of Floton Africa's previous Paje
              villa developments.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="hp-contact"
        aria-label="Enquire about Hola Paje"
      >
        {/* Column 1: headline → contact details → image → dual CTA buttons */}
        <div className="hp-contact-info">
          <h2 className="hp-contact-left-headline reveal">
            Start the conversation
            <br />
            that leads to your
            <br />
            private villa in Paje.
          </h2>

          {/* Contact details: WhatsApp + Email — directly under headline */}
          <div className="hp-contact-details">
            <a
              href="https://wa.me/255650322222?text=Hi%2C%20I%20am%20interested%20in%20learning%20more%20about%20Hola%20Paje%20luxury%20residences."
              className="hp-contact-detail-item"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp or call +255 650 322 222"
            >
              <svg
                className="hp-contact-detail-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>WhatsApp or call +255 650 322 222</span>
            </a>
            <a
              href="mailto:invest@flotonafrica.com"
              className="hp-contact-detail-item"
              aria-label="Email invest@flotonafrica.com"
            >
              <svg
                className="hp-contact-detail-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>invest@flotonafrica.com</span>
            </a>
          </div>

          <div className="hp-contact-image reveal reveal-delay-2">
            <img
              src="/manus-storage/Screenshot2026-05-14at15.26.28_0daa0784.png"
              alt="Kitesurfer at sunset on the lagoon at Paje, Zanzibar"
              loading="lazy"
            />
          </div>
        </div>
        {/* Column 2: HighLevel form + Download Brochure */}
        <div
          className="hp-contact-form-col"
          style={{ position: "relative", zIndex: 5 }}
        >
          <iframe
            src="https://app.flotonzanzibar.com/widget/form/9l5fiiloIWCfq4TtQ2q9"
            style={{
              width: "100%",
              height: "760px",
              minHeight: "760px",
              border: "0",
              borderRadius: "8px",
              display: "block",
              position: "relative",
              zIndex: 10,
              pointerEvents: "auto",
              background: "transparent",
              overflow: "hidden",
            }}
            id="inline-9l5fiiloIWCfq4TtQ2q9"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Enquire - Homepage Form"
            data-height="760"
            data-layout-iframe-id="inline-9l5fiiloIWCfq4TtQ2q9"
            data-form-id="9l5fiiloIWCfq4TtQ2q9"
            title="Enquire - Homepage Form"
          />
          {/* Download Brochure — below the form's Send Enquiry button */}
          <button
            className="hp-brochure-btn hp-brochure-btn--form-col"
            aria-label="Download the Hola Paje brochure"
            onClick={openBrochureModal}
            type="button"
          >
            Download Brochure
          </button>
        </div>
      </section>

      {/* ── CGI DISCLAIMER ── */}
      <p className="hp-cgi-disclaimer-text">
        * All computer-generated imagery of Hola Paje Luxury Residences serves
        as an artistic guide only and should not be interpreted as a literal
        representation of the final development.
      </p>

      {/* ── FOOTER ── */}
      <footer className="hp-footer" role="contentinfo">
        {/* Floton Africa — pride of place, centred */}
        <div className="hp-footer-brand">
          <a
            href="https://flotonzanzibar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hp-footer-floton"
            aria-label="Floton Africa — visit website"
          >
            <img
              src="/manus-storage/floton-wordmark-light_72474dfd.png"
              alt="Floton Africa"
              className="hp-footer-floton-logo"
            />
          </a>
        </div>

        {/* Social icons — centred */}
        <div className="hp-footer-social" aria-label="Social media links">
          <a
            href="https://www.facebook.com/share/18akn7AgMv/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="hp-footer-social-link"
            aria-label="Facebook"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/holapajezanzibar?igsh=Y3Y0NDRkbG9vcDV3"
            target="_blank"
            rel="noopener noreferrer"
            className="hp-footer-social-link"
            aria-label="Instagram"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="0.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/company/floton-africa-zanzibar/"
            target="_blank"
            rel="noopener noreferrer"
            className="hp-footer-social-link"
            aria-label="LinkedIn"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        {/* Privacy Policy — centred */}
        <nav className="hp-footer-links" aria-label="Footer navigation">
          <a href="/privacy-policy" className="hp-footer-link">
            Privacy Policy
          </a>
        </nav>

        {/* Divider */}
        <div className="hp-footer-divider" aria-hidden="true" />

        {/* Bottom: copyright */}
        <div className="hp-footer-bottom">
          <p className="hp-footer-credit">&copy; 2026 Floton Africa Limited</p>
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
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="#7dd3d0"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* ── VILLA MODAL ── */}
      <VillaModal
        villa={activeVilla}
        onClose={closeVilla}
        onEnquire={scrollToContact}
      />

      {/* ── BROCHURE GATE MODAL ── */}
      <ContactFormModal
        open={brochureModalOpen}
        downloadUrl="/manus-storage/HOLAFINAL2June_cfa412c3.pdf"
        onClose={closeBrochureModal}
      />
    </div>
  );
}
