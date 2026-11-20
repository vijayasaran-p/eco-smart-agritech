import React from 'react';
import { motion } from 'framer-motion';

export default function EcoButton({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  icon,
  size = 'md',
  className = '',
  type = 'button',
}) {
  const sizeMap = {
    sm: { padding: '7px 14px', fontSize: '12px' },
    md: { padding: '10px 20px', fontSize: '13.5px' },
    lg: { padding: '13px 26px', fontSize: '15px' },
  };

  return (
    <motion.button
      type={type}
      className={`eco-btn eco-btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={sizeMap[size]}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {icon && <span className="eco-btn-icon">{icon}</span>}
      {children}
    </motion.button>
  );
}
