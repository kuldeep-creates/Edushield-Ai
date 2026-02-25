import styles from '../request-demo/page.module.css';

export const metadata = {
    title: 'Platform | EduShield AI',
};

export default function PlatformPage() {
    return (
        <div className={styles.page}>
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>
                <section className={styles.rightPanel} style={{ maxWidth: '100%', flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div className={styles.rightInner} style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#dbeafe', color: '#1e3b8a', borderRadius: '50%', marginBottom: '1rem' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>dataset</span>
                        </div>
                        <h1 className={styles.formTitle} style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The EduShield Platform</h1>
                        <p className={styles.formSubtitle} style={{ fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            A unified intelligence hub specifically built for modern school districts. We combine daily attendance feeds, behavioral logs, and real-time academic scoring into a single pane of glass.
                        </p>
                        <p className={styles.formSubtitle} style={{ fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            By leveraging state-of-the-art predictive algorithms, our platform safely analyzes your data to flag at-risk students up to an entire term before traditional systems, granting your educators the critical time needed to intervene and change lives.
                        </p>

                        <div style={{ backgroundColor: '#f8fafc', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>Ready to see it in action?</h2>
                            <a href="/request-demo" className={styles.submitBtn} style={{ display: 'inline-flex', justifyContent: 'center', textDecoration: 'none', width: 'auto', padding: '1rem 2.5rem' }}>
                                <span style={{ color: 'white' }}>Get a Personalized Demo</span>
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
