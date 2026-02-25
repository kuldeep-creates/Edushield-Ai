import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Security & Privacy | EduShield AI',
    description: 'Enterprise-grade security and DPDP-compliant privacy practices at EduShield AI.',
};

const certifications = [
    { icon: 'verified_user', title: 'DPDP Act 2023 Compliant', color: '#0ea5e9', desc: 'Fully aligned with India\'s Digital Personal Data Protection Act, including provisions for data minimization, purpose limitation, and consent management.' },
    { icon: 'key', title: 'End-to-End Encryption', color: '#6366f1', desc: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Internal access follows a strict zero-trust model with MFA enforced.' },
    { icon: 'gavel', title: 'NEP 2020 Aligned', color: '#10b981', desc: 'Our data governance and student profiling methodologies are explicitly designed to operate within the NEP 2020 child welfare framework.' },
    { icon: 'storage', title: 'Anonymized AI Training', color: '#f59e0b', desc: 'No PII ever reaches the model training cluster. Data is salted, hashed, and stripped of direct identifiers before any analytics are generated.' },
    { icon: 'shield', title: 'ISO 27001 Practices', color: '#ef4444', desc: 'Information security management processes following ISO 27001 standards, including regular audits, incident response planning, and staff training.' },
    { icon: 'location_on', title: 'India-Only Data Residency', color: '#8b5cf6', desc: 'All student data is stored on servers physically located within India (Mumbai & Pune regions). No cross-border data transfers occur.' },
];

const privacyPrinciples = [
    { title: 'Data Minimization', desc: 'We only collect data that is strictly necessary for the predictive and compliance functions of the platform. No behavioral tracking beyond the scope of academic analysis.' },
    { title: 'Purpose Limitation', desc: 'Data collected for student welfare analysis is never used for advertising, profiling for commercial purposes, or shared with external businesses.' },
    { title: 'Right of Access & Erasure', desc: 'Students and parents can request a full export of their data or deletion of their record at any time. Requests are fulfilled within 30 days per DPDP Act guidelines.' },
    { title: 'Consent-Driven', desc: 'All data processing activities require explicit consent from the school administrator and are documented in the institutional data processing agreement (DPA).' },
];

export default function SecurityPage() {
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

                    {/* Hero */}
                    <section style={{ backgroundColor: '#0f172a', padding: '5rem 1.5rem', textAlign: 'center' }}>
                        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8' }}>DPDP Act 2023 Compliant · NEP 2020 Aligned</span>
                            </div>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                                Security &amp; Privacy
                            </h1>
                            <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.7 }}>
                                Student data is your most sensitive asset. EduShield AI was built from day one with a privacy-first, zero-trust architecture that exceeds Indian regulatory standards for education technology.
                            </p>
                        </div>
                    </section>

                    {/* Certifications grid */}
                    <section style={{ padding: '5rem 1.5rem', maxWidth: '80rem', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Our Commitments</p>
                            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Enterprise-Grade Security</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {certifications.map((c, i) => (
                                <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: c.color, marginBottom: '1rem', display: 'block' }}>{c.icon}</span>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{c.title}</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Privacy principles */}
                    <section style={{ backgroundColor: '#ffffff', padding: '5rem 1.5rem' }}>
                        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Data Governance</p>
                                <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Privacy Principles We Live By</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {privacyPrinciples.map((p, i) => (
                                    <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '1rem', borderLeft: '4px solid var(--color-primary)', padding: '1.75rem', border: '1px solid #e2e8f0', borderLeftWidth: '4px', borderLeftColor: 'var(--color-primary)' }}>
                                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{p.title}</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section style={{ backgroundColor: '#0f172a', padding: '5rem 1.5rem', textAlign: 'center' }}>
                        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
                            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.025em', marginBottom: '1rem' }}>
                                Need a Data Processing Agreement?
                            </h2>
                            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                We provide institutional DPAs (Data Processing Agreements) for all schools and districts deploying EduShield. Contact our compliance team to get started.
                            </p>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="/contact" style={{ backgroundColor: '#0ea5e9', color: '#ffffff', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
                                    Contact Compliance Team
                                </a>
                                <a href="/terms" style={{ backgroundColor: 'transparent', color: '#94a3b8', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid #334155' }}>
                                    Read Terms of Service
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
