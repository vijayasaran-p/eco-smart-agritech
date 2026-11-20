import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── CSS ───────────────────────────────────────────────────────────────────── */
const CSS = `
  @keyframes pollenFloat {
    0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity:1; }
    100% { transform: translate(var(--px),var(--py)) rotate(540deg) scale(0); opacity:0; }
  }
  @keyframes pollenTube {
    from { stroke-dashoffset: 200; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes breathe {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.03); }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 12px rgba(34,197,94,0.4); }
    50%      { box-shadow: 0 0 32px rgba(34,197,94,0.9); }
  }
  @keyframes handBob {
    0%,100% { transform: translateY(0px) rotate(-5deg); }
    50%      { transform: translateY(-8px) rotate(5deg); }
  }
  @keyframes seedSpin {
    to { transform: rotate(360deg); }
  }
  .pollen-dot {
    position:absolute; width:8px; height:8px; border-radius:50%;
    background:radial-gradient(circle,#FDE68A,#F59E0B);
    box-shadow:0 0 6px #F59E0B; pointer-events:none;
    animation: pollenFloat 1.4s ease-out forwards;
  }
  .breathe { animation: breathe 3s ease-in-out infinite; }
  .hand-bob { animation: handBob 1.8s ease-in-out infinite; }
  .seed-spin { animation: seedSpin 4s linear infinite; transform-box:fill-box; transform-origin:center; }
`;

