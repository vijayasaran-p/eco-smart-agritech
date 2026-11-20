import React from 'react';
import { motion } from 'framer-motion';

export default function PlantProfileCard({ plant, delay = 0 }) {
  const traitEntries = Object.entries(plant.traits);

  return (
    <motion.div
      className="plant-profile-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="plant-profile-header">
        <motion.div
          className="plant-emoji-display"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          {plant.emoji}
        </motion.div>
        <div className="plant-name">{plant.name}</div>
        <div className="plant-variety">{plant.variety}</div>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
          {plant.tags.map(tag => (
            <span key={tag} style={{
              fontSize: '10px',
              fontWeight: 600,
              background: 'rgba(34, 197, 94,0.3)',
              color: '#D4E9B0',
              padding: '2px 8px',
              borderRadius: 99,
              border: '1px solid rgba(34, 197, 94,0.4)',
              fontFamily: 'Poppins, sans-serif',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Metadata grid */}
      <div className="plant-profile-body">
        <div className="plant-meta-grid">
          {[
            ['Origin', plant.origin],
            ['Maturity', plant.maturity],
            ['Resistance', plant.resistance],
            ['Yield Class', plant.yieldClass],
          ].map(([key, val]) => (
            <div className="plant-meta-item" key={key}>
              <div className="plant-meta-key">{key}</div>
              <div className="plant-meta-val">{val}</div>
            </div>
          ))}
        </div>

        {/* Trait bars */}
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          Trait Profile
        </div>
        <div className="trait-bar-container">
          {traitEntries.map(([trait, value], i) => (
            <div className="trait-bar-row" key={trait}>
              <div className="trait-bar-label">
                {trait.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
              </div>
              <div className="trait-bar-track">
                <motion.div
                  className="trait-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, delay: delay + 0.1 * i, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </div>
              <div className="trait-bar-value">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
