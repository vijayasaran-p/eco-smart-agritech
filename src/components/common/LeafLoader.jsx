import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
  SLOW SEED-TO-PLANT LOADER
  ─ Full-screen centered overlay
  ─ 6-phase animation the user actually watches and enjoys
  ─ Status text narrates each phase
  ─ Uses brand colors only, no emojis
*/

const PHASES = [
  { label: 'Preparing the soil',      sub: 'Setting up your environment',       duration: 300 },
  { label: 'Planting the seed',        sub: 'Initializing core modules',          duration: 250 },
  { label: 'Roots are spreading',      sub: 'Connecting to data sources',         duration: 350 },
  { label: 'The stem is rising',       sub: 'Building your workspace',            duration: 300 },
  { label: 'First leaves unfurling',   sub: 'Loading genetic & diagnostic data',  duration: 250 },
  { label: 'Your garden is ready',     sub: 'Welcome to EcoSmart Agritech',       duration: 200  },
];

export default function LeafLoader({ text }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let elapsed = 0;
    const timers = PHASES.map((p, i) => {
      const t = setTimeout(() => setPhase(i), elapsed);
      elapsed += p.duration;
      return t;
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const current = PHASES[phase];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #F5F0E6 0%, #EBE3D0 40%, #F0EAD8 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow behind plant */}
      <div style={{
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34, 197, 94,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── PLANT ANIMATION ── */}
      <div style={{ position: 'relative', width: 160, height: 200, marginBottom: 32 }}>
        <svg
          viewBox="0 0 160 200"
          width="160"
          height="200"
          style={{ overflow: 'visible' }}
        >
          {/* Soil mound */}
          <motion.ellipse
            cx="80" cy="188" rx="64" ry="14"
            fill="#3B82F6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <motion.ellipse
            cx="80" cy="185" rx="44" ry="9"
            fill="#8c5a35"
            opacity={0.4}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
          />

          {/* ── PHASE 0: Seed in soil ── */}
          <AnimatePresence>
            {phase >= 0 && phase < 2 && (
              <motion.g key="seed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: -10 }}
                transition={{ duration: 0.6 }}
              >
                {/* Seed shape */}
                <ellipse cx="80" cy="175" rx="13" ry="10" fill="#22C55E" stroke="#22C55E" strokeWidth="2" />
                <ellipse cx="80" cy="175" rx="7" ry="5" fill="#22C55E" opacity={0.4} />
                {/* Seed lines */}
                <line x1="80" y1="166" x2="80" y2="184" stroke="#1E3A8A" strokeWidth="1" opacity={0.5} strokeLinecap="round" />
                <line x1="70" y1="175" x2="90" y2="175" stroke="#1E3A8A" strokeWidth="1" opacity={0.5} strokeLinecap="round" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── PHASE 1: Roots spread ── */}
          <AnimatePresence>
            {phase >= 1 && (
              <motion.g key="roots" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <motion.path
                  d="M80 180 C68 184 56 188 48 186"
                  stroke="#8c5a35" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
                <motion.path
                  d="M80 180 C92 184 104 188 112 186"
                  stroke="#8c5a35" strokeWidth="2.5" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                />
                <motion.path
                  d="M80 182 C76 188 72 192 68 192"
                  stroke="#a0714f" strokeWidth="1.8" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                />
                <motion.path
                  d="M80 182 C84 188 88 192 92 192"
                  stroke="#a0714f" strokeWidth="1.8" strokeLinecap="round" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── PHASE 2: Stem rises ── */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.g key="stem">
                <motion.line
                  x1="80" y1="180" x2="80" y2="40"
                  stroke="#1E3A8A" strokeWidth="6" strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
                />
                {/* Stem texture nodes */}
                {[160, 140, 120, 100, 80, 60].map((y, i) => (
                  <motion.circle
                    key={y} cx={80} cy={y} r={3.5}
                    fill="#3B82F6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── PHASE 3: First leaf pair ── */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.g key="leaves1">
                <motion.path
                  d="M80 130 C55 118 38 96 48 72 C56 92 68 114 80 130Z"
                  fill="#22C55E"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.0, type: 'spring', stiffness: 80, damping: 12 }}
                  style={{ transformOrigin: '80px 130px' }}
                />
                <motion.path
                  d="M80 130 C105 118 122 96 112 72 C104 92 92 114 80 130Z"
                  fill="#1E3A8A"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 1.0, type: 'spring', stiffness: 80, damping: 12, delay: 0.2 }}
                  style={{ transformOrigin: '80px 130px' }}
                />
                {/* Veins */}
                <motion.line x1="80" y1="130" x2="52" y2="90"
                  stroke="rgba(30,61,42,0.35)" strokeWidth="1.2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }} />
                <motion.line x1="80" y1="130" x2="108" y2="90"
                  stroke="rgba(30,61,42,0.35)" strokeWidth="1.2" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ delay: 1.0, duration: 0.6 }} />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── PHASE 4: Second leaf pair ── */}
          <AnimatePresence>
            {phase >= 4 && (
              <motion.g key="leaves2">
                <motion.path
                  d="M80 100 C62 92 50 76 56 60 C62 74 72 88 80 100Z"
                  fill="#22C55E" opacity={0.8}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                  style={{ transformOrigin: '80px 100px' }}
                />
                <motion.path
                  d="M80 100 C98 92 110 76 104 60 C98 74 88 88 80 100Z"
                  fill="#3B82F6" opacity={0.8}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 100, delay: 0.18 }}
                  style={{ transformOrigin: '80px 100px' }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── PHASE 5: Flower blooms ── */}
          <AnimatePresence>
            {phase >= 5 && (
              <motion.g key="flower"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.9, type: 'spring', stiffness: 120 }}
                style={{ transformOrigin: '80px 38px' }}
              >
                {/* Petals */}
                {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.6].map((angle) => (
                  <motion.ellipse
                    key={angle}
                    cx={80 + 14 * Math.cos((angle * Math.PI) / 180)}
                    cy={38 + 14 * Math.sin((angle * Math.PI) / 180)}
                    rx="7" ry="5"
                    fill="#22C55E"
                    opacity={0.92}
                    transform={`rotate(${angle} ${80 + 14 * Math.cos((angle * Math.PI) / 180)} ${38 + 14 * Math.sin((angle * Math.PI) / 180)})`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 + (angle / 360) * 0.4 }}
                  />
                ))}
                {/* Center */}
                <circle cx="80" cy="38" r="10" fill="#22C55E" />
                <circle cx="80" cy="38" r="5.5" fill="#1E3A8A" />
                <circle cx="80" cy="38" r="2.5" fill="#22C55E" />

                {/* Floating pollen particles */}
                {[[60, 22], [100, 18], [50, 32], [112, 28], [70, 12], [92, 14]].map(([px, py], i) => (
                  <motion.circle key={i} cx={px} cy={py} r={2.5}
                    fill="#22C55E"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: [0, -8, -18] }}
                    transition={{ duration: 1.6, delay: 0.4 + i * 0.12, repeat: Infinity, repeatDelay: 2 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* ── PHASE TEXT ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: '#1E3A8A',
            marginBottom: 6,
            letterSpacing: '0.3px',
          }}>
            {current.label}
          </div>
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            color: '#7a6050',
            letterSpacing: '0.2px',
          }}>
            {current.sub}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
        {PHASES.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === phase ? 24 : 8,
              background: i < phase ? '#1E3A8A' : i === phase ? '#22C55E' : '#D0C8BB',
            }}
            transition={{ duration: 0.4 }}
            style={{
              height: 8,
              borderRadius: 99,
            }}
          />
        ))}
      </div>

      {/* Phase fraction */}
      <div style={{
        marginTop: 14,
        fontFamily: 'Inter, sans-serif',
        fontSize: 11,
        color: '#9a8070',
        letterSpacing: '1px',
      }}>
        {phase + 1} / {PHASES.length}
      </div>
    </motion.div>
  );
}