/* ─── STEP DEFINITIONS ──────────────────────────────────────────────────────── */
const STEPS = [
  {
    id: 0,
    phase: 'Introduction',
    icon: '🌱',
    color: '#16A34A',
    bg: '#F0FDF4',
    title: 'What is Plant Hybridization?',
    subtitle: 'The Science of Creating New Plant Varieties',
    image: null,
    learn: 'Hybridization is the process of crossing two different plant varieties (parents) to create offspring (hybrids) that combine the best traits of both. Think of it as nature\'s mixing bowl — breeders pick the best ingredients from two plants to get a "super plant".',
    funFact: 'The wheat we eat today is a natural hybrid of 3 different grass species that evolved over 10,000 years!',
    visual: 'intro',
  },
  {
    id: 1,
    phase: 'Step 1',
    icon: '✂️',
    color: '#DC2626',
    bg: '#FEF2F2',
    title: 'Emasculation — Preparing the Mother Plant',
    subtitle: 'Remove the anthers (pollen makers) before they open',
    image: '/hybridization/emasculation.png',
    learn: 'Emasculation means removing the anthers (the male parts that make pollen) from the chosen "mother" or female parent flower BEFORE they open and release their own pollen. This prevents the flower from self-pollinating — so it MUST receive pollen from our chosen "father" plant.',
    why: 'Without emasculation, the flower would pollinate itself and we would NOT get a hybrid!',
    funFact: 'This is done with tweezers on each flower bud. A skilled breeder can emasculate 50–100 flowers per day!',
    visual: 'emasculation',
    tools: ['Fine tweezers', 'Magnifying glass', 'Early morning (before anthers open)', 'Gloves'],
  },
  {
    id: 2,
    phase: 'Step 2',
    icon: '🛡️',
    color: '#7C3AED',
    bg: '#F5F3FF',
    title: 'Bagging — Protecting the Flower',
    subtitle: 'Cover the emasculated flower to keep out unwanted pollen',
    image: null,
    learn: 'After emasculation, a small paper or cloth bag is placed over the flower. This acts like a protective shield — preventing any accidental pollen from wind or insects from landing on our carefully prepared stigma.',
    why: 'Even a single stray pollen grain from a different plant can ruin the cross!',
    funFact: 'Breeders tag each bagged flower with the date and parent names for tracking.',
    visual: 'bagging',
    tools: ['Glassine/paper bags', 'Rubber bands or wire ties', 'Permanent marker pen', 'Labels for each cross'],
  },
  {
    id: 3,
    phase: 'Step 3',
    icon: '🌼',
    color: '#F59E0B',
    bg: '#FFFBEB',
    title: 'Pollen Collection — Harvesting from Father Plant',
    subtitle: 'Collect golden pollen from the male parent\'s anthers',
    image: '/hybridization/pollen_collection.png',
    learn: 'From the chosen "father" plant, we collect mature pollen when it is at peak viability — usually when anthers are fully open and shedding yellow pollen. A soft brush or fingertip gently collects the pollen grains.',
    why: 'Pollen viability (how long it stays alive and capable of fertilizing) is usually just 2–48 hours! Timing is critical.',
    funFact: 'One anther can contain thousands to millions of pollen grains. Only ONE pollen grain fertilizes ONE ovule.',
    visual: 'collection',
    tools: ['Soft camel-hair brush', 'Small glass vials', 'Silica gel (to store pollen)', 'Refrigerator (extends viability)'],
  },
  {
    id: 4,
    phase: 'Step 4',
    icon: '🤝',
    color: '#0891B2',
    bg: '#ECFEFF',
    title: 'Cross-Pollination — The Magic Moment!',
    subtitle: 'Transfer pollen from father to mother\'s stigma',
    image: '/hybridization/cross_pollination.png',
    learn: 'Remove the bag from the mother flower. Gently brush the collected pollen onto the sticky STIGMA — the top of the pistil (female organ). The pollen grains stick to the stigma\'s surface and begin germination. Re-bag the flower immediately after!',
    why: 'The stigma is specifically designed to be sticky and receptive — it traps pollen grains and sends them chemical signals to grow.',
    funFact: 'Within minutes of landing on the stigma, a pollen grain grows a tiny tube that travels DOWN through the style to reach the ovule.',
    visual: 'pollination',
    tools: ['Loaded pollen brush', 'Fresh pollen from Step 3', 'Steady hands!', 'Paper bag to re-cover'],
  },
  {
    id: 5,
    phase: 'Step 5',
    icon: '🧬',
    color: '#0D9488',
    bg: '#F0FDFA',
    title: 'Fertilization — Inside the Flower',
    subtitle: 'The pollen tube grows down to meet the ovule',
    image: '/hybridization/flower_anatomy.png',
    learn: 'After pollination, a remarkable microscopic event occurs. The pollen grain germinates and grows a pollen tube down through the style. The tube delivers 2 sperm cells to the ovule. One fertilizes the egg cell (→ embryo), the other fertilizes the polar nuclei (→ endosperm that feeds the seed).',
    why: 'This is called "Double Fertilization" — unique to flowering plants. It produces BOTH the embryo AND its food supply.',
    funFact: 'The pollen tube can grow at 1cm per hour — racing to the ovule before another pollen grain beats it!',
    visual: 'fertilization',
  },
  {
    id: 6,
    phase: 'Step 6',
    icon: '🍎',
    color: '#EA580C',
    bg: '#FFF7ED',
    title: 'Fruit & Seed Development — F1 Seeds Form',
    subtitle: 'The fertilized ovule develops into a hybrid seed',
    image: '/hybridization/seed_germination.png',
    learn: 'After successful fertilization, the ovary swells into a fruit and the ovule develops into a HYBRID SEED. This seed contains 50% DNA from Parent 1 and 50% DNA from Parent 2. These are your precious F1 seeds — the first generation of the new hybrid variety.',
    why: 'The bag is kept on until the fruit is mature to prevent any mix-up.',
    funFact: 'A single cross can produce 1 fruit with 20-500 seeds depending on the species. Each seed is genetically unique!',
    visual: 'fruit',
    timeline: '4–12 weeks after pollination depending on species',
  },
  {
    id: 7,
    phase: 'Step 7',
    icon: '🌿',
    color: '#16A34A',
    bg: '#F0FDF4',
    title: 'F1 Generation — Growing the Hybrid',
    subtitle: 'Sow F1 seeds and observe hybrid vigor!',
    image: null,
    learn: 'F1 (First Filial) hybrid seeds are sown in a nursery. The resulting plants show HYBRID VIGOR (heterosis) — they are typically taller, stronger, more productive, and more disease-resistant than EITHER parent. All F1 plants look identical because they all have the same genetic makeup.',
    why: 'F1 hybrids show heterosis because the two copies of each gene (one from each parent) complement and "mask" each other\'s weaknesses.',
    funFact: 'This is why farmers buy hybrid seeds every season — you cannot save F1 seeds! The next generation (F2) will segregate and lose uniformity.',
    visual: 'f1',
  },
  {
    id: 8,
    phase: 'Step 8',
    icon: '🔬',
    color: '#1D4ED8',
    bg: '#EFF6FF',
    title: 'F2 Generation — Mendelian Segregation',
    subtitle: 'Self-pollinate F1 to get the diverse F2 population',
    image: '/hybridization/f2_segregation.png',
    learn: 'When F1 plants self-pollinate (or are crossed together), the resulting F2 generation shows HUGE diversity — traits segregate into different combinations in Mendelian ratios. Breeders select the BEST F2 plants and breed them further to create stable commercial varieties.',
    why: 'The 9:3:3:1 ratio appears because independent genes assort freely (Mendel\'s Law of Independent Assortment).',
    funFact: 'A breeder might grow 10,000 F2 plants and select only the top 50 for further crossing — it takes 6-12 years to develop a stable variety!',
    visual: 'f2',
  },
];

