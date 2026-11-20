import React from 'react';

/*
  ECOSMART BRAND SYMBOL SYSTEM
  Custom SVG icons — no emojis, unique to this platform.
  Each icon is hand-crafted to blend organic + tech aesthetics.
*/

// ─── Primary logo mark: Leaf + Circuit ───────────────────────────────────────
export function LeafCircuitMark({ size = 48, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Leaf outline */}
      <path d="M32 6 C18 16 12 30 16 44 C20 50 26 54 32 58 C38 54 44 50 48 44 C52 30 46 16 32 6Z"
        fill={accent} opacity={0.18} />
      <path d="M32 6 C18 16 12 30 16 44 C20 50 26 54 32 58 C38 54 44 50 48 44 C52 30 46 16 32 6Z"
        stroke={color} strokeWidth="2" fill="none" />
      {/* Midrib */}
      <line x1="32" y1="8" x2="32" y2="58" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Lateral veins */}
      <line x1="32" y1="22" x2="20" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="32" y1="22" x2="44" y2="32" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      <line x1="32" y1="34" x2="22" y2="42" stroke={color} strokeWidth="1.0" strokeLinecap="round" opacity={0.5} />
      <line x1="32" y1="34" x2="42" y2="42" stroke={color} strokeWidth="1.0" strokeLinecap="round" opacity={0.5} />
      {/* Circuit nodes on veins */}
      <circle cx="20" cy="32" r="2.5" fill={accent} />
      <circle cx="44" cy="32" r="2.5" fill={accent} />
      <circle cx="32" cy="22" r="2" fill={color} />
      {/* Circuit traces branching out */}
      <polyline points="20,32 14,32 14,26" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <polyline points="44,32 50,32 50,26" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="14" cy="26" r="1.8" fill={accent} />
      <circle cx="50" cy="26" r="1.8" fill={accent} />
    </svg>
  );
}

// ─── DNA Vine Helix ──────────────────────────────────────────────────────────
export function VineHelixSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 44" fill="none">
      <path d="M8 4 C8 4 20 14 20 22 C20 30 8 40 8 40" stroke={color} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M28 4 C28 4 16 14 16 22 C16 30 28 40 28 40" stroke={accent} strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <line x1="8" y1="12" x2="28" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="22" x2="24" y2="22" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="32" x2="28" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Leaf buds at nodes */}
      <path d="M8 12 C5 9 3 6 6 4 C7 7 8 10 8 12Z" fill={accent} />
      <path d="M28 32 C31 29 33 26 30 24 C29 27 28 30 28 32Z" fill={color} opacity={0.7} />
    </svg>
  );
}

// ─── Root-scope (Microscope with roots) ──────────────────────────────────────
export function RootScopeSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 44" fill="none">
      {/* Microscope body */}
      <rect x="12" y="8" width="12" height="16" rx="3" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="18" cy="12" r="3.5" stroke={accent} strokeWidth="1.5" fill="none" />
      <circle cx="18" cy="12" r="1.5" fill={accent} />
      {/* Stand */}
      <line x1="18" y1="24" x2="18" y2="30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="10" y1="30" x2="26" y2="30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Roots growing down from base */}
      <path d="M14 30 C12 34 10 37 8 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M18 30 C18 34 18 37 18 41" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M22 30 C24 34 26 37 28 40" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Root tips */}
      <circle cx="8" cy="40" r="1.5" fill={accent} />
      <circle cx="18" cy="41" r="1.5" fill={color} />
      <circle cx="28" cy="40" r="1.5" fill={accent} />
      {/* Eyepiece */}
      <rect x="14" y="4" width="8" height="4" rx="2" fill={color} />
    </svg>
  );
}

// ─── Eco Balance (scale with leaf vs droplet) ─────────────────────────────────
export function EcoBalanceSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Pivot */}
      <line x1="22" y1="6" x2="22" y2="36" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* Beam */}
      <line x1="6" y1="14" x2="38" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Base */}
      <path d="M16 36 L22 42 L28 36Z" fill={color} opacity={0.6} />
      {/* Left pan — leaf */}
      <line x1="6" y1="14" x2="6" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 28 C2 24 2 19 6 17 C10 19 10 24 6 28Z" fill={accent} />
      <line x1="6" y1="17" x2="6" y2="28" stroke={color} strokeWidth="1" strokeLinecap="round" />
      {/* Right pan — droplet */}
      <line x1="38" y1="14" x2="38" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 30 C34 26 34 22 38 20 C42 22 42 26 38 30Z" fill="#6B9FCA" opacity={0.8} />
      {/* BIO label area left */}
      <rect x="1" y="30" width="10" height="5" rx="2.5" fill={accent} opacity={0.2} />
      {/* CHEM label area right */}
      <rect x="33" y="30" width="10" height="5" rx="2.5" fill="#6B4226" opacity={0.2} />
    </svg>
  );
}

