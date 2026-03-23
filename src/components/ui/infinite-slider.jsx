import React from 'react';
import { motion } from 'framer-motion';

export function InfiniteSlider({ children, gap = 24, reverse = false, duration = 30 }) {
  const content = React.Children.toArray(children);
  
  // Duplicate children to ensure seamless looping without visual jumps.
  // Standard technique is to clone items, translating the container over 50% and instantly resetting.
  const items = [...content, ...content, ...content, ...content];

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
        <motion.div
           // We animate from 0% left to -50% left relative to the container of duplicated items
           // To avoid visual popping, the exact translation depends on the geometry, 
           // but an established framer-motion pattern is this array configuration:
          animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: "linear", duration }}
          style={{ display: 'flex', gap: `${gap}px`, width: 'max-content', alignItems: 'center' }}
        >
          {items.map((child, index) => (
            <div key={index} style={{ flexShrink: 0 }}>
              {child}
            </div>
          ))}
        </motion.div>
    </div>
  );
}
