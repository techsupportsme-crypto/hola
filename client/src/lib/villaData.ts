/*
 * HOLA PAJE — Villa Data Model
 * Design: Monograph Silence — Montserrat + Linen/Charcoal/Bronze
 * Source of truth: Approved copy deck v1.0, June 2026
 *
 * Image audit (2026-06-10 — v2):
 *   All images replaced with properly named assets from assets.zip (Claude-curated).
 *   CDN URLs are the canonical source — do not reference local paths.
 */

export interface AreaRow {
  label: string;
  value: string;
  isTotal?: boolean;
}

export interface VillaType {
  id: string;
  tabLabel: string;
  heroLabel: string;
  heroImage: string;
  heroImageAlt: string;
  galleryImages: Array<{ src: string; alt: string; objectPosition?: string }>;
  statementHeadline: string;
  statementBody: string;
  plansSectionLabel: string;
  plansHeadline: string;
  floorplanImages: Array<{ src: string; alt: string }>;
  axoImages: Array<{ src: string; alt: string }>;
  areas: AreaRow[];
  bathrooms: number;
  fromPrice: string;
  /** Optional direct video URLs for the VIDEO tab.
   *  video16x9 = landscape CDN URL for desktop
   *  video1x1  = square CDN URL for mobile (optional — falls back to 16x9 if absent) */
  videos?: {
    video16x9: string;
    video1x1?: string;
  };
}

