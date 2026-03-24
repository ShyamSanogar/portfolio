import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileCheck } from 'lucide-react';

const Certificates = () => {
    const certificates = [
        {
            title: "Privacy and Security in Online Social Media",
            issuer: "NPTEL (Elite Certificate)",
            date: "Nov '25",
            link: "https://drive.google.com/file/d/1ec_J-s_w2Ce1i7OVVNONL_YTBDvsJa3M/view?usp=sharing" 
        },
        {
            title: "Java Programming",
            issuer: "iamNeo",
            date: "Jul '25",
            link: "https://drive.google.com/file/d/16LaTx-T1MR57SBHxkAUnknEqv_23tBhv/view?usp=sharing" 
        },
        {
            title: "Data Structures and Algorithm",
            issuer: "iamNeo",
            date: "Dec '24",
            link: "https://drive.google.com/file/d/1QuzJe-_HHNZluxvm7qV6FktIlwpmJDJg/view?usp=sharing" 
        },
        {
            title: "Object Oriented Programming (C++)",
            issuer: "iamNeo",
            date: "Dec '24",
            link: "https://drive.google.com/file/d/1LyzFEJmgzUZZ-hUJuVVWJRnWjt4pQsX9/view?usp=sharing" 
        },
        {
            title: "Introduction to Hardware and Operating Systems",
            issuer: "Coursera (IBM)",
            date: "Oct '24",
            link: "#" // Placeholder
        },
        {
            title: "Fundamentals of Network Communication",
            issuer: "Coursera",
            date: "Sep '24",
            link: "#" // Placeholder
        }
    ];

    return (
        <section id="certificates" className="section container" style={{ padding: '8rem 2rem' }}>
            <div className="section-prefix">Certifications</div>
            
            <h2 style={{ 
                fontSize: 'clamp(3rem, 7vw, 6rem)', 
                lineHeight: 0.9, 
                textTransform: 'uppercase', 
                marginBottom: '5rem',
                fontWeight: 900,
                letterSpacing: '-0.04em'
            }}>
                PROFESSIONAL<br />
                LICENSES<span style={{ color: '#7cfc00' }}>.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {/* Table Header */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1.5fr 1fr 0.5fr', 
                    padding: '1.5rem 1rem', 
                    borderBottom: '2px solid var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase'
                }}>
                    <span>Certificate Name</span>
                    <span>Issuing Organization</span>
                    <span>Date</span>
                    <span style={{ textAlign: 'right' }}>Action</span>
                </div>

                {/* Table Body */}
                {certificates.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: '2fr 1.5fr 1fr 0.5fr', 
                            padding: '2rem 1rem', 
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            alignItems: 'center',
                            transition: 'background 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        <span style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: 700, 
                            textTransform: 'uppercase',
                            letterSpacing: '-0.01em'
                        }}>
                            {cert.title}
                        </span>
                        
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            {cert.issuer}
                        </span>
                        
                        <span style={{ 
                            fontFamily: 'var(--font-mono)', 
                            fontSize: '0.85rem',
                            color: 'var(--text-secondary)' 
                        }}>
                            {cert.date}
                        </span>

                        <div style={{ textAlign: 'right' }}>
                            <a 
                                href={cert.link} 
                                style={{ 
                                    color: 'var(--text-primary)', 
                                    opacity: 0.4,
                                    transition: 'opacity 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
                                onClick={(e) => { if (cert.link === '#') e.preventDefault(); }}
                            >
                                <ExternalLink size={18} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Certificates;