/* ─── SVG VISUAL COMPONENTS ─────────────────────────────────────────────────── */

function IntroVisual() {
  return (
    <div style={{ position:'relative', width:'100%', height:260, display:'flex', alignItems:'center', justifyContent:'center' }}>
      {/* Parent A */}
      <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut' }}
        style={{ textAlign:'center', marginRight:60 }}>
        <div style={{ fontSize:64 }}>🍅</div>
        <div style={{ fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, color:'#DC2626', marginTop:4 }}>Parent A</div>
        <div style={{ fontFamily:'Inter,sans-serif', fontSize:10, color:'#94A3B8' }}>e.g. Tomato X7</div>
        <div style={{ display:'flex', flexDirection:'column', gap:3, marginTop:8 }}>
          {['Disease Resist: 91', 'Yield: 78', 'Heat Tol: 67'].map(t => (
            <div key={t} style={{ background:'#FEE2E2', borderRadius:99, padding:'2px 8px', fontSize:9, fontWeight:600, color:'#DC2626' }}>{t}</div>
          ))}
        </div>
      </motion.div>

      {/* Center DNA / Cross */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
        <motion.div animate={{ rotate:[0,360] }} transition={{ duration:6, repeat:Infinity, ease:'linear' }}
          style={{ fontSize:36 }}>🧬</motion.div>
        <div style={{ fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:800, color:'#1E3A8A' }}>×</div>
        <motion.div animate={{ scale:[1,1.2,1] }} transition={{ duration:1.5, repeat:Infinity }}
          style={{ background:'linear-gradient(135deg,#16A34A,#22C55E)', color:'white', borderRadius:99,
            padding:'6px 14px', fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:800 }}>
          HYBRID!
        </motion.div>
      </div>

      {/* Parent B */}
      <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:2.5, repeat:Infinity, ease:'easeInOut', delay:1.25 }}
        style={{ textAlign:'center', marginLeft:60 }}>
        <div style={{ fontSize:64 }}>🫑</div>
        <div style={{ fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700, color:'#16A34A', marginTop:4 }}>Parent B</div>
        <div style={{ fontFamily:'Inter,sans-serif', fontSize:10, color:'#94A3B8' }}>e.g. Pepper GX-5</div>
        <div style={{ display:'flex', flexDirection:'column', gap:3, marginTop:8 }}>
          {['Disease Resist: 79', 'Yield: 85', 'Heat Tol: 90'].map(t => (
            <div key={t} style={{ background:'#DCFCE7', borderRadius:99, padding:'2px 8px', fontSize:9, fontWeight:600, color:'#16A34A' }}>{t}</div>
          ))}
        </div>
      </motion.div>

      {/* Arrows */}
      <div style={{ position:'absolute', top:'45%', left:'30%', right:'30%', height:2, background:'linear-gradient(90deg,#DC2626,#1E3A8A,#16A34A)', opacity:0.4 }}/>
    </div>
  );
}

