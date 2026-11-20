import React from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import PlantProfileCard from './PlantProfileCard';
import CompatibilityMeter from './CompatibilityMeter';

import EcoButton from '../common/EcoButton';
import { useBreedingData } from '../../hooks/useBreedingData';

const pageVariants = {
  initial: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  animate: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
  exit: { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'var(--cream-white)',
        border: '1.5px solid rgba(30, 58, 138,0.15)',
        borderRadius: 10,
        padding: '8px 12px',
        boxShadow: 'var(--shadow-md)',
        fontFamily: 'Poppins, sans-serif',
      }}>
        {payload.map(p => (
          <div key={p.dataKey} style={{ fontSize: 12, color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BreedingLab() {
  const { data, loading, error } = useBreedingData();

  if (loading) return null;
  if (error) return <div style={{ padding: 32, color: 'red' }}>Error: {error}</div>;
  if (!data) return null;

  const radarData = Object.keys(data.plant1.traits).map(trait => ({
    trait: trait.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
    [data.plant1.name]: data.plant1.traits[trait],
    [data.plant2.name]: data.plant2.traits[trait],
  }));

  return (
    <motion.div
      className="tab-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      {/* Page Header */}
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title"> Breeding Lab</h1>
            <p className="page-subtitle">Plant genetics analysis & cross-compatibility scoring</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <EcoButton variant="outline" size="sm" id="import-profile-btn">Import Profile</EcoButton>
            <EcoButton variant="primary" size="sm" id="new-cross-btn">+ New Cross</EcoButton>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <motion.div
        style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: 'Active Lines', value: '12', emoji: '' },
          { label: 'Crosses Tested', value: '47', emoji: '' },
          { label: 'Avg. Compatibility', value: '71%', emoji: '' },
          { label: 'Approved Hybrids', value: '8', emoji: '' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i + 0.2 }}
            style={{
              background: 'var(--cream-white)',
              border: '1.5px solid rgba(30, 58, 138,0.12)',
              borderRadius: 12,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: 'var(--shadow-sm)',
              flex: '1 1 120px',
            }}
          >
            <span style={{ fontSize: 22 }}>{s.emoji}</span>
            <div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--forest-green)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>{s.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Plant Cards side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <PlantProfileCard plant={data.plant1} delay={0.1} />
        <PlantProfileCard plant={data.plant2} delay={0.25} />
      </div>

      {/* Compatibility Meter card */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: 24 }}
      >
        <div className="card-header">
          <h3 className="card-title"> Cross-Compatibility Analysis</h3>
          <span className="stat-chip stat-chip-green">Live Scoring</span>
        </div>
        <div className="card-body">
          <CompatibilityMeter
            score={data.compatibilityScore}
            factors={data.compatibilityFactors}
          />
        </div>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <div className="card-header">
          <h3 className="card-title"> Trait Radar Overlay</h3>
          <span className="stat-chip stat-chip-brown">Recharts</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData} outerRadius={110}>
              <PolarGrid stroke="rgba(30, 58, 138,0.1)" />
              <PolarAngleAxis
                dataKey="trait"
                tick={{ fill: 'var(--text-light)', fontSize: 11, fontFamily: 'Inter, sans-serif' }}
              />
              <Radar
                name={data.plant1.name}
                dataKey={data.plant1.name}
                stroke="#2D5A3D"
                fill="#2D5A3D"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Radar
                name={data.plant2.name}
                dataKey={data.plant2.name}
                stroke="#8BC34A"
                fill="#8BC34A"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(val) => <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'var(--text-dark)', fontWeight: 600 }}>{val}</span>}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}
