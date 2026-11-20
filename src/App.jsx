import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import BreedingLab from './components/BreedingLab/BreedingLab';
import HybridizationLab from './components/BreedingLab/HybridizationLab';
import Diagnostics from './components/Diagnostics/Diagnostics';
import Advisory from './components/Advisory/Advisory';
import FieldCalendar from './components/FieldCalendar/FieldCalendar';
import LandingPage from './components/Landing/LandingPage';
import PremiumBrandLoader from './components/common/PremiumBrandLoader';

const TAB_COMPONENTS = {
  breeding: BreedingLab,
  hybridization: HybridizationLab,
  diagnostics: Diagnostics,
  advisory: Advisory,
  calendar: FieldCalendar,
};

// Leaf-unfurl wipe transition
const pageTransition = {
  initial:  { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', y: 12 },
  animate:  { opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0,
               transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:     { opacity: 0, clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', y: -8,
               transition: { duration: 0.3, ease: 'easeIn' } },
};

export default function App() {
  // Only show landing page if they haven't entered during this session
  // Wrapped in try/catch to prevent crashes in strict browser environments that block sessionStorage
  const [showLanding, setShowLanding] = useState(() => {
    try {
      return !sessionStorage.getItem('hasEntered');
    } catch (e) {
      return true;
    }
  });
  
  const [activeTab, setActiveTab]           = useState('advisory');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setIsGlobalLoading(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => {
        setIsGlobalLoading(false);
      }, 250);
    }, 950);
  };

  const handleEnterPlatform = () => {
    try {
      sessionStorage.setItem('hasEntered', 'true');
    } catch (e) {}
    setShowLanding(false);
  };

  const ActiveComponent = TAB_COMPONENTS[activeTab];
  const sidebarWidth    = sidebarCollapsed ? 72 : 260;

  return (
    <AnimatePresence mode="wait">
      {showLanding ? (
        /* ── LANDING PAGE ── */
        <motion.div
          key="landing"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ minHeight: '100vh', zIndex: 100, background: 'var(--soil-beige)' }}
        >
          <LandingPage onEnter={handleEnterPlatform} />
        </motion.div>
      ) : (
        /* ── DASHBOARD ── */
        <motion.div
          key="dashboard"
          className="app-shell"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(p => !p)}
          />

          <motion.main
            className="main-area"
            animate={{ marginLeft: sidebarWidth }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <TopBar activeTab={activeTab} />
            <div className="main-content" style={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={pageTransition}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <ActiveComponent />
                </motion.div>
              </AnimatePresence>

              {/* GLOBAL PREMIUM LOADER OVERLAY */}
              <AnimatePresence>
                {isGlobalLoading && <PremiumBrandLoader />}
              </AnimatePresence>
            </div>
          </motion.main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
