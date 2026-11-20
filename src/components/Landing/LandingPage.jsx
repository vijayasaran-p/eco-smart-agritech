import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import {
  LeafCircuitMark, VineHelixSymbol, RootScopeSymbol,
  EcoBalanceSymbol, GrowthCalendarSymbol, FieldRowSymbol, SoilLayerSymbol, MicrobeCellSymbol,
} from '../common/BrandSymbols';
import { useEcoSound } from '../../hooks/useEcoSound';

/* ────────────────────────────────────────────────────────────────────────────
   WARM WELCOME OVERLAY  — minimal, calm, refreshing (under 2.5 sec)
──────────────────────────────────────────────────────────────────────────── */
function WarmWelcome({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #1E3A8A 0%, #172554 55%, #0f172a 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Concentric rings — calm, slow */}
      {[0, 0.4, 0.8].map((d, i) => (
        <motion.div key={i} style={{
          position: 'absolute', borderRadius: '50%',
          border: `1px solid rgba(34, 197, 94,${0.25 - i * 0.06})`,
        }}
          animate={{ width: [80, 800 + i * 200], height: [80, 800 + i * 200], opacity: [0.6, 0] }}
          transition={{ duration: 2.2, delay: d, ease: 'easeOut', repeat: Infinity, repeatDelay: 1 }}
        />
      ))}

      {/* Brand mark */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 14 }}
        style={{ marginBottom: 28 }}
      >
        <LeafCircuitMark size={80} color="#22C55E" accent="#22C55E" />
      </motion.div>

      {/* Welcome text — staggered lines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.65, ease: 'easeOut' }}
        style={{ textAlign: 'center', padding: '0 40px' }}
      >
        <div style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: 'clamp(24px, 4vw, 42px)',
          fontWeight: 700,
          color: '#22C55E',
          lineHeight: 1.25,
          marginBottom: 10,
          letterSpacing: '-0.3px',
        }}>
          Welcome to EcoSmart
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: 'rgba(34, 197, 94, 0.75)',
            lineHeight: 1.7,
            maxWidth: 420,
            margin: '0 auto',
          }}
        >
          Every harvest begins with a single seed.
          <br />
          Your precision agriculture journey starts now.
        </motion.div>
      </motion.div>

      {/* Thin green line sweeps across — refreshing */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '30%',
          left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), transparent)',
          transformOrigin: 'left center',
        }}
      />
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   SECTION: scroll-activated content block
──────────────────────────────────────────────────────────────────────────── */
function ScrollSection({ children, delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const yFrom = direction === 'up' ? 48 : direction === 'left' ? 0 : 0;
  const xFrom = direction === 'left' ? -48 : direction === 'right' ? 48 : 0;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: yFrom, x: xFrom }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   SVG FARM LANDSCAPE (pure SVG — rich brown + green, no external image needed)
──────────────────────────────────────────────────────────────────────────── */
function FarmLandscapeSVG() {
  return (
    <svg viewBox="0 0 1440 810" preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <defs>
        {/* Sky gradient */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a2d1f" />
          <stop offset="40%"  stopColor="#1E3A8A" />
          <stop offset="80%"  stopColor="#4a8a5c" />
          <stop offset="100%" stopColor="#6B9B70" />
        </linearGradient>
        {/* Ground gradient */}
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3d2010" />
          <stop offset="50%"  stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8c5a35" />
        </linearGradient>
        {/* Sun glow */}
        <radialGradient id="sunGlow" cx="75%" cy="35%" r="30%">
          <stop offset="0%"   stopColor="#D4A017" stopOpacity="0.55" />
          <stop offset="40%"  stopColor="#c8831a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        {/* Mist */}
        <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="rgba(245,240,230,0)" />
          <stop offset="100%" stopColor="rgba(245,240,230,0.18)" />
        </linearGradient>
        {/* Field row gradient */}
        <linearGradient id="fieldGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#5a9e50" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1440" height="810" fill="url(#sky)" />
      {/* Sun glow */}
      <rect width="1440" height="810" fill="url(#sunGlow)" />

      {/* Far hills */}
      <path d="M0 480 C180 420 360 460 540 430 C720 400 900 440 1080 420 C1260 400 1380 440 1440 430 L1440 810 L0 810Z"
        fill="#1e4a2a" opacity={0.7} />
      <path d="M0 510 C200 450 400 490 600 460 C800 430 1000 470 1200 450 C1340 435 1400 460 1440 455 L1440 810 L0 810Z"
        fill="#1E3A8A" opacity={0.8} />

      {/* Horizon tree line */}
      {[60, 140, 230, 310, 1100, 1180, 1260, 1360].map((x, i) => (
        <g key={i}>
          <line x1={x} y1={490} x2={x} y2={530 + i * 2} stroke="#1a3325" strokeWidth={5 + i % 3} strokeLinecap="round" />
          <ellipse cx={x} cy={488} rx={18 + i % 8} ry={24 + i % 10} fill="#1a3325" />
          <ellipse cx={x} cy={485} rx={14 + i % 6} ry={18 + i % 8} fill="#1E3A8A" opacity={0.8} />
        </g>
      ))}

      {/* Main ground (brown soil) */}
      <path d="M0 540 L1440 520 L1440 810 L0 810Z" fill="url(#ground)" />

      {/* Converging crop rows — perspective lines */}
      {Array.from({ length: 22 }).map((_, i) => {
        const x0 = i * 68 - 20;
        const vanishX = 720;
        const vanishY = 522;
        return (
          <g key={i}>
            <line x1={x0} y1={810} x2={vanishX} y2={vanishY}
              stroke={i % 3 === 1 ? '#5a9e50' : '#3d7a30'}
              strokeWidth={1.5}
              opacity={0.55} />
            {/* Green crop on each row */}
            {[700, 640, 580, 520].map((py, j) => {
              const t = (810 - py) / (810 - vanishY);
              const px = x0 + (vanishX - x0) * (1 - t);
              const s = 1 - t * 0.6;
              return (
                <g key={j} transform={`translate(${px},${py}) scale(${s})`}>
                  <line x1={0} y1={0} x2={0} y2={-10} stroke="#4a8a3c" strokeWidth="2" strokeLinecap="round" />
                  <ellipse cx={-5} cy={-10} rx={6} ry={4} fill="#5a9e50" opacity={0.8} transform="rotate(-20)" />
                  <ellipse cx={5}  cy={-9}  rx={6} ry={4} fill="#3d7a30" opacity={0.8} transform="rotate(20)" />
                </g>
              );
            })}
          </g>
        );
      })}

      {/* Mist horizon */}
      <rect x="0" y="490" width="1440" height="60" fill="url(#mist)" />

      {/* Sun disk */}
      <circle cx="1075" cy="280" r="52" fill="#D4A017" opacity={0.9} />
      <circle cx="1075" cy="280" r="40" fill="#f0c040" opacity={0.8} />
      {/* Sun rays */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line key={i}
            x1={1075 + 58 * Math.cos(a)} y1={280 + 58 * Math.sin(a)}
            x2={1075 + 80 * Math.cos(a)} y2={280 + 80 * Math.sin(a)}
            stroke="#D4A017" strokeWidth="2" opacity={0.4} strokeLinecap="round" />
        );
      })}

      {/* Clouds */}
      {[{x:120,y:140,s:1},{x:400,y:100,s:0.8},{x:700,y:170,s:1.2},{x:1000,y:120,s:0.9}].map((c,i)=>(
        <g key={i} transform={`translate(${c.x},${c.y}) scale(${c.s})`} opacity={0.22}>
          <ellipse cx={0}   cy={0} rx={70} ry={28} fill="white" />
          <ellipse cx={-40} cy={8} rx={45} ry={22} fill="white" />
          <ellipse cx={45}  cy={6} rx={50} ry={24} fill="white" />
        </g>
      ))}

      {/* Farmhouse silhouette */}
      <g opacity={0.6} transform="translate(200,430)">
        <rect x={0}  y={20} width={80} height={50} fill="#1a2a18" />
        <polygon points="-10,20 40,-15 90,20" fill="#142014" />
        <rect x={30} y={40} width={20} height={30} fill="#0d1a0d" />
        {/* Chimney */}
        <rect x={55} y={5} width={10} height={20} fill="#142014" />
      </g>

      {/* Water channel / irrigation ditch */}
      <path d="M0 680 Q360 670 720 672 Q1080 674 1440 668"
        stroke="#6B9FCA" strokeWidth="4" fill="none" opacity={0.3} />

      {/* Foreground tall grass */}
      {Array.from({ length: 30 }).map((_, i) => {
        const x = i * 52 + 10;
        const h = 20 + Math.random() * 18;
        return (
          <g key={i}>
            <path d={`M${x} 810 C${x - 5} ${810 - h} ${x - 8} ${810 - h - 10} ${x} ${810 - h - 14}`}
              stroke="#3d7a30" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={0.7} />
          </g>
        );
      })}

      {/* Vignette overlay */}
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
      </defs>
      <rect width="1440" height="810" fill="url(#vignette)" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   MAIN LANDING PAGE
──────────────────────────────────────────────────────────────────────────── */
export default function LandingPage({ onEnter }) {
  const outerRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const { playWelcomeChime } = useEcoSound();

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });

  // Parallax transforms
  const heroY      = useTransform(scrollYProgress, [0, 0.25], ['0%', '-18%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const bgY        = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  const handleStart = () => {
    playWelcomeChime();
    setShowWelcome(true);
  };

  // Feature data — custom symbols, no emojis
  const features = [
    {
      Symbol: VineHelixSymbol,
      title: 'Breeding Lab',
      desc: 'Analyse genetic compatibility between cultivars. Our vine-helix algorithm scores cross-potential and plots trait overlap across six dimensions — drought tolerance, disease resistance, yield, quality, root vigour, and heat tolerance.',
    },
    {
      Symbol: RootScopeSymbol,
      title: 'Lab Diagnostics',
      desc: 'Upload soil samples, CSV exports or paste raw lab values. Our engine extracts N-P-K, pH, EC, organic matter and moisture readings, then maps them against optimal growth windows for your chosen crop.',
    },
    {
      Symbol: EcoBalanceSymbol,
      title: 'Product Advisory',
      desc: 'Every recommendation is scored against the Microbiome Safety Index — our proprietary metric that weighs biological benefit against chemical disruption risk to your soil ecosystem.',
    },
    {
      Symbol: GrowthCalendarSymbol,
      title: 'Field Calendar',
      desc: 'A living growth-stage timeline from germination to harvest. Daily task cards are generated based on your crop, region, and current diagnostics — keeping your operation precisely on schedule.',
    },
  ];

  const pillars = [
    {
      Symbol: SoilLayerSymbol,
      label: 'Soil Intelligence',
      text: 'Three-layer soil profiling: topsoil nutrient mapping, subsoil moisture retention, and bedrock mineral analysis.',
    },
    {
      Symbol: FieldRowSymbol,
      label: 'Precision Agronomy',
      text: 'Vanishing-point field geometry overlaid with real-time sensor data for row-level intervention planning.',
    },
    {
      Symbol: MicrobeCellSymbol,
      label: 'Microbiome Health',
      text: 'Live ecosystem scoring for Trichoderma, Mycorrhizae, Bacillus and Azospirillum populations in your rhizosphere.',
    },
  ];

  return (
    <>
      {/* ── WELCOME OVERLAY ── */}
      <AnimatePresence>
        {showWelcome && (
          <WarmWelcome
            onDone={() => {
              setShowWelcome(false);
              onEnter();
            }}
          />
        )}
      </AnimatePresence>

      {/* ── SCROLLABLE CONTAINER ── */}
      <div ref={outerRef} style={{ position: 'relative' }}>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Farm landscape background */}
          <motion.div
            style={{
              position: 'absolute', inset: 0,
              y: bgY,
              scale: 1.06,
            }}
          >
            <FarmLandscapeSVG />
          </motion.div>

          {/* Gradient overlay for text legibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.85) 0%, rgba(30, 55, 41, 0.75) 50%, rgba(13, 26, 16, 0.9) 100%)',
            zIndex: 1,
          }} />

          {/* Hero text */}
          <motion.div
            style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', y: heroY, opacity: heroOpacity }}
          >
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 90 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}
            >
              <LeafCircuitMark size={68} color="#22C55E" accent="#22C55E" />
            </motion.div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: '2px' }}
              animate={{ opacity: 1, letterSpacing: '5px' }}
              transition={{ delay: 0.35, duration: 1 }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                color: '#22C55E', textTransform: 'uppercase', marginBottom: 18,
                borderTop: '1px solid rgba(34, 197, 94, 0.3)',
                borderBottom: '1px solid rgba(34, 197, 94, 0.3)',
                display: 'inline-block', padding: '6px 24px',
              }}
            >
              Eco-Smart Agritech Platform
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9 }}
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(40px, 7vw, 88px)',
                fontWeight: 800, color: '#fff',
                lineHeight: 1.08, marginBottom: 22,
                textShadow: '0 4px 28px rgba(0,0,0,0.55)',
                maxWidth: 880, margin: '0 auto 22px',
              }}
            >
              Where Tech Meets<br />
              <span style={{
                background: 'linear-gradient(90deg, #22C55E, #22C55E, #22C55E)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'shimmer 3.5s linear infinite',
              }}>
                Nature
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8 }}
              style={{
                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(15px, 1.8vw, 19px)',
                color: 'rgba(255,255,255,0.78)', lineHeight: 1.75,
                maxWidth: 560, margin: '0 auto 44px',
                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              }}
            >
              A precision agriculture platform that unifies plant genetics, laboratory diagnostics, and sustainable product advisory into one integrated ecosystem.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              id="landing-start-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 0 6px rgba(34, 197, 94, 0.22), 0 20px 50px rgba(30, 58, 138, 0.55)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '17px 46px',
                background: 'linear-gradient(135deg, #22C55E 0%, #22c55e 100%)',
                color: '#FFFFFF', fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 700,
                border: '1.5px solid rgba(34, 197, 94, 0.4)', borderRadius: 999,
                cursor: 'pointer', letterSpacing: '0.5px',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.5)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <LeafCircuitMark size={22} color="#FFFFFF" accent="#22C55E" />
              Enter the Platform
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: 16, color: '#FFFFFF' }}
              >
                &#8594;
              </motion.span>
            </motion.button>

            {/* Scroll prompt */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 2.0 }}
              style={{ marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <span style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '3px', textTransform: 'uppercase' }}>
                Scroll to discover
              </span>
              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 24, height: 40, border: '1.5px solid rgba(255,255,255,0.25)', borderRadius: 12, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}
              >
                <motion.div
                  animate={{ y: [0, 14, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(34, 197, 94, 0.7)' }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — WHAT WE DO  (warm beige, scroll-activated)
        ══════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: 'linear-gradient(160deg, #FFFFFF 0%, #F1F5F9 100%)',
          padding: '100px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative vertical rule */}
          <div style={{ position: 'absolute', left: 48, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, transparent, rgba(30, 58, 138,0.1), transparent)' }} />

          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <ScrollSection delay={0}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 40, height: 2, background: '#22C55E' }} />
                <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#22C55E' }}>
                  What We Do
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Poppins', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
                color: '#1E3A8A', lineHeight: 1.2, marginBottom: 16, maxWidth: 640,
              }}>
                Four tools.<br />One integrated platform.
              </h2>
              <p style={{
                fontFamily: 'Inter', fontSize: 17, color: '#3B82F6',
                lineHeight: 1.8, maxWidth: 520, marginBottom: 64,
              }}>
                EcoSmart brings together the disciplines that matter most in modern precision agriculture — genetics, diagnostics, advisory, and scheduling — connected by a shared data layer and governed by ecological principles.
              </p>
            </ScrollSection>

            {/* Feature grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 28,
            }}>
              {features.map(({ Symbol, title, desc }, i) => (
                <ScrollSection key={title} delay={i * 0.12} direction="up">
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(30, 58, 138,0.1)' }}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(30, 58, 138,0.08)',
                      borderRadius: 16,
                      padding: '28px 24px',
                      boxShadow: '0 4px 18px rgba(30, 58, 138,0.05)',
                      transition: 'box-shadow 0.3s',
                      cursor: 'default',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Top accent bar */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #1E3A8A, #22C55E)' }} />
                    <div style={{ marginBottom: 16 }}>
                      <Symbol size={40} color="#1E3A8A" accent="#22C55E" />
                    </div>
                    <div style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 700, color: '#1E3A8A', marginBottom: 10 }}>
                      {title}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: 13.5, color: '#3B82F6', lineHeight: 1.7 }}>
                      {desc}
                    </div>
                  </motion.div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — THREE PILLARS  (dark forest green)
        ══════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: 'linear-gradient(160deg, #1E3A8A 0%, #172554 60%, #0f172a 100%)',
          padding: '100px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background leaf-vein texture */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 5 C26 22 18 42 40 75 C62 42 54 22 40 5z' stroke='%23ffffff' stroke-width='0.6' fill='none'/%3E%3Cline x1='40' y1='5' x2='40' y2='75' stroke='%23ffffff' stroke-width='0.4'/%3E%3Cline x1='40' y1='28' x2='22' y2='45' stroke='%23ffffff' stroke-width='0.3'/%3E%3Cline x1='40' y1='28' x2='58' y2='45' stroke='%23ffffff' stroke-width='0.3'/%3E%3C/svg%3E")`,
          }} />

          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <ScrollSection>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 40, height: 2, background: '#22C55E' }} />
                <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#22C55E' }}>
                  Our Roots
                </span>
              </div>
              <h2 style={{
                fontFamily: 'Poppins', fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800,
                color: '#22C55E', lineHeight: 1.25, marginBottom: 56, maxWidth: 560,
              }}>
                Deeply grounded in ecological farming
              </h2>
            </ScrollSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
              {pillars.map(({ Symbol, label, text }, i) => (
                <ScrollSection key={label} delay={i * 0.15} direction={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}>
                  <div style={{
                    background: 'rgba(34, 197, 94,0.05)',
                    border: '1px solid rgba(34, 197, 94,0.1)',
                    borderRadius: 16,
                    padding: '32px 28px',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                      <Symbol size={42} color="#22C55E" accent="#22C55E" />
                      <div style={{ fontFamily: 'Poppins', fontSize: 17, fontWeight: 700, color: '#F8FAFC' }}>
                        {label}
                      </div>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: 14, color: 'rgba(255, 255, 255,0.7)', lineHeight: 1.75 }}>
                      {text}
                    </div>
                    {/* Accent underline */}
                    <div style={{ marginTop: 24, height: 2, width: 40, background: '#22C55E', borderRadius: 2 }} />
                  </div>
                </ScrollSection>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — FINAL CTA
        ══════════════════════════════════════════════════════════════════ */}
        <section style={{
          background: 'linear-gradient(160deg, #F1F5F9 0%, #FFFFFF 100%)',
          padding: '120px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Slate-Emerald diagonal stripe accent */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #1E3A8A, #22C55E, #22C55E, #22C55E, #1E3A8A)',
          }} />

          <ScrollSection>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <LeafCircuitMark size={60} color="#1E3A8A" accent="#22C55E" />
            </div>
            <h2 style={{
              fontFamily: 'Poppins', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800,
              color: '#1E3A8A', marginBottom: 18, lineHeight: 1.2,
            }}>
              Ready to grow smarter?
            </h2>
            <p style={{
              fontFamily: 'Inter', fontSize: 17, color: '#3B82F6',
              lineHeight: 1.8, maxWidth: 480, margin: '0 auto 44px',
            }}>
              Join the next generation of ecologically responsible precision agriculture. Your dashboard is prepared and your first analysis awaits.
            </p>

            <motion.button
              id="landing-start-btn-bottom"
              whileHover={{ scale: 1.04, boxShadow: '0 0 0 6px rgba(34, 197, 94,0.15), 0 20px 50px rgba(30, 58, 138,0.3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '18px 52px',
                background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
                color: '#22C55E', fontFamily: 'Poppins', fontSize: 17, fontWeight: 700,
                border: 'none', borderRadius: 999,
                cursor: 'pointer', letterSpacing: '0.5px',
                boxShadow: '0 8px 32px rgba(30, 58, 138,0.35)',
              }}
            >
              <LeafCircuitMark size={22} color="#22C55E" accent="#22C55E" />
              Begin Your Journey
            </motion.button>

            {/* Stats row */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 48, marginTop: 64, flexWrap: 'wrap',
            }}>
              {[
                { value: '4', label: 'Integrated Modules' },
                { value: '12+', label: 'Soil Metrics Tracked' },
                { value: '100', label: 'Microbiome Safety Index' },
                { value: '6', label: 'Growth Stages Mapped' },
              ].map((s, i) => (
                <ScrollSection key={s.label} delay={i * 0.1}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Poppins', fontSize: 36, fontWeight: 800, color: '#1E3A8A', lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: 12, color: '#64748B', marginTop: 6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {s.label}
                    </div>
                  </div>
                </ScrollSection>
              ))}
            </div>
          </ScrollSection>
        </section>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
      `}</style>
    </>
  );
}
