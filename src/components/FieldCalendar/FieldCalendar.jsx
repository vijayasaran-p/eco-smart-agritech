import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EcoButton from '../common/EcoButton';

// Initial Phase 1 tasks with checkboxes
const INITIAL_PHASE1_TASKS = [
  {
    id: 'p1_task1',
    title: 'Soil pH & Electrical Conductivity (EC) Testing',
    desc: 'Verify optimal soil pH (6.0 - 6.8) and EC (< 1.5 dS/m) before planting.',
    completed: true,
    why: 'Prevents nutrient lockup. If soil is too acidic (pH < 5.5), Phosphorus and Calcium become unavailable to roots.',
    priority: 'high',
  },
  {
    id: 'p1_task2',
    title: 'Deep Tillage & Soil Aeration',
    desc: 'Till soil to a depth of 25-30 cm to break hardpan layer and improve drainage.',
    completed: true,
    why: 'Compacted soil restricts oxygen to roots, encouraging anaerobic pathogenic fungi like Pythium.',
    priority: 'high',
  },
  {
    id: 'p1_task3',
    title: 'Basal Organic Compost & Microbe Blending',
    desc: 'Mix 5 tons/acre compost enriched with Trichoderma harzianum biocontrol agents.',
    completed: false,
    why: 'Trichoderma colonizes root surfaces, physically shielding plants against soil-borne wilt pathogens.',
    priority: 'medium',
  },
  {
    id: 'p1_task4',
    title: 'Pre-Germination Seed Priming & Soaking',
    desc: 'Soak seeds in 0.2% potassium nitrate solution for 12 hours prior to sowing.',
    completed: false,
    why: 'Accelerates uniform germination by breaking seed dormancy and boosting initial metabolic vigor.',
    priority: 'medium',
  },
];

// Phase Definitions
const PHASES = [
  {
    id: 1,
    name: 'Phase 1: Soil Prep & Germination',
    subtitle: 'Days 1 - 14 · Mandatory Foundation',
    icon: '🌱',
    status: 'unlocked',
    desc: 'Crucial initial stage. All Phase 1 tasks must be completed to unlock Phase 2.',
  },
  {
    id: 2,
    name: 'Phase 2: Seedling & Rooting',
    subtitle: 'Days 15 - 30 · Locked until Phase 1 Complete',
    icon: '🌿',
    status: 'locked',
    desc: 'Focuses on root expansion, nitrogen intake, and early foliage formation.',
  },
  {
    id: 3,
    name: 'Phase 3: Vegetative Canopy Growth',
    subtitle: 'Days 31 - 60 · Locked',
    icon: '🌳',
    status: 'locked',
    desc: 'Rapid biomass development, branch formation, and canopy coverage.',
  },
  {
    id: 4,
    name: 'Phase 4: Flowering & Harvest',
    subtitle: 'Days 61 - 90 · Locked',
    icon: '🌾',
    status: 'locked',
    desc: 'Fruit set, sugar accumulation, and final harvest yield optimization.',
  },
];

// Exceptional Cases & Disease Warnings for Phase 1
const DISEASE_ALERTS = [
  {
    id: 'd1',
    disease: 'Pythium Damping-Off (Fungal)',
    severity: 'High Threat',
    symptom: 'Seedlings collapse at soil line with water-soaked brown stems.',
    cause: 'Excessive soil moisture (> 85%) combined with soil temps below 18°C.',
    prevention: 'Maintain soil drainage; drench with bio-fungicide (Trichoderma) before sowing.',
    badgeColor: '#EF4444',
  },
  {
    id: 'd2',
    disease: 'Fusarium Vascular Wilt',
    severity: 'Warning',
    symptom: 'Yellowing of lower leaves, brown vascular discoloration inside stems.',
    cause: 'Pathogen survives in unsterilized soil or infected seed stock.',
    prevention: 'Solarize soil under plastic sheeting for 3 weeks prior to planting.',
    badgeColor: '#F59E0B',
  },
  {
    id: 'd3',
    disease: 'Soil Salinity Stress (Exceptional Case)',
    severity: 'Monitoring Required',
    symptom: 'Stunted germination and white crust formation on soil surface.',
    cause: 'High Na+ accumulation from saline irrigation water.',
    prevention: 'Leach soil with heavy freshwater flush and apply Gypsum (Calcium Sulfate).',
    badgeColor: '#3B82F6',
  },
];

