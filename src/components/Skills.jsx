import { motion } from 'framer-motion';
import { RulerCarousel } from './ui/ruler-carousel';

const Skills = () => {
    const categorizedSkills = [
        {
            title: "Languages",
            items: [
                { id: "lang-1", title: "PYTHON" },
                { id: "lang-2", title: "C++" },
                { id: "lang-3", title: "C" },
                { id: "lang-4", title: "JAVA" }
            ]
        },
        {
            title: "Platforms",
            items: [
                { id: "plat-1", title: "GIT" },
                { id: "plat-2", title: "GITHUB" },
                { id: "plat-3", title: "TENSORFLOW" },
                { id: "plat-4", title: "SCIKIT-LEARN" },
                { id: "plat-5", title: "POWER BI" }
            ]
        },
        {
            title: "Databases",
            items: [
                { id: "db-1", title: "MYSQL" },
                { id: "db-2", title: "MONGODB" },
                { id: "db-3", title: "DBMS" },
                { id: "db-4", title: "HADOOP" }
            ]
        }
    ];

    return (
        <section id="skills" className="section container" style={{ padding: '4rem 2rem 8rem 2rem' }}>
            <div className="section-prefix">Capabilities</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '6rem', marginTop: '4rem' }}>

                {/* Massive header */}
                <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1, textTransform: 'uppercase' }}>
                    TECHNICAL<br />
                    ARSENAL<span style={{ color: '#7cfc00' }}>.</span>
                </h2>

                {/* Vertical layout of separated Technical categories with Carousels in the center */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem', overflow: 'hidden' }}>
                    {categorizedSkills.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            {/* Centered Heading */}
                            <h3 style={{
                                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                color: 'var(--text-primary)',
                                letterSpacing: '0.15em',
                                marginBottom: '-1rem' // Creates seamless visual connection to carousel below
                            }}>
                                {category.title}
                            </h3>
                            
                            {/* Ruler Carousel exclusively for this category */}
                            <RulerCarousel originalItems={category.items} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
