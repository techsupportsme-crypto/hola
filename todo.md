# Hola Paje — Full Rebuild

## Approved design direction
- Font: Montserrat 100 (display), 200 (body), 300 (labels/nav) — no other typeface
- Palette: #F2EDE6 linen, #1C1917 charcoal, #6B6560 mid-grey — NO accent colour
- Opening: Dawn kitesurf full-bleed → Villa exterior full-bleed (two-beat)
- Copy: Aman-register — declarative, sparse, no promotional language
- Nav: wordmark left, 3 links centre (hidden mobile), single "Enquire" CTA right
- NO section headings like a contents page
- NO animated counters, NO card grids, NO bronze rules

## Page scroll sequence
1. Hero — full-bleed dawn/kitesurf, text bottom-left: eyebrow + headline + "Enquire"
2. Villa beat — full-bleed Contemporary Villa exterior, minimal text
3. Place — two-column: sparse Paje copy left, aerial image right
4. Villas — three full-bleed panels (one per villa), each opens modal on click
5. Location — single full-bleed lifestyle image, sparse copy
6. Enquire — dark section, form, consent, submit

## Villa modal
- Full-screen overlay, slides in from right
- Left rail: villa name, 2-line description, area table, Register Interest CTA
- Right stage: full-bleed gallery, Gallery / Floor Plans tab switcher
- Close: X top-right + Escape key
- Mobile: stacked column, gallery below stats

## Nav — lateral villa panel (Aman-style)
- Hover "The Villas" → slim vertical panel slides right of nav bar
- Panel lists: Terrace Villa / Island Villa / Contemporary Villa
- Click any villa name → opens corresponding modal directly
- Panel eases in, links stagger in one by one
- Mobile: villa names appear in full-screen hamburger overlay instead

## Files to rewrite
- [ ] client/src/index.css
- [ ] client/index.html
- [ ] client/src/pages/Home.tsx
- [ ] client/src/components/Navigation.tsx
- [ ] client/src/components/VillaModal.tsx
- [ ] client/src/lib/villaData.ts
- [ ] client/src/App.tsx

## After rebuild
- [ ] Mobile audit at 390px
- [ ] TypeScript check
- [ ] Checkpoint

## Brochure-inspired redesign pass (Jun 2026)
- [ ] Confirm palm-shadow asset from Drive folder
- [ ] Extract Inspiration page content from brochure PDF
- [ ] Add dark teal contrast sections (Destination + Developer)
- [ ] Redesign payment plan cards — reversed-out with gold callouts
- [ ] Developer stats — full-width dark teal statement band
- [ ] Add sepia palm-shadow overlays using brochure reference
- [ ] Build new Inspiration section
- [ ] Mobile + desktop review, checkpoint, and delivery

## Footer restructure (Jun 2026)
- [x] Rewrite footer HTML: remove curlicue, restructure for mobile-first stacked layout
- [x] Update footer CSS: hp-footer-brand (centred Floton logo), hp-footer-social (centred), hp-footer-links (centred Privacy Policy), remove hp-footer-top and hp-footer-curlicue rules
- [x] Floton Africa logo: larger (3.2rem), higher opacity (0.70), centred — pride of place
- [x] Social icons: centred row with 1.75rem gap
- [x] Privacy Policy: centred
- [x] Bottom row: copyright left, Machete centred (grid 1fr auto 1fr)

## Riffle animation (Jun 2026)
- [x] Add reveal + hp-plan-card--riffle classes to each plan card
- [x] Fix stagger bug: use CSS custom property --riffle-delay instead of animationDelay
- [x] CSS transition-delay: var(--riffle-delay, 0ms) reads from inline style correctly
- [x] Cards stagger at 0ms, 120ms, 240ms — riffle in one at a time on scroll
- [x] Revert misplaced section-headline curlicue dividers and move the curlicue-with-horizontal-rules treatment into each of the three payment plan cards, directly beneath the card headline

