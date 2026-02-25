import styles from '../page.module.css';
import ScrollNav from '../../components/ScrollNav';
export const metadata = {
    title: 'Success Stories | EduShield AI',
};

export default function SuccessPage() {
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
                                <a href="/success-stories" className={styles.navLink} style={{ color: 'var(--color-primary)' }}>Success Stories</a>
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
                        Changing Lives Across India
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#475569', maxWidth: '800px', margin: '1rem auto 0' }}>
                        Don’t just take our word for it. Read how institutions from metropolitan private school chains to rural state initiatives utilized EduShield AI to radically alter academic futures.
                    </p>
                </div>

                <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', alignItems: 'flex-start' }}>

                    {/* LEFT SIDE NAVIGATION (SNACKBAR) */}
                    <ScrollNav
                        title="Case Studies"
                        links={[
                            { id: 'international', label: 'Int\'l School Chain', icon: 'local_library', color: '#ea580c' },
                            { id: 'engineering', label: 'Tech Consortium', icon: 'architecture', color: '#0ea5e9' },
                            { id: 'ngo', label: 'Rural NGO Network', icon: 'volunteer_activism', color: '#8b5cf6' },
                            { id: 'stateboard', label: 'State Board System', icon: 'diversity_1', color: '#10b981' },
                        ]}
                    />

                    {/* MAIN CONTENT AREA */}
                    <main style={{ flex: 1, padding: '2rem 0 4rem', minWidth: 0 }}>
                        <div style={{ maxWidth: '800px', margin: '0 0 0 auto', paddingLeft: '2rem' }}>

                            {/* Section 1 */}
                            <section id="international" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <h3 style={{ color: '#ea580c', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Case Study: Delhi NCR</h3>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Premier International School Chain</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    With over 25,000 students spread across 10 massive branches in the National Capital Region, administrators faced a severe bottleneck: it was impossible to centrally track individualized mental health and academic stress ahead of crucial CBSE Class X and XII Board Exams.
                                </p>
                                <div style={{ backgroundColor: '#fcf8f3', borderLeft: '4px solid #ea580c', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <p style={{ fontStyle: 'italic', color: '#431407', margin: 0, fontSize: '1.125rem', lineHeight: 1.6 }}>
                                        "Within 6 months of integrating EduShield into our TCS iON backend, our counselors proactively reached 600 highly stressed students two months before the finals. Our overall academic warning rate fell by an astonishing 32% year-over-year."
                                    </p>
                                    <p style={{ marginTop: '1rem', fontWeight: 700, color: '#ea580c', margin: '1rem 0 0 0' }}>— Dr. Anita Malhotra, Group Director of Academics</p>
                                </div>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                                    <strong>The Result:</strong> By utilizing EduShield's NLP analysis of internal class remarks, counselors identified severe exam-anxiety spikes early and deployed school-wide mindfulness interventions that mathematically improved the final aggregate board scores across the entire group.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 2 */}
                            <section id="engineering" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <h3 style={{ color: '#0ea5e9', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Case Study: Bengaluru</h3>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Top Engineering Consortium</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Engineering students in India face immense pressure. At this tier-1 institution, identifying 3rd-year students likely to fail campus placements due to backlogs took the Training and Placement Cell (TPO) nearly a month of data crunching across fragmented departmental systems.
                                </p>
                                <div style={{ backgroundColor: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <p style={{ fontStyle: 'italic', color: '#082f49', margin: 0, fontSize: '1.125rem', lineHeight: 1.6 }}>
                                        "Before EduShield, our data lived in silos. Now, our TPO cell logs in to a real-time predictive dashboard every morning. We can identify which students need critical tech-skills interventions before companies arrive. The ROI on our staff's time is 15x."
                                    </p>
                                    <p style={{ marginTop: '1rem', fontWeight: 700, color: '#0ea5e9', margin: '1rem 0 0 0' }}>— Ramesh Krishnan, Chief Technical Officer</p>
                                </div>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                                    <strong>The Result:</strong> Placement rates for historically "at-risk" students surged by 40% after the college deployed EduShield's automated intervention tasks mapping students to specific alumni mentors.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 3 */}
                            <section id="ngo" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <h3 style={{ color: '#8b5cf6', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Case Study: Rajasthan & MP</h3>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Rural Edu-NGO Network</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    In deeply rural settings, the biggest threat is complete school abandonment—especially regarding female populations transitioning from 8th to 9th standard. The NGO struggled to know when a student was being pulled from school to work until a month after they disappeared.
                                </p>
                                <div style={{ backgroundColor: '#f5f3ff', borderLeft: '4px solid #8b5cf6', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <p style={{ fontStyle: 'italic', color: '#2e1065', margin: 0, fontSize: '1.125rem', lineHeight: 1.6 }}>
                                        "EduShield's specific demographic algorithms identified irregular drop-offs in Friday attendances precisely, triggering automated bulk SMS alerts to off-grid parents and dispatching our field workers. We reduced the female dropout rate by an unprecedented 45%."
                                    </p>
                                    <p style={{ marginTop: '1rem', fontWeight: 700, color: '#8b5cf6', margin: '1rem 0 0 0' }}>— Preeti Sharma, Head of Programmes</p>
                                </div>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 4 */}
                            <section id="stateboard" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <h3 style={{ color: '#10b981', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Case Study: Maharashtra</h3>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>State Board High Schools</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Government teachers process overwhelming amounts of administrative work to comply with local directives, leading to enormous burnout. This school district introduced EduShield specifically to offload teacher labor.
                                </p>
                                <div style={{ backgroundColor: '#ecfdf5', borderLeft: '4px solid #10b981', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <p style={{ fontStyle: 'italic', color: '#022c22', margin: 0, fontSize: '1.125rem', lineHeight: 1.6 }}>
                                        "EduShield not only helped our students but saved our teachers. By unifying all the attendance registers, UDISE+ compliance generation, and assignment grades into their AI platform, teachers report saving an average of 2.5 hours a week."
                                    </p>
                                    <p style={{ marginTop: '1rem', fontWeight: 700, color: '#10b981', margin: '1rem 0 0 0' }}>— V. S. Deshmukh, Lead Coordinator</p>
                                </div>
                            </section>

                        </div>
                    </main>

                </div>

                <footer className={styles.footer} style={{ borderTop: '1px solid #e2e8f0', marginTop: '0' }}>
                    <div className={styles.footerInner} style={{ padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem' }}>Ready to empower your educators?</h2>
                        <a href="/request-demo" className={styles.demoBtn} style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}>Schedule a Consultation</a>
                        <p style={{ marginTop: '3rem', fontSize: '0.875rem', color: '#94a3b8' }}>© 2026 EduShield AI. All rights reserved. Securely built for India.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
