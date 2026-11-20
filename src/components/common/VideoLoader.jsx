import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import loaderVideo from '../../assets/loader.mp4';

export default function VideoLoader({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        // We match the background to the blue in the prompt so the video blends in.
        background: '#1E3A8A', 
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'relative',
        width: 300, 
        height: 300, 
        marginBottom: 32,
        borderRadius: '50%',
        overflow: 'hidden',
        // Soft glowing shadow to mask the edges of the video further
        boxShadow: '0 0 50px 20px #1E3A8A inset, 0 0 40px rgba(34, 197, 94, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* We use scale and object-fit to crop out watermarks or edges */}
        <video 
          src={loaderVideo}
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            width: '120%', 
            height: '120%', 
            objectFit: 'cover',
            transform: 'scale(1.1)', // Slight zoom to crop out any generated watermarks
            mixBlendMode: 'lighten', // This helps blend the colors naturally with the container
          }}
        />
        {/* Inner shadow overlay to blur out the edges of the square video */}
        <div style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 40px #1E3A8A',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{ height: 60, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>
              Processing...
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {text || 'Loading Data Module'}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
