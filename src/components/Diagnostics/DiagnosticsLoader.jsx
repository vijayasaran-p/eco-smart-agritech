import React from 'react';
import { motion } from 'framer-motion';

export default function DiagnosticsLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#F1F5F9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        padding: '40px 20px 0 20px',
      }}
    >
      {/* ── Text Message (Safely Positioned at Top with zero overlap) ── */}
      <motion.div
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{
          textAlign: 'center',
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          padding: '12px 24px',
          borderRadius: 99,
          border: '1.5px solid rgba(30, 58, 138, 0.08)',
          boxShadow: '0 4px 16px rgba(30, 58, 138, 0.06)',
        }}
      >
        <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, color: 'var(--forest-green)', fontWeight: 800, margin: 0 }}>
          Your friend is analyzing your soil...
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-light)', marginTop: 4, margin: 0 }}>
          Please wait while we inspect the sample.
        </p>
      </motion.div>

      {/* ── Scene Area: Soil Ground & Tractor ── */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '65%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}>
        
        {/* Soil Layer (Bottom 55% of scene area) */}
        <motion.div
          initial={{ y: 150 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: 'linear-gradient(180deg, #8B5A2B 0%, #4A2D16 100%)',
            borderTop: '6px solid #6B4226',
            boxShadow: 'inset 0 10px 24px rgba(0,0,0,0.25)',
            zIndex: 5,
          }}
        >
          {/* Soil pebbles / textures */}
          {[...Array(16)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: (i % 3 + 1) * 22 + 10,
              height: 6,
              background: '#3E1F08',
              borderRadius: 6,
              top: `${(i * 17) % 75 + 12}%`,
              left: `${(i * 21) % 90 + 4}%`,
              opacity: 0.5
            }} />
          ))}
        </motion.div>

        {/* Tractor Graphic (Anchored right above soil) */}
        <motion.div
          initial={{ x: -350 }}
          animate={{ x: 0, y: [0, -3, 0, -2, 0] }}
          transition={{
            x: { duration: 1.4, ease: "easeOut" },
            y: { duration: 0.35, repeat: Infinity, ease: "linear" }
          }}
          style={{ position: 'relative', zIndex: 10, marginBottom: -15 }}
        >
          <svg width="260" height="180" viewBox="0 0 260 180" style={{ overflow: 'visible' }}>
            
            {/* Exhaust Pipe & Smoke */}
            <rect x="35" y="25" width="13" height="42" fill="#4B5563" rx="4" />
            <motion.circle cx="41" cy="14" r="8" fill="#9CA3AF" opacity="0"
              animate={{ y: [-5, -35], scale: [0.5, 2], opacity: [0.8, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeOut' }} />
            <motion.circle cx="41" cy="20" r="12" fill="#D1D5DB" opacity="0"
              animate={{ y: [-5, -45], scale: [0.5, 2.4], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.3, ease: 'easeOut' }} />

            {/* Tractor Chassis */}
            <path d="M 15 100 L 100 100 L 110 60 L 185 60 L 195 100 L 230 100 L 230 140 L 15 140 Z" fill="#22C55E" />
            {/* Roof / Cabin */}
            <path d="M 110 60 L 120 20 L 175 20 L 185 60 Z" fill="#16A34A" />
            {/* Window Glass */}
            <path d="M 122 26 L 172 26 L 178 56 L 116 56 Z" fill="#E0F2FE" />
            
            {/* Eyes in Window */}
            <g transform="translate(138, 33)">
              <circle cx="0" cy="0" r="9" fill="white" />
              <circle cx="15" cy="0" r="9" fill="white" />
              <motion.g
                initial={{ y: 0, x: 0 }}
                animate={{ y: [0, 3, 3, 0], x: [0, 2, 2, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <circle cx="2" cy="0" r="4" fill="#0F172A" />
                <circle cx="17" cy="0" r="4" fill="#0F172A" />
              </motion.g>
            </g>

            {/* Wheels */}
            {/* Back Wheel (Large) */}
            <circle cx="55" cy="140" r="40" fill="#1F2937" />
            <circle cx="55" cy="140" r="25" fill="#4B5563" />
            <circle cx="55" cy="140" r="8" fill="#FBBF24" />
            {/* Front Wheel (Small) */}
            <circle cx="185" cy="146" r="25" fill="#1F2937" />
            <circle cx="185" cy="146" r="15" fill="#4B5563" />
            <circle cx="185" cy="146" r="6" fill="#FBBF24" />
            
            {/* Mechanical Arm & Magnifying Glass */}
            <motion.g
              initial={{ rotate: -35 }}
              animate={{ rotate: 12 }}
              transition={{ delay: 1.4, duration: 0.9, ease: 'easeInOut' }}
              style={{ transformOrigin: '198px 108px' }}
            >
              <line x1="198" y1="108" x2="252" y2="152" stroke="#4B5563" strokeWidth="7" strokeLinecap="round" />
              <line x1="252" y1="152" x2="234" y2="188" stroke="#6B7280" strokeWidth="5" strokeLinecap="round" />
              
              {/* Magnifying Glass Lens */}
              <circle cx="234" cy="205" r="22" fill="#E0F2FE" stroke="#374151" strokeWidth="5" />
              <circle cx="234" cy="205" r="16" fill="rgba(59, 130, 246, 0.25)" />
              <line x1="234" y1="188" x2="234" y2="170" stroke="#374151" strokeWidth="7" strokeLinecap="round" />

              {/* Laser Ray Beam Sweeping Soil */}
              <motion.polygon
                points="234,222 192,275 276,275"
                fill="rgba(34, 197, 94, 0.45)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.85, 0] }}
                transition={{ delay: 2.2, duration: 1.4, repeat: Infinity }}
              />
            </motion.g>

          </svg>
        </motion.div>
      </div>

    </motion.div>
  );
}
