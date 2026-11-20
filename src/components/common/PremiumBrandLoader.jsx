import React from 'react';
import { motion } from 'framer-motion';

export default function PremiumBrandLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(241, 245, 249, 0.85)', // Light grey glassmorphism overlay
      }}
    >
      <div style={{ position: 'relative', width: 280, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Soft atmospheric background glow */}
        <motion.div
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.35) 0%, transparent 70%)',
            filter: 'blur(24px)',
            zIndex: 0,
          }}
        />

        {/* Accelerated Fast Sprout SVG */}
        <svg viewBox="0 0 200 250" width="180" height="220" style={{ zIndex: 2, overflow: 'visible' }}>
          
          {/* Glowing Soil Line */}
          <motion.line
            x1="20" y1="200" x2="180" y2="200"
            stroke="var(--forest-green)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />

          {/* Fast Seed Drop */}
          <motion.ellipse
            cx="100" cy="195" rx="11" ry="7"
            fill="var(--moss-green)"
            initial={{ y: -40, scale: 0, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.25, type: 'spring', stiffness: 250, damping: 14 }}
          />

          {/* Fast Root System */}
          <motion.path
            d="M 100 203 C 80 215, 60 220, 45 210"
            fill="none" stroke="var(--forest-green-light)" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.3, ease: 'easeOut' }}
          />
          <motion.path
            d="M 100 203 C 120 215, 140 220, 155 210"
            fill="none" stroke="var(--forest-green-light)" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.28, duration: 0.3, ease: 'easeOut' }}
          />

          {/* Fast Stem Growth */}
          <motion.path
            d="M 100 190 C 90 140, 110 90, 100 50"
            fill="none" stroke="var(--forest-green)" strokeWidth="5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.35, duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
          />

          {/* Fast Left Leaf Unfurling */}
          <motion.path
            d="M 98 120 C 60 110, 40 70, 95 90"
            fill="var(--moss-green)" opacity="0.95"
            initial={{ scale: 0, rotate: -25, transformOrigin: '98px 120px' }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.55, type: 'spring', stiffness: 180, damping: 12 }}
          />

          {/* Fast Right Leaf Unfurling */}
          <motion.path
            d="M 102 100 C 140 90, 160 50, 105 70"
            fill="var(--moss-green-light)" opacity="0.95"
            initial={{ scale: 0, rotate: 25, transformOrigin: '102px 100px' }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.65, type: 'spring', stiffness: 180, damping: 12 }}
          />
        </svg>

        {/* Ambient Data Particles floating up */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 120, opacity: 0, x: Math.random() * 30 - 15 }}
            animate={{ y: -40, opacity: [0, 1, 0], x: Math.random() * 50 - 25 }}
            transition={{ delay: 0.4 + i * 0.15, duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 5, height: 5,
              borderRadius: '50%',
              background: 'var(--moss-green)',
              boxShadow: '0 0 8px 2px var(--moss-green)',
            }}
          />
        ))}

      </div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{ textAlign: 'center', marginTop: 12 }}
      >
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 800, color: 'var(--forest-green)', letterSpacing: '-0.5px' }}>
          Cultivating Data<span style={{ color: 'var(--moss-green)' }}>.</span>
        </div>
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '4px', marginTop: 6 }}
        >
          Loading Environment
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
