import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  { label: 'Scanning soil topography', sub: 'Analyzing surface data', duration: 300 },
  { label: 'Penetrating layers', sub: 'Reading subsoil metrics', duration: 250 },
  { label: 'Extracting N-P-K values', sub: 'Processing nutrient profile', duration: 350 },
  { label: 'Checking microbiome', sub: 'Calculating safety index', duration: 300 },
  { label: 'Generating insights', sub: 'Preparing dashboard', duration: 250 },
  { label: 'Analysis complete', sub: 'Welcome to EcoSmart', duration: 200 },
];

export default function SoilLoader({ text }) {
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
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #FFFFFF 0%, #F1F5F9 100%)',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: 160, height: 200, marginBottom: 32 }}>
        <svg viewBox="0 0 160 200" width="160" height="200" style={{ overflow: 'visible' }}>
          {/* Soil layers */}
          <motion.rect x="30" y="140" width="100" height="40" fill="#3B82F6" opacity="0.1" initial={{ opacity: 0 }} animate={{ opacity: phase >= 0 ? 0.3 : 0 }} />
          <motion.rect x="30" y="100" width="100" height="40" fill="#3B82F6" opacity="0.2" initial={{ opacity: 0 }} animate={{ opacity: phase >= 1 ? 0.4 : 0 }} />
          <motion.rect x="30" y="60" width="100" height="40" fill="#22C55E" opacity="0.3" initial={{ opacity: 0 }} animate={{ opacity: phase >= 2 ? 0.5 : 0 }} />
          
          {/* Scanning line */}
          <motion.line
            x1="20" x2="140" y1="50" y2="50"
            stroke="#22C55E" strokeWidth="3"
            initial={{ y: 0, opacity: 0 }}
            animate={phase >= 0 ? { y: [0, 130, 0], opacity: [1, 1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Data nodes */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <circle cx="50" cy="80" r="4" fill="#1E3A8A" />
                <circle cx="90" cy="120" r="4" fill="#1E3A8A" />
                <circle cx="110" cy="160" r="4" fill="#1E3A8A" />
                <polyline points="50,80 90,120 110,160" fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      <div style={{ height: 60, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 700, color: '#1E3A8A', marginBottom: 4 }}>
              {current.label}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {current.sub}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
