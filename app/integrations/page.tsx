import styles from '../page.module.css';
import ScrollNav from '../../components/ScrollNav';
import Footer from '../../components/Footer';
export const metadata = {
    title: 'Integrations | EduShield AI',
};

export default function IntegrationsPage() {
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
                                <a href="/integrations" className={styles.navLink} style={{ color: 'var(--color-primary)' }}>Integrations</a>
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
                        Plug-and-Play Data Pipelines
                    </h1>
                    <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#475569', maxWidth: '800px', margin: '1rem auto 0' }}>
                        You shouldn't have to migrate your entire IT infrastructure. EduShield seamlessly syncs with the ERP and LMS platforms predominantly used across the Indian subcontinent.
                    </p>
                </div>

                <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', alignItems: 'flex-start' }}>

                    {/* LEFT SIDE NAVIGATION (SNACKBAR) */}
                    <ScrollNav
                        title="Pipeline Sources"
                        links={[
                            { id: 'erp', label: 'School ERP Systems', icon: 'database', color: '#059669' },
                            { id: 'lms', label: 'Learning Mgmt (LMS)', icon: 'laptop_chromebook', color: '#475569' },
                            { id: 'govt', label: 'Govt. Compliance', icon: 'policy', color: '#475569' },
                            { id: 'communication', label: 'Communication APIs', icon: 'forum', color: '#475569' },
                        ]}
                    />

                    {/* MAIN CONTENT AREA */}
                    <main style={{ flex: 1, padding: '2rem 0 4rem', minWidth: 0 }}>
                        <div style={{ maxWidth: '800px', margin: '0 0 0 auto', paddingLeft: '2rem' }}>

                            {/* Section 1 */}
                            <section id="erp" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#d1fae5', color: '#059669', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>database</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>School ERP Integrations</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Enterprise Resource Planning is the backbone of day-to-day operations in Indian schools. EduShield establishes SECURE REST APIs with your existing ERPs to harvest attendance logs, disciplinary notices, demographic data, and basic fee payment delays (often an indicator of socio-economic distress).
                                </p>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                                    <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', fontSize: '1rem' }}>We feature native data pipelines for:</h4>
                                    <ul style={{ color: '#059669', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0, fontWeight: 600 }}>
                                        <li style={{ marginBottom: '0.5rem' }}>ERPNext (Frappe Framework)</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Fedena / Foradian Technologies</li>
                                        <li style={{ marginBottom: '0.5rem' }}>TCS iON Digital Campus</li>
                                        <li>TallyPrime (Secure abstraction for socio-economic markers without exposing core financials)</li>
                                    </ul>
                                </div>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 2 */}
                            <section id="lms" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>laptop_chromebook</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Learning Management Systems (LMS)</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Since the digitization push in 2020, assignments and formative assessments are often submitted online. EduShield hooks directly into your Learning Management System to track late submissions, time-spent-on-task, and engagement metrics.
                                </p>
                                <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                                    <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem', fontSize: '1rem' }}>Supported Platforms:</h4>
                                    <ul style={{ color: '#059669', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0, fontWeight: 600 }}>
                                        <li style={{ marginBottom: '0.5rem' }}>Google Workspace for Education (Classroom & Drive APIs)</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Microsoft Teams for Education / SharePoint</li>
                                        <li style={{ marginBottom: '0.5rem' }}>Moodle (Open Source Core Add-on)</li>
                                        <li>Canvas LMS by Instructure</li>
                                    </ul>
                                </div>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 3 */}
                            <section id="govt" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>policy</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Government Compliance Portals</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    Filing mandatory governmental reports is incredibly tedious for administration. EduShield structures all incoming data to match central mandates, offering single-click JSON/CSV exports.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Generate instantly compliant uploads for <strong>UDISE+ (Unified District Information System for Education)</strong>. Align internal grades rapidly with the <strong>Academic Bank of Credits (ABC)</strong> architecture. Push holistic report cards matching the newly proposed <strong>PARAKH</strong> standards without manually converting the data points.
                                </p>
                            </section>

                            <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '5rem' }} />

                            {/* Section 4 */}
                            <section id="communication" style={{ scrollMarginTop: '6rem', marginBottom: '5rem' }}>
                                <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '0.75rem', marginBottom: '1rem' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.75rem' }}>forum</span>
                                </div>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Communication APIs</h2>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                    When an early-warning indicator goes critical, the AI needs to reach people where they actually look. EduShield natively supports executing secure notification payloads to Indian communications gateways.
                                </p>
                                <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                    Configure workflows that automatically deploy <strong>WhatsApp Business API</strong> messages to parents, push notifications through your custom Android school app, or invoke bulk SMS endpoints (like Textlocal / MSG91) to alert rural parents who don't have internet access.
                                </p>
                            </section>

                        </div>
                    </main>

                </div>

                <Footer />
            </div>
        </div>
    );
}
