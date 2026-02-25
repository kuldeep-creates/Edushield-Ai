import styles from '../request-demo/page.module.css';

export const metadata = {
    title: 'Security & Privacy | EduShield AI',
};

export default function SecurityPage() {
    return (
        <div className={styles.page}>
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>
                <section className={styles.rightPanel} style={{ maxWidth: '100%', flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div className={styles.rightInner} style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#e0f2fe', color: '#0284c7', borderRadius: '50%', marginBottom: '1rem' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>lock</span>
                        </div>
                        <h1 className={styles.formTitle} style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Enterprise-Grade Security</h1>
                        <p className={styles.formSubtitle} style={{ fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            We know that student data is your most sensitive asset. EduShield AI was built from the ground up with a privacy-first architecture that exceeds federal and state standards for education technology.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem', textAlign: 'left', marginBottom: '2.5rem' }}>
                            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>verified_user</span>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>FERPA Compliant</h3>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
                                    Fully compliant with the Family Educational Rights and Privacy Act. Student data remains the exclusive property of your district.
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>key</span>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>End-to-End Encryption</h3>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
                                    All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We utilize zero-trust architecture for internal access.
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>gavel</span>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>COPPA & GDPR</h3>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
                                    We adhere to strict data minimization policies. We never sell, rent, or share student data with third-party advertisers.
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#0ea5e9' }}>storage</span>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1e293b' }}>Anonymized Models</h3>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5' }}>
                                    Our predictive models are trained on completely de-identified, aggregated datasets to prevent PII leakage and algorithmic bias.
                                </p>
                            </div>
                        </div>

                        <a href="/request-demo" className={styles.submitBtn} style={{ display: 'inline-flex', justifyContent: 'center', textDecoration: 'none', width: 'auto', padding: '1rem 2.5rem' }}>
                            <span style={{ color: 'white' }}>Partner Securely with Us</span>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}