// ─── Growth Calendar (sprout inside calendar) ─────────────────────────────────
export function GrowthCalendarSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none">
      {/* Calendar */}
      <rect x="4" y="8" width="32" height="30" rx="4" stroke={color} strokeWidth="2" fill="none" />
      <line x1="4" y1="16" x2="36" y2="16" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="4" x2="12" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="4" x2="28" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Growing plant bursting through calendar base */}
      <line x1="20" y1="36" x2="20" y2="20" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M20 28 C15 25 12 20 15 16 C17 21 19 26 20 28Z" fill={color} />
      {/* Right leaf */}
      <path d="M20 28 C25 25 28 20 25 16 C23 21 21 26 20 28Z" fill={accent} />
      {/* Bud at top */}
      <circle cx="20" cy="19" r="3.5" fill={accent} />
      <circle cx="20" cy="19" r="2" fill={color} />
      {/* Grid dots */}
      {[[10,22],[16,22],[22,22],[28,22],[10,28],[16,28],[28,28]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="1.2" fill={color} opacity={0.35} />
      ))}
    </svg>
  );
}

// ─── Seedling Sprout (loading symbol) ────────────────────────────────────────
export function SproutSymbol({ size = 32, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 52" fill="none">
      <ellipse cx="20" cy="48" rx="14" ry="5" fill="#6B4226" opacity={0.45} />
      <line x1="20" y1="48" x2="20" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M20 36 C13 31 9 23 13 16 C16 24 19 32 20 36Z" fill={accent} />
      <path d="M20 36 C27 31 31 23 27 16 C24 24 21 32 20 36Z" fill={color} />
      <circle cx="20" cy="15" r="4.5" fill={accent} />
      <circle cx="20" cy="15" r="2" fill={color} />
    </svg>
  );
}

// ─── Field Row symbol ─────────────────────────────────────────────────────────
export function FieldRowSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 40" fill="none">
      {/* Converging field rows (perspective) */}
      {[6, 14, 22, 30, 38].map((x, i) => (
        <path key={i} d={`M${x} 38 L24 8`}
          stroke={i === 2 ? accent : color}
          strokeWidth={i === 2 ? 2.5 : 1.5}
          strokeLinecap="round"
          opacity={i === 2 ? 1 : 0.45} />
      ))}
      {/* Horizon line */}
      <line x1="4" y1="16" x2="44" y2="16" stroke="#6B4226" strokeWidth="1.5" opacity={0.4} />
      {/* Sun arc */}
      <path d="M8 16 A16 10 0 0 1 40 16" stroke="#D4A017" strokeWidth="2" fill="none" strokeLinecap="round" opacity={0.7} />
      {/* Seedling dots on rows */}
      {[12, 22, 32].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="28" x2={x} y2="22" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <circle cx={x} cy="22" r="2.5" fill={accent} />
        </g>
      ))}
    </svg>
  );
}

// ─── Soil Layer Section symbol ────────────────────────────────────────────────
export function SoilLayerSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Topsoil */}
      <rect x="4" y="6" width="36" height="10" rx="2" fill={accent} opacity={0.25} />
      <text x="7" y="15" fontSize="6" fill={color} fontFamily="Inter" fontWeight="600" opacity={0.7}>TOPSOIL</text>
      {/* Subsoil */}
      <rect x="4" y="17" width="36" height="10" rx="2" fill="#8c5a35" opacity={0.2} />
      <text x="7" y="26" fontSize="6" fill="#6B4226" fontFamily="Inter" fontWeight="600" opacity={0.7}>SUBSOIL</text>
      {/* Bedrock */}
      <rect x="4" y="28" width="36" height="10" rx="2" fill="#6B4226" opacity={0.15} />
      <text x="7" y="37" fontSize="6" fill="#6B4226" fontFamily="Inter" fontWeight="600" opacity={0.5}>BEDROCK</text>
      {/* Roots */}
      <line x1="14" y1="6" x2="14" y2="38" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
      <line x1="22" y1="6" x2="22" y2="34" stroke={accent} strokeWidth="1.5" strokeLinecap="round" opacity={0.5} />
      <line x1="30" y1="6" x2="30" y2="30" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity={0.4} />
    </svg>
  );
}

// ─── Microbiome Cell symbol ──────────────────────────────────────────────────
export function MicrobeCellSymbol({ size = 36, color = '#2D5A3D', accent = '#8BC34A' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
      {/* Main cell */}
      <ellipse cx="22" cy="22" rx="14" ry="11" stroke={accent} strokeWidth="2" fill={accent} opacity={0.12} />
      {/* Nucleus */}
      <circle cx="22" cy="22" r="5" fill={accent} opacity={0.35} stroke={color} strokeWidth="1.2} " />
      {/* Organelles */}
      <circle cx="14" cy="18" r="2.5" fill={color} opacity={0.35} />
      <circle cx="30" cy="26" r="2" fill={color} opacity={0.3} />
      <circle cx="17" cy="27" r="1.8" fill={accent} opacity={0.45} />
      {/* Flagella */}
      <path d="M36 22 C40 18 42 14 40 10" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M36 24 C40 28 42 32 40 36" stroke={accent} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity={0.7} />
      {/* Spore cluster */}
      <circle cx="8" cy="26" r="2.5" stroke={accent} strokeWidth="1.2" fill={accent} opacity={0.2} />
      <circle cx="8" cy="26" r="1" fill={accent} opacity={0.6} />
    </svg>
  );
}
