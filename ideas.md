# Hola Paje Luxury Residences — Design Direction

## Context
Architecture-led luxury residential development. Approved copy is editorial, restrained, and deliberately unhurried. The brand voice says: "One precise observation beats three superlatives." The visual assets are warm-toned CGIs, golden-hour aerials, and dramatic kitesurf sunsets. The site must feel like a high-end architecture monograph, not a property portal.

---

<response>
<probability>0.07</probability>
<text>

## Idea A — Monograph Silence

**Design Movement:** Swiss International Typographic Style filtered through a contemporary architecture publication (Wallpaper*, Dezeen editorial, Phaidon monographs).

**Core Principles:**
1. Extreme typographic restraint — the grid IS the design
2. Whitespace as luxury signal; density is the enemy
3. Images bleed edge-to-edge or are cropped with surgical precision
4. No decorative elements — every rule, line, and space earns its place

**Color Philosophy:** Near-white linen (#F5F0E8) as the primary surface. Charcoal near-black (#1A1714) for type. A single bronze/warm gold (#957355) used only for rules, active states, and price points — never as fill. The palette communicates: this is not a resort brochure, it is an architectural document.

**Layout Paradigm:** Asymmetric column grid. Sticky editorial headlines in the left column while body copy scrolls in the right. Full-bleed images interrupt the grid at deliberate intervals. The villa section uses a horizontal scroll container on desktop — each villa type occupies its own full-width panel.

**Signature Elements:**
- A thin 1px bronze horizontal rule as the only decorative motif
- Section labels in 9px Montserrat 300, letter-spacing 0.38em, uppercase — floating above headlines like a museum caption
- Images with a very subtle grain overlay to prevent the CGIs from looking too rendered

**Interaction Philosophy:** Scroll-driven reveals — content fades up in sequence, never all at once. The villa modal opens with a horizontal slide from the right edge, not a zoom. Hover states are opacity transitions only — no colour changes.

**Animation:** Ken Burns on hero (scale 1.0→1.07, 20s). Section entrances: opacity 0→1, translateY(18px→0), 0.6s cubic-bezier(0.23,1,0.32,1), staggered 80ms per element. Modal: translateX(100%→0), 320ms ease-out. No bounce, no spring.

**Typography System:**
- Display / Headlines: Cormorant Garamond 300 italic — editorial gravitas without weight
- Navigation / Labels / Stats: Montserrat 200–300, spaced caps
- Body: Montserrat 300, 16px, line-height 1.85, max-width 62ch
- Price / Counter: Montserrat 100, very large, white

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B — Coastal Brutalism

**Design Movement:** Brutalist editorial meets Indian Ocean warmth — think Apartamento magazine crossed with a Zanzibar carved-door aesthetic.

**Core Principles:**
1. Structural honesty — raw, visible grid, no softening
2. Contrast as the primary tool: heavy type weight against open space
3. Texture drawn from the island: coral stone, carved wood, woven rattan translated into CSS
4. Deliberate awkwardness — not everything aligns, and that is the point

**Color Philosophy:** Warm concrete (#C8BFB0) as the dominant surface. Deep charcoal (#1C1A17) for type. Terracotta (#B5603A) as the accent — not bronze, not gold, but the colour of Zanzibar's earth. The palette is hotter and more confrontational than Idea A.

**Layout Paradigm:** Oversized section numbers (01, 02, 03...) in the far left margin, functioning as structural anchors. Headlines break across columns unexpectedly. The villa section uses a stacked card layout — each villa is a tall card that expands on click to reveal the modal.

**Signature Elements:**
- Large numerals (100px+) as section markers
- Thick 3px rule in terracotta, used sparingly
- Images with a warm duotone treatment on hover

**Interaction Philosophy:** Deliberate, slightly heavy interactions — buttons have a physical press feel (scale 0.96 on active). The villa cards expand with a height animation, not a modal overlay.

**Animation:** Entrances are faster and more assertive — 0.4s, ease-out. Section numbers count up on scroll entry. Villa card expansion: max-height transition, 0.5s ease-in-out.

**Typography System:**
- Display: Playfair Display 700 — unapologetically heavy
- Body: DM Sans 400, 15px, line-height 1.75
- Labels: DM Mono 400, 11px — technical, grounded

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea C — Nocturne Luxury

**Design Movement:** Dark-mode luxury editorial — think Kinfolk's darker issues, or a Bottega Veneta campaign book. The entire site lives in deep warm darkness, with light used as a reveal tool.

**Core Principles:**
1. Dark surfaces as the primary luxury signal — light is earned, not given
2. Warm amber and gold tones glow against the darkness
3. Images are the only source of brightness — they are treated as windows into the world
4. Typography is white, but never pure white — always warm off-white

**Color Philosophy:** Deep warm near-black (#12100E) as the primary surface. Warm off-white (#EDE8E0) for body type. Bronze (#957355) for accent rules and CTAs. The palette is the inverse of a typical luxury property site — it says: we are not trying to sell you sunshine, we are inviting you into something private.

**Layout Paradigm:** Full-bleed dark sections punctuated by full-bleed image sections. The contrast between the two creates rhythm. The villa section uses the modal approach from the reference — but the modal itself is dark, with the image gallery as the only light source.

**Signature Elements:**
- Subtle grain texture on dark sections (SVG noise filter)
- Bronze glow on CTA buttons (box-shadow: 0 0 24px rgba(149,115,85,0.25))
- Section transitions with a horizontal wipe using clip-path

**Interaction Philosophy:** Everything feels like it is being revealed from darkness. Scroll reveals use a clip-path wipe from left to right, not a simple fade.

**Animation:** Clip-path reveals: inset(0 100% 0 0 → inset(0 0 0 0)), 0.8s cubic-bezier(0.77,0,0.175,1). Modal: opacity + scale(0.97→1), 280ms ease-out.

**Typography System:**
- Display: Cormorant Garamond 300 italic — same as Idea A, but glowing against darkness
- Body: Montserrat 300, warm off-white
- Labels: Montserrat 200, spaced caps, 35% opacity

</text>
</response>

---

## Selected Direction: **Idea A — Monograph Silence**

This is the correct choice for Hola Paje. The approved copy is already doing the heavy lifting — it is restrained, architectural, and precise. The design must not compete with it. Idea A creates the right conditions: extreme whitespace, a single bronze accent, Cormorant Garamond for editorial gravitas, and Montserrat for the technical/navigational layer. The villa section will use the horizontal-panel approach on desktop, with the modal opening as a full-screen overlay that slides in from the right.

The kitesurf sunset and golden-hour CGIs will be treated as full-bleed interruptions in an otherwise quiet document — they earn their impact through contrast with the surrounding silence.
