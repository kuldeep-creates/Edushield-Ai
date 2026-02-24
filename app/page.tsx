import styles from './page.module.css';

export const metadata = {
    title: 'EduShield AI - Academic Early Warning System',
    description:
        'EduShield AI provides real-time academic early warnings and intervention strategies to ensure every student succeeds.',
};

export default function LandingPage() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>

                {/* ───────────── HEADER ───────────── */}
                <header className={styles.header}>
                    <div className={styles.headerInner}>
                        <div className={styles.headerRow}>

                            {/* Brand */}
                            <a href="#" className={styles.brand}>
                                <div className={styles.brandIcon}>
                                    <span className="material-symbols-outlined">shield_person</span>
                                </div>
                                <span className={styles.brandName}>EduShield AI</span>
                            </a>

                            {/* Nav */}
                            <nav className={styles.nav}>
                                <a href="#" className={styles.navLink}>Platform</a>
                                <a href="#" className={styles.navLink}>Impact</a>
                                <a href="#" className={styles.navLink}>About Us</a>
                                <a href="#" className={styles.navLink}>Contact</a>
                            </nav>

                            {/* Actions */}
                            <div className={styles.headerActions}>
                                <a href="/login" className={styles.loginLink}>Log in</a>
                                <a href="#" className={styles.demoBtn}>Request Demo</a>
                            </div>

                        </div>
                    </div>
                </header>

                {/* ───────────── MAIN ───────────── */}
                <main className={styles.main}>

                    {/* ── HERO ── */}
                    <section className={styles.hero}>
                        <div className={styles.heroInner}>
                            <div className={styles.heroContent}>

                                {/* Badge */}
                                <div className={styles.heroBadge}>
                                    <div className={styles.heroBadgeInner}>
                                        Transforming data into student success.{' '}
                                        <a href="#" className={styles.heroBadgeLink}>
                                            <span className={styles.heroBadgeStretch} aria-hidden="true" />
                                            Read our latest report <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Heading */}
                                <h1 className={styles.heroTitle}>
                                    Prevent Student Failure.
                                    <br className={styles.heroTitleBreak} />
                                    {' '}Strengthen the Nation.
                                </h1>

                                <p className={styles.heroDesc}>
                                    EduShield AI provides real-time academic early warnings and intervention
                                    strategies to ensure every student succeeds. We safeguard the future of
                                    education through data-driven action.
                                </p>

                                {/* Buttons */}
                                <div className={styles.heroButtons}>
                                    <a href="/login" className={styles.heroPrimaryBtn}>Sign In to Platform</a>
                                    <a href="/activate" className={styles.heroSecondaryBtn}>
                                        Create Account{' '}
                                        <span className={styles.heroArrow} aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>

                            {/* Dashboard preview */}
                            <div className={styles.heroDashboard}>
                                <div className={styles.heroDashboardFrame}>
                                    <div
                                        className={styles.dashboardPreview}
                                        aria-label="Dashboard interface showing student analytics"
                                    >
                                        <div className={styles.dashboardIcon}>
                                            <span className="material-symbols-outlined">analytics</span>
                                        </div>
                                        <div className={styles.dashboardBorder}>
                                            <p className={styles.dashboardBorderText}>
                                                Dashboard Preview: Student Retention Metrics
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── NATIONAL IMPACT ── */}
                    <section className={styles.impactSection}>
                        <div className={styles.sectionInner}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTagline}>Our Mission</h2>
                                <p className={styles.sectionTitle}>National Impact</p>
                                <p className={styles.sectionDesc}>
                                    Our mission is to safeguard the future of education through data-driven
                                    intervention. We focus on four key pillars to improve educational outcomes
                                    nationwide.
                                </p>
                            </div>

                            <div className={styles.pillarsGrid}>
                                <dl className={styles.pillarsInner}>

                                    <div className={styles.pillar}>
                                        <div className={styles.pillarIcon}>
                                            <span className="material-symbols-outlined">trending_down</span>
                                        </div>
                                        <dt className={styles.pillarTitle}>Reduce Dropout Rates</dt>
                                        <dd className={styles.pillarDesc}>
                                            Identify at-risk students early to intervene before it&apos;s too late.
                                        </dd>
                                    </div>

                                    <div className={styles.pillar}>
                                        <div className={styles.pillarIcon}>
                                            <span className="material-symbols-outlined">lightbulb</span>
                                        </div>
                                        <dt className={styles.pillarTitle}>Empower Teachers</dt>
                                        <dd className={styles.pillarDesc}>
                                            Equip educators with actionable insights, not just raw data.
                                        </dd>
                                    </div>

                                    <div className={styles.pillar}>
                                        <div className={styles.pillarIcon}>
                                            <span className="material-symbols-outlined">balance</span>
                                        </div>
                                        <dt className={styles.pillarTitle}>Promote Equal Opportunity</dt>
                                        <dd className={styles.pillarDesc}>
                                            Ensure resources are allocated fairly to support underserved communities.
                                        </dd>
                                    </div>

                                    <div className={styles.pillar}>
                                        <div className={styles.pillarIcon}>
                                            <span className="material-symbols-outlined">work</span>
                                        </div>
                                        <dt className={styles.pillarTitle}>Strengthen Workforce</dt>
                                        <dd className={styles.pillarDesc}>
                                            Prepare a capable and educated generation for the future economy.
                                        </dd>
                                    </div>

                                </dl>
                            </div>
                        </div>
                    </section>

                    {/* ── HOW IT WORKS ── */}
                    <section className={styles.howSection}>
                        <div className={styles.sectionInner}>
                            <div className={styles.howHeader}>
                                <h2 className={styles.sectionTitle}>How It Works</h2>
                                <p className={styles.sectionDesc}>
                                    A seamless integration process designed for minimal disruption and maximum
                                    impact.
                                </p>
                            </div>

                            <div className={styles.stepsContainer}>
                                <div className={styles.stepsLine} />

                                <div className={styles.steps}>

                                    {/* Step 1 — text LEFT | icon CENTER | empty RIGHT */}
                                    <div className={styles.step}>
                                        <div className={styles.stepLeft}>
                                            <h3 className={styles.stepTitle}>Connect SIS</h3>
                                            <p className={styles.stepDesc}>
                                                Seamlessly integrate with your existing Student Information Systems
                                                without complex infrastructure changes.
                                            </p>
                                        </div>
                                        <div className={styles.stepIconWrap}>
                                            <div className={styles.stepIconInner}>
                                                <span className="material-symbols-outlined">database</span>
                                            </div>
                                        </div>
                                        <div className={styles.stepEmptyRight} />
                                    </div>

                                    {/* Step 2 — empty LEFT | icon CENTER | text RIGHT */}
                                    <div className={styles.step}>
                                        <div className={styles.stepEmptyLeft} />
                                        <div className={styles.stepIconWrap}>
                                            <div className={styles.stepIconInner}>
                                                <span className="material-symbols-outlined">psychology</span>
                                            </div>
                                        </div>
                                        <div className={styles.stepRight}>
                                            <h3 className={styles.stepTitle}>AI Analysis</h3>
                                            <p className={styles.stepDesc}>
                                                Our advanced AI processes data in real-time to identify at-risk patterns
                                                and behavioral indicators.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 — text LEFT | icon CENTER | empty RIGHT */}
                                    <div className={styles.step}>
                                        <div className={styles.stepLeft}>
                                            <h3 className={styles.stepTitle}>Deploy Support</h3>
                                            <p className={styles.stepDesc}>
                                                Automatically generate and deploy personalized intervention plans for
                                                counselors and teachers.
                                            </p>
                                        </div>
                                        <div className={styles.stepIconWrap}>
                                            <div className={styles.stepIconInner}>
                                                <span className="material-symbols-outlined">target</span>
                                            </div>
                                        </div>
                                        <div className={styles.stepEmptyRight} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── CTA ── */}
                    <section className={styles.ctaSection}>
                        <div className={styles.ctaInner}>
                            <div className={styles.ctaContent}>
                                <h2 className={styles.ctaTitle}>Ready to secure the future?</h2>
                                <p className={styles.ctaDesc}>
                                    Join over 500 school districts already using EduShield to improve student
                                    outcomes.
                                </p>
                                <div className={styles.ctaButtons}>
                                    <a href="/activate" className={styles.ctaPrimaryBtn}>Get started today</a>
                                    <a href="/login" className={styles.ctaSecondaryBtn}>
                                        Sign in{' '}
                                        <span className={styles.ctaArrow} aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                </main>

                {/* ───────────── FOOTER ───────────── */}
                <footer className={styles.footer} aria-labelledby="footer-heading">

                    <div className={styles.footerInner}>

                        <div className={styles.footerTop}>

                            {/* Brand column */}
                            <div className={styles.footerBrand}>
                                <a href="#" className={styles.footerBrandRow}>
                                    <div className={styles.footerBrandIcon}>
                                        <span className="material-symbols-outlined">shield_person</span>
                                    </div>
                                    <span className={styles.footerBrandName}>EduShield AI</span>
                                </a>
                                <p className={styles.footerBrandDesc}>
                                    Empowering schools with data-driven insights to ensure no student is left
                                    behind.
                                </p>
                            </div>

                            {/* Link columns */}
                            <div className={styles.footerLinks}>

                                <div className={styles.footerLinksHalf}>
                                    <div className={styles.footerCol}>
                                        <h3 className={styles.footerColTitle}>Solutions</h3>
                                        <ul className={styles.footerColList} role="list">
                                            <li><a href="#">Early Warning</a></li>
                                            <li><a href="#">Intervention Planning</a></li>
                                            <li><a href="#">District Analytics</a></li>
                                        </ul>
                                    </div>
                                    <div className={`${styles.footerCol} ${styles.footerColRight}`}>
                                        <h3 className={styles.footerColTitle}>Support</h3>
                                        <ul className={styles.footerColList} role="list">
                                            <li><a href="#">Documentation</a></li>
                                            <li><a href="#">API Reference</a></li>
                                            <li><a href="#">System Status</a></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={styles.footerLinksHalf}>
                                    <div className={styles.footerCol}>
                                        <h3 className={styles.footerColTitle}>Company</h3>
                                        <ul className={styles.footerColList} role="list">
                                            <li><a href="#">About</a></li>
                                            <li><a href="#">Blog</a></li>
                                            <li><a href="#">Careers</a></li>
                                        </ul>
                                    </div>
                                    <div className={`${styles.footerCol} ${styles.footerColRight}`}>
                                        <h3 className={styles.footerColTitle}>Legal</h3>
                                        <ul className={styles.footerColList} role="list">
                                            <li><a href="#">Privacy</a></li>
                                            <li><a href="#">Terms</a></li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={styles.footerBottom}>
                            <p className={styles.footerCopy}>© 2024 EduShield AI. All rights reserved.</p>
                        </div>

                    </div>
                </footer>

            </div>
        </div>
    );
}
