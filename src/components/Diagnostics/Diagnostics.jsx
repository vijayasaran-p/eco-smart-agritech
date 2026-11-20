import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from 'recharts';
import EcoButton from '../common/EcoButton';

import { useDiagnosticsData } from '../../hooks/useDiagnosticsData';
import DiagnosticsLoader from './DiagnosticsLoader';

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-zone-icon">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
    <path d="M7 20 C5 18 3 16 5 14 C6 13 8 14 7 16" stroke="#8BC34A" strokeWidth="1.5" fill="none"/>
  </svg>
);

const statusColor = {
  optimal: '#2D5A3D',
  good: '#8BC34A',
  low: '#f59e0b',
  high: '#ef4444',
};

export default function Diagnostics() {
  const { data, loading, error, submitted, runAnalysis } = useDiagnosticsData();
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const fileRef = useRef();

  const handleFileChange = (file) => {
    if (file) {
      setFileName(file.name);
      setUploadedFile(file);
      runAnalysis(file).then(() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3500);
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleTextAnalyze = () => {
    if (textInput.trim()) {
      runAnalysis({ name: 'text-input.txt', content: textInput }).then(() => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3500);
      });
    }
  };

  const healthGaugeData = data ? [
    { name: 'Health', value: data.healthScore, fill: data.healthScore > 70 ? '#2D5A3D' : data.healthScore > 50 ? '#8BC34A' : '#f59e0b' },
  ] : [];

  const getHealthEmoji = (score) => {
    if (score >= 80) return '';
    if (score >= 60) return '';
    if (score >= 40) return '';
    return '';
  };

  const getHealthLabel = (score) => {
    if (score >= 80) return 'Flourishing';
    if (score >= 60) return 'Healthy';
    if (score >= 40) return 'Stressed';
    return 'Wilted';
  };

  return (
    <motion.div
      className="tab-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <AnimatePresence>
        {loading && <DiagnosticsLoader key="diagnostics-loader" fileName={fileName} />}
      </AnimatePresence>
      
      {/* Header */}
      <div className="page-header">
        <div className="flex-between">
          <div>
            <h1 className="page-title"> Diagnostics</h1>
            <p className="page-subtitle">Upload soil samples or lab reports for AI-powered analysis</p>
          </div>
        </div>
      </div>

      {/* Success particle burst */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 80,
              right: 28,
              background: 'var(--forest-green)',
              color: 'white',
              padding: '12px 20px',
              borderRadius: 12,
              fontFamily: 'Poppins, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              zIndex: 200,
              boxShadow: '0 8px 24px rgba(30, 58, 138,0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            � Analysis complete! Results ready.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload zone — soil sample tray */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: 20 }}
      >
        <div
          id="upload-zone"
          className={`upload-zone${dragOver ? ' drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Upload soil sample or lab report"
        >
          <UploadIcon />
          <div className="upload-zone-title">
            {fileName ? `� ${fileName}` : 'Drop Soil Sample / Lab Report Here'}
          </div>
          <div className="upload-zone-subtitle">
            Supports PDF, CSV, TXT, JPEG — or type lab values below
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['soil-report.pdf', 'lab-analysis.csv', 'field-notes.txt'].map(f => (
              <span key={f} className="stat-chip stat-chip-brown">{f}</span>
            ))}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.csv,.txt,.jpg,.jpeg,.png"
            style={{ display: 'none' }}
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </div>

        {/* Text input alternative */}
        <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
          <input
            id="lab-text-input"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder="Or paste lab values: pH: 6.8, N: 42 ppm, P: 18 ppm..."
            style={{
              flex: 1,
              height: 40,
              background: 'var(--cream-white)',
              border: '1.5px solid rgba(30, 58, 138,0.2)',
              borderRadius: 'var(--radius-full)',
              padding: '0 16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: 'var(--text-dark)',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = '#8BC34A'}
            onBlur={e => e.target.style.borderColor = 'rgba(30, 58, 138,0.2)'}
          />
          <EcoButton
            id="analyze-text-btn"
            variant="primary"
            size="sm"
            onClick={handleTextAnalyze}
            disabled={!textInput.trim()}
          >
            Analyze
          </EcoButton>
        </div>
      </motion.div>


      {/* Results */}
      <AnimatePresence>
        {data && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* ── PDF Preview Card ── */}
            {uploadedFile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: 'white',
                  border: '1.5px solid rgba(30,58,138,0.12)',
                  borderRadius: 14,
                  padding: '14px 20px',
                  marginBottom: 20,
                  boxShadow: '0 4px 16px rgba(30,58,138,0.07)',
                }}
              >
                {/* PDF icon */}
                <div style={{
                  width: 52, height: 64, background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                  borderRadius: 8, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
                  position: 'relative',
                }}
                >
                  {/* Folded corner */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 14, height: 14,
                    background: '#FCA5A5',
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                    borderRadius: '0 8px 0 0',
                  }} />
                  <span style={{ fontSize: 14, fontWeight: 900, color: 'white', letterSpacing: '0.5px', fontFamily: 'Poppins, sans-serif' }}>PDF</span>
                  <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                    {[1,2,3].map(i => <div key={i} style={{ width: 16, height: 2, background: 'rgba(255,255,255,0.6)', borderRadius: 1 }} />)}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {uploadedFile.name}
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#64748B', marginTop: 3 }}>
                    {uploadedFile.size ? `${(uploadedFile.size / 1024).toFixed(1)} KB` : 'Soil Lab Report'} · Analyzed successfully
                  </div>
                </div>
                {/* Status badge */}
                <div style={{
                  background: 'rgba(34,197,94,0.1)', color: '#16A34A',
                  border: '1px solid rgba(34,197,94,0.25)',
                  borderRadius: 99, padding: '4px 12px',
                  fontSize: 12, fontWeight: 700, fontFamily: 'Inter, sans-serif',
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
                }}
                >
                  <div style={{ width: 6, height: 6, background: '#22C55E', borderRadius: '50%' }} />
                  Complete
                </div>
              </motion.div>
            )}
            {/* Leaf stat chips */}
            <motion.div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif', marginBottom: 14 }}>
                Extracted Soil Metrics
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {data.metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, type: 'spring', stiffness: 200 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
                  >
                    {/* Hexagonal leaf chip */}
                    <div className="leaf-chip" style={{
                      background: m.status === 'optimal' ? 'linear-gradient(135deg, #2D5A3D, #3d7a54)'
                        : m.status === 'good' ? 'linear-gradient(135deg, #8BC34A, #a5d16a)'
                        : m.status === 'low' ? 'linear-gradient(135deg, #f59e0b, #f5b942)'
                        : 'linear-gradient(135deg, #ef4444, #f87171)',
                    }}>
                      <div className="leaf-chip-value">{m.value}</div>
                      <div className="leaf-chip-label">{m.unit || '·'}</div>
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-medium)', fontFamily: 'Poppins, sans-serif', textAlign: 'center' }}>
                      {m.label}
                    </div>
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: statusColor[m.status] || '#999',
                      boxShadow: `0 0 6px ${statusColor[m.status] || '#999'}88`,
                    }} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Health gauge + Radar chart */}
            <div className="grid-2" style={{ gap: 20, marginBottom: 20 }}>
              {/* Health gauge */}
              <motion.div
                className="card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="card-header">
                  <h3 className="card-title"> Growth-Health Index</h3>
                  <span className={`stat-chip ${data.healthScore >= 70 ? 'stat-chip-green' : 'stat-chip-amber'}`}>
                    {data.riskLevel}
                  </span>
                </div>
                <div className="card-body">
                  <div className="health-gauge-wrap">
                    {/* Animated gauge */}
                    <div style={{ position: 'relative', width: 180, height: 180 }}>
                      <svg viewBox="0 0 200 200" width="180" height="180">
                        {/* Background arc */}
                        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--soil-beige-dark)" strokeWidth="14" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 100 100)" />
                        {/* Filled arc */}
                        <motion.circle
                          cx="100" cy="100" r="80"
                          fill="none"
                          stroke={data.healthScore >= 70 ? '#2D5A3D' : data.healthScore >= 50 ? '#8BC34A' : '#f59e0b'}
                          strokeWidth="14"
                          strokeDasharray="251.2"
                          strokeLinecap="round"
                          transform="rotate(-90 100 100)"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 251.2 * (1 - data.healthScore / 100) }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                        />
                        {/* Score */}
                        <text x="100" y="92" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="32" fill="var(--forest-green)">
                          {data.healthScore}
                        </text>
                        <text x="100" y="112" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="12" fill="var(--text-light)">
                          Health Score
                        </text>
                        {/* Leaf emoji as status indicator */}
                        <text x="100" y="135" textAnchor="middle" fontSize="20">
                          {getHealthEmoji(data.healthScore)}
                        </text>
                      </svg>
                    </div>
                    <div className="health-label">{getHealthLabel(data.healthScore)}</div>
                    <div className="health-description">
                      {data.healthScore >= 70 ? 'Soil is in excellent condition for growth' :
                       data.healthScore >= 50 ? 'Some deficiencies detected — take corrective action' :
                       'Significant stress indicators — immediate intervention needed'}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Radar chart */}
              <motion.div
                className="card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="card-header">
                  <h3 className="card-title"> Nutrient Profile Radar</h3>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={240}>
                    <RadarChart data={data.chartData} outerRadius={90}>
                      <PolarGrid stroke="rgba(30, 58, 138,0.1)" />
                      <PolarAngleAxis dataKey="name" tick={{ fill: 'var(--text-light)', fontSize: 11, fontFamily: 'Inter, sans-serif' }} />
                      <Radar name="Levels" dataKey="value" stroke="#8BC34A" fill="#8BC34A" fillOpacity={0.35} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Risk factors */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="card-header">
                <h3 className="card-title"> Risk Factors & Recommendations</h3>
              </div>
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {data.riskFactors.map((rf, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.65 + i * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        padding: '12px 14px',
                        background: 'rgba(245, 158, 11, 0.06)',
                        borderLeft: '3px solid #f59e0b',
                        borderRadius: '0 8px 8px 0',
                      }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>⚡</span>
                      <span style={{ fontSize: 13, color: 'var(--text-medium)', fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}>{rf}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
