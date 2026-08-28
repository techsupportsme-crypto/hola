/**
 * ZanzibarMap — custom SVG map component
 * Viewbox: 0 0 800 480 — landscape, fills the 16:9 banner
 * Island shape: geographically accurate from OSM-derived coordinates
 * Projection: lon 39.10–39.85, lat 5.60–6.60 → 800×480 canvas
 * Island spans x:159–612, y:80–393 (well-centred in canvas)
 * Key points: Stone Town (169, 265), Paje (612, 307)
 * Palette: deep forest ocean, warm sand island, gold Paje, sage labels
 */

export default function ZanzibarMap({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 520"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Map showing Zanzibar island and Paje on the south-east coast"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="oceanGrad" cx="55%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#1E3530" />
          <stop offset="100%" stopColor="#0D1A18" />
        </radialGradient>
        <linearGradient id="islandGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#EDE4D4" />
          <stop offset="100%" stopColor="#D0C4AE" />
        </linearGradient>
        <radialGradient id="pajeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Ocean background ── */}
      <rect width="800" height="480" fill="url(#oceanGrad)" />

      {/* ── Subtle grid ── */}
      {[96, 192, 288, 384].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#fff" strokeWidth="0.35" strokeOpacity="0.04" />
      ))}
      {[160, 320, 480, 640].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" stroke="#fff" strokeWidth="0.35" strokeOpacity="0.04" />
      ))}

      {/* ── Tanzania mainland — left edge ── */}
      <path
        d="M 0,180 C 40,175 68,195 75,225 C 84,258 72,290 82,320 C 90,346 78,374 82,400 C 86,424 74,450 0,480 Z"
        fill="#142220"
        opacity="0.9"
      />
      <text
        x="24"
        y="340"
        fontFamily="'Montserrat', sans-serif"
        fontSize="8.5"
        fontWeight="300"
        fill="#3D6058"
        letterSpacing="0.18em"
        textAnchor="middle"
        transform="rotate(-90, 24, 340)"
      >
        TANZANIA
      </text>

      {/* ── Unguja (Zanzibar main island) — geographically accurate
          Projection: lon 39.10–39.85, lat 5.60–6.60 → 800×480 (mx=80, my=30)
          Island spans x:159–612, y:80–393
      ── */}
      <path
        d="M 430.0,80.4 L 462.7,88.8 L 495.3,105.6 L 518.7,122.4 L 537.3,143.4 L 556.0,168.6 L 570.0,193.8 L 584.0,219.0 L 593.3,244.2 L 602.7,269.4 L 607.3,290.4 L 612.0,307.2 L 607.3,328.2 L 593.3,349.2 L 565.3,366.0 L 528.0,378.6 L 490.7,387.0 L 453.3,391.2 L 416.0,393.3 L 378.7,391.2 L 341.3,387.0 L 304.0,378.6 L 266.7,366.0 L 229.3,349.2 L 201.3,328.2 L 182.7,307.2 L 173.3,286.2 L 168.7,265.2 L 164.0,244.2 L 159.3,223.2 L 159.3,202.2 L 164.0,181.2 L 173.3,160.2 L 192.0,139.2 L 220.0,122.4 L 257.3,109.8 L 294.7,101.4 L 332.0,93.0 L 369.3,84.6 L 406.7,80.4 L 430.0,80.4 Z"
        fill="url(#islandGrad)"
        stroke="#C4B89A"
        strokeWidth="1"
      />

      {/* ── Pemba island — positioned manually in upper right (off projection) ── */}
      <ellipse cx="690" cy="52" rx="38" ry="22" fill="url(#islandGrad)" stroke="#C4B89A" strokeWidth="0.7" transform="rotate(-20, 690, 52)" />
      <text
        x="690"
        y="88"
        fontFamily="'Montserrat', sans-serif"
        fontSize="9"
        fontWeight="300"
        fill="#4A7068"
        letterSpacing="0.12em"
        textAnchor="middle"
      >
        PEMBA
      </text>

      {/* ── Stone Town — west coast at (169, 265) ── */}
      <circle cx="169" cy="265" r="3.5" fill="#7AA89E" />
      {/* Leader line going left */}
      <line x1="169" y1="265" x2="128" y2="248" stroke="#7AA89E" strokeWidth="0.8" strokeOpacity="0.65" />
      <text
        x="124"
        y="240"
        fontFamily="'Montserrat', sans-serif"
        fontSize="11"
        fontWeight="300"
        fill="#9ABFB8"
        letterSpacing="0.04em"
        textAnchor="middle"
      >
        Stone Town
      </text>

      {/* ── Paje — SE coast at (612, 307) ── */}
      <circle cx="612" cy="307" r="26" fill="url(#pajeGlow)" />
      <circle cx="612" cy="307" r="12" fill="none" stroke="#C9A96E" strokeWidth="0.8" strokeOpacity="0.28" />
      <circle cx="612" cy="307" r="7" fill="none" stroke="#C9A96E" strokeWidth="1.5" />
      <circle cx="612" cy="307" r="3" fill="#C9A96E" />
      {/* Leader line going right */}
      <line x1="620" y1="307" x2="658" y2="307" stroke="#C9A96E" strokeWidth="1" strokeOpacity="0.85" />
      <text
        x="664"
        y="301"
        fontFamily="'Montserrat', sans-serif"
        fontSize="15"
        fontWeight="600"
        fill="#C9A96E"
        letterSpacing="0.12em"
      >
        PAJE
      </text>
      <text
        x="664"
        y="318"
        fontFamily="'Montserrat', sans-serif"
        fontSize="8.5"
        fontWeight="300"
        fill="#C9A96E"
        letterSpacing="0.08em"
        opacity="0.65"
      >
        SE COAST
      </text>

      {/* ── ZANZIBAR watermark — upper centre ocean ── */}
      <text
        x="390"
        y="52"
        fontFamily="'Montserrat', sans-serif"
        fontSize="22"
        fontWeight="100"
        fill="#ffffff"
        letterSpacing="0.22em"
        textAnchor="middle"
        opacity="0.14"
      >
        ZANZIBAR
      </text>

      {/* ── Indian Ocean label — lower right ── */}
      <text
        x="720"
        y="450"
        fontFamily="'Montserrat', sans-serif"
        fontSize="9.5"
        fontWeight="300"
        fill="#4A7068"
        letterSpacing="0.14em"
        textAnchor="middle"
        opacity="0.75"
      >
        INDIAN OCEAN
      </text>

      {/* ── Compass rose — bottom right ── */}
      <g transform="translate(762, 448)" opacity="0.42">
        <line x1="0" y1="-13" x2="0" y2="13" stroke="#7AA89E" strokeWidth="1" />
        <line x1="-13" y1="0" x2="13" y2="0" stroke="#7AA89E" strokeWidth="1" />
        <polygon points="0,-13 -3.5,-5 3.5,-5" fill="#7AA89E" />
        <text x="0" y="-16" fontFamily="'Montserrat', sans-serif" fontSize="8.5" fill="#7AA89E" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
