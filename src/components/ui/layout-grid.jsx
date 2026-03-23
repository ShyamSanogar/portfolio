import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div style={{
        width: '100%',
        minHeight: '600px',
        padding: '2.5rem 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        maxWidth: '1200px',
        margin: '0 auto',
        gap: '2rem',
        position: 'relative'
    }}>
      {cards.map((card, i) => (
        <div key={i} style={{ 
            gridColumn: card.colSpan, 
            height: '400px', // Set explicit height for grid items 
            position: 'relative' 
        }}>
          <motion.div
            onClick={() => handleClick(card)}
            style={{
                position: selected?.id === card.id ? 'fixed' : 'relative',
                top: selected?.id === card.id ? '50%' : 'auto',
                left: selected?.id === card.id ? '50%' : 'auto',
                transform: selected?.id === card.id ? 'translate(-50%, -50%) !important' : 'none',
                height: selected?.id === card.id ? '60vh' : '100%',
                width: selected?.id === card.id ? '80vw' : '100%',
                maxWidth: selected?.id === card.id ? '900px' : 'none',
                margin: selected?.id === card.id ? 'auto' : 0,
                zIndex: selected?.id === card.id ? 100 : (lastSelected?.id === card.id ? 40 : 1),
                backgroundColor: '#111',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            layoutId={`card-${card.id}`}
          >
            {/* Number overlaid when NOT selected */}
            {selected?.id !== card.id && (
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    zIndex: 20,
                    fontSize: '2rem',
                    color: '#ffffff',
                    fontWeight: 900,
                    textShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    fontFamily: 'var(--font-heading)'
                }}>
                    0{i + 1}
                </div>
            )}

            {/* Title overlaid when NOT selected */}
            {selected?.id !== card.id && (
                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '2rem',
                    right: '2rem',
                    zIndex: 20,
                    textShadow: '0 4px 12px rgba(0,0,0,0.8)'
                }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {card.title}
                    </h3>
                </div>
            )}

            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        style={{
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            left: 0,
            top: 0,
            backgroundColor: '#000000',
            zIndex: 90, // Overlay is right below the fixed card (100)
            pointerEvents: selected?.id ? 'auto' : 'none',
            opacity: selected?.id ? 0.8 : 0
        }}
        animate={{ opacity: selected?.id ? 0.8 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      style={{
          objectFit: 'cover',
          objectPosition: 'center',
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
          transition: 'all 0.5s ease'
      }}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div style={{
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        zIndex: 60
    }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        style={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 100%)',
            zIndex: 10
        }}
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
            position: 'relative',
            padding: '3rem',
            zIndex: 70
        }}
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
