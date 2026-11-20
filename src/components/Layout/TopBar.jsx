import React from 'react';
import { motion } from 'framer-motion';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="topbar-search-icon">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const TAB_LABELS = {
  breeding: 'Breeding Lab',
  diagnostics: 'Diagnostics',
  advisory: 'Advisory',
  calendar: 'Field Calendar',
};

export default function TopBar({ activeTab }) {
  return (
    <motion.header
      className="topbar"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page title */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '18px',
          fontWeight: 700,
          color: 'var(--forest-green)',
          lineHeight: 1.2,
        }}>
          {TAB_LABELS[activeTab]}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
          Eco-Smart Agritech Platform
        </span>
      </div>

      {/* Search */}
      <div className="topbar-search">
        <SearchIcon />
        <input
          id="topbar-search-input"
          type="text"
          placeholder="Search crops, protocols, tasks..."
          aria-label="Global search"
        />
      </div>

      {/* Actions */}
      <div className="topbar-actions">
        <motion.div
          className="topbar-icon-btn"
          id="notifications-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          title="Notifications"
        >
          <BellIcon />
          <span className="notification-dot" aria-label="3 new notifications" />
        </motion.div>

        <motion.div
          className="topbar-icon-btn"
          id="settings-btn"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          title="Settings"
        >
          <SettingsIcon />
        </motion.div>

        {/* Profile */}
        <motion.div
          className="topbar-profile"
          id="profile-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="profile-avatar">AR</div>
          <span className="profile-name">Arav Reddy</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
