/**
 * ZanzibarMap — accurate SVG map of Unguja (Zanzibar Island)
 * Island outline derived from real OSM coastline data, RDP-simplified.
 * Tumbatu island included NW of main island.
 * Do NOT hand-edit the path data — regenerate via skills/osm-svg-map/scripts/build_map.py if needed.
 */
export default function ZanzibarMap({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 680"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Map showing Zanzibar island — Stone Town, Airport and Paje on the south-east coast"
      role="img"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: 'block' }}
    >
      <defs>
        <radialGradient id="oceanGrad" cx="50%" cy="45%" r="70%">
          <stop offset="0%" stopColor="#1E3530" />
          <stop offset="100%" stopColor="#0D1A18" />
        </radialGradient>
        <linearGradient id="islandGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#EDE4D4" />
          <stop offset="100%" stopColor="#D0C4AE" />
        </linearGradient>
        <radialGradient id="pajeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C9A96E" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#C9A96E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ocean */}
      <rect width="900" height="680" fill="url(#oceanGrad)" />

      {/* Subtle grid lines */}
      <line x1="0" y1="140" x2="900" y2="140" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.04" />
      <line x1="0" y1="280" x2="900" y2="280" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.04" />
      <line x1="0" y1="420" x2="900" y2="420" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.04" />
      <line x1="225" y1="0" x2="225" y2="680" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.04" />
      <line x1="450" y1="0" x2="450" y2="680" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.04" />
      <line x1="675" y1="0" x2="675" y2="680" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.04" />

      {/* Unguja — real OSM coastline, RDP-simplified */}
      <path
        d="M 535.0,469.8 L 530.7,478.4 L 542.8,493.5 L 549.8,530.5 L 564.9,560.6 L 580.3,577.0 L 596.1,577.8 L 621.4,559.6 L 629.6,548.4 L 637.1,519.0 L 610.4,457.6 L 609.0,396.5 L 592.9,356.9 L 581.5,355.4 L 579.5,369.5 L 584.3,369.9 L 593.9,392.7 L 590.1,391.8 L 590.5,398.9 L 583.2,392.8 L 580.2,400.1 L 575.0,400.5 L 570.6,384.9 L 558.3,402.6 L 551.3,390.1 L 532.1,398.0 L 547.3,384.9 L 539.4,361.3 L 543.2,317.8 L 530.9,311.4 L 525.8,292.7 L 513.3,278.6 L 496.6,227.1 L 495.3,147.6 L 465.5,102.8 L 458.8,101.8 L 451.5,121.5 L 457.6,144.1 L 455.3,158.7 L 444.0,191.3 L 417.6,202.0 L 401.8,225.4 L 401.7,236.0 L 396.9,213.7 L 393.3,211.2 L 386.7,219.0 L 387.1,273.0 L 399.3,296.8 L 398.7,311.6 L 406.8,336.2 L 406.3,359.3 L 397.2,372.3 L 399.6,375.9 L 392.0,374.4 L 387.7,379.8 L 401.4,397.1 L 396.9,415.7 L 403.4,420.3 L 405.1,434.2 L 428.4,449.7 L 442.9,476.6 L 460.1,478.2 L 447.1,439.2 L 453.4,434.8 L 463.5,448.8 L 456.6,427.4 L 466.4,426.6 L 477.7,436.6 L 490.2,468.2 L 493.9,471.9 L 494.5,466.4 L 507.0,478.3 L 507.8,486.9 L 511.2,479.6 L 515.3,507.3 L 523.2,508.8 L 533.3,536.9 L 535.0,529.1 L 529.0,520.9 L 533.2,496.3 L 514.8,470.9 L 523.9,468.2 L 525.2,475.6 L 541.5,458.4 L 545.8,462.4 L 535.0,469.8 Z"
        fill="url(#islandGrad)"
        stroke="#C4B89A"
        strokeWidth="1.2"
      />

      {/* Tumbatu island — NW of main island */}
      <path
        d="M 418.6,159.3 L 417.5,163.4 L 419.8,164.0 L 424.1,155.0 L 421.6,156.1 L 415.1,151.1 L 413.8,132.6 L 409.9,129.3 L 404.4,180.0 L 407.5,187.9 L 419.5,186.1 L 420.5,177.2 L 414.2,161.2 L 415.7,157.1 L 418.6,159.3 Z"
        fill="url(#islandGrad)"
        stroke="#C4B89A"
        strokeWidth="1.0"
      />

      {/* ZANZIBAR — top-right ocean */}
      <text
        x="875" y="90"
        fontFamily="Montserrat,sans-serif" fontSize="42" fontWeight="200"
        fill="#ffffff" letterSpacing="0.22em" textAnchor="end" opacity="0.35"
      >ZANZIBAR</text>

      {/* Stone Town */}
      <circle cx="395.6" cy="381.1" r="4" fill="rgba(255,255,255,0.90)" />
      <line x1="390.6" y1="381.1" x2="335.6" y2="381.1" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <text
        x="328.6" y="381.1"
        fontFamily="Montserrat,sans-serif" fontSize="16" fontWeight="600"
        fill="#ffffff" letterSpacing="0.14em" textAnchor="end" dominantBaseline="middle"
      >STONE TOWN</text>

      {/* Airport */}
      <circle cx="412.6" cy="415.9" r="4" fill="rgba(255,255,255,0.90)" />
      <line x1="407.6" y1="415.9" x2="352.6" y2="415.9" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
      <text
        x="345.6" y="415.9"
        fontFamily="Montserrat,sans-serif" fontSize="16" fontWeight="600"
        fill="#ffffff" letterSpacing="0.14em" textAnchor="end" dominantBaseline="middle"
      >AIRPORT</text>

      {/* Paje — gold rings + dot + label */}
      <circle cx="608.6" cy="445.3" r="28" fill="url(#pajeGlow)" />
      <circle cx="608.6" cy="445.3" r="14" fill="none" stroke="#C9A96E" strokeWidth="0.9" strokeOpacity="0.30" />
      <circle cx="608.6" cy="445.3" r="8" fill="none" stroke="#C9A96E" strokeWidth="1.6" />
      <circle cx="608.6" cy="445.3" r="3.5" fill="#C9A96E" />
      <line x1="617.6" y1="445.3" x2="663.6" y2="445.3" stroke="#C9A96E" strokeWidth="1.2" strokeOpacity="0.80" />
      <text
        x="670.6" y="445.3"
        fontFamily="Montserrat,sans-serif" fontSize="16" fontWeight="600"
        fill="#C9A96E" letterSpacing="0.14em" dominantBaseline="middle"
      >PAJE</text>
    </svg>
  );
}
