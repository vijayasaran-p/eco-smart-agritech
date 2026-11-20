import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MicrobiomeSafetyIndex from './MicrobiomeSafetyIndex';
import MicrobeIcon from './MicrobeIcon';
import EcoButton from '../common/EcoButton';

import { useAdvisoryData } from '../../hooks/useAdvisoryData';

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function RecItem({ item, type }) {
  return (
    <motion.div
      className={`rec-item rec-item-${type}`}
      variants={itemVariant}
      whileHover={{ scale: 1.01 }}
    >
      <div className="rec-item-icon">
        <span style={{ fontSize: 20 }}>{item.emoji}</span>
      </div>
      <div className="rec-item-content">
        <div className="rec-item-name">{item.name}</div>
        <div className="rec-item-desc">{item.desc}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', background: 'var(--soil-beige-dark)', padding: '2px 8px', borderRadius: 99 }}>
            {item.dose}
          </span>
          {item.warning && (
            <span style={{ fontSize: 10, fontWeight: 600, color: '#92400e', fontFamily: 'Poppins, sans-serif', background: 'rgba(245,158,11,0.15)', padding: '2px 8px', borderRadius: 99 }}>
               {item.warning}
            </span>
          )}
          <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, fontFamily: 'Poppins, sans-serif',
            color: item.safetyScore >= 80 ? 'var(--forest-green)' : item.safetyScore >= 50 ? '#f59e0b' : '#ef4444' }}>
            Safety: {item.safetyScore}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Advisory() {
  const { data, loading, error, updateScore } = useAdvisoryData();
  const [localScore, setLocalScore] = useState(null);

  if (loading) return null;
  if (error) return <div style={{ padding: 32, color: 'red' }}>Error: {error}</div>;
  if (!data) return null;

  const score = localScore !== null ? localScore : data.microbiomeSafetyIndex;
  const microbesHealthy = data.microbes.map(m => ({
    ...m,
    healthy: score >= 60 ? m.healthy : score >= 35 ? (m.healthy && Math.random() > 0.4) : false,
  }));

  return (
    <motion.div
      className="tab-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="page-header">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title">⚖ Advisory</h1>
            <p className="page-subtitle">Biological vs. Chemical product recommendations with microbiome impact scoring</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <EcoButton variant="secondary" size="sm" id="export-advisory-btn">Export Report</EcoButton>
            <EcoButton variant="primary" size="sm" id="refresh-advisory-btn">Refresh Analysis</EcoButton>
          </div>
        </div>
      </div>

      {/* HERO: MSI + Microbes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        style={{ marginBottom: 24 }}
      >
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--cream-white) 0%, rgba(34, 197, 94,0.15) 100%)',
          border: '2px solid rgba(34, 197, 94,0.25)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            {/* Left: MSI Gauge */}
            <div style={{ borderRight: '1px solid rgba(30, 58, 138,0.1)' }}>
              <MicrobiomeSafetyIndex score={score} />

              {/* Interactive score slider */}
              <div style={{ padding: '0 24px 24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, fontFamily: 'Inter, sans-serif' }}>
                  Adjust Score (Demo)
                </div>
                <input
                  id="msi-score-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={score}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setLocalScore(v);
                    updateScore(v);
                  }}
                  className="eco-slider"
                  aria-label="Microbiome Safety Index score slider"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>0 — Harmful</span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>100 — Safe</span>
                </div>
              </div>
            </div>

            {/* Right: Microbe ecosystem */}
            <div style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '16px', fontWeight: 700, color: 'var(--forest-green)', marginBottom: 4 }}>
                  � Microbiome Ecosystem
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>
                  Live status of beneficial organisms in your soil. Icons react to your MSI score in real-time.
                </div>
              </div>

              <div className="microbe-row">
                <AnimatePresence>
                  {data.microbes.map((m, i) => (
                    <MicrobeIcon
                      key={m.name}
                      name={m.name}
                      emoji={m.emoji}
                      healthy={score >= 60 ? m.healthy : score < 35}
                      score={score}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--moss-green)', boxShadow: '0 0 6px rgba(34, 197, 94,0.6)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-light)', fontFamily: 'Inter, sans-serif' }}>Thriving</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 6px rgba(245,158,11,0.6)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-light)', fontFamily: 'Inter, sans-serif' }}>Stressed</span>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                {[
                  { label: 'Beneficial Microbes', value: score >= 60 ? '4 Active' : '2 Active', color: score >= 60 ? 'var(--forest-green)' : '#f59e0b' },
                  { label: 'Pathogen Pressure', value: score >= 70 ? 'Low' : score >= 40 ? 'Moderate' : 'High', color: score >= 70 ? 'var(--moss-green)' : score >= 40 ? '#f59e0b' : '#ef4444' },
                  { label: 'Biodiversity Index', value: `${Math.round(score * 0.7 + 20)}%`, color: 'var(--earthy-brown)' },
                  { label: 'Organic Carbon', value: '3.2%', color: 'var(--forest-green)' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'var(--soil-beige)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--soil-beige-dark)' }}>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Split-panel: Bio vs Chem */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Biological Panel */}
        <motion.div
          className="rec-panel rec-panel-bio"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="rec-panel-header">
            <span style={{ fontSize: 22 }}></span>
            <div>
              <div className="rec-panel-title">Biological Recommendations</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>Microbiome-safe, eco-friendly</div>
            </div>
            <span style={{ marginLeft: 'auto', background: 'rgba(34, 197, 94,0.25)', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, color: '#D4E9B0', fontFamily: 'Poppins, sans-serif' }}>
              {data.biologicalRecs.length} Products
            </span>
          </div>
          <motion.div
            className="rec-panel-body"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {data.biologicalRecs.map(item => (
              <RecItem key={item.id} item={item} type="bio" />
            ))}
          </motion.div>
        </motion.div>

        {/* Chemical Panel */}
        <motion.div
          className="rec-panel rec-panel-chem"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="rec-panel-header">
            <span style={{ fontSize: 22 }}>�</span>
            <div>
              <div className="rec-panel-title">Chemical Options</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter, sans-serif' }}>Use with caution — microbiome impact</div>
            </div>
            <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>
              {data.chemicalRecs.length} Products
            </span>
          </div>
          <motion.div
            className="rec-panel-body"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {data.chemicalRecs.map(item => (
              <RecItem key={item.id} item={item} type="chem" />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Advisory insight card */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{ background: 'linear-gradient(135deg, var(--forest-green), var(--forest-green-light))', border: 'none' }}
      >
        <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontSize: 36, flexShrink: 0 }}>�</span>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>
              AI Advisory Insight
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
              Your current MSI score of <strong style={{ color: '#D4E9B0' }}>{score}/100</strong> indicates a{' '}
              {score >= 75 ? 'thriving microbiome ecosystem. Prioritize the biological recommendations above — they will maintain this excellent balance.' :
               score >= 50 ? 'stable but vulnerable microbiome. Avoid chemical applications for the next 14 days and apply Trichoderma harzianum as a soil drench.' :
               'stressed microbiome requiring immediate intervention. Switch entirely to biological controls and add mycorrhizal inoculants to restore balance.'}
            </div>
          </div>
          <EcoButton variant="secondary" size="sm" id="get-full-report-btn" style={{ flexShrink: 0 }}>
            Full Report
          </EcoButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
