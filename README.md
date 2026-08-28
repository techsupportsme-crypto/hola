# Hola Paje Luxury Residences — Website

**Client:** Floton Africa  
**Project:** Hola Paje Luxury Residences, Paje, Zanzibar  
**Version:** 1.0.0  
**Stack:** React 19 · TypeScript · Tailwind CSS 4 · Vite 7 · Wouter  
**Design System:** Monograph Silence — Cormorant Garamond + Montserrat, linen/charcoal/bronze

---

## Overview

Single-page marketing website for a fifty-villa luxury residential development in Paje, Zanzibar. The site is built as a static React SPA with no backend dependency, making it portable to any static hosting provider.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type-check
pnpm check

# Production build
pnpm build
```

## Deploying to Vercel

The repo is Vercel-ready: `vercel.json` builds the static site with `vite build`
(output in `dist/public`) and rewrites all routes to the SPA. All media is
self-hosted under `client/public/manus-storage/`. Import the GitHub repo at
https://vercel.com/new and deploy — no framework preset changes needed.

The contact-form fallback posts to the serverless function `api/enquiry.ts`,
which emails leads via [Resend](https://resend.com). Set these environment
variables in the Vercel project for it to work:

- `RESEND_API_KEY` — Resend API key
- `ENQUIRY_TO_EMAIL` — address that receives leads
- `ENQUIRY_FROM_EMAIL` — verified sender (optional; defaults to `onboarding@resend.dev`)

The brochure/villa enquiry gates use HighLevel iframes (app.flotonzanzibar.com)
and work without any configuration.

The development server runs on `http://localhost:3000` by default.

---

## Project Structure

```
client/
  src/
    components/
      Navigation.tsx      # Fixed top nav with mobile overlay
      VillaModal.tsx      # Full-screen villa detail modal
    hooks/
      useScrollReveal.ts  # IntersectionObserver-based fade-up hook
      useCounter.ts       # Animated number counter on scroll entry
    lib/
      villaData.ts        # All villa type data, images, and area tables
    pages/
      Home.tsx            # Single-page layout with all 12 sections
    index.css             # Design tokens and global styles
  index.html              # Google Fonts, SEO meta, analytics
```

---

## Sections

| Section          | Anchor         | Description                                           |
| ---------------- | -------------- | ----------------------------------------------------- |
| Hero             | —              | Full-bleed Ken Burns image, tagline, scroll indicator |
| Overview         | `#overview`    | Project introduction with kitesurf mood image         |
| Destination      | `#destination` | Zanzibar proposition, image grid, Paje sub-section    |
| Lifestyle        | `#lifestyle`   | Commercial hub amenities with image grid              |
| Villa Collection | `#villas`      | Three villa types with tab switcher and modal trigger |
| Inspiration      | —              | Full-bleed dark texture interlude                     |
| Investment       | `#investment`  | Three investment pathways (own, grow, earn)           |
| Developer        | —              | Floton Africa credentials                             |
| Contact          | `#contact`     | Enquiry form with consent checkbox                    |
| Footer           | —              | Navigation, legal, copyright                          |

---

## Villa Modal

Each villa type opens a full-screen overlay (`VillaModal.tsx`) containing:

- **Left rail (dark):** Villa name, tagline, description, area breakdown table, Register Interest CTA
- **Right stage:** Image gallery with Gallery / Floor Plans tab switcher, prev/next navigation, dot indicators
- **Close:** Top-right × button or Escape key

The modal is triggered from both the villa card "View Details" button and the villa tab switcher.

---

## Enquiry Form

The form (`#contact`) collects: First Name, Last Name, Email, Mobile, Country, Villa Interest, Comments. It requires GDPR-compliant consent before submission. On submit, the form currently logs to the console — **a CRM webhook or email endpoint must be wired up before go-live** (see HANDOVER.md).

---

## Design Tokens

All design tokens live in `client/src/index.css` under `:root`. Key values:

| Token            | Value              | Usage                          |
| ---------------- | ------------------ | ------------------------------ |
| `--hp-linen`     | `#F5F0E8`          | Primary background             |
| `--hp-charcoal`  | `#1A1714`          | Primary text and dark sections |
| `--hp-bronze`    | `#957355`          | Accent rules, active states    |
| `--hp-sage`      | `#7A8C6E`          | Developer section background   |
| `--font-display` | Cormorant Garamond | All H1–H3 display headings     |
| `--font-body`    | Montserrat         | Navigation, labels, body copy  |

---

## Asset Management

All images are hosted on the Manus CDN (`/manus-storage/...`). Source files are stored in `/home/ubuntu/paje_approved_assets/` and the CDN URL map is at `/home/ubuntu/paje_cdn_urls.json`. To add or replace images, upload with `manus-upload-file --webdev` and update the relevant `src` attribute in `Home.tsx` or `villaData.ts`.

---

## Accessibility

- All images carry descriptive `alt` attributes from the approved copy deck.
- Focus rings are preserved on all interactive elements.
- The villa modal traps focus and responds to the Escape key.
- Colour contrast meets WCAG AA on all text/background combinations.
- `prefers-reduced-motion` is respected — animations are gated behind the media query.

---

## Analytics

Umami analytics is pre-wired via the `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` environment variables injected at build time.

---

## Deployment

This is a static site. Build with `pnpm build` and deploy the `dist/` directory to any static host (Netlify, Vercel, Cloudflare Pages, or the Manus hosting platform). No server-side runtime is required.

> **Note:** The Manus CDN URLs (`/manus-storage/...`) are tied to the Manus hosting platform. If deploying elsewhere, re-upload assets and update all image `src` values accordingly.
