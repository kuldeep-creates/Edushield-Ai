import styles from '../request-demo/page.module.css';

export const metadata = {
    title: 'Our Impact | EduShield AI',
};

export default function ImpactPage() {
    return (
        <div className={styles.page}>
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>
                <section className={styles.rightPanel} style={{ maxWidth: '100%', flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div className={styles.rightInner} style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '50%', marginBottom: '1rem' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>trending_up</span>
                        </div>
                        <h1 className={styles.formTitle} style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Measurable Impact</h1>
                        <p className={styles.formSubtitle} style={{ fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            We measure our success by the students who stay. Since our deployment across vanguard districts nationwide, EduShield AI has facilitated an incredible reduction in dropout rates.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem', textAlign: 'left', marginBottom: '2.5rem' }}>
                            <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#1e3b8a' }}>24%</div>
                                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b', marginTop: '0.5rem' }}>Average Dropout Reduction</div>
                            </div>
                            <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#1e3b8a' }}>50k+</div>
                                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#64748b', marginTop: '0.5rem' }}>Students Supported Globally</div>
                            </div>
                        </div>
                        <a href="/request-demo" className={styles.submitBtn} style={{ display: 'inline-flex', justifyContent: 'center', textDecoration: 'none', width: 'auto', padding: '1rem 2.5rem' }}>
                            <span style={{ color: 'white' }}>See It In Action</span>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}