function EmascualationVisual() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      <svg width="280" height="200" viewBox="0 0 280 200">
        {/* Stem */}
        <line x1="140" y1="200" x2="140" y2="100" stroke="#16A34A" strokeWidth="6" strokeLinecap="round"/>
        {/* Petals */}
        {[0,60,120,180,240,300].map((a,i) => (
          <motion.ellipse key={i}
            cx={140 + 44*Math.cos(a*Math.PI/180)} cy={80 + 44*Math.sin(a*Math.PI/180)}
            rx="22" ry="14"
            fill="#FDA4AF" opacity="0.85"
            transform={`rotate(${a} ${140 + 44*Math.cos(a*Math.PI/180)} ${80 + 44*Math.sin(a*Math.PI/180)})`}
            initial={{ scale:0 }}
            animate={{ scale:1 }}
            transition={{ delay:i*0.07, type:'spring', stiffness:220 }}
          />
        ))}
        {/* Stigma */}
        <circle cx="140" cy="80" r="10" fill="#22C55E"/>
        <circle cx="140" cy="80" r="6" fill="#16A34A"/>
        <text x="155" y="75" fontSize="9" fill="#16A34A" fontWeight="700" fontFamily="Inter,sans-serif">Stigma (KEEP)</text>
        {/* Anthers being removed - crossed out */}
        {[[-30,-20],[30,-20],[0,-38],[-22,-38],[22,-38]].map(([dx,dy],i) => (
          <motion.g key={i}
            initial={{ x:0, y:0, opacity:1 }}
            animate={{ x: dx*1.8, y: dy*1.8 - 20, opacity:0 }}
            transition={{ delay:1+i*0.15, duration:0.8 }}
          >
            <ellipse cx={140+dx*0.6} cy={80+dy*0.6} rx="7" ry="10" fill="#F59E0B"/>
            <ellipse cx={140+dx*0.6} cy={80+dy*0.6} rx="4" ry="6" fill="#FDE68A"/>
          </motion.g>
        ))}
        {/* Tweezers hand */}
        <motion.g animate={{ x:[0,20,40,20,0], y:[0,-10,-25,-10,0] }}
          transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}>
          <line x1="90" y1="140" x2="130" y2="85" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
          <line x1="100" y1="145" x2="135" y2="90" stroke="#374151" strokeWidth="3" strokeLinecap="round"/>
          <text x="65" y="150" fontSize="9" fill="#DC2626" fontWeight="700" fontFamily="Poppins,sans-serif">REMOVE</text>
          <text x="65" y="161" fontSize="9" fill="#DC2626" fontFamily="Poppins,sans-serif">Anthers</text>
        </motion.g>
        <text x="30" y="30" fontSize="10" fill="#F59E0B" fontWeight="700" fontFamily="Poppins,sans-serif">Anthers (REMOVE)</text>
      </svg>
    </div>
  );
}

function BaggingVisual() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <svg width="240" height="200" viewBox="0 0 240 200">
        {/* Stem */}
        <line x1="120" y1="200" x2="120" y2="100" stroke="#16A34A" strokeWidth="6" strokeLinecap="round"/>
        {/* Flower */}
        {[0,72,144,216,288].map((a,i) => (
          <ellipse key={i}
            cx={120 + 35*Math.cos(a*Math.PI/180)} cy={80 + 35*Math.sin(a*Math.PI/180)}
            rx="18" ry="12" fill="#93C5FD" opacity="0.7"
            transform={`rotate(${a} ${120 + 35*Math.cos(a*Math.PI/180)} ${80 + 35*Math.sin(a*Math.PI/180)})`}
          />
        ))}
        <circle cx="120" cy="80" r="8" fill="#22C55E"/>
        {/* Bag animation */}
        <motion.g initial={{ y:-60, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.5, duration:0.8, type:'spring' }}>
          <path d="M 78 140 L 78 60 Q 78 30 120 30 Q 162 30 162 60 L 162 140 Z"
            fill="rgba(219,234,254,0.85)" stroke="#3B82F6" strokeWidth="2" strokeDasharray="6 3"/>
          <path d="M 78 140 Q 90 152 120 155 Q 150 152 162 140 Z" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2"/>
          <text x="120" y="90" textAnchor="middle" fontSize="9" fill="#1D4ED8" fontWeight="700" fontFamily="Poppins,sans-serif">Protective</text>
          <text x="120" y="102" textAnchor="middle" fontSize="9" fill="#1D4ED8" fontWeight="700" fontFamily="Poppins,sans-serif">Paper Bag</text>
        </motion.g>
        {/* Tag */}
        <motion.g initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}>
          <rect x="148" y="95" width="72" height="36" rx="4" fill="#FEF9C3" stroke="#EAB308" strokeWidth="1.5"/>
          <text x="184" y="108" textAnchor="middle" fontSize="7" fill="#92400E" fontFamily="Poppins,sans-serif" fontWeight="700">♀ Parent: Tomato</text>
          <text x="184" y="118" textAnchor="middle" fontSize="7" fill="#92400E" fontFamily="Poppins,sans-serif">♂ Parent: Pepper</text>
          <text x="184" y="128" textAnchor="middle" fontSize="7" fill="#92400E" fontFamily="Poppins,sans-serif">Date: 22/07/2026</text>
        </motion.g>
      </svg>
    </div>
  );
}

