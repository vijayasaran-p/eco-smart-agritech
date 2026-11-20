import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PHASES = [
  { label: 'Deploying aerial units', sub: 'Calibrating drone sensors', duration: 300 },
  { label: 'Scanning crop health', sub: 'Multispectral imaging active', duration: 250 },
  { label: 'Mapping field geometry', sub: 'Processing spatial data', duration: 350 },
  { label: 'Detecting moisture levels', sub: 'Irrigation zones mapped', duration: 300 },
  { label: 'Finalizing diagnostics', sub: 'Syncing with dashboard', duration: 250 },
  { label: 'Field scan complete', sub: 'Welcome to EcoSmart', duration: 200 },
];

export default function DroneLoader({ text }) {
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
      <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 32 }}>
        <svg viewBox="0 0 200 200" width="200" height="200" style={{ overflow: 'visible' }}>
          
          {/* Field grid */}
          <motion.g
            initial={{ opacity: 0, rotateX: 60, scale: 0.8 }}
            animate={{ opacity: 0.8, rotateX: 60, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ transformOrigin: 'center 150px' }}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h${i}`} x1="20" y1={120 + i * 15} x2="180" y2={120 + i * 15} stroke="#3B82F6" strokeWidth="1" opacity={0.3} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={40 + i * 15} y1="120" x2={40 + i * 15} y2="180" stroke="#3B82F6" strokeWidth="1" opacity={0.3} />
            ))}
          </motion.g>

          {/* Drone */}
          <motion.g
            initial={{ y: 20, x: -30, opacity: 0 }}
            animate={{ y: [0, -10, 5, -5, 0], x: [-30, 30, -20, 20, 0], opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <rect x="90" y="60" width="20" height="8" rx="4" fill="#1E3A8A" />
            <line x1="85" y1="64" x2="95" y2="64" stroke="#172554" strokeWidth="2" />
            <line x1="105" y1="64" x2="115" y2="64" stroke="#172554" strokeWidth="2" />
            {/* Propellers */}
            <motion.ellipse cx="85" cy="62" rx="12" ry="2" fill="#3B82F6" opacity={0.7} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.1, ease: 'linear' }} style={{ transformOrigin: '85px 62px' }} />
            <motion.ellipse cx="115" cy="62" rx="12" ry="2" fill="#3B82F6" opacity={0.7} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.1, ease: 'linear' }} style={{ transformOrigin: '115px 62px' }} />
            
            {/* Scanner beam */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.polygon
                  points="100,68 60,160 140,160"
                  fill="rgba(34, 197, 94, 0.15)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </AnimatePresence>
          </motion.g>
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
