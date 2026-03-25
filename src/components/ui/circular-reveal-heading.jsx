"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from "@/lib/utils"
import aboutPhoto from "../../assets/about-me.jpg"

const sizeConfig = {
    sm: {
        container: 'h-[300px] w-[300px]',
        fontSize: 'text-[10px]',
        tracking: 'tracking-[0.2em]',
        radius: 120,
        gap: 25,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-semibold'
    },
    md: {
        container: 'h-80 w-80',
        fontSize: 'text-[11px]',
        tracking: 'tracking-[0.22em]',
        radius: 128,
        gap: 22,
        imageSize: 'w-[80%] h-[80%]',
        textStyle: 'font-bold',
    },
    lg: {
        container: 'h-[500px] w-[500px]',
        fontSize: 'text-sm',
        tracking: 'tracking-[0.3em]',
        radius: 200,
        gap: 15,
        imageSize: 'w-[75%] h-[75%]',
        textStyle: 'font-semibold'
    }
};

const usePreloadImages = (images) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const loadImage = (url) =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = reject;
            });

        Promise.all(images.map(loadImage))
            .then(() => setLoaded(true))
            .catch(err => console.error('Error preloading images:', err));
    }, [images]);

    return loaded;
};

const ImagePreloader = ({ images }) => (
    <div className="hidden" aria-hidden="true">
        {images.map((src, index) => (
            <img key={index} src={src} alt="" />
        ))}
    </div>
);

const ImageOverlay = ({ image, size = 'md' }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
    >
        <motion.img
            src={image}
            alt=""
            className={cn(
                sizeConfig[size].imageSize,
                "object-cover rounded-full"
            )}
            style={{ filter: 'brightness(0.9)' }}
        />
    </motion.div>
);

export const CircularRevealHeading = ({
    items,
    centerText,
    className,
    size = 'md'
}) => {
    const [activeImage, setActiveImage] = useState(null);
    const config = sizeConfig[size];
    const imagesLoaded = usePreloadImages(items.map(item => item.image));

    const createTextSegments = () => {
        const totalItems = items.length;
        const totalGapDegrees = config.gap * totalItems;
        const availableDegrees = 360 - totalGapDegrees;
        const segmentDegrees = availableDegrees / totalItems;
        return items.map((item, index) => {
            const startPosition = index * (segmentDegrees + config.gap);
            const startOffset = `${(startPosition / 360) * 100}%`;
            return (
                <g key={index}>
                    <text
                        className={cn(
                            config.fontSize,
                            config.tracking,
                            config.textStyle,
                            "uppercase cursor-pointer transition-all duration-300"
                        )}
                        onMouseEnter={() => imagesLoaded && setActiveImage(item.image)}
                        onMouseLeave={() => setActiveImage(null)}
                        style={{
                            filter: 'url(#textShadow)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <textPath
                            href="#curve"
                            className="fill-[#444444] hover:fill-[#000000]"
                            startOffset={startOffset}
                            textLength={`${segmentDegrees * 1.8}`}
                            lengthAdjust="spacingAndGlyphs"
                        >
                            {item.text}
                        </textPath>
                    </text>
                </g>
            );
        });
    };

    return (
        <>
            <ImagePreloader images={items.map(item => item.image)} />
            <motion.div
                whileHover={{
                    boxShadow: "20px 20px 40px rgba(0,0,0,0.1), -20px -20px 40px rgba(255,255,255,0.05)"
                }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative overflow-hidden",
                    config.container,
                    "rounded-full bg-[#111111]", // Using dark background for brutalist theme
                    "shadow-[16px_16px_32px_rgba(0,0,0,0.2),-16px_-16px_32px_rgba(255,255,255,0.02)]",
                    "transition-all duration-500 ease-out border border-[#333333]",
                    className
                )}
            >
                <AnimatePresence mode='wait'>
                    {activeImage && imagesLoaded && (
                        <ImageOverlay image={activeImage} size={size} />
                    )}
                </AnimatePresence>

                {/* Neomorphism Inner Rings - adjusted for dark theme */}
                <motion.div
                    className="absolute inset-[2px] rounded-full bg-[#111111]"
                    style={{
                        boxShadow: "inset 6px 6px 12px rgba(0,0,0,0.3), inset -6px -6px 12px rgba(255,255,255,0.02)"
                    }}
                />

                <motion.div
                    className="absolute inset-[12px] rounded-full bg-[#111111]"
                    style={{
                        boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(255,255,255,0.02)"
                    }}
                />

                {/* Center Content: NOW WITH IMAGE AS REQUESTED */}
                <motion.div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode='wait'>
                        {!activeImage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 flex flex-col items-center justify-center gap-4"
                            >
                                {/* Profile Photo integrated into the center */}
                                <div className="w-36 h-36 rounded-full border-2 border-[#333333] p-1 bg-[#1a1a1a] shadow-lg overflow-hidden">
                                     <img 
                                        src={aboutPhoto} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                {centerText && (
                                    <div className="p-3 px-6 rounded-full bg-[#111111] border border-[#333333] shadow-inner text-white uppercase tracking-widest text-xs font-bold">
                                        {centerText}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                        <path
                            id="curve"
                            fill="none"
                            d={`M 200,200 m -${config.radius},0 a ${config.radius},${config.radius} 0 1,1 ${config.radius * 2},0 a ${config.radius},${config.radius} 0 1,1 -${config.radius * 2},0`}
                        />
                        {createTextSegments()}
                    </svg>
                </motion.div>
            </motion.div>
        </>
    );
};
