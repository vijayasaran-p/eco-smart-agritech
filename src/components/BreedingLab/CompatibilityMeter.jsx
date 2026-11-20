import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Animated vine SVG compatibility meter
export default function CompatibilityMeter({ score = 76, factors = [] }) {
  const scoreMV = useMotionValue(0);
  const displayScore = useMotionValue(0);

  useEffect(() => {
    const controls = animate(scoreMV, score, {
      duration: 1.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    });
    const displayCtrl = animate(displayScore, score, {
      duration: 1.6,
      ease: 'easeOut',
    });
    return () => {
      controls.stop();
      displayCtrl.stop();
    };
  }, [score]);

  const getScoreColor = (s) => {
    if (s >= 80) return '#2D5A3D';
    if (s >= 60) return '#8BC34A';
    if (s >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = (s) => {
    if (s >= 80) return 'Excellent Match ';
    if (s >= 60) return 'Good Compatibility ';
    if (s >= 40) return 'Moderate Match ⚡';
    return 'Low Compatibility ';
  };

  // Vine SVG path animation — grows from left center to right center
  const vinePathLength = useTransform(scoreMV, [0, 100], [0, 1]);

  // Dash value for the vine
  const strokeDashoffset = useTransform(scoreMV, [0, 100], [300, 0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Vine SVG between cards */}
      <div style={{ width: '100%', maxWidth: 360, margin: '0 auto', position: 'relative' }}>
        <svg
          viewBox="0 0 360 120"
          width="100%"
          style={{ overflow: 'visible' }}
        >
          {/* Main vine path */}
          <motion.path
            d="M 10 60 C 60 30, 100 90, 140 55 C 180 20, 220 95, 260 60 C 300 25, 330 70 350 60"
            fill="none"
            stroke="#8BC34A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="300"
            style={{ strokeDashoffset }}
            filter="url(#vineShadow)"
          />
          {/* Secondary vine tendril */}
          <motion.path
            d="M 60 55 C 65 35, 75 30, 80 50"
            fill="none"
            stroke="#2D5A3D"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: score > 40 ? 1 : 0, opacity: score > 40 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          />
          <motion.path
            d="M 180 52 C 185 32, 195 27, 200 47"
            fill="none"
            stroke="#2D5A3D"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: score > 50 ? 1 : 0, opacity: score > 50 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.path
            d="M 295 55 C 300 35, 310 30, 315 50"
            fill="none"
            stroke="#2D5A3D"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: score > 70 ? 1 : 0, opacity: score > 70 ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />

          {/* Leaf nodes along the vine */}
          {[60, 140, 220, 300].map((x, i) => (
            <motion.g key={x}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: score > i * 20 ? 1 : 0, opacity: score > i * 20 ? 1 : 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.2, type: 'spring', stiffness: 200 }}
              style={{ transformOrigin: `${x}px 60px` }}
            >
              <circle cx={x} cy={60} r={5} fill="#8BC34A" />
              <circle cx={x} cy={60} r={8} fill="#8BC34A" opacity={0.2} />
            </motion.g>
          ))}

          {/* Score score in center */}
          <motion.text
            x="180" y="95"
            textAnchor="middle"
            fontFamily="Poppins, sans-serif"
            fontWeight="800"
            fontSize="14"
            fill={getScoreColor(score)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {score}% Match
          </motion.text>

          <defs>
            <filter id="vineShadow" x="-10%" y="-30%" width="120%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#8BC34A" floodOpacity="0.3"/>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Score display */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          color: getScoreColor(score),
          background: 'rgba(34, 197, 94,0.12)',
          padding: '6px 16px',
          borderRadius: 99,
          border: `1.5px solid ${getScoreColor(score)}40`,
        }}>
          {getScoreLabel(score)}
        </div>
      </div>

      {/* Compatibility factors */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif', marginBottom: 4 }}>
          Compatibility Factors
        </div>
        {factors.map((f, i) => (
          <div key={f.factor} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 130, fontSize: '12px', color: 'var(--text-medium)', fontFamily: 'Inter, sans-serif', flexShrink: 0 }}>
              {f.factor}
            </div>
            <div style={{ flex: 1, height: 6, background: 'var(--soil-beige-dark)', borderRadius: 99, overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${f.score}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, var(--forest-green), var(--moss-green))`,
                  borderRadius: 99,
                }}
              />
            </div>
            <div style={{ width: 32, textAlign: 'right', fontSize: '11px', fontWeight: 700, color: 'var(--forest-green)', fontFamily: 'Poppins, sans-serif' }}>
              {f.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
