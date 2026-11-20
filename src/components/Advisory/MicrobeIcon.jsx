import React from 'react';
import { motion } from 'framer-motion';

export default function MicrobeIcon({ name, emoji, healthy, score }) {
  return (
    <motion.div
      className="microbe-icon"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <motion.div
        className={`microbe-svg-wrap ${healthy ? 'healthy' : 'stressed'}`}
        animate={healthy ? {
          scale: [1, 1.05, 1],
          boxShadow: [
            '0 0 0 4px rgba(34, 197, 94,0.15)',
            '0 0 0 8px rgba(34, 197, 94,0.08)',
            '0 0 0 4px rgba(34, 197, 94,0.15)',
          ],
        } : {
          scale: [1, 0.97, 1],
        }}
        transition={{
          duration: healthy ? 2.2 : 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        title={`${name} — ${healthy ? 'Thriving' : 'Stressed'}`}
      >
        <motion.span
          style={{ fontSize: 26 }}
          animate={healthy ? {
            rotate: [-5, 5, -5],
          } : {
            rotate: [0, -10, 0],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: healthy ? 3 : 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {emoji}
        </motion.span>
      </motion.div>
      <div className="microbe-label">{name}</div>
      <div style={{
        width: 8, height: 8, borderRadius: '50%',
        background: healthy ? 'var(--moss-green)' : '#f59e0b',
        boxShadow: `0 0 6px ${healthy ? 'rgba(34, 197, 94,0.6)' : 'rgba(245,158,11,0.6)'}`,
        marginTop: -2,
      }} />
    </motion.div>
  );
}
