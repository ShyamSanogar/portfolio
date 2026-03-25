import { motion } from 'framer-motion';

const Experience = () => {
    const experiences = [
        {
            title: "DSA Trainee",
            company: "CSE Pathshala",
            date: "Jun 2025 - Jul 2025",
            description: "Intensive 35+ hour summer training program in Data Structures and Algorithms using Python. Built a capstone project implementing Dijkstra's Algorithm."
        },
        {
            title: "B.Tech Computer Science",
            company: "Lovely Professional Univ.",
            date: "2023 - Present",
            description: "CGPA: 7.74. Core studies in algorithms, operating systems, and building scalable software architectures."
        }
    ];

    return (
        <section id="training" className="section container" style={{ padding: '8rem 2rem' }}>
            <div className="section-prefix">Education</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '4rem' }}>

                {/* Left Side Header */}
                <div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, textTransform: 'uppercase' }}>
                        TRAINING &<br />
                        EDUCATION<span style={{ color: '#7cfc00' }}>.</span>
                    </h2>
                </div>

                {/* Right Side List */}
                <div style={{ borderTop: '1px solid var(--card-border)' }}>
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            style={{
                                padding: '3rem 0',
                                borderBottom: '1px solid var(--card-border)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h3 style={{ fontSize: '2rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{exp.title}</h3>
                                <span className="small-caps">{exp.date}</span>
                            </div>
                            <h4 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{exp.company}</h4>
                            <p style={{ maxWidth: '85%', textTransform: 'uppercase', letterSpacing: '0.02em', fontWeight: 600, color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.05rem', lineHeight: 1.5 }}>{exp.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Experience;
