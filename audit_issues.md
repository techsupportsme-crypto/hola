# Hola Paje — Full Site Audit Issues

## CRITICAL (modal)
1. **Floor plans tab shows gallery images mixed in** — `allPlanImages` combines `floorplanImages + axoImages`, but the gallery images are also appearing. The plans tab should show ONLY floorplanImages + axoImages, no gallery renders.
2. **Axonometric images on dark background** — axo PNGs (which have white/transparent backgrounds) are rendered inside `.hp-modal-plans` which has `background: rgba(242,237,230,0.04)` — effectively dark. They need a pure white background so the line drawings read correctly.
3. **Floor plans tab: no image class applied** — the `<img>` tags in the plans tab have no class, so they don't get the white background treatment. Need a `.hp-modal-plan-img` class.

## HIGH (layout/visual)
4. **Panel 2 headline cut off** — "Three villa types. One address." is visible but "Fifty residences." may be cut off at the bottom on some viewports. Headline needs to sit higher or the overlay gradient needs to extend further up.
5. **Nav logo too small on mobile** — the cropped logo is still quite small on the dark scrolled nav bar on mobile.
6. **Villa card images are all interiors** — the three villa panel cards show bedroom/living room interiors. These should ideally show exteriors so the buyer understands the architectural character before clicking through.
7. **"VIEW VILLA →" arrow is too subtle** — the CTA on villa cards is very faint. Needs slightly more contrast.
8. **Stat callouts in Destination section** — the `<1hr`, `35km`, `UNESCO` stats run together in the markdown extraction, suggesting the layout may be collapsing on mobile.

## MEDIUM (copy/content)
9. **"From USD 270,000" is a placeholder** — flagged but not yet confirmed.
10. **"enquiries@holapaje.com" is a placeholder email** — needs real address.
11. **Floton Africa copy truncated** — the management programme description is cut off in the ownership section ("...and the experience of staying i").
12. **"15+ Years in East African development"** — needs verification. Brochure says "established track record" but doesn't give a year figure.
13. **Panel 3 headline "Built for the long view"** — slightly generic. Could be more specific.

## LOW (polish)
14. **Scroll indicator on Panel 1** — the "SCROLL" text is very faint and the animated line may not be visible on the bright lower sky portion of the kitesurf image.
15. **WhatsApp button colour** — the green WhatsApp button clashes with the teal palette. Could be charcoal with a WhatsApp icon.
16. **Footer logo size** — the footer logo may be too large relative to the footer text.
