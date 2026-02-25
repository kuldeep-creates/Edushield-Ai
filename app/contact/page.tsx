import styles from '../request-demo/page.module.css';

export const metadata = {
    title: 'Contact Us | EduShield AI',
    description: 'Get in touch with the EduShield AI team.',
};

export default function ContactPage() {
    return (
        <div className={styles.page}>
            <a href="/" className={styles.closeOverlayBtn} aria-label="Go Back">
                <span className="material-symbols-outlined">arrow_back</span>
            </a>

            <main className={styles.container}>
                <section className={styles.rightPanel} style={{ maxWidth: '100%', flex: 1, overflowY: 'auto' }}>
                    <div className={styles.rightInner} style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#f3e8ff', color: '#9333ea', borderRadius: '50%', marginBottom: '1rem' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>mail</span>
                        </div>
                        <h1 className={styles.formTitle} style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Get in Touch</h1>
                        <p className={styles.formSubtitle} style={{ marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5' }}>
                            Have a general inquiry, partnership proposal, or press request? Our inbox is always open. For sales, please use <strong>Request Demo</strong>.
                        </p>

                        <form className={styles.form} style={{ textAlign: 'left' }}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Full Name</label>
                                <input className={styles.inputSleek} type="text" placeholder="John Doe" />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Email Address</label>
                                <input className={styles.inputSleek} type="email" placeholder="john@example.com" />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label className={styles.fieldLabel}>Message</label>
                                <textarea className={styles.inputSleek} rows={4} placeholder="How can we help?" style={{ resize: 'vertical' }} />
                            </div>
                            <button type="button" className={styles.submitBtn} style={{ marginTop: '1rem', padding: '1rem', width: '100%', justifyContent: 'center' }}>
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
