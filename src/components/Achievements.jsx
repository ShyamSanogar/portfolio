import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, ExternalLink } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        {
            title: "LeetCode Milestone",
            description: "Solved 100+ Data Structures and Algorithms problems on LeetCode",
            link: "https://leetcode.com/u/Shyam_SAN/",
            icon: <Trophy size={24} color="#ffa116" />,
            tag: "ALGORITHMS"
        },
        {
            title: "HackerRank Achievement",
            description: "Achieved the HackerRank Python Silver Badge in Python programming",
            link: "https://www.hackerrank.com/profile/shyamsanogar10", 
            icon: <Award size={24} color="#2ec866" />,
            tag: "PYTHON"
        }
    ];

    return (
        <section id="achievements" className="section container" style={{ padding: '8rem 2rem' }}>
            <div className="section-prefix">Recognitions</div>
            
            <h2 style={{ 
                fontSize: 'clamp(3rem, 7vw, 6rem)', 
                lineHeight: 0.9, 
                textTransform: 'uppercase', 
                marginBottom: '5rem',
                fontWeight: 900,
                letterSpacing: '-0.04em'
            }}>
                ACCOMPLISH<br />
                MENTS<span style={{ color: '#7cfc00' }}>.</span>
            </h2>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '2vw' 
            }}>
                {achievements.map((achievement, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            background: 'var(--bg-color)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            padding: '3rem',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            minHeight: '300px',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Background subtle icon */}
                        <div style={{ 
                            position: 'absolute', 
                            top: '-20px', 
                            right: '-20px', 
                            opacity: 0.03, 
                            transform: 'scale(5)' 
                        }}>
                            {achievement.icon}
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <span style={{ 
                                    padding: '0.4rem 1rem', 
                                    border: '1px solid rgba(255,255,255,0.2)', 
                                    borderRadius: '100px', 
                                    fontSize: '0.65rem', 
                                    fontWeight: 700, 
                                    letterSpacing: '0.1em' 
                                }}>
                                    {achievement.tag}
                                </span>
                                {achievement.icon}
                            </div>
                            
                            <h3 style={{ 
                                fontSize: '1.8rem', 
                                fontWeight: 800, 
                                marginBottom: '1rem', 
                                lineHeight: 1.2,
                                textTransform: 'uppercase'
                            }}>
                                {achievement.title}
                            </h3>
                            
                            <p style={{ 
                                color: 'rgba(255, 255, 255, 0.6)', 
                                fontSize: '0.95rem', 
                                lineHeight: 1.6,
                                marginBottom: '2rem'
                            }}>
                                {achievement.description}
                            </p>
                        </div>

                        <a 
                            href={achievement.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '0.5rem', 
                                color: 'var(--text-primary)', 
                                textDecoration: 'none',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                letterSpacing: '0.05em'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#7cfc00'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                        >
                            VIEW PROFILE <ExternalLink size={14} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Achievements;
