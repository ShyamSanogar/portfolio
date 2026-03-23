import React from 'react';
import { motion } from 'framer-motion';

const ResumeButton = () => {
  return (
    <motion.a
      href="https://drive.google.com/file/d/1tsN9amBqfPq6E6DRcUHyKOIEtCxaiz0h/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 40,
        background: 'var(--text-primary)',
        color: 'var(--bg-color)',
        padding: '0.8rem 1.5rem',
        borderRadius: '100px',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.9rem',
        fontWeight: 800,
        letterSpacing: '0.05em',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        cursor: 'pointer'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      whileHover={{ 
        scale: 1.05, 
        backgroundColor: 'var(--bg-color)', 
        color: 'var(--text-primary)',
        borderColor: 'var(--text-primary)'
      }}
      whileTap={{ scale: 0.95 }}
    >
      RESUME
      <span style={{ fontSize: '1.2rem', lineHeight: 1, fontWeight: 400 }}>↗</span>
    </motion.a>
  );
};

export default ResumeButton;