function PollenCollectionVisual() { return null; }
function CrossPollinationVisual() { return null; }

function FertilizationVisual() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
      <svg width="260" height="240" viewBox="0 0 260 240">
        {/* Stigma */}
        <ellipse cx="130" cy="20" rx="24" ry="10" fill="#22C55E"/>
        <text x="130" y="12" textAnchor="middle" fontSize="8" fill="white" fontWeight="700" fontFamily="Poppins,sans-serif">STIGMA</text>
        {/* Pollen on stigma */}
        <motion.circle cx="118" cy="20" r="5" fill="#F59E0B"
          animate={{ scale:[1,1.3,1] }} transition={{ duration:1.2, repeat:Infinity }}/>
        <motion.circle cx="130" cy="18" r="5" fill="#F59E0B"
          animate={{ scale:[1,1.3,1] }} transition={{ duration:1.2, repeat:Infinity, delay:0.3 }}/>
        <motion.circle cx="142" cy="21" r="5" fill="#F59E0B"
          animate={{ scale:[1,1.3,1] }} transition={{ duration:1.2, repeat:Infinity, delay:0.6 }}/>
        <text x="172" y="24" fontSize="8" fill="#F59E0B" fontWeight="700" fontFamily="Inter,sans-serif">Pollen grains</text>

        {/* Style */}
        <rect x="122" y="30" width="16" height="80" rx="8" fill="#4ADE80"/>
        <text x="160" y="70" fontSize="8" fill="#16A34A" fontWeight="700" fontFamily="Poppins,sans-serif">STYLE</text>

        {/* Pollen tube growing */}
        <motion.path d="M 130 25 Q 124 60 128 90 Q 132 110 130 115"
          fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="200" strokeDashoffset="200"
          animate={{ strokeDashoffset:0 }}
          transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}/>
        <text x="160" y="85" fontSize="8" fill="#F59E0B" fontWeight="700" fontFamily="Inter,sans-serif">Pollen tube</text>
        <text x="160" y="95" fontSize="8" fill="#F59E0B" fontFamily="Inter,sans-serif">growing down!</text>

        {/* Ovary */}
        <ellipse cx="130" cy="150" rx="38" ry="50" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
        <text x="130" y="144" textAnchor="middle" fontSize="8" fill="#92400E" fontWeight="700" fontFamily="Poppins,sans-serif">OVARY</text>
        {/* Ovules */}
        {[[-16,0],[16,0],[0,-16],[0,16]].map(([dx,dy],i)=>(
          <motion.ellipse key={i} cx={130+dx} cy={160+dy} rx="9" ry="7" fill="#FB923C"
            animate={{ fill:i===0?['#FB923C','#22C55E','#FB923C']:undefined }}
            transition={{ delay:2.5, duration:1, repeat:Infinity }}/>
        ))}
        <motion.text x="130" y="178" textAnchor="middle" fontSize="7" fill="#92400E" fontFamily="Inter,sans-serif"
          animate={{ opacity:[0,1,0] }} transition={{ delay:2.5, duration:1.5, repeat:Infinity }}>
          Fertilization! ✓
        </motion.text>
        <text x="40" y="158" fontSize="7" fill="#92400E" fontFamily="Poppins,sans-serif">← Ovules</text>
        <text x="40" y="168" fontSize="7" fill="#92400E" fontFamily="Poppins,sans-serif">  (future seeds)</text>
      </svg>
    </div>
  );
}

