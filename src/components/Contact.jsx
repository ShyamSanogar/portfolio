import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            background: '#000', /* pure black for impact */
            borderTop: '1px solid var(--grid-line)'
        }}>
            <div className="container" style={{ padding: '8rem 2rem', width: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    <div className="section-prefix">Connect</div>

                    {/* Massive Typographic Footer */}
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            fontSize: 'clamp(3rem, 15vw, 15rem)',
                            lineHeight: 0.85,
                            textTransform: 'uppercase',
                            marginBottom: '2rem'
                        }}
                    >
                        LET'S<br />
                        TALK<span style={{ color: '#7cfc00' }}>.</span>
                    </motion.h1>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '2rem',
                        borderTop: '1px solid var(--card-border)',
                        paddingTop: '3rem'
                    }}>

                        <a href="mailto:shyamsanogar10@gmail.com" className="small-caps" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.6rem' }}>01 / EMAIL</span>
                            <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>SHYAMSANOGAR10@GMAIL.COM</span>
                        </a>

                        <a href="https://www.linkedin.com/in/shyamsanogar/" target="_blank" rel="noopener noreferrer" className="small-caps" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.6rem' }}>02 / LINKEDIN</span>
                            <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>/IN/SHYAMSANOGAR</span>
                        </a>

                        <a href="https://github.com/ShyamSanogar" target="_blank" rel="noopener noreferrer" className="small-caps" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.6rem' }}>03 / GITHUB</span>
                            <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>/SHYAMSANOGAR</span>
                        </a>

                        <a href="tel:+917620078447" className="small-caps" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.6rem' }}>04 / PHONE</span>
                            <span style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>+91-7620078447</span>
                        </a>

                    </div>
                </div>

                <div style={{
                    marginTop: '8rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                }}>
                    <span>© {new Date().getFullYear()} S. Sanogar</span>
                    <span>Designed in India.</span>
                </div>

            </div>
        </section>
    );
};

export default Contact;
