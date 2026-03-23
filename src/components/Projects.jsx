import { motion } from 'framer-motion';
import Globe from './ui/Globe';

// Import project images
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';

const Projects = () => {
    const projects = [
        {
            title: "Quantitative Analysis",
            subtitle: "NSE Stocks",
            date: "2025",
            type: "Python / Data Science",
            skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
            description: "Evaluating performance, risk exposure, and return potential. Computed ROI, daily returns, volatility, and Beta while implementing moving averages.",
            link: "https://github.com/ShyamSanogar/Stock-Market-Analysis-Using-Python",
            image: project1
        },
        {
            title: "Air Quality Index",
            subtitle: "Dashboard India",
            date: "2025",
            type: "Excel / Data Viz",
            skills: ["Excel", "Power BI", "Data Analysis"],
            description: "Interactive dashboard visualizing state-wise AQI levels across India, integrating pollutant metrics.",
            link: "https://github.com/ShyamSanogar/Air-Quality-Analysis-Dashboard",
            image: project2
        },
        {
            title: "Stock Prediction",
            subtitle: "Deep Learning",
            date: "2025",
            type: "LSTM / Keras",
            skills: ["Python", "TensorFlow", "Keras", "Scikit-\u200blearn"],
            description: "Deep learning pipeline to forecast stock movements based on historical market data and technical indicators.",
            link: "https://github.com/ShyamSanogar/Deep-Learning-Based-Stock-Price-Prediction-Using-LSTM-2018-2025-Forecasting-",
            image: project3
        }
    ];

    return (
        <section id="projects" className="section container" style={{ padding: '8rem 2rem' }}>
            <div className="section-prefix">Selected Work</div>

            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, textTransform: 'uppercase', marginBottom: '4rem' }}>
                SELECTED<br />
                WORK<span style={{ color: '#7cfc00' }}>.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12rem', marginTop: '4rem' }}>
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ position: 'relative' }}
                    >
                        {/* Meta Data Top Bar */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '3rem',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            paddingBottom: '1.5rem'
                        }}>
                            <div style={{ display: 'flex', gap: '2rem' }}>
                                <span className="small-caps" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>0{idx + 1} / {project.date}</span>
                                <span className="small-caps" style={{ opacity: 0.5 }}>{project.type}</span>
                            </div>
                            <span className="small-caps" style={{ letterSpacing: '0.2em' }}>SELECTED WORK</span>
                        </div>

                        {/* Split Content: Info / Image */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '4vw',
                            alignItems: 'flex-start'
                        }}>
                            {/* Left: Project Info */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                <div>
                                    <h3 style={{
                                        fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                                        lineHeight: 0.85,
                                        marginBottom: '1rem',
                                        textTransform: 'uppercase',
                                        fontWeight: 800,
                                        letterSpacing: '-0.03em'
                                    }}>
                                        {project.title}
                                    </h3>
                                    <h4 style={{
                                        fontSize: 'clamp(1.2rem, 2vw, 2.2rem)',
                                        color: 'var(--text-secondary)',
                                        textTransform: 'uppercase',
                                        fontWeight: 500,
                                        letterSpacing: '0.05em'
                                    }}>
                                        {project.subtitle}
                                    </h4>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }}>
                                        {project.skills.map((skill, sIdx) => (
                                            <span key={sIdx} style={{
                                                padding: '0.2rem 0.8rem',
                                                borderRadius: '2px',
                                                backgroundColor: '#000000',
                                                color: '#ffffff',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                fontSize: '0.65rem',
                                                fontWeight: 700,
                                                letterSpacing: '0.05em',
                                                textTransform: 'uppercase'
                                            }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ maxWidth: '450px' }}>
                                    <p style={{
                                        marginBottom: '2.5rem',
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontSize: '0.95rem',
                                        lineHeight: 1.6,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em'
                                    }}>
                                        {project.description}
                                    </p>
                                    <a
                                        href={project.link}
                                        className="small-caps"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '1.2rem 2.5rem',
                                            borderRadius: '100px',
                                            border: '1px solid rgba(255,255,255,0.15)',
                                            color: 'var(--text-primary)',
                                            textDecoration: 'none',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                            background: 'rgba(255,255,255,0.03)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'var(--text-primary)';
                                            e.currentTarget.style.color = 'var(--bg-color)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.color = 'var(--text-primary)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        GITHUB REPO
                                    </a>
                                </div>
                            </div>

                            {/* Right: Large Image Container */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                style={{
                                    width: '100%',
                                    aspectRatio: '1.4',
                                    background: '#000000',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {idx === 1 ? (
                                    <Globe />
                                ) : project.image ? (
                                    <motion.img
                                        src={project.image}
                                        alt={project.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        initial={{ scale: 1.1, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                ) : (
                                    <>
                                        <div style={{
                                            position: 'absolute',
                                            inset: 0,
                                            opacity: 0.1,
                                            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                                            backgroundSize: '30px 30px'
                                        }} />

                                        <span className="small-caps" style={{ opacity: 0.3, letterSpacing: '0.3em', fontSize: '0.7rem' }}>
                                            IMAGE PLACEHOLDER
                                        </span>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
