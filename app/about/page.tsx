import styles from '../request-demo/page.module.css';

export const metadata = {
    title: 'About Us | EduShield AI',
    description: 'Learn about the team behind EduShield AI.',
};

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>
                <section className={styles.rightPanel} style={{ maxWidth: '100%', flex: 1, padding: '3rem', overflowY: 'auto' }}>
                    <div className={styles.rightInner} style={{ maxWidth: '800px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#e0e7ff', color: '#4f46e5', borderRadius: '50%', marginBottom: '1rem' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>groups</span>
                        </div>
                        <h1 className={styles.formTitle} style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About EduShield AI</h1>
                        <p className={styles.formSubtitle} style={{ fontSize: '1.125rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                            We are a group of educators, data scientists, and engineers on a mission to ensure no student falls through the cracks. Founded on the belief that data should empower teachers, not overwhelm them, EduShield bridges the gap between complex machine learning and the realities of daily classroom management.
                        </p>

                        <div style={{ textAlign: 'left', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Our Mission</h2>
                            <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                                To democratize access to advanced predictive analytics in educational systems, transforming raw academic and behavioral data into accessible, actionable insights that save academic futures.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
