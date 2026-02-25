import styles from '../page.module.css';
import ScrollNav from '../../components/ScrollNav';
export const metadata = {
    title: 'Solutions | EduShield AI',
};

export default function SolutionsPage() {
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
                                <a href="/solutions" className={styles.navLink} style={{ color: 'var(--color-primary)' }}>Solutions</a>
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
                        Education Solutions for India
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#475569', maxWidth: '800px', margin: '1rem auto 0' }}>
                        The Indian education ecosystem is incredibly layered. EduShield provides bespoke, role-based dashboards ensuring every stakeholder operates with absolute clarity.
                    </p>
                </div>

                <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', alignItems: 'flex-start' }}>

                    {/* LEFT SIDE NAVIGATION (SNACKBAR) */}
                    <ScrollNav
                        title="Stakeholders"
                        links={[
                            { id: 'trusts', label: 'Directors / Trusts', icon: 'corporate_fare', color: '#8b5cf6' },
                            { id: 'principals', label: 'Principals & Deans', icon: 'account_balance', color: '#475569' },
                            { id: 'counselors', label: 'Counselors', icon: 'support_agent', color: '#475569' },
                            { id: 'teachers', label: 'Faculty & Staff', icon: 'history_edu', color: '#475569' },
                            { id: 'govts', label: 'Policymakers', icon: 'public', color: '#475569' },
                        ]}
                    />

                    {/* MAIN CONTENT AREA */}
                    <main style={{ flex: 1, padding: '2rem 0 4rem', minWidth: 0 }}>
                        <div style={{ maxWidth: '800px', margin: '0 0 0 auto', paddingLeft: '2rem' }}>

                            {/* Section 1 */}
                            <section id="trusts" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#ede9fe', color: '#8b5cf6', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>corporate_fare</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>For Institution Trusts & Groups</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Managing a multi-branch school network across different states in India requires immense macro-level visibility. Group directors often have to wait weeks for branch principals to compile spreadsheet reports on test scores and drop-out rates.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    EduShield’s <strong>Network-Level Dashboard</strong> consolidates data from every single branch instantly. You can easily spot macro-trends—for example, a sudden wave of math failures occurring specifically in the Pune branches but not in Delhi. This allows centralized management to deploy targeted resources, hire specialized faculty where needed, and monitor overall infrastructural ROI effortlessly.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 2 */}
                            <section id="principals" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>account_balance</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>For Principals & Deans</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    School leaders are the frontline commanders of student success. However, finding the students who are subtly falling behind among thousands of others usually requires heavy manual lifting and endless meetings with teaching staff.
                                </p>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                                    <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', fontSize: '1rem' }}>With EduShield, Principals Can:</h4>
                                    <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
                                        <li style={{ marginBottom: '0.5rem' }}>View a daily list of classrooms exhibiting concerning stress levels or academic drops.</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Track NEP 2020 transition progress and monitor co-curricular participation curves.</li>
                                        <li>Identify specific faculty members whose classes are showing vast improvement, allowing you to replicate their teaching models district-wide.</li>
                                    </ul>
                                </div>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 3 */}
                            <section id="counselors" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>support_agent</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>For Counselors & Mentors</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    The ratio of school counselors to students in India is often staggeringly high. A single counselor cannot realistically monitor the wellbeing of 800+ students.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Our platform provides a prioritized <strong>Daily Triage List</strong>. EduShield’s AI sifts through behavioral reports and attendance logs overnight, handing the counselor a short list of the 8-10 students whose “At-Risk Probability” spiked the most in the last 48 hours. This stops them from reacting to severe burnout and empowers them to call in a student <i>before</i> they hit a breaking point.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 4 */}
                            <section id="teachers" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>history_edu</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>For Faculty & Teachers</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    The absolute last thing Indian teachers need is "another tool" to do data entry in. EduShield is completely frictionless for teaching staff. We pull data quietly from the ERP systems you are already required to use.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Teachers only interact with EduShield when the AI specifically suggests a mathematical likelihood that a student in their classroom has dropped off track. It empowers teachers with context—alerting them that a specific student's math grades dropped on the exact same week their physical education attendance plummeted—painting a whole picture previously invisible.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 5 */}
                            <section id="govts" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>public</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>For State Govts & Policymakers</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Deploy AI across thousands of Zilla Parishad and State Board schools simultaneously. EduShield works effectively even with low-bandwidth, asynchronous data uploads.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    State education departments can use our macro-level dashboards to identify deep systemic issues across districts. Predict where dropouts will spike in specific agricultural seasons, or pinpoint where female enrollment drops radically after 8th standard, allowing state policymakers to deploy targeted financial interventions backed by irrefutable AI evidence.
                                </p>
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
            </div >
        </div >
    );
}