export default function FieldCalendar() {
  const [phase1Tasks, setPhase1Tasks] = useState(INITIAL_PHASE1_TASKS);
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);

  // Check if all Phase 1 tasks are completed
  const phase1Complete = phase1Tasks.every(t => t.completed);
  const completedCount = phase1Tasks.filter(t => t.completed).length;

  const toggleTask = (id) => {
    setPhase1Tasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <motion.div
      className="tab-page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page Header */}
      <div className="page-header">
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 className="page-title"> Field Phase Calendar</h1>
            <p className="page-subtitle">Interactive crop pipeline with phase locks, task verification & disease alerts</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <EcoButton variant="outline" size="sm" id="export-schedule-btn">Export Report</EcoButton>
            <EcoButton variant="primary" size="sm" id="unlock-override-btn" onClick={() => {
              setPhase1Tasks(prev => prev.map(t => ({ ...t, completed: true })));
            }}>
              ✓ Complete All Phase 1 Tasks
            </EcoButton>
          </div>
        </div>
      </div>

      {/* Phase Unlock Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: phase1Complete ? 'linear-gradient(135deg, #15803D, #22C55E)' : 'linear-gradient(135deg, #1E3A8A, #172554)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: 16,
          marginBottom: 24,
          boxShadow: '0 8px 24px rgba(30, 58, 138, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 28 }}>{phase1Complete ? '🔓' : '🔒'}</span>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700 }}>
              {phase1Complete ? 'Phase 1 Complete! Phase 2 Unlocked 🎉' : `Phase 1 Progress: ${completedCount}/${phase1Tasks.length} Tasks Completed`}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, opacity: 0.9 }}>
              {phase1Complete
                ? 'All mandatory soil prep requirements met. You can now access Phase 2 Seedling Management.'
                : 'Complete all checkboxes in Phase 1 below to unlock future crop growth phases.'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '6px 16px',
            borderRadius: 99,
            fontFamily: 'Poppins, sans-serif',
            fontSize: 13,
            fontWeight: 700,
          }}>
            {Math.round((completedCount / phase1Tasks.length) * 100)}% Verified
          </div>
        </div>
      </motion.div>

      {/* ── 4-PHASE PROGRESS PIPELINE (LOCKED SYSTEM) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
        {PHASES.map((phase) => {
          const isCurrentUnlocked = phase.id === 1 || (phase.id === 2 && phase1Complete);
          const isSelected = selectedPhase === phase.id;

          return (
            <motion.div
              key={phase.id}
              onClick={() => {
                if (isCurrentUnlocked) setSelectedPhase(phase.id);
              }}
              whileHover={{ y: isCurrentUnlocked ? -3 : 0 }}
              style={{
                background: isSelected ? 'white' : isCurrentUnlocked ? '#F8FAFC' : '#F1F5F9',
                border: isSelected ? '2px solid #22C55E' : isCurrentUnlocked ? '1.5px solid rgba(30,58,138,0.12)' : '1.5px dashed #CBD5E1',
                borderRadius: 16,
                padding: 18,
                cursor: isCurrentUnlocked ? 'pointer' : 'not-allowed',
                opacity: isCurrentUnlocked ? 1 : 0.6,
                position: 'relative',
                boxShadow: isSelected ? '0 10px 25px rgba(34,197,94,0.15)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Lock Badge if future phase */}
              {!isCurrentUnlocked && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: '#94A3B8',
                  color: 'white',
                  borderRadius: 99,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}>
                  🔒 LOCKED
                </div>
              )}
              {isCurrentUnlocked && phase.id === 1 && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: '#22C55E',
                  color: 'white',
                  borderRadius: 99,
                  padding: '2px 8px',
                  fontSize: 10,
                  fontWeight: 700,
                }}>
                  ACTIVE
                </div>
              )}

              <div style={{ fontSize: 28, marginBottom: 8 }}>{phase.icon}</div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: 'var(--text-dark)' }}>
                {phase.name}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--text-light)', marginTop: 2, marginBottom: 8 }}>
                {phase.subtitle}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--text-medium)', lineHeight: 1.4 }}>
                {phase.desc}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── PHASE 1 DETAILED CHECKLIST & EXPLANATIONS ── */}
      {selectedPhase === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 32 }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <div>
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 18, fontWeight: 800, color: 'var(--forest-green)', margin: 0 }}>
                🌱 Phase 1 Requirement Checklist & Protocols
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-light)', marginTop: 2, margin: 0 }}>
                Check off each item once performed in your field to verify Phase 1 completion.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {phase1Tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                style={{
                  background: 'white',
                  border: task.completed ? '1.5px solid #22C55E' : '1.5px solid rgba(30, 58, 138, 0.12)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Custom Interactive Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={{
                    width: 22,
                    height: 22,
                    marginTop: 2,
                    accentColor: '#22C55E',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 15,
                      fontWeight: 700,
                      color: task.completed ? '#15803D' : 'var(--text-dark)',
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}>
                      {task.title}
                    </span>
                    {task.priority === 'high' && (
                      <span style={{ background: '#FEE2E2', color: '#EF4444', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99 }}>
                        MANDATORY
                      </span>
                    )}
                  </div>

                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'var(--text-medium)', marginTop: 4 }}>
                    {task.desc}
                  </div>

                  {/* Why this step is crucial (Science explanation) */}
                  <div style={{
                    marginTop: 8,
                    background: '#F0FDF4',
                    borderLeft: '3px solid #22C55E',
                    padding: '8px 12px',
                    borderRadius: 6,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    color: '#166534',
                  }}>
                    <strong>💡 Scientific Purpose:</strong> {task.why}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── EXCEPTIONAL CASES & DISEASE WARNINGS SECTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'white',
          border: '1.5px solid rgba(239, 68, 68, 0.2)',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>⚠️</span>
          <div>
            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 800, color: '#991B1B', margin: 0 }}>
              Phase 1 Risk Intelligence: Exceptional Cases & Disease Threats
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'var(--text-light)', marginTop: 2, margin: 0 }}>
              Automated diagnostic warnings based on soil temperature, moisture levels, and regional pathogen history.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {DISEASE_ALERTS.map((alert) => (
            <div
              key={alert.id}
              style={{
                background: '#FEF2F2',
                border: `1.5px solid ${alert.badgeColor}`,
                borderRadius: 12,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#7F1D1D' }}>
                    {alert.disease}
                  </span>
                  <span style={{
                    background: alert.badgeColor,
                    color: 'white',
                    fontSize: 9,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 99,
                  }}>
                    {alert.severity}
                  </span>
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#991B1B', marginBottom: 6 }}>
                  <strong>Symptom:</strong> {alert.symptom}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'var(--text-light)', marginBottom: 10 }}>
                  <strong>Trigger:</strong> {alert.cause}
                </div>
              </div>

              <div style={{
                background: 'white',
                border: '1px stroke rgba(239,68,68,0.2)',
                padding: 10,
                borderRadius: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                color: '#166534',
              }}>
                <strong>🛡️ Prevention Action:</strong> {alert.prevention}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
