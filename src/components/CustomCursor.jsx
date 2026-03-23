import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '16px',
                height: '16px',
                backgroundColor: 'white',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 10000,
                mixBlendMode: 'difference'
            }}
            animate={{
                x: mousePosition.x - 8,
                y: mousePosition.y - 8
            }}
            transition={{
                type: "tween",
                ease: "backOut",
                duration: 0.05
            }}
        />
    );
};

export default CustomCursor;
