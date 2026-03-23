import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Rewind, FastForward } from "lucide-react";

const createInfiniteItems = (originalItems) => {
  const items = [];
  for (let i = 0; i < 3; i++) {
    originalItems.forEach((item, index) => {
      items.push({
        ...item,
        id: `${i}-${item.id}`,
        originalIndex: index,
      });
    });
  }
  return items;
};

const RulerLines = ({ top = true, totalLines = 100 }) => {
  const lines = [];
  const lineSpacing = 100 / (totalLines - 1);

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isCenter = i === Math.floor(totalLines / 2);

    let height = "3px";
    let color = "var(--card-border)";

    if (isCenter) {
      height = "12px";
      color = "var(--text-primary)";
    } else if (isFifth) {
      height = "6px";
      color = "var(--text-primary)";
    }

    const style = {
      position: 'absolute',
      width: '2px',
      height: height,
      backgroundColor: color,
      left: `${i * lineSpacing}%`,
    };

    if (!top) {
      style.bottom = 0;
    } else {
      style.top = 0;
    }

    lines.push(<div key={i} style={style} />);
  }

  return <div style={{ position: 'relative', width: '100%', height: '12px', padding: '0 1rem' }}>{lines}</div>;
};

export function RulerCarousel({ originalItems, autoPlayInterval = 3000 }) {
  const infiniteItems = createInfiniteItems(originalItems);
  const itemsPerSet = originalItems.length;

  const initialCenterIndex = itemsPerSet + Math.floor(itemsPerSet / 2);
  const [activeIndex, setActiveIndex] = useState(initialCenterIndex);
  const [isResetting, setIsResetting] = useState(false);

  const handleItemClick = (newIndex) => {
    if (isResetting) return;

    const targetOriginalIndex = newIndex % itemsPerSet;
    const possibleIndices = [
      targetOriginalIndex,
      targetOriginalIndex + itemsPerSet,
      targetOriginalIndex + itemsPerSet * 2,
    ];

    let closestIndex = possibleIndices[0];
    let smallestDistance = Math.abs(possibleIndices[0] - activeIndex);

    for (const index of possibleIndices) {
      const distance = Math.abs(index - activeIndex);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = index;
      }
    }

    setActiveIndex(closestIndex);
  };

  const handlePrevious = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isResetting) return;
    setActiveIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (isResetting) return;

    if (activeIndex < itemsPerSet) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex + itemsPerSet);
        setIsResetting(false);
      }, 0);
    } else if (activeIndex >= itemsPerSet * 2) {
      setIsResetting(true);
      setTimeout(() => {
        setActiveIndex(activeIndex - itemsPerSet);
        setIsResetting(false);
      }, 0);
    }
  }, [activeIndex, itemsPerSet, isResetting]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isResetting) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((prev) => prev - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResetting]);

  // Auto-play feature driving continuous linear motion
  useEffect(() => {
    if (isResetting || !autoPlayInterval) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [activeIndex, isResetting, autoPlayInterval]);

  // Compute absolute mathematically perfect centering regardless of item count
  const itemWidth = 180;
  const gap = 20;
  const stepSize = itemWidth + gap;
  const totalItems = infiniteItems.length;
  const totalWidth = (totalItems * stepSize) - gap;
  const motionDivCenter = totalWidth / 2;
  const activeItemCenter = (activeIndex * stepSize) + (itemWidth / 2);
  const targetX = motionDivCenter - activeItemCenter;

  const currentPage = (activeIndex % itemsPerSet) + 1;
  const totalPages = itemsPerSet;

  // Use a strictly linear, uninterrupted tween to simulate a physical infinite roller
  const activeTransition = isResetting 
    ? { duration: 0 } 
    : { type: "tween", ease: "linear", duration: autoPlayInterval / 1000 };

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      padding: '1.5rem 0'
    }}>
      <div style={{
        width: '100%',
        height: '75px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RulerLines top={true} />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: `${gap}px` }}
            animate={{ x: targetX }}
            transition={activeTransition}
          >
            {infiniteItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(index)}
                  style={{
                    fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: `${itemWidth}px`,
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-heading)',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    letterSpacing: '-0.02em',
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={activeTransition}
                >
                  {item.title}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RulerLines top={false} />
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
        <button
          onClick={handlePrevious}
          disabled={isResetting}
          style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex' }}
          aria-label="Previous item"
        >
          <Rewind size={14} color="var(--text-primary)" style={{ opacity: 0.8 }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            {currentPage}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--card-border)' }}>/</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
            {totalPages}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={isResetting}
          style={{ cursor: 'pointer', background: 'none', border: 'none', display: 'flex' }}
          aria-label="Next item"
        >
          <FastForward size={14} color="var(--text-primary)" style={{ opacity: 0.8 }} />
        </button>
      </div>
    </div>
  );
}