function F1Visual() {
  return (
    <div style={{ display:'flex', gap:24, justifyContent:'center', flexWrap:'wrap' }}>
      {[
        { label:'Parent A (Tomato)', emoji:'🍅', color:'#DC2626', traits:['Yield: 78','Heat: 67'] },
        { label:'×', emoji:'', color:'#1E3A8A', traits:[] },
        { label:'Parent B (Pepper)', emoji:'🫑', color:'#16A34A', traits:['Yield: 85','Heat: 90'] },
        { label:'F1 HYBRID (Better!)', emoji:'🌟', color:'#F59E0B', traits:['Yield: 91↑','Heat: 89↑'], best:true },
      ].map((p,i) => p.emoji ? (
        <motion.div key={i}
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:i*0.15, type:'spring' }}
          style={{
            textAlign:'center',
            background: p.best ? 'linear-gradient(135deg,#FEF9C3,#FEF3C7)' : 'white',
            border: `2px solid ${p.color}`,
            borderRadius:16, padding:'14px 12px',
            boxShadow: p.best ? `0 8px 24px ${p.color}44` : '0 2px 8px rgba(0,0,0,0.06)',
            minWidth:110,
          }}
        >
          {p.best && <div style={{ fontFamily:'Poppins,sans-serif', fontSize:9, fontWeight:800, color:p.color, marginBottom:4 }}>HYBRID VIGOR!</div>}
          <div style={{ fontSize:36 }}>{p.emoji}</div>
          <div style={{ fontFamily:'Poppins,sans-serif', fontSize:10, fontWeight:700, color:p.color, marginTop:6 }}>{p.label}</div>
          {p.traits.map(t => (
            <div key={t} style={{ fontFamily:'Inter,sans-serif', fontSize:9, color:'#64748B', marginTop:3 }}>{t}</div>
          ))}
        </motion.div>
      ) : (
        <div key={i} style={{ display:'flex', alignItems:'center', fontFamily:'Poppins,sans-serif', fontSize:24, fontWeight:900, color:'#1E3A8A' }}>×</div>
      ))}
    </div>
  );
}

