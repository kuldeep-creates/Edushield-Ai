import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'About Us | EduShield AI',
    description: 'Learn about the mission, team, and values behind EduShield AI.',
};

const teamMembers = [
    { name: 'Dr. Priya Nair', role: 'Chief AI Officer', bg: '#e0e7ff', color: '#4f46e5', icon: 'psychology', bio: 'Former NCERT researcher with 12 years in educational data science. Leads our ML model architecture.' },
    { name: 'Arjun Mehta', role: 'Lead Backend Engineer', bg: '#ecfdf5', color: '#059669', icon: 'code', bio: 'Built high-scale data platforms at Flipkart and Razorpay. Architect of EduShield\'s sharding infrastructure.' },
    { name: 'Sneha Kapoor', role: 'NLP Research Lead', bg: '#fff7ed', color: '#ea580c', icon: 'translate', bio: 'Specialized in Hinglish NLP and multilingual sentiment analysis. PhD from IIT Bombay.' },
    { name: 'Rahul Desai', role: 'Product & Strategy', bg: '#fef9c3', color: '#d97706', icon: 'lightbulb', bio: 'Ex-government education consultant with deep roots in NEP 2020 policy development.' },
];

const values = [
    { icon: 'school', title: 'Student-First', desc: 'Every decision, model, and feature is built around a single question: does it help the student?' },
    { icon: 'balance', title: 'Privacy by Design', desc: 'Fully compliant with India\'s DPDP Act. We never store raw PII. All models train on anonymized data.' },
    { icon: 'diversity_3', title: 'Inclusive AI', desc: 'Our models are actively tested for bias across gender, caste, geography, and economic backgrounds.' },
    { icon: 'science', title: 'Research-Driven', desc: 'Collaborations with IITs, NCERT, and state education boards ground every product decision in evidence.' },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>

                {/* HEADER */}
                <header className={styles.header}>
                    <div className={styles.headerInner}>
                        <div className={styles.headerRow}>
                            <a href="/" className={styles.brand}>
                                <div className={styles.brandIcon}>
                                    <span className="material-symbols-outlined">shield_person</span>
                                </div>
                                <span className={styles.brandName}>EduShield AI</span>
                            </a>
                            <nav className={styles.nav}>
                                <a href="/features" className={styles.navLink}>Features</a>
                                <a href="/solutions" className={styles.navLink}>Solutions</a>
                                <a href="/integrations" className={styles.navLink}>Integrations</a>
                                <a href="/success-stories" className={styles.navLink}>Success Stories</a>
                            </nav>
                            <div className={styles.headerActions}>
                                <a href="/login" className={styles.loginLink}>Log in</a>
                                <a href="/request-demo" className={styles.demoBtn}>Request Demo</a>
                            </div>
                        </div>
                    </div>
                </header>

                <main style={{ flex: 1, backgroundColor: '#f8fafc' }}>

                    {/* ── HERO ── */}
                    <section style={{ backgroundColor: '#0f172a', padding: '6rem 1.5rem', textAlign: 'center' }}>
                        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8', display: 'inline-block' }}></span>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8' }}>Founded 2024 · Built for India</span>
                            </div>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: '#f1f5f9', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                                We believe every student <span style={{ color: '#38bdf8' }}>deserves a second chance</span>.
                            </h1>
                            <p style={{ fontSize: '1.125rem', color: '#94a3b8', lineHeight: 1.7 }}>
                                EduShield AI was born from a simple observation — that the data to identify and support struggling students already exists in schools. We just built the engine to unlock it.
                            </p>
                        </div>
                    </section>

                    {/* ── MISSION ── */}
                    <section style={{ padding: '5rem 1.5rem', maxWidth: '80rem', margin: '0 auto' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {[
                                    { label: 'Students Protected', val: '2.4M+', icon: 'groups', color: '#0ea5e9' },
                                    { label: 'School Districts', val: '500+', icon: 'location_city', color: '#6366f1' },
                                    { label: 'States Covered', val: '12', icon: 'map', color: '#10b981' },
                                    { label: 'Prediction Accuracy', val: '91.8%', icon: 'verified', color: '#f59e0b' },
                                ].map((stat, i) => (
                                    <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: stat.color, marginBottom: '0.75rem', display: 'block' }}>{stat.icon}</span>
                                        <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>{stat.val}</div>
                                        <div style={{ fontSize: '0.9375rem', color: '#64748b', fontWeight: 500, marginTop: '0.25rem' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── OUR STORY ── */}
                    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
                        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Our Story</p>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em', marginBottom: '2rem' }}>
                                Started in a classroom. Now protecting millions.
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#475569', fontSize: '1.0625rem', lineHeight: 1.75 }}>
                                <p>
                                    In 2022, our co-founders were working alongside educators in Pune's municipal schools. They noticed something alarming — teachers knew intuitively which students were at risk, but they had no system to act on that knowledge at scale. Between managing 60-student classrooms and filing UDISE+ reports, there was simply no time.
                                </p>
                                <p>
                                    We spent the next 18 months embedded in 40 schools, building systems in Hindi, Marathi, and English. We integrated directly with the school's existing ERP, cleaned millions of rows of historical data, and trained a model that could flag a student's trajectory 6 weeks before they stopped attending.
                                </p>
                                <p>
                                    Today, EduShield is deployed in 500+ districts across 12 states, fully compliant with India's Digital Personal Data Protection (DPDP) Act, and aligned with the NEP 2020 framework. But we are just getting started.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* ── VALUES ── */}
                    <section style={{ padding: '5rem 1.5rem', backgroundColor: '#f8fafc' }}>
                        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>What We Stand For</p>
                                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Our Core Values</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                                {values.map((v, i) => (
                                    <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: '1rem', display: 'block' }}>{v.icon}</span>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{v.title}</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── TEAM ── */}
                    <section style={{ padding: '5rem 1.5rem', backgroundColor: '#ffffff' }}>
                        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>The People</p>
                                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Meet the Core Team</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                                {teamMembers.map((member, i) => (
                                    <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                                        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: member.bg, color: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>{member.icon}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>{member.name}</h3>
                                        <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: member.color, margin: '0 0 1rem' }}>{member.role}</p>
                                        <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{member.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── CTA ── */}
                    <section style={{ backgroundColor: '#0f172a', padding: '5rem 1.5rem', textAlign: 'center' }}>
                        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
                                Ready to protect your students?
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                Join our growing network of schools, districts, and state boards committed to data-driven student welfare.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="/request-demo" style={{ backgroundColor: '#0ea5e9', color: '#ffffff', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                                    Request a Demo
                                </a>
                                <a href="/contact" style={{ backgroundColor: 'transparent', color: '#94a3b8', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid #334155' }}>
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </section>

                </main>

                <Footer />
            </div>
        </div>
    );
}
