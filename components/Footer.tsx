import styles from '../app/footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className={styles.footer} aria-label="Site footer">
            <div className={styles.inner}>

                {/* Top section */}
                <div className={styles.top}>

                    {/* Brand */}
                    <div className={styles.brand}>
                        <a href="/" className={styles.brandRow}>
                            <div className={styles.brandIcon}>
                                <span className="material-symbols-outlined">shield_person</span>
                            </div>
                            <span className={styles.brandName}>EduShield AI</span>
                        </a>
                        <p className={styles.brandDesc}>
                            Empowering schools with data-driven insights to ensure no student is left behind.
                        </p>
                        <div className={styles.badge}>
                            <span className={styles.badgeDot}></span>
                            DPDP Compliant &amp; NEP 2020 Aligned
                        </div>
                    </div>

                    {/* Link columns */}
                    <div className={styles.cols}>

                        <div className={styles.col}>
                            <h3 className={styles.colTitle}>Platform</h3>
                            <ul className={styles.colList}>
                                <li><a href="/features">Features</a></li>
                                <li><a href="/solutions">Solutions</a></li>
                                <li><a href="/integrations">Integrations</a></li>
                                <li><a href="/impact">Impact Metrics</a></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <h3 className={styles.colTitle}>Resources</h3>
                            <ul className={styles.colList}>
                                <li><a href="/success-stories">Success Stories</a></li>
                                <li><a href="/latest-project">Dev Report</a></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <h3 className={styles.colTitle}>Company</h3>
                            <ul className={styles.colList}>
                                <li><a href="/about">About Us</a></li>
                                <li><a href="/contact">Contact</a></li>
                                <li><a href="/request-demo">Request Demo</a></li>
                            </ul>
                        </div>

                        <div className={styles.col}>
                            <h3 className={styles.colTitle}>Legal</h3>
                            <ul className={styles.colList}>
                                <li><a href="/security">Security &amp; Privacy</a></li>
                                <li><a href="/terms">Terms of Service</a></li>
                                <li><a href="/login">Sign In</a></li>
                                <li><a href="/activate">Create Account</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom bar */}
                <div className={styles.bottom}>
                    <p className={styles.copy}>© {year} EduShield AI. All rights reserved.</p>
                    <p className={styles.madeWith}>Built for India's 250M+ students.</p>
                </div>

            </div>
        </footer>
    );
}
