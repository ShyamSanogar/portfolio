import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShaderAnimation } from './ui/shader-animation';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  // Theme variables mapping from the prompt
  const theme = {
    bg: '#0a0a0a',
    text: '#f5f5f5',
    muted: '#888888',
    stroke: '#1f1f1f',
    fontDisplay: 'var(--font-display)'
  };

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Handle counter 0-100 over 2.7s using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();
    const duration = 2700;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      let newProgress = (elapsed / duration) * 100;

      if (newProgress >= 100) {
        newProgress = 100;
        setProgress(newProgress);
        // Wait 400ms after reaching 100, then fire onComplete
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 400);
      } else {
        setProgress(newProgress);
        animationFrameId = requestAnimationFrame(updateCounter);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: theme.bg,
        color: theme.text,
        overflow: 'hidden'
      }}
    >
      {/* Background Shader Animation */}
      <ShaderAnimation />

      {/* Element 1: "Portfolio" Label (Top-Left) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem', // top-8 left-8 equivalent
          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
          color: theme.muted,
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          fontFamily: 'var(--font-sans)',
        }}
      >
      </motion.div>

      {/* Element 2: Static SSR Text (Center) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
      }}>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            fontFamily: theme.fontDisplay,
            color: 'rgba(255, 255, 255, 0.95)',
            lineHeight: 1,
            textShadow: '0 0 40px rgba(0,0,0,0.5)',
            fontWeight: 600,
            letterSpacing: '-0.02em'
          }}
        >
          SSR<span style={{ color: '#7cfc00' }}>.</span>
        </motion.span>
      </div>

      {/* Element 3: Counter (Bottom-Right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '2rem',
          fontSize: 'clamp(3.75rem, 10vw, 8rem)',
          fontFamily: theme.fontDisplay,
          color: theme.text,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1
        }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* Element 4: Progress Bar (Bottom Edge) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '3px',
        backgroundColor: 'rgba(31, 31, 31, 0.5)' // stroke/50
      }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
          style={{
            height: '100%',
            transformOrigin: 'left',
            background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)'
          }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
