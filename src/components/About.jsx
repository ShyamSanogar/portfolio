import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section container" style={{ padding: '4rem 2rem 4rem 2rem', position: 'relative' }}>

            {/* Background Pattern - subtle dots */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(var(--text-secondary) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                opacity: 0.05,
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '0 2rem' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: 'clamp(3.5rem, 6vw, 7.5rem)',
                        lineHeight: 0.95,
                        textTransform: 'uppercase',
                        marginBottom: '4rem',
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        width: '100%',
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <span style={{ display: 'block', whiteSpace: 'nowrap' }}>IAM SHYAM SANOGAR BASED IN</span>
                    <span style={{ display: 'block', whiteSpace: 'nowrap' }}>PUNJAB, INDIA<span style={{ color: '#7cfc00' }}>.</span></span>
                </motion.h2>

                <div style={{ maxWidth: '850px' }}>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontSize: '1rem',
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: 1.7,
                            fontWeight: 400
                        }}
                    >
                       I AM A COMPUTER SCIENCE STUDENT DRIVEN BY CURIOSITY AND A PASSION FOR SOLVING COMPLEX PROBLEMS, FOCUSED ON TURNING IDEAS INTO IMPACTFUL SOLUTIONS. WITH A STRONG ANALYTICAL MINDSET, I STRIVE TO CREATE VALUE AND CONTINUOUSLY GROW AS A FORWARD-THINKING TECH PROFESSIONAL.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default About;
