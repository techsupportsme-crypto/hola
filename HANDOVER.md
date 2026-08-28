# Handover Notes — Hola Paje Luxury Residences Website

**Prepared for:** Floton Africa  
**Date:** June 2026  
**Developer:** Manus AI / Machete Lab  

---

## Go-Live Checklist

The following items must be completed before the site is published to a public URL.

### 1. Enquiry Form — CRM / Email Integration

The enquiry form (`client/src/pages/Home.tsx`, `handleSubmit` function) currently logs submissions to the console. Before go-live, replace the `console.log` call with one of the following:

**Option A — Email via a transactional email service (e.g. Mailchimp Transactional / SendGrid):**
```typescript
// Replace the console.log block with a fetch call:
await fetch('https://your-email-endpoint.com/api/enquiry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

**Option B — CRM webhook (e.g. HubSpot, Salesforce, Pipedrive):**
Use the CRM's native form submission API or webhook URL in place of the fetch endpoint above.

**Option C — Upgrade to full-stack (web-db-user feature):**
If a database record of every enquiry is required, upgrade the project to `web-db-user` via the Manus platform, which adds a PostgreSQL database and a backend API route for form handling.

> **Important:** The consent checkbox is wired to the submit button — the form cannot be submitted without consent being checked. Do not remove this gate.

### 2. WhatsApp Number

The floating WhatsApp button links to `+255651000800`. Verify this is the correct number before go-live. To update it, find the `wa.me` href in `client/src/pages/Home.tsx`.

### 3. Phone Number

The contact section displays `+255 651 000 800`. Confirm this is correct with the sales team.

### 4. Email Address

The contact section displays `info@holapaje.com`. Confirm this mailbox is active and monitored.

### 5. Privacy Policy Page

The consent checkbox links to `/privacy-policy`. This route currently returns a 404. Either:
- Add a `PrivacyPolicy.tsx` page component and register the route in `App.tsx`, or
- Replace the href with a link to an external privacy policy URL.

### 6. Country List in Enquiry Form

The country dropdown currently lists: South Africa, United Kingdom, United States, United Arab Emirates, Germany, France, Switzerland, Australia, Kenya, Tanzania, and Other. Extend this list in `Home.tsx` to match the actual target market.

### 7. Domain and DNS

Point the production domain (e.g. `holapaje.com`) to the hosting provider. If using the Manus platform, configure the custom domain in Settings → Domains.

### 8. Analytics

Umami analytics is pre-configured. Ensure `VITE_ANALYTICS_ENDPOINT` and `VITE_ANALYTICS_WEBSITE_ID` environment variables are set in the production environment.

### 9. SEO Meta Tags

The following meta tags are set in `client/index.html` and should be reviewed:
- `<title>` — "Hola Paje — Luxury Residences, Zanzibar"
- `<meta name="description">` — Confirm approved SEO description with the marketing team.
- Open Graph tags (`og:image`, `og:url`) — Update `og:url` to the production domain.

### 10. Favicon

Replace `client/public/favicon.ico` with the official Hola Paje or Floton Africa favicon.

---

## Content Updates

All website copy is sourced from the approved copy deck (Google Doc ID: `1kW4HtK3S417QmqWsyxO_jZa4njvqcFEI`). To update copy:

- **Section text:** Edit the relevant JSX string in `client/src/pages/Home.tsx`.
- **Villa data** (names, areas, descriptions, images): Edit `client/src/lib/villaData.ts`.
- **Navigation labels:** Edit `client/src/components/Navigation.tsx`.

---

## Image Updates

All images are hosted on the Manus CDN. To replace an image:

1. Upload the new file: `manus-upload-file --webdev path/to/new-image.jpg`
2. Copy the returned `/manus-storage/...` URL.
3. Find the old URL in `Home.tsx` or `villaData.ts` and replace it.

The full asset inventory and CDN URL map is at `/home/ubuntu/paje_cdn_urls.json`.

---

## Legal Disclaimer

The investment section does not contain specific yield projections, ROI figures, or capital appreciation claims, in accordance with the ground rules document. If approved figures become available and are to be added, they must be accompanied by the following disclaimer (already present in the copy deck):

> *This information is provided for general guidance only and does not constitute financial or investment advice. All projections are indicative and subject to change. Prospective purchasers should seek independent legal and financial advice.*

---

## Known Limitations

- The enquiry form does not persist submissions to a database in the current static build. This must be addressed before launch (see item 1 above).
- The site map currently has no `/privacy-policy` route (see item 5 above).
- The Floton Africa logo in the developer section is a text-based SVG placeholder. Replace with the official logo asset when available.

---

## Support

For technical questions about this codebase, contact the development team at Machete Lab.
