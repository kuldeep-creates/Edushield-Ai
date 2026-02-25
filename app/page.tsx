import styles from './page.module.css';
import Footer from '../components/Footer';

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

                            {/* Main Navigation */}
                            <nav className={styles.nav}>
                                <a href="/features" className={styles.navLink}>Features</a>
                                <a href="/solutions" className={styles.navLink}>Solutions</a>
                                <a href="/integrations" className={styles.navLink}>Integrations</a>
                                <a href="/success-stories" className={styles.navLink}>Success Stories</a>
                            </nav>

                            {/* Actions */}
                            <div className={styles.headerActions}>
                                <a href="/login" className={styles.loginLink}>Log in</a>
                                <a href="/request-demo" className={styles.demoBtn}>Request Demo</a>
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
                                        <a href="/latest-project" className={styles.heroBadgeLink}>
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
                                        style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', overflow: 'hidden', textAlign: 'left', border: '1px solid #e2e8f0', padding: '1.5rem', gap: '1.5rem' }}
                                    >
                                        {/* Header Area */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>insights</span>
                                                    EduShield Predictive Model
                                                </h3>
                                                <p style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', color: '#64748b', margin: '4px 0 0 0' }}>Real-time Risk Trajectory & Interventions</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <span style={{ fontSize: 'clamp(0.6rem, 1vw, 0.8rem)', fontWeight: 600, color: '#059669', backgroundColor: '#ecfdf5', padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.375rem', border: '1px solid #a7f3d0' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                                                    LIVE
                                                </span>
                                            </div>
                                        </div>

                                        {/* KPI Cards row */}
                                        <div style={{ display: 'flex', gap: '1rem', height: 'auto', minHeight: '60px' }}>
                                            {[
                                                { label: 'Total Tracked', val: '24,592', change: '+2.4%', up: true, alert: false },
                                                { label: 'High Risk Alerts', val: '142', change: '-12%', up: true, alert: true },
                                                { label: 'Intervention SR', val: '78.4%', change: '+5.1%', up: true, alert: false },
                                            ].map((kpi, i) => (
                                                <div key={i} style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
                                                    <div style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap', marginBottom: '0.5rem' }}>{kpi.label}</div>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                                        <span style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: kpi.alert ? '#ef4444' : '#0f172a' }}>{kpi.val}</span>
                                                        <span style={{ flexShrink: 0, fontSize: 'clamp(0.5rem, 0.9vw, 0.7rem)', color: kpi.up ? '#059669' : '#ef4444', backgroundColor: kpi.up ? '#ecfdf5' : '#fef2f2', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                                                            <span className="material-symbols-outlined" style={{ fontSize: 'clamp(0.6rem, 1.1vw, 0.8rem)' }}>{kpi.up ? 'trending_up' : 'trending_down'}</span>
                                                            {kpi.change}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Chart area mock: Line Chart replacing bar chart */}
                                        <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <div style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)', fontWeight: 700, color: '#0f172a' }}>Risk Trajectory (90 Days)</div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    <span style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span> Actual
                                                    </span>
                                                    <span style={{ fontSize: 'clamp(0.6rem, 1vw, 0.75rem)', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#94a3b8' }}></span> Predicted
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ flex: 1, position: 'relative', width: '100%', marginTop: 'auto' }}>
                                                {/* Grid lines */}
                                                <div style={{ position: 'absolute', top: '0', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }}></div>
                                                <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }}></div>
                                                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }}></div>
                                                <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }}></div>
                                                <div style={{ position: 'absolute', bottom: '0', left: 0, right: 0, borderTop: '1px solid #e2e8f0' }}></div>

                                                {/* Simulated Chart Container */}
                                                <div style={{ position: 'absolute', inset: 0, bottom: '1.5rem' }}>
                                                    {/* SVG Area chart */}
                                                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                                                        <defs>
                                                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
                                                                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                                                            </linearGradient>
                                                            <linearGradient id="predictGradient" x1="0" x2="0" y1="0" y2="1">
                                                                <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
                                                                <stop offset="100%" stopColor="#94a3b8" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                        {/* Actual data curve */}
                                                        <path d="M0,80 C15,75 30,40 60,50 L60,100 L0,100 Z" fill="url(#chartGradient)" />
                                                        <path d="M0,80 C15,75 30,40 60,50" fill="none" stroke="var(--color-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />

                                                        {/* Predicted data curve */}
                                                        <path d="M60,50 C75,55 85,15 100,20" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                                                        <path d="M60,50 C75,55 85,15 100,20 L100,100 L60,100 Z" fill="url(#predictGradient)" />
                                                    </svg>

                                                    {/* Data Point: Current */}
                                                    <div style={{ position: 'absolute', left: '60%', top: '50%', width: '10px', height: '10px', backgroundColor: '#ffffff', border: '2px solid var(--color-primary)', borderRadius: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}></div>

                                                    {/* Data Point: Predicted */}
                                                    <div style={{ position: 'absolute', left: '100%', top: '20%', width: '10px', height: '10px', backgroundColor: '#ffffff', border: '2px solid #ef4444', borderRadius: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}></div>

                                                    {/* Tooltip mockup for Prediction */}
                                                    <div style={{ position: 'absolute', left: '100%', top: '20%', transform: 'translate(-80%, -150%)', backgroundColor: '#1e293b', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem', fontWeight: 600, zIndex: 20, whiteSpace: 'nowrap', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                                                        12% High Risk
                                                        <div style={{ position: 'absolute', bottom: '-4px', right: '20%', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid #1e293b' }}></div>
                                                    </div>
                                                </div>

                                                {/* X Axis Labels */}
                                                <div style={{ position: 'absolute', bottom: '-0.25rem', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.55rem, 1vw, 0.75rem)', color: '#64748b', fontWeight: 500 }}>
                                                    <span>Month 1</span>
                                                    <span>Month 2</span>
                                                    <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Current</span>
                                                    <span style={{ color: '#ef4444', fontWeight: 700 }}>Forecast (M4)</span>
                                                </div>

                                            </div>
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

                <Footer />

            </div>
        </div>
    );
}