## Typographic audit implementation (Jun 2026)
- [x] Unify all eyebrows: section labels + developer eyebrow → 0.72rem / 500 / 0.28em
- [x] Launch kicker → 0.82rem / 500 / 0.28em (slightly larger, justified)
- [x] Fix form success title: weight 100 → 300
- [x] Fix payment plan card titles: weight 700 → 300
- [x] Hero line-breaks: villa "Your own / private villa." → "Your own private villa."
- [x] Hero line-breaks: aerial "Village living / perfected." → "Village living perfected."
- [x] Section headline: "The only island / that does / all of this." → 2 lines
- [x] Section headline: "35 kms from / the mainland." → merge to one line (keep 3-line structure)
- [x] Section headline: "Paje. The village / the world is / discovering." → 2 lines

## Brochure gate (Jul 2026)
- [x] Add downloadUrl prop to ContactFormModal; trigger PDF download on successful submission
- [x] Nav desktop BROCHURE button: open ContactFormModal instead of direct PDF link
- [x] Nav mobile BROCHURE link: open ContactFormModal instead of direct PDF link
- [x] Navigation.tsx: accept onBrochureClick prop to lift state up to Home.tsx
- [x] Home.tsx: manage brochureModalOpen state, pass handler to Navigation, render ContactFormModal with downloadUrl

## /landing-meta deep long-form rebuild (Jul 2026)
- [x] Rebuild LandingMeta.tsx as deep long-form page (Yolo Zanzibar structure)
- [x] Hero: full-screen aerial, headline, dual CTA (Register / Get investment pack)
- [x] Trust icons: 4 pillars (insurance, escrow, 8% yield, managed residences)
- [x] Gold stat line: From USD 270,000 · 50 Residences · Completion 2028
- [x] Development overview section: copy + amenities list + CTA
- [x] Investment case section: 3 protection cards (dark background)
- [x] Why Zanzibar/Paje section: 6-item 2-column grid
- [x] Villa types section: 3 cards with images, pricing, specs, descriptions
- [x] Three steps section: Register → Receive pack → Speak with team
- [x] Inline HighLevel form at bottom (2-col: copy left, iframe right)
- [x] Footer: brand line, contact links, legal disclaimer
- [x] WhatsApp floating button
- [x] All CSS appended to index.css (lp-* v2 classes)
- [x] TypeScript: no errors
- [x] Checkpoint saved

## /landing-meta visual redesign pass (Jul 2026)
- [x] Fix palette: replace dark-green trust bar with linen/warm-sand background matching main site
- [x] Fix typography: reduce headline weight from 700 to 200-300 (Montserrat-light, matching main site)
- [x] Redesign trust icons: replace YOLO-style dark circular icons with elegant horizontal stat treatment matching Hola Paje brand (thin rules, spaced numerals, no heavy circles)
- [x] Fix investment case section: charcoal background, thin-rule card borders, no heavy icon circles
- [x] Fix villa cards section: replaced dark charcoal with linen-dark background
- [x] Fix form section: form section visible on charcoal, iframe present
- [x] Fix logo: HOLA stacked above PAJE, Montserrat 200/300 weight
- [x] Button style: aligned to main site hp-btn treatment (thin border, spaced caps, linen/charcoal variants)

## SEO & LLM findability (Aug 2026)
- [ ] XML sitemap at /sitemap.xml — dynamically generated, all pages
- [ ] FAQPage schema — draft FAQ content and add to index.html and /faq page
- [ ] llms.txt — plain-text brand summary for LLM crawlers at /llms.txt
- [ ] Extended LocalBusiness schema with GPS coordinates for Paje, Zanzibar

## Progress Plan payment schedule update (Aug 2026)
- [x] Replace the website Progress Plan milestones and related payment-plan wording with the approved five-stage payment plan supplied by the client
- [x] Verify the revised payment plan in the existing Ownership section and save a checkpoint

## Google Drive approved visual asset library (Aug 2026)
- [x] Inventory the latest image, logo, graphic, and video assets referenced by holapaje.com
- [x] Package the approved assets with an index of their website usage
- [x] Upload the organised asset library to the client-provided Google Drive folder and verify delivery

## Urgent live-domain incident (Aug 2026)
- [x] Diagnose the `holapaje.com` maintenance page following removal of the custom domains from the Manus project
- [x] Reconnect `holapaje.com` and `www.holapaje.com` to the restored published project (Task Data restoration completed; the custom-domain bindings remain absent)
- [x] Document the safest restoration path for the live site and domain transition
