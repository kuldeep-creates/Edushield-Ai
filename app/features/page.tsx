import styles from '../page.module.css';
import ScrollNav from '../../components/ScrollNav';
import Footer from '../../components/Footer';
export const metadata = {
    title: 'Features | EduShield AI',
};

export default function FeaturesPage() {
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
                                <a href="/features" className={styles.navLink} style={{ color: 'var(--color-primary)' }}>Features</a>
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

                <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '3rem 1.5rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>
                        Advanced Predictive Features
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#475569', maxWidth: '800px', margin: '1rem auto 0' }}>
                        Designed for the immense scale and diversity of the Indian education system. Explore the core technology powering the next generation of academic success.
                    </p>
                </div>

                <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', alignItems: 'flex-start' }}>

                    {/* LEFT SIDE NAVIGATION (SNACKBAR) */}
                    <ScrollNav
                        title="Core Features"
                        links={[
                            { id: 'early-warning', label: 'Early Warning', icon: 'warning', color: '#0284c7' },
                            { id: 'unified-dashboards', label: 'NEP Dashboards', icon: 'leaderboard', color: '#9333ea' },
                            { id: 'behavioral-analysis', label: 'NLP Behavioral', icon: 'psychology', color: '#65a30d' },
                            { id: 'intervention', label: 'Interventions', icon: 'auto_graph', color: '#ea580c' },
                            { id: 'dpdp-security', label: 'DPDP Security', icon: 'lock', color: '#dc2626' },
                        ]}
                    />

                    {/* MAIN CONTENT AREA */}
                    <main style={{ flex: 1, padding: '2rem 0 4rem', minWidth: 0 }}>
                        <div style={{ maxWidth: '800px', margin: '0 0 0 auto', paddingLeft: '2rem' }}>

                            {/* Section 1 */}
                            <section id="early-warning" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#e0f2fe', color: '#0284c7', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>warning</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Proactive Early Warning Alerts</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    The traditional Indian education system is heavily reactionary—interventions typically occur after a student has already failed an internal term exam or unit test. EduShield AI flips this paradigm by acting as a proactive safety net.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Our proprietary machine learning models analyze hundreds of micro-data points continuously. This includes daily attendance fluctuations, delays in homework submissions, internal assessment trajectories, and behavioral cues. By synthesizing this data, the engine can accurately flag students who are on a statistical path toward failing critical board exams (Class X and XII) up to 90 days in advance.
                                </p>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                                    <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', fontSize: '1rem' }}>Specific At-Risk Indicators Tracked:</h4>
                                    <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
                                        <li style={{ marginBottom: '0.5rem' }}>Declining performance in foundational subjects like Mathematics and Science.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Chronic absenteeism patterns, such as "Monday/Friday absences" indicating avoidance behavior.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Discrepancies between formative assessments (FA) and summative assessment (SA) scores.</li>
                                        <li>Sudden drops in classroom participation as noted by faculty remarks.</li>
                                    </ul>
                                </div>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 2 */}
                            <section id="unified-dashboards" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f3e8ff', color: '#9333ea', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>leaderboard</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>NEP-Aligned Unified Dashboards</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    The National Education Policy (NEP) 2020 mandates a shift away from rote memorization towards holistic, 360-degree multidimensional report cards. However, schools struggle to consolidate this data, often relying on fragmented spreadsheets and multiple disconnected software portals.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    EduShield’s Unified Dashboards automatically ingest data from CBSE, ICSE, and various State Board grading formats. It creates a standardized, visually accessible view of every student. We don't just display marks; we graph developmental parameters, extracurricular participation, critical thinking indicators, and socio-emotional learning (SEL) milestones automatically.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#0ea5e9', marginBottom: '0.5rem' }}>school</span>
                                        <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem', marginBottom: '0.5rem' }}>Scholastic Tracking</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.9375rem', margin: 0, lineHeight: 1.5 }}>Deep granular tracking of internal exams, unit tests, and conceptual understanding.</p>
                                    </div>
                                    <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                        <span className="material-symbols-outlined" style={{ color: '#0ea5e9', marginBottom: '0.5rem' }}>sports_score</span>
                                        <h4 style={{ fontWeight: 700, color: '#1e293b', fontSize: '1rem', marginBottom: '0.5rem' }}>Co-Scholastic Metrics</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.9375rem', margin: 0, lineHeight: 1.5 }}>Sports participation, arts, leadership roles, and community service aggregated into scores.</p>
                                    </div>
                                </div>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 3 */}
                            <section id="behavioral-analysis" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#ecfccb', color: '#65a30d', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>psychology</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>NLP-Powered Behavioral Analysis</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Academic scores only tell half the story. The subjective remarks left by teachers ("distracted," "struggling to focus," "isolated") often contain the earliest warnings of severe mental health issues, bullying, or underlying learning disabilities like Dyslexia or ADHD.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    EduShield utilizes Natural Language Processing (NLP) specifically trained on the unique syntax of Indian teaching environments (including support for 'Hinglish' and regional dialect phrasing). The system mathematically scores sentiment across teacher remarks. If a student's behavioral sentiment drops across multiple classes simultaneously, the AI alerts the school counseling department immediately.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 4 */}
                            <section id="intervention" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#ffedd5', color: '#ea580c', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>auto_graph</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Algorithmic Intervention Tracking</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Identifying a problem is useless without executing a solution. EduShield includes a comprehensive Intervention Management System. When a student is flagged as high-risk, a workflow is automatically initiated.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Schools can assign specific intervention tiers—ranging from remedial after-school classes to mandated parent-teacher meetings or professional psychological counseling. But the true power lies in the feedback loop: the AI measures the student's academic and behavioral recovery post-intervention. Over time, EduShield mathematically calculates which specific intervention tactics actually yield the highest success rates for different student profiles.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 5 */}
                            <section id="dpdp-security" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>lock</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>DPDP Act Compliant Infrastructure</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Data privacy in ed-tech is no longer optional. EduShield’s architecture has been built from day one to strictly comply with the Digital Personal Data Protection (DPDP) Act of India, ensuring student privacy is never compromised.
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderLeft: '4px solid #dc2626', borderRadius: '0 0.5rem 0.5rem 0' }}>
                                        <h4 style={{ color: '#1e293b', fontWeight: 700, margin: '0 0 0.25rem 0', fontSize: '1rem' }}>100% Data Localization</h4>
                                        <p style={{ color: '#475569', margin: 0, fontSize: '0.9375rem', lineHeight: 1.5 }}>All servers, databases, and backup instances are securely hosted exclusively within Indian sovereign territory.</p>
                                    </div>
                                    <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderLeft: '4px solid #dc2626', borderRadius: '0 0.5rem 0.5rem 0' }}>
                                        <h4 style={{ color: '#1e293b', fontWeight: 700, margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Anonymized AI Training</h4>
                                        <p style={{ color: '#475569', margin: 0, fontSize: '0.9375rem', lineHeight: 1.5 }}>Personally Identifiable Information (PII) is completely stripped and salted before any data is fed into our machine learning models.</p>
                                    </div>
                                    <div style={{ padding: '1.25rem', backgroundColor: '#f8fafc', borderLeft: '4px solid #dc2626', borderRadius: '0 0.5rem 0.5rem 0' }}>
                                        <h4 style={{ color: '#1e293b', fontWeight: 700, margin: '0 0 0.25rem 0', fontSize: '1rem' }}>Military-Grade Encryption</h4>
                                        <p style={{ color: '#475569', margin: 0, fontSize: '0.9375rem', lineHeight: 1.5 }}>Leveraging TLS 1.3 for data in transit and AES-256 for data at rest. Only authorized school administrators hold the decryption keys.</p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </main>

                </div>

                <Footer />
            </div >
        </div >
    );
}