export const villas: VillaType[] = [
  // ─────────────────────────────────────────────
  // TERRACE VILLA
  // ─────────────────────────────────────────────
  {
    id: 'terrace',
    videos: {
      video16x9: '/manus-storage/RowVilla16.9_8b8d028a.mov',
      video1x1: '/manus-storage/TerraceVilla1x1_f4d6ac6a.mp4',
    },
    tabLabel: 'Terrace Villa',
    heroLabel: 'Terrace Villa',
    bathrooms: 2,
    fromPrice: 'From USD 270,000',
    heroImage: '/manus-storage/terrace-streetdetailcopy2_0e2ead44.jpg',
    heroImageAlt: 'Terrace Villa — a guest arriving at golden hour, lush tropical landscaping and white render facade, Hola Paje',
    galleryImages: [
      {
        src: '/manus-storage/terrace-exterior_5a253f22.png',
        alt: 'Terrace Villa exterior — twin white villas with timber entry doors, Hola Paje',
      },
      {
        src: '/manus-storage/terrace-street_f36e3f89.jpg',
        alt: 'Terrace Villa street elevation — villas 03 and 04 from the approach road, Hola Paje',
      },
      {
        src: '/manus-storage/terrace-villa-pool-scene_9a33c469.webp',
        alt: 'Terrace Villa pool terrace — couple relaxing by the private plunge pool with floor-to-ceiling glazed living room beyond, Hola Paje',
      },
      {
        src: '/manus-storage/terrace-villa-livingroom_56b3aa6c.webp',
        alt: 'Terrace Villa living room — double-height space with woven pendants, linen sofa, tropical artwork and pool garden view, Hola Paje',
      },
      {
        src: '/manus-storage/terrace-villa-kitchen_580e8aef.webp',
        alt: 'Terrace Villa open-plan kitchen and living — timber cabinetry, rattan pendants, live-edge coffee table and staircase, Hola Paje',
      },
      {
        src: '/manus-storage/terrace-villa-bedroom_b063d5ce.webp',
        alt: 'Terrace Villa master bedroom — timber platform bed, macramé wall hanging, ceiling fan and garden view, Hola Paje',
      },
    ],
    statementHeadline: 'The Geometry of Serenity\nin the Abundance of Nature.',
    statementBody:
      'Clean horizontal lines, warm timber entry doors, and floor-to-ceiling glazing that brings the sky directly into the living room — and the living room directly to your private pool. The Terrace Villa distils contemporary tropical living to its most considered form.',
    plansSectionLabel: 'Floor Plans & Areas',
    plansHeadline: 'Two Bedroom Terrace Villas',
    floorplanImages: [
      {
        src: '/manus-storage/terrace-floorplans_caa6c2da.png',
        alt: 'Terrace Villa floor plans — ground floor and first floor',
      },
    ],
    axoImages: [
      {
        src: '/manus-storage/terrace-axo-lower_ef6c6adb.png',
        alt: 'Terrace Villa lower floor axonometric',
      },
      {
        src: '/manus-storage/terrace-axo-upper_03db5aa7.png',
        alt: 'Terrace Villa upper floor axonometric',
      },
    ],
    areas: [
      { label: 'Ground floor', value: '74.04 sqm' },
      { label: 'First floor', value: '47.16 sqm' },
      { label: 'Swimming pool', value: '8.75 sqm' },
      { label: 'Pool deck & porch', value: '8.27 sqm' },
      { label: 'Total area', value: '138.22 sqm', isTotal: true },
    ],
  },

  // ─────────────────────────────────────────────
  // ISLAND VILLA
  // ─────────────────────────────────────────────
  {
    id: 'island',
    videos: {
      video16x9: '/manus-storage/IslandVilla16.9_0d30a4c0.mov',
      video1x1: '/manus-storage/IslandVilla1x1_8ec790e1.mp4',
    },
    tabLabel: 'Island Villa',
    heroLabel: 'Island Villa',
    bathrooms: 3,
    fromPrice: 'From USD 320,000',
    heroImage: '/manus-storage/island-villa-exterior_785fb775.webp',
    heroImageAlt: 'Island Villa exterior — dramatic pitched roof with full-height glazed facade and pool terrace, Hola Paje',
    galleryImages: [
      {
        src: '/manus-storage/island-villa-exterior_785fb775.webp',
        alt: 'Island Villa exterior — dramatic pitched gable facade with full-height glazing, pool terrace and tropical garden, Hola Paje',
        objectPosition: 'center bottom',
      },
      {
        src: '/manus-storage/island-interior-2_1504fb0e.webp',
        alt: 'Island Villa living room — sculptural woven pendant cluster beneath the pitched timber roof, stone feature wall and sunken seating, Hola Paje',
      },
      {
        src: '/manus-storage/11_df8a86a9.webp',
        alt: 'Island Villa open-plan living and dining — sunken seating pit, stone feature wall, woven pendants and pool view through full-height gable glazing, Hola Paje',
      },
      {
        src: '/manus-storage/10_525f680b.webp',
        alt: 'Island Villa living room — overhead view of sunken seating pit beneath dramatic woven pendant cluster and timber-slatted pitched roof, Hola Paje',
      },
      {
        src: '/manus-storage/06_f7dd4e75.webp',
        alt: 'Island Villa kitchen — full-height timber cabinetry with lit glass display shelves, terrazzo worktop and black fixtures, Hola Paje',
      },
      {
        src: '/manus-storage/R07_7a51cb45.webp',
        alt: 'Island Villa master bedroom — timber-clad headboard niche, gable window with palm view, rattan pendant and ceiling fan, Hola Paje',
      },
      {
        src: '/manus-storage/04.1_24a83964.webp',
        alt: 'Island Villa dining area — live-edge dining table, stone feature wall, rattan pendant and kitchen beyond, Hola Paje',
      },
    ],
    statementHeadline: 'Sloped Lines. Sculpted Lights.\nA Roof that Shapes the Sky.',
    statementBody:
      'A soaring pitched roof finished in dark timber shingles. A full-height glass facade that dissolves the boundary between the living space and the pool garden. The Island Villa draws from Zanzibar\'s coastal vernacular and reimagines it for the way people choose to live here today.',
    plansSectionLabel: 'Floor Plans & Areas',
    plansHeadline: 'Two Bedroom Island Villas',
    floorplanImages: [
      {
        src: '/manus-storage/island-floorplans_b0d68475.png',
        alt: 'Island Villa floor plans — ground floor and first floor',
      },
    ],
    axoImages: [
      {
        src: '/manus-storage/island-axo-lower_ec44c1a6.png',
        alt: 'Island Villa lower floor axonometric',
      },
      {
        src: '/manus-storage/island-axo-upper_45368a82.png',
        alt: 'Island Villa upper floor axonometric',
      },
    ],
    areas: [
      { label: 'Ground floor', value: '80.83 sqm' },
      { label: 'First floor', value: '53.25 sqm' },
      { label: 'Swimming pool', value: '14.69 sqm' },
      { label: 'Pool deck', value: '33.56 sqm' },
      { label: 'Total area', value: '182.33 sqm', isTotal: true },
    ],
  },

  // ─────────────────────────────────────────────
  // CONTEMPORARY VILLA
  // ─────────────────────────────────────────────
  {
    id: 'contemporary',
    videos: {
      video16x9: '/manus-storage/ContempVilla16.9_96fa7050.mov',
      video1x1: '/manus-storage/ContempVilla1x1_da5d113d.mp4',
    },
    tabLabel: 'Contemporary Villa',
    heroLabel: 'Contemporary Villa',
    bathrooms: 3,
    fromPrice: 'From USD 370,000',
    heroImage: '/manus-storage/cv-pool-full-sky_a07ea6b1.webp',
    heroImageAlt: 'Contemporary Villa exterior — white sculpted facade with arched windows, tropical garden and timber entry gate at sunset, Hola Paje',
    galleryImages: [
      {
        src: '/manus-storage/contemporary-villa-pool_bd8a9b57.webp',
        alt: 'Contemporary Villa pool terrace — arched glazing, tropical garden and private pool at golden hour, Hola Paje',
        objectPosition: 'center center',
      },
      {
        src: '/manus-storage/cv-sunrise-sky_bb31bdb7.webp',
        alt: 'Contemporary Villa street elevation — white sculpted facade with arched windows and tropical palms at sunrise, Hola Paje',
        objectPosition: 'center center',
      },
      {
        src: '/manus-storage/contemporary-villa-livingroom-1_32419d91.webp',
        alt: 'Contemporary Villa living room — double-height volume, woven pendant lights, floating staircase and pool terrace view, Hola Paje',
        objectPosition: 'center center',
      },
      {
        src: '/manus-storage/contemporary-villa-diningroom_f647f39b.webp',
        alt: 'Contemporary Villa dining and kitchen — round dining table, timber cabinetry, kitchen island and arched window, Hola Paje',
        objectPosition: 'center center',
      },
      {
        src: '/manus-storage/contemporary-villa-kitchen_9cf47b87.webp',
        alt: 'Contemporary Villa kitchen — marble island, timber cabinetry, rattan pendant and tropical garden view, Hola Paje',
        objectPosition: 'center center',
      },
      {
        src: '/manus-storage/contemporary-villa-bedroom_13344fce.webp',
        alt: 'Contemporary Villa master bedroom — arched niche headboard, rattan wardrobe and tropical garden light, Hola Paje',
        objectPosition: 'center center',
      },
      {
        src: '/manus-storage/contemporary-villa-bedroom-2_b57b412a.webp',
        alt: 'Contemporary Villa second bedroom — rattan bed, macramé wall art, woven pendants and arched garden window, Hola Paje',
        objectPosition: 'center center',
      },
    ],
    statementHeadline: 'Modern Tropical Calm\nin Sculpted Forms.',
    statementBody:
      'Arched windows. Rounded forms. A pool terrace that wraps the ground floor in light and water. The Contemporary Villa is the most architecturally distinctive residence in the collection — three bedrooms, 243 square metres, and a presence that is unmistakably Zanzibar.',
    plansSectionLabel: 'Floor Plans & Areas',
    plansHeadline: 'Three Bedroom Contemporary Villas',
    floorplanImages: [
      {
        src: '/manus-storage/contemporary-floorplans_e8519909.png',
        alt: 'Contemporary Villa floor plans — ground floor and first floor',
      },
    ],
    axoImages: [
      {
        src: '/manus-storage/contemporary-axo-lower_391fbd60.png',
        alt: 'Contemporary Villa lower floor axonometric',
      },
      {
        src: '/manus-storage/contemporary-axo-upper_2b888682.png',
        alt: 'Contemporary Villa upper floor axonometric',
      },
    ],
    areas: [
      { label: 'Ground floor', value: '95.24 sqm' },
      { label: 'First floor', value: '77.94 sqm' },
      { label: 'Bedroom terrace', value: '14.19 sqm' },
      { label: 'Swimming pool', value: '16.42 sqm' },
      { label: 'Pool deck', value: '39.32 sqm' },
      { label: 'Total area', value: '243.11 sqm', isTotal: true },
    ],
  },
];
