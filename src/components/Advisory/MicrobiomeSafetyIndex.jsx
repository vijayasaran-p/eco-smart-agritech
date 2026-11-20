import React, { useEffect, useState } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';

// Sap-fill arc gauge — the visual centerpiece
export default function MicrobiomeSafetyIndex({ score = 82 }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate: (v) => setDisplayScore(Math.round(v)),
    });
    return controls.stop;
  }, [score]);

  // Arc parameters
  const cx = 110, cy = 110, r = 88;
  const circumference = 2 * Math.PI * r;
  const arcLength = (circumference * 0.75); // 270° arc
  const filledLength = (arcLength * score) / 100;
  const emptyLength = arcLength - filledLength;

  // Color gradient based on score
  const getGradientColors = (s) => {
    if (s >= 75) return { start: '#2D5A3D', end: '#8BC34A', text: '#2D5A3D', label: 'Thriving', emoji: '' };
    if (s >= 50) return { start: '#8BC34A', end: '#c8e06a', text: '#5a7a1e', label: 'Stable', emoji: '' };
    if (s >= 30) return { start: '#f59e0b', end: '#fbbf24', text: '#92400e', label: 'Stressed', emoji: '�' };
    return { start: '#ef4444', end: '#6B4226', text: '#7f1d1d', label: 'Critical', emoji: '�' };
  };

  const colors = getGradientColors(score);

  // Rotation so arc starts from bottom-left (135°) and ends bottom-right (45° past top)
  // Standard: rotate -225deg so arc goes from bottom-left, through top, to bottom-right
  const startAngle = -225; // degrees

  return (
    <div className="msi-container">
      <div className="msi-title">Microbiome Safety Index</div>
      <div className="msi-subtitle">Real-time soil ecosystem health score based on product impact analysis</div>

      <div className="msi-gauge-wrapper">
        <svg
          viewBox="0 0 220 220"
          width="220"
          height="220"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Sap-fill gradient */}
            <linearGradient id="sapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.start} />
              <stop offset="100%" stopColor={colors.end} />
            </linearGradient>

            {/* Glow filter */}
            <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Drop shadow */}
            <filter id="gaugeShadow">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={colors.start} floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Outer decorative ring */}
          <circle cx={cx} cy={cy} r={r + 12} fill="none" stroke="rgba(34, 197, 94,0.08)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke="rgba(30, 58, 138,0.05)" strokeWidth="1" />

          {/* Background track arc */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="var(--soil-beige-dark)"
            strokeWidth="18"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(${startAngle} ${cx} ${cy})`}
          />

          {/* Filled sap arc — animated like sap flowing up a stem */}
          <motion.circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="url(#sapGradient)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference - arcLength}`}
            transform={`rotate(${startAngle} ${cx} ${cy})`}
            filter="url(#gaugeShadow)"
            initial={{ strokeDashoffset: arcLength }}
            animate={{ strokeDashoffset: arcLength - filledLength }}
            transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
          />

          {/* Pulsing leading edge dot */}
          {score > 0 && (
            <motion.circle
              cx={cx + r * Math.cos((startAngle + (score / 100) * 270) * Math.PI / 180)}
              cy={cy + r * Math.sin((startAngle + (score / 100) * 270) * Math.PI / 180)}
              r="6"
              fill={colors.end}
              animate={{ r: [6, 9, 6], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const angle = (startAngle + (pct / 100) * 270) * Math.PI / 180;
            const x1 = cx + (r - 14) * Math.cos(angle);
            const y1 = cy + (r - 14) * Math.sin(angle);
            const x2 = cx + (r + 4) * Math.cos(angle);
            const y2 = cy + (r + 4) * Math.sin(angle);
            const lx = cx + (r + 18) * Math.cos(angle);
            const ly = cy + (r + 18) * Math.sin(angle);
            return (
              <g key={pct}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(30, 58, 138,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
                <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="9" fontFamily="Poppins, sans-serif" fill="var(--text-muted)" fontWeight="600">
                  {pct}
                </text>
              </g>
            );
          })}

          {/* Inner circle background */}
          <circle cx={cx} cy={cy} r={r - 22} fill="var(--cream-white)" />

          {/* Inner decorative ring */}
          <circle cx={cx} cy={cy} r={r - 22} fill="none" stroke={`${colors.start}20`} strokeWidth="1.5" />

          {/* Score number */}
          <text x={cx} y={cy - 18} textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="42" fill={colors.text}>
            {displayScore}
          </text>
          <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fill="var(--text-muted)" letterSpacing="2">
            /100
          </text>
          <text x={cx} y={cy + 26} textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="700" fill={colors.text}>
            {colors.emoji} {colors.label}
          </text>

          {/* Bottom labels */}
          <text x="28" y="195" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="var(--text-muted)" fontWeight="600">HARMFUL</text>
          <text x="192" y="195" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="9" fill="var(--text-muted)" fontWeight="600">SAFE</text>
        </svg>

        {/* Score status center */}
        <div className="msi-score-display" style={{ pointerEvents: 'none' }} />
      </div>

      {/* Score interpretation bar */}
      <div style={{ width: '100%', maxWidth: 300 }}>
        <div style={{ position: 'relative', height: 10, borderRadius: 99, overflow: 'hidden',
          background: 'linear-gradient(90deg, #ef4444 0%, #f59e0b 35%, #8BC34A 65%, #2D5A3D 100%)' }}>
          <motion.div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'white',
              border: `3px solid ${colors.start}`,
              boxShadow: `0 0 8px ${colors.start}88`,
            }}
            initial={{ left: '0%' }}
            animate={{ left: `${score}%` }}
            transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <span style={{ fontSize: 9, color: '#ef4444', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>� Critical</span>
          <span style={{ fontSize: 9, color: '#f59e0b', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>� Stressed</span>
          <span style={{ fontSize: 9, color: '#8BC34A', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>� Stable</span>
          <span style={{ fontSize: 9, color: '#2D5A3D', fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}> Thriving</span>
        </div>
      </div>
    </div>
  );
}
