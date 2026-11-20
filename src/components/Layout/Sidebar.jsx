import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LeafCircuitMark, VineHelixSymbol, RootScopeSymbol,
  EcoBalanceSymbol, GrowthCalendarSymbol,
} from '../common/BrandSymbols';

// Chevron icons
const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);
const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// Wrappers to pass 'currentColor' through to brand symbols
const NavVineHelix  = () => <VineHelixSymbol    size={24} color="currentColor" accent="rgba(34, 197, 94,0.7)" />;
const NavRootScope  = () => <RootScopeSymbol    size={24} color="currentColor" accent="rgba(34, 197, 94,0.7)" />;
const NavEcoBalance = () => <EcoBalanceSymbol   size={24} color="currentColor" accent="rgba(34, 197, 94,0.7)" />;
const NavGrowthCal  = () => <GrowthCalendarSymbol size={24} color="currentColor" accent="rgba(34, 197, 94,0.7)" />;

const NavHybridize = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M2 12h4M18 12h4M6 6l2 3M16 6l-2 3M6 18l2-3M16 18l-2-3"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.6"/>
    <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" />
    <circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'breeding',       label: 'Breeding Lab',        Icon: NavVineHelix  },
  { id: 'hybridization',  label: 'Hybridization Lab',   Icon: NavHybridize  },
  { id: 'diagnostics',   label: 'Diagnostics',          Icon: NavRootScope  },
  { id: 'advisory',      label: 'Advisory',             Icon: NavEcoBalance },
  { id: 'calendar',      label: 'Field Calendar',       Icon: NavGrowthCal  },
];

export default function Sidebar({ activeTab, setActiveTab, collapsed, onToggle }) {

  return (
    <motion.aside
      className={`sidebar${collapsed ? ' collapsed' : ''}`}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <LeafCircuitMark size={36} color="#22C55E" accent="#22C55E" />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="sidebar-logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <span className="sidebar-brand">EcoSmart Agritech</span>
              <span className="sidebar-tagline">Precision Agriculture AI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ id, label, Icon }, i) => (
          <motion.div
            key={id}
            className={`nav-item${activeTab === id ? ' active' : ''}`}
            onClick={() => setActiveTab(id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            title={collapsed ? label : ''}
          >
            <span className="nav-icon">
              <Icon />
            </span>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className="nav-label"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
            {/* Active glow */}
            {activeTab === id && (
              <motion.div
                layoutId="activeGlow"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '0 12px 12px 0',
                  background: 'rgba(34, 197, 94,0.15)',
                  pointerEvents: 'none',
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              />
            )}
          </motion.div>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="sidebar-toggle">
        <button
          id="sidebar-toggle-btn"
          className="toggle-btn"
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>
    </motion.aside>
  );
}