/* ─── STEP INDICATOR ─────────────────────────────────────────────────────────── */
function StepDot({ step, active, done, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
      title={step.phase}
      style={{
        width: done || active ? 34 : 26,
        height: done || active ? 34 : 26,
        borderRadius: '50%',
        background: done ? '#22C55E' : active ? step.color : '#E2E8F0',
        border: active ? `3px solid ${step.color}` : 'none',
        color: 'white',
        fontSize: done ? 14 : active ? 11 : 9,
        cursor: 'pointer',
        fontFamily: 'Poppins,sans-serif', fontWeight: 800,
        boxShadow: active ? `0 0 16px ${step.color}88` : 'none',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {done ? '✓' : active ? step.icon : step.id}
    </motion.button>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
export default function HybridizationLab() {
  const [currentStep, setCurrentStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentStep(s => {
        if (s >= STEPS.length - 1) { setAutoPlay(false); return s; }
        return s + 1;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const step = STEPS[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 1000, margin: '0 auto' }}
    >
      <style>{CSS}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily:'Poppins,sans-serif', fontSize:26, fontWeight:800, color:'#1E3A8A', margin:0 }}>
          🔬 Learn Hybridization — Step by Step
        </h1>
        <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#64748B', marginTop:4, margin:0 }}>
          An interactive visual guide to plant breeding, pollination, and F1/F2 genetics
        </p>
      </div>

      {/* ── STEP PROGRESS RAIL ── */}
      <div style={{
        background:'white', border:'1.5px solid rgba(30,58,138,0.08)',
        borderRadius:20, padding:'16px 20px', marginBottom:20,
        display:'flex', alignItems:'center', gap:6, overflowX:'auto',
      }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <StepDot step={s} active={i === currentStep} done={i < currentStep}
              onClick={() => setCurrentStep(i)} />
            {i < STEPS.length - 1 && (
              <div style={{
                flex:1, height:3, minWidth:8,
                background: i < currentStep ? '#22C55E' : '#E2E8F0',
                borderRadius:99, transition:'background 0.4s',
              }}/>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── MAIN CONTENT CARD ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          exit={{ opacity:0, x:-40 }}
          transition={{ duration:0.35, ease:'easeOut' }}
          style={{
            background:'white',
            border:`2px solid ${step.color}22`,
            borderRadius:24,
            overflow:'hidden',
            boxShadow:'0 8px 32px rgba(30,58,138,0.08)',
            marginBottom:16,
          }}
        >
          {/* Card Header */}
          <div style={{
            background:`linear-gradient(135deg, ${step.bg}, white)`,
            padding:'20px 28px 16px',
            borderBottom:`1.5px solid ${step.color}22`,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6 }}>
              <span style={{
                background:step.color, color:'white', borderRadius:99,
                padding:'3px 12px', fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:700,
              }}>
                {step.phase}
              </span>
              <span style={{ fontSize:20 }}>{step.icon}</span>
            </div>
            <h2 style={{ fontFamily:'Poppins,sans-serif', fontSize:22, fontWeight:800, color:'#1E3A8A', margin:0 }}>
              {step.title}
            </h2>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'#64748B', margin:'4px 0 0 0' }}>
              {step.subtitle}
            </p>
          </div>

          {/* Card Body */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>

            {/* LEFT: Visual / Image */}
            <div style={{
              padding:'28px 24px',
              borderRight:`1.5px solid ${step.color}22`,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              background:`${step.bg}55`,
              minHeight:280,
            }}>
              {step.image ? (
                <motion.img
                  src={step.image}
                  alt={step.title}
                  initial={{ opacity:0, scale:0.92 }}
                  animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.4 }}
                  style={{
                    width:'100%', maxWidth:320, borderRadius:16,
                    boxShadow:'0 8px 28px rgba(0,0,0,0.12)',
                    objectFit:'cover',
                  }}
                  onError={e => { e.target.style.display='none'; }}
                />
              ) : step.visual === 'intro' ? <IntroVisual />
                : step.visual === 'emasculation' ? <EmascualationVisual />
                : step.visual === 'bagging' ? <BaggingVisual />
                : step.visual === 'fertilization' ? <FertilizationVisual />
                : step.visual === 'f1' ? <F1Visual />
                : (
                  <motion.div animate={{ scale:[1,1.06,1] }} transition={{ duration:3, repeat:Infinity }}
                    style={{ fontSize:96, textAlign:'center' }}>
                    {step.icon}
                  </motion.div>
                )
              }
            </div>

            {/* RIGHT: Explanation */}
            <div style={{ padding:'28px 24px' }}>
              {/* Main explanation */}
              <div style={{
                background:step.bg,
                border:`1.5px solid ${step.color}44`,
                borderRadius:14, padding:'14px 16px', marginBottom:14,
              }}>
                <div style={{ fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:800, color:step.color, marginBottom:6, textTransform:'uppercase', letterSpacing:'1px' }}>
                  What happens?
                </div>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'#374151', lineHeight:1.65, margin:0 }}>
                  {step.learn}
                </p>
              </div>

              {/* Why? */}
              {step.why && (
                <div style={{
                  background:'#FFFBEB', border:'1.5px solid #F59E0B44',
                  borderRadius:12, padding:'10px 14px', marginBottom:12,
                  display:'flex', gap:8,
                }}>
                  <span style={{ fontSize:16, flexShrink:0 }}>💡</span>
                  <div>
                    <div style={{ fontFamily:'Poppins,sans-serif', fontSize:10, fontWeight:800, color:'#92400E', marginBottom:2 }}>WHY IS THIS STEP IMPORTANT?</div>
                    <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#78350F', margin:0, lineHeight:1.5 }}>{step.why}</p>
                  </div>
                </div>
              )}

              {/* Tools */}
              {step.tools && (
                <div style={{ marginBottom:12 }}>
                  <div style={{ fontFamily:'Poppins,sans-serif', fontSize:10, fontWeight:800, color:'#64748B', marginBottom:6, textTransform:'uppercase', letterSpacing:'1px' }}>
                    🛠️ Tools Used
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {step.tools.map(t => (
                      <span key={t} style={{
                        background:'white', border:'1px solid rgba(30,58,138,0.15)',
                        borderRadius:99, padding:'3px 10px',
                        fontFamily:'Inter,sans-serif', fontSize:11, color:'#374151',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fun Fact */}
              {step.funFact && (
                <div style={{
                  background:'linear-gradient(135deg,#EFF6FF,#E0F2FE)',
                  border:'1.5px solid #3B82F644',
                  borderRadius:12, padding:'10px 14px',
                  display:'flex', gap:8,
                }}>
                  <span style={{ fontSize:16, flexShrink:0 }}>🌟</span>
                  <div>
                    <div style={{ fontFamily:'Poppins,sans-serif', fontSize:10, fontWeight:800, color:'#1D4ED8', marginBottom:2 }}>FUN FACT</div>
                    <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'#1E3A8A', margin:0, lineHeight:1.5 }}>{step.funFact}</p>
                  </div>
                </div>
              )}

              {step.timeline && (
                <div style={{ marginTop:10, fontFamily:'Inter,sans-serif', fontSize:11, color:'#64748B' }}>
                  ⏱️ <strong>Timeline:</strong> {step.timeline}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── NAVIGATION + AUTO-PLAY CONTROLS ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <motion.button
          onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          disabled={currentStep === 0}
          whileHover={{ scale: currentStep === 0 ? 1 : 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: currentStep === 0 ? '#F1F5F9' : 'white',
            border: '1.5px solid rgba(30,58,138,0.15)',
            borderRadius:12, padding:'10px 20px',
            fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700,
            color: currentStep === 0 ? '#94A3B8' : '#1E3A8A',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Previous
        </motion.button>

        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          {/* Step counter */}
          <div style={{ fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700, color:'#64748B' }}>
            {currentStep + 1} / {STEPS.length}
          </div>
          {/* Auto-play */}
          <motion.button
            onClick={() => setAutoPlay(p => !p)}
            whileHover={{ scale:1.04 }}
            style={{
              background: autoPlay ? '#1E3A8A' : 'white',
              border:'1.5px solid rgba(30,58,138,0.15)',
              borderRadius:12, padding:'8px 16px',
              fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700,
              color: autoPlay ? 'white' : '#1E3A8A',
              cursor:'pointer',
            }}
          >
            {autoPlay ? '⏸ Pause' : '▶ Auto-Play'}
          </motion.button>
          {/* Restart */}
          <motion.button
            onClick={() => { setCurrentStep(0); setAutoPlay(false); }}
            whileHover={{ scale:1.04 }}
            style={{
              background:'white', border:'1.5px solid rgba(30,58,138,0.15)',
              borderRadius:12, padding:'8px 16px',
              fontFamily:'Poppins,sans-serif', fontSize:12, fontWeight:700,
              color:'#64748B', cursor:'pointer',
            }}
          >
            ↺ Restart
          </motion.button>
        </div>

        <motion.button
          onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
          disabled={currentStep === STEPS.length - 1}
          whileHover={{ scale: currentStep === STEPS.length - 1 ? 1 : 1.04 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: currentStep === STEPS.length - 1
              ? '#F1F5F9'
              : 'linear-gradient(135deg,#1E3A8A,#2563EB)',
            border:'none', borderRadius:12, padding:'10px 20px',
            fontFamily:'Poppins,sans-serif', fontSize:13, fontWeight:700,
            color: currentStep === STEPS.length - 1 ? '#94A3B8' : 'white',
            cursor: currentStep === STEPS.length - 1 ? 'not-allowed' : 'pointer',
            boxShadow: currentStep === STEPS.length - 1 ? 'none' : '0 6px 18px rgba(30,58,138,0.35)',
          }}
        >
          {currentStep === STEPS.length - 1 ? '✅ Complete!' : 'Next Step →'}
        </motion.button>
      </div>

      {/* ── PHASE QUICK-JUMP ── */}
      <div style={{
        marginTop:20, background:'white',
        border:'1.5px solid rgba(30,58,138,0.08)',
        borderRadius:16, padding:'14px 18px',
      }}>
        <div style={{ fontFamily:'Poppins,sans-serif', fontSize:11, fontWeight:800, color:'#94A3B8', marginBottom:10, textTransform:'uppercase', letterSpacing:'2px' }}>
          Jump to any phase
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {STEPS.map(s => (
            <motion.button key={s.id}
              onClick={() => setCurrentStep(s.id)}
              whileHover={{ scale:1.04 }}
              style={{
                background: currentStep === s.id ? s.color : s.bg,
                border:`1.5px solid ${s.color}66`,
                borderRadius:99, padding:'5px 12px',
                fontFamily:'Inter,sans-serif', fontSize:11, fontWeight:600,
                color: currentStep === s.id ? 'white' : s.color,
                cursor:'pointer', transition:'all 0.2s',
              }}
            >
              {s.icon} {s.phase}
            </motion.button>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
