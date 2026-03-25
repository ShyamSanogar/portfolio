import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, BadgeCheck } from 'lucide-react';

const Hero = ({ menuOpen, setMenuOpen }) => {
    const [currentTime, setCurrentTime] = useState("");
    const [location, setLocation] = useState("46° 28' 58.62\" N");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };

        updateTime(); // initial call
        const intervalId = setInterval(updateTime, 1000);

        // Fetch user location dynamically
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const formatCoord = (deg, isLat) => {
                        const abs = Math.abs(deg);
                        const d = Math.floor(abs);
                        const m = Math.floor((abs - d) * 60);
                        const s = (((abs - d) * 60) - m) * 60;
                        const dir = isLat ? (deg >= 0 ? "N" : "S") : (deg >= 0 ? "E" : "W");
                        return `${d}° ${m}' ${s.toFixed(2)}" ${dir}`;
                    };
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setLocation(`${formatCoord(lat, true)}, ${formatCoord(lng, false)}`);
                }, 
                () => {
                    setLocation("LOCATION UNAVAILABLE");
                }
            );
        }

        return () => clearInterval(intervalId);
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const opacity1 = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section id="home" className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px', position: 'relative' }}>

            {/* Top Bar matching image layout */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="small-caps"
                style={{
                    position: 'absolute',
                    top: '120px',
                    left: '2rem',
                    right: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 10
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                        lineHeight: 1
                    }}>
                        SSR<span style={{ color: '#7cfc00' }}>.</span>
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>LOCAL / <span style={{ color: 'var(--text-primary)' }}>{currentTime}</span></span>
                </div>

                {/* Center Menu Toggle */}
                <div style={{ position: 'relative' }}>
                    <motion.div
                        onClick={() => setMenuOpen(!menuOpen)}
                        animate={{ rotate: menuOpen ? 90 : 0 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 400, damping: 30 }}
                        style={{
                            position: 'relative',
                            width: '40px',
                            height: '40px',
                            cursor: 'pointer',
                            zIndex: 100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <AnimatePresence mode="wait">
                            {!menuOpen ? (
                                <motion.div
                                    key="dots"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 6px)',
                                        gap: '4px'
                                    }}
                                >
                                    {/* 4 solid white dots */}
                                    <div style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '50%' }} />
                                    <div style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '50%' }} />
                                    <div style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '50%' }} />
                                    <div style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '50%' }} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="close"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Thin X centered in circle */}
                                    <div style={{ position: 'absolute', width: '14px', height: '1.5px', background: '#FFFFFF', rotate: '45deg' }} />
                                    <div style={{ position: 'absolute', width: '14px', height: '1.5px', background: '#FFFFFF', rotate: '-45deg' }} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Full-Screen Overlay Navigation Menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100vw',
                                    height: '100vh',
                                    background: 'var(--bg-color)', // Pure black background
                                    zIndex: 90, // Just below the close button which is zIndex: 100
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingTop: '60px' // Leave space for top navbar
                                }}
                            >
                                {/* Grid background same as global to keep consistency */}
                                <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: -1 }} />

                                {/* Top Left Coords */}
                                <div style={{ position: 'absolute', top: '40px', left: '4vw', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', letterSpacing: '0.05em', zIndex: 10 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>LOCAL / </span>
                                    <span style={{ color: 'var(--text-primary)' }}>{location}</span>
                                </div>

                                {/* Top Right Buttons */}
                                <div style={{
                                    position: 'absolute',
                                    top: '30px',
                                    right: '4vw',
                                    display: 'flex',
                                    gap: '1rem',
                                    zIndex: 10
                                }}>
                                    <a href="https://drive.google.com/file/d/1tsN9amBqfPq6E6DRcUHyKOIEtCxaiz0h/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={{
                                        border: '1px solid var(--text-primary)',
                                        padding: '0.6rem 1.8rem',
                                        borderRadius: '100px',
                                        color: 'var(--text-primary)',
                                        background: 'transparent',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--text-primary)';
                                            e.currentTarget.style.color = 'var(--bg-color)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }}
                                    >
                                        RESUME
                                    </a>
                                    <a href="#contact" onClick={() => setMenuOpen(false)} style={{
                                        border: '1px solid var(--text-primary)',
                                        padding: '0.6rem 1.8rem',
                                        borderRadius: '100px',
                                        color: 'var(--bg-color)',
                                        background: 'var(--text-primary)',
                                        transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        letterSpacing: '0.05em',
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'var(--text-primary)';
                                            e.currentTarget.style.color = 'var(--bg-color)';
                                        }}
                                    >
                                        CONTACT NOW
                                    </a>
                                </div>

                                {/* Bottom Left Copyright */}
                                <div style={{ position: 'absolute', bottom: '40px', left: '4vw', color: 'var(--text-primary)', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500, zIndex: 10 }}>
                                    ©2024 ALL RIGHTS RESERVED
                                </div>

                                {/* Bottom Right Social Links */}
                                <div style={{ position: 'absolute', bottom: '40px', right: '4vw', display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', zIndex: 10 }}>
                                    {[
                                        { label: 'LEETCODE', href: 'https://leetcode.com/u/Shyam_SAN/' },
                                        { label: 'GITHUB', href: 'https://github.com/ShyamSanogar' },
                                        { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/shyamsanogar/' }
                                    ].map(social => (
                                        <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem', transition: 'color 0.3s ease' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                                        >
                                            {social.label} <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>↗</span>
                                        </a>
                                    ))}
                                </div>

                                {[{ id: 'home', label: 'HOME' }, { id: 'skills', label: 'SKILLS' }, { id: 'projects', label: 'PROJECTS' }, { id: 'achievements', label: 'ACHIEVEMENTS' }, { id: 'certificates', label: 'CERTIFICATES' }, { id: 'training', label: 'TRAINING & EDUCATION' }].map((item, index) => (
                                    <div key={item.id} style={{ overflow: 'hidden', padding: '5px 2vw' }}>
                                        <motion.a
                                            href={item.id === 'home' ? '#' : `#${item.id}`}
                                            onClick={() => {
                                                if (item.id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
                                                setMenuOpen(false);
                                            }}
                                            initial={{ y: '100%' }} // Start pushed below clipping mask
                                            animate={{ y: 0 }}
                                            exit={{ y: '-100%', opacity: 0 }}
                                            transition={{
                                                duration: 0.7,
                                                ease: [0.16, 1, 0.3, 1], // Apple/Framer spring-like ease
                                                delay: index * 0.08 // Staggered entrance
                                            }}
                                            style={{
                                                display: 'block',
                                                color: item.id === 'home' ? 'var(--text-secondary)' : 'var(--text-primary)',
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: 'clamp(2.5rem, 6.5vw, 6rem)', // Refined size to fit 6 items 100% cleanly
                                                lineHeight: 0.85,
                                                letterSpacing: '-0.05em',
                                                textAlign: 'center',
                                                textDecoration: 'none',
                                                transition: 'color 0.3s ease',
                                                fontWeight: 800,
                                                textTransform: 'uppercase'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = item.id === 'home' ? 'var(--text-primary)' : 'var(--text-secondary)'; // Turn grey on hover like template
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = item.id === 'home' ? 'var(--text-secondary)' : 'var(--text-primary)';
                                            }}
                                        >
                                            {item.label}
                                        </motion.a>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <a href="#contact" style={{
                    border: '1px solid var(--text-primary)',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '100px',
                    color: 'var(--text-primary)',
                    background: 'transparent',
                    transition: 'all 0.3s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--text-primary)';
                        e.currentTarget.style.color = 'var(--bg-color)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                >
                    CONTACT NOW
                </a>
            </motion.div>

            <motion.div style={{ y: y1, opacity: opacity1, zIndex: 1, marginTop: '-3rem' }}>

                {/* Massive Center Typographic Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        style={{
                            fontSize: 'clamp(4rem, 18vw, 15rem)',
                            lineHeight: 0.85,
                            color: 'var(--text-primary)',
                            textAlign: 'center',
                            width: '100%',
                            margin: 0
                        }}
                    >
                        SHYAM
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(4rem, 18vw, 15rem)',
                            lineHeight: 0.85,
                            color: 'var(--text-primary)',
                            textAlign: 'center',
                            width: '100%',
                            margin: 0
                        }}
                    >
                        SANOGA<span style={{ color: '#7cfc00' }}>R.</span>
                    </motion.h1>
                </div>

            </motion.div>

            {/* Bottom 3-Column Info Row */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="small-caps"
                style={{
                    position: 'absolute',
                    bottom: '5rem',
                    left: 0,
                    right: 0,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 6vw',
                    gap: '1rem',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                }}
            >
                {/* Item 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', flex: 1 }}>
                    <MapPin color="#7cfc00" size={24} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.75rem', lineHeight: 1.4, letterSpacing: '0.05em' }}>
                        BASED IN JALANDHAR,<br />
                        PUNJAB, INDIA
                    </span>
                </div>

                {/* Item 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', flex: 1 }}>
                    <Globe color="var(--text-secondary)" size={24} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.75rem', lineHeight: 1.4, letterSpacing: '0.05em' }}>
                        AVAILABLE ALL AROUND<br />
                        WORLDWIDE
                    </span>
                </div>

                {/* Item 3 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', flex: 1 }}>
                    <BadgeCheck color="#00a8ff" size={24} strokeWidth={1.5} />
                    <span style={{ fontSize: '0.75rem', lineHeight: 1.4, letterSpacing: '0.05em' }}>
                        DATA SCIENTIST<br />
                        + DEVELOPER 
                    </span>
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
