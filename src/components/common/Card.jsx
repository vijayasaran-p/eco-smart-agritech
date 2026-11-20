import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  variant = 'default',
  style = {},
  animate = true,
  delay = 0,
}) {
  const variantClass =
    variant === 'green' ? 'card card-green' :
    variant === 'accent' ? 'card card-accent' :
    'card';

  const content = (
    <div className={`${variantClass} ${className}`} style={style}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className={`${variantClass} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
