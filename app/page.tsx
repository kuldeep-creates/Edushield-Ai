import styles from './page.module.css';
import Footer from '../components/Footer';

export const metadata = {
    title: 'EduShield AI — Academic Early Warning System for India',
    description: 'EduShield AI gives students, teachers, and schools a real-time academic risk engine to prevent failure before it happens.',
};

export default function LandingPage() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>

                {/* ═══════════════════════════════════════════════════
                    HEADER
                ═══════════════════════════════════════════════════ */}
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

                <main className={styles.main}>

                    {/* ═══════════════════════════════════════════════════
                        HERO — Asymmetric split with diagonal clip
                    ═══════════════════════════════════════════════════ */}
                    <section className={styles.hero}>
                        {/* Subtle dot-grid overlay */}
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none', zIndex: 0 }} />
                        {/* Glow blob */}
                        <div style={{ position: 'absolute', top: '-10rem', left: '50%', transform: 'translateX(-50%)', width: '40rem', height: '40rem', background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

                        <div className={styles.heroInner} style={{ position: 'relative', zIndex: 1 }}>
                            <div className={styles.heroContent}>

                                {/* Badge */}
                                <div className={styles.heroBadge}>
                                    <div className={styles.heroBadgeInner}>
                                        <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8', marginRight: '0.5rem', verticalAlign: 'middle', boxShadow: '0 0 6px #38bdf8' }} />
                                        Powered by AI · Built for India&apos;s 250M+ students{' '}
                                        <a href="/latest-project" className={styles.heroBadgeLink}>
                                            <span className={styles.heroBadgeStretch} aria-hidden="true" />
                                            Read dev report <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Title */}
                                <h1 className={styles.heroTitle}>
                                    Prevent Student Failure.
                                    <br className={styles.heroTitleBreak} />
                                    {' '}
                                    <span style={{ background: 'linear-gradient(135deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', whiteSpace: 'nowrap' }}>
                                        Strengthen the Nation.
                                    </span>
                                </h1>

                                <p className={styles.heroDesc}>
                                    EduShield AI is India&apos;s first real-time academic early warning system.
                                    We give schools, teachers, and students the data they need to act —
                                    before failure becomes permanent.
                                </p>

                                {/* Buttons */}
                                {/* <div className={styles.heroButtons}>
                                    <a href="/request-demo" className={styles.heroPrimaryBtn}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>play_circle</span>
                                        See It in Action
                                    </a>
                                    <a href="/features" className={styles.heroSecondaryBtn}>
                                        Explore Features{' '}
                                        <span className={styles.heroArrow} aria-hidden="true">→</span>
                                    </a>
                                </div> */}

                                {/* Trust bar — centered */}
                                <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center' }}>
                                    <div style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}>
                                        {[
                                            { val: '500+', label: 'School Districts', icon: 'location_city' },
                                            { val: '91.8%', label: 'AI Accuracy', icon: 'verified' },
                                            { val: '2.4M+', label: 'Students Protected', icon: 'groups' },
                                        ].map((s, i) => (
                                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 2rem', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', minWidth: '110px' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem', color: '#38bdf8', marginBottom: '0.25rem' }}>{s.icon}</span>
                                                <span style={{ fontWeight: 900, fontSize: '1.375rem', color: '#f1f5f9', lineHeight: 1, letterSpacing: '-0.03em' }}>{s.val}</span>
                                                <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500, marginTop: '0.25rem', whiteSpace: 'nowrap' }}>{s.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard preview */}
                            <div className={styles.heroDashboard}>
                                <div className={styles.heroDashboardFrame} style={{ backgroundColor: '#ffffff' }}>
                                    <div
                                        className={styles.dashboardPreview}
                                        aria-label="Dashboard interface showing student analytics"
                                        style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff', overflow: 'hidden', textAlign: 'left', border: '1px solid #e2e8f0', padding: '1.5rem', gap: '1.5rem' }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>insights</span>
                                                    EduShield Predictive Model
                                                </h3>
                                                <p style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', color: '#64748b', margin: '4px 0 0 0' }}>Real-time Risk Trajectory &amp; Interventions</p>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669', backgroundColor: '#ecfdf5', padding: '0.25rem 0.75rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.375rem', border: '1px solid #a7f3d0' }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }}></span> LIVE
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', minHeight: '60px' }}>
                                            {[
                                                { label: 'Total Tracked', val: '24,592', change: '+2.4%', up: true, alert: false },
                                                { label: 'High Risk Alerts', val: '142', change: '-12%', up: true, alert: true },
                                                { label: 'Intervention SR', val: '78.4%', change: '+5.1%', up: true, alert: false },
                                            ].map((kpi, i) => (
                                                <div key={i} style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap', marginBottom: '0.5rem' }}>{kpi.label}</div>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                                                        <span style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: kpi.alert ? '#ef4444' : '#0f172a' }}>{kpi.val}</span>
                                                        <span style={{ fontSize: '0.7rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', fontWeight: 700 }}>
                                                            {kpi.change}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', padding: '1rem', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>Risk Trajectory (90 Days)</div>
                                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                    {[{ c: 'var(--color-primary)', l: 'Actual' }, { c: '#94a3b8', l: 'Predicted' }].map((leg, i) => (
                                                        <span key={i} style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: leg.c, display: 'inline-block' }}></span>{leg.l}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ flex: 1, position: 'relative', minHeight: '80px' }}>
                                                {[0, 25, 50, 75].map(p => <div key={p} style={{ position: 'absolute', top: `${p}%`, left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />)}
                                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #e2e8f0' }} />
                                                <div style={{ position: 'absolute', inset: 0, bottom: '1.5rem' }}>
                                                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                                                        <defs>
                                                            <linearGradient id="cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" /></linearGradient>
                                                            <linearGradient id="pg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" /><stop offset="100%" stopColor="#94a3b8" stopOpacity="0" /></linearGradient>
                                                        </defs>
                                                        <path d="M0,80 C15,75 30,40 60,50 L60,100 L0,100 Z" fill="url(#cg)" />
                                                        <path d="M0,80 C15,75 30,40 60,50" fill="none" stroke="var(--color-primary)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                                                        <path d="M60,50 C75,55 85,15 100,20" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
                                                        <path d="M60,50 C75,55 85,15 100,20 L100,100 L60,100 Z" fill="url(#pg)" />
                                                    </svg>
                                                    <div style={{ position: 'absolute', left: '60%', top: '50%', width: '10px', height: '10px', backgroundColor: '#ffffff', border: '2px solid var(--color-primary)', borderRadius: '50%', transform: 'translate(-50%,-50%)', zIndex: 10 }} />
                                                    <div style={{ position: 'absolute', left: '100%', top: '20%', transform: 'translate(-80%,-150%)', backgroundColor: '#1e293b', color: '#fff', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem', fontWeight: 600, zIndex: 20, whiteSpace: 'nowrap', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                                        12% High Risk
                                                        <div style={{ position: 'absolute', bottom: '-4px', right: '20%', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '4px solid #1e293b' }} />
                                                    </div>
                                                </div>
                                                <div style={{ position: 'absolute', bottom: '-0.25rem', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>
                                                    <span>Month 1</span><span>Month 2</span>
                                                    <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Current</span>
                                                    <span style={{ color: '#ef4444', fontWeight: 700 }}>Forecast</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── White gap between hero and student section ── */}
                    <div style={{ backgroundColor: '#ffffff', height: '3rem' }} />

                    {/* ═══════════════════════════════════════════════════
                        STUDENT SPOTLIGHT — Diagonal asymmetric section
                    ═══════════════════════════════════════════════════ */}
                    <section style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#0f172a' }}>
                        {/* Diagonal top divide — matches hero fade white exactly */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(135deg, #ffffff 50%, transparent 50%)', zIndex: 2, pointerEvents: 'none' }} />

                        {/* Purple glow orbs */}
                        <div style={{ position: 'absolute', top: '10%', right: '-8rem', width: '36rem', height: '36rem', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: '5%', left: '-6rem', width: '28rem', height: '28rem', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

                        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '8.5rem 1.5rem 7.5rem', position: 'relative', zIndex: 3 }}>

                            {/* Section label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ height: '3px', width: '3rem', background: 'linear-gradient(90deg, #7c3aed, #38bdf8)', borderRadius: '9999px' }} />
                                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em' }}>For Students</span>
                                <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
                            </div>

                            {/* Asymmetric grid — copy left, BIG card right */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 26rem), 1fr))', gap: '3rem', alignItems: 'center' }}>

                                {/* LEFT: Copy */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                                    {/* Heading block */}
                                    <div>
                                        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.04em', lineHeight: 1.1, margin: '0 0 1rem' }}>
                                            Know your{' '}
                                            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                academic risk
                                            </span>
                                            <br />before your teacher does.
                                        </h2>
                                        {/* Accent rule */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ height: '2px', width: '2.5rem', background: 'linear-gradient(90deg, #7c3aed, #38bdf8)', borderRadius: '9999px', flexShrink: 0 }} />
                                            <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                                                Activate in 2 minutes. Get your live risk score, attendance impact, and private early alerts.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Features — 2×2 grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
                                        {[
                                            { icon: '📊', title: 'Live Risk Score', sub: 'Updated weekly by subject.' },
                                            { icon: '📅', title: 'Attendance Tracker', sub: 'See grade impact of absences.' },
                                            { icon: '🎯', title: 'Smart Goal Planner', sub: 'Day-by-day plan to hit targets.' },
                                            { icon: '🔕', title: 'Private Early Alerts', sub: 'You hear it first. Privately.' },
                                        ].map((f, i) => (
                                            <div key={i} style={{ padding: '0.875rem', borderRadius: '0.75rem', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                                <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{f.icon}</span>
                                                <p style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '0.8125rem', margin: 0 }}>{f.title}</p>
                                                <p style={{ color: '#475569', fontSize: '0.75rem', margin: 0, lineHeight: 1.5 }}>{f.sub}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Login link */}
                                    <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', width: 'fit-content' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>login</span>
                                        Already have an account?{' '}
                                        <span style={{ color: '#a78bfa', fontWeight: 700 }}>Student Login →</span>
                                    </a>

                                </div>

                                {/* RIGHT: Framed student dashboard card */}
                                <div style={{ position: 'relative', minWidth: 0, overflow: 'hidden' }}>
                                    {/* Floating glow behind card */}
                                    <div style={{ position: 'absolute', inset: '-2rem', background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)', borderRadius: '2rem', pointerEvents: 'none' }} />

                                    {/* Browser-style frame */}
                                    <div style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08)', background: '#1e293b' }}>
                                        {/* Frame top bar */}
                                        <div style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#0f172a' }}>
                                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                                                {['#ef4444', '#f59e0b', '#22c55e'].map((c, i) => <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c }} />)}
                                            </div>
                                            <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '0.375rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: '#475569', textAlign: 'center', fontFamily: 'monospace' }}>
                                                app.edushield.ai/student/dashboard
                                            </div>
                                        </div>

                                        {/* Dashboard content inside frame */}
                                        <div style={{ padding: '1rem', backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>

                                            {/* Student header */}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: '1.375rem' }}>school</span>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.9375rem', margin: 0 }}>Aryan Sharma</p>
                                                    <p style={{ color: '#475569', fontSize: '0.75rem', margin: 0 }}>Class X-A • STU-2024-0142 • KV Delhi</p>
                                                </div>
                                                <div style={{ backgroundColor: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)', borderRadius: '0.5rem', padding: '0.25rem 0.625rem', fontSize: '0.7rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                                                    IMPROVING ↑
                                                </div>
                                            </div>

                                            {/* Risk score row */}
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '0.875rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                {/* Ring */}
                                                <div style={{ position: 'relative', width: '80px', height: '80px', flexShrink: 0 }}>
                                                    <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
                                                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="36 64" strokeLinecap="round" />
                                                    </svg>
                                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span style={{ color: '#34d399', fontWeight: 900, fontSize: '1.25rem', lineHeight: 1 }}>36</span>
                                                        <span style={{ color: '#475569', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase' }}>Risk</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p style={{ color: '#64748b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.25rem' }}>Academic Risk Score</p>
                                                    <p style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.0625rem', margin: '0 0 0.2rem' }}>Low Risk — On Track</p>
                                                    <p style={{ color: '#475569', fontSize: '0.75rem', margin: 0 }}>Was 78% last term. Down 42 points 🎉</p>
                                                </div>
                                            </div>

                                            {/* Subject bars */}
                                            <div style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '0.875rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <p style={{ color: '#475569', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.875rem', margin: '0 0 0.875rem' }}>Subject Performance</p>
                                                {[
                                                    { sub: 'Mathematics', score: 82, color: '#34d399' },
                                                    { sub: 'Science', score: 74, color: '#38bdf8' },
                                                    { sub: 'English', score: 91, color: '#a78bfa' },
                                                    { sub: 'Social Studies', score: 65, color: '#fb923c' },
                                                ].map((s, i) => (
                                                    <div key={i} style={{ marginBottom: i < 3 ? '0.625rem' : 0 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                                            <span style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 500 }}>{s.sub}</span>
                                                            <span style={{ color: s.color, fontSize: '0.8125rem', fontWeight: 700 }}>{s.score}%</span>
                                                        </div>
                                                        <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '9999px', overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', width: `${s.score}%`, backgroundColor: s.color, borderRadius: '9999px' }} />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Alert */}
                                            <div style={{ backgroundColor: 'rgba(251,146,60,0.08)', border: '1px solid rgba(251,146,60,0.2)', borderRadius: '0.75rem', padding: '0.875rem 1rem', display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                                                <span style={{ fontSize: '1rem', flexShrink: 0 }}>🔔</span>
                                                <div>
                                                    <p style={{ color: '#fb923c', fontWeight: 700, fontSize: '0.8125rem', margin: '0 0 0.125rem' }}>Attendance Alert</p>
                                                    <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0, lineHeight: 1.5 }}>3 more absences in Social Studies may drop your grade below threshold.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom rule — mirrors the top "For Students" label */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '3rem' }}>
                                <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(255,255,255,0.06)' }} />
                                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.12em' }}>For Students</span>
                                <div style={{ height: '3px', width: '3rem', background: 'linear-gradient(90deg, #38bdf8, #7c3aed)', borderRadius: '9999px' }} />
                            </div>

                        </div>

                        {/* Diagonal bottom divide */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(135deg, transparent 50%, #ffffff 50%)', zIndex: 2, pointerEvents: 'none' }} />
                    </section>

                    {/* ── White gap between student section and National Impact ── */}
                    <div style={{ backgroundColor: '#ffffff', height: '3rem' }} />

                    {/* ═══════════════════════════════════════════════════
                        NATIONAL IMPACT — Light section
                    ═══════════════════════════════════════════════════ */}
                    <section className={styles.impactSection}>
                        <div className={styles.sectionInner}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTagline}>Our Mission</h2>
                                <p className={styles.sectionTitle}>National Impact</p>
                                <p className={styles.sectionDesc}>
                                    Our mission is to safeguard the future of education through data-driven
                                    intervention. We focus on four key pillars to improve educational outcomes nationwide.
                                </p>
                            </div>
                            <div className={styles.pillarsGrid}>
                                <dl className={styles.pillarsInner}>
                                    {[
                                        { icon: 'trending_down', title: 'Reduce Dropout Rates', desc: 'Identify at-risk students early to intervene before it\'s too late.' },
                                        { icon: 'lightbulb', title: 'Empower Teachers', desc: 'Equip educators with actionable insights, not just raw data.' },
                                        { icon: 'balance', title: 'Promote Equal Opportunity', desc: 'Ensure resources are allocated fairly to support underserved communities.' },
                                        { icon: 'work', title: 'Strengthen Workforce', desc: 'Prepare a capable and educated generation for the future economy.' },
                                    ].map((p, i) => (
                                        <div key={i} className={styles.pillar}>
                                            <div className={styles.pillarIcon}><span className="material-symbols-outlined">{p.icon}</span></div>
                                            <dt className={styles.pillarTitle}>{p.title}</dt>
                                            <dd className={styles.pillarDesc}>{p.desc}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                    </section>

                    {/* ═══════════════════════════════════════════════════
                        HOW IT WORKS
                    ═══════════════════════════════════════════════════ */}
                    <section className={styles.howSection}>
                        <div className={styles.sectionInner}>
                            <div className={styles.howHeader}>
                                <h2 className={styles.sectionTitle}>How It Works</h2>
                                <p className={styles.sectionDesc}>
                                    A seamless integration process designed for minimal disruption and maximum impact.
                                </p>
                            </div>
                            <div className={styles.stepsContainer}>
                                <div className={styles.stepsLine} />
                                <div className={styles.steps}>
                                    {[
                                        { title: 'Connect SIS', desc: 'Seamlessly integrate with your existing Student Information Systems without complex infrastructure changes.', icon: 'database', side: 'left' },
                                        { title: 'AI Analysis', desc: 'Our advanced AI processes data in real-time to identify at-risk patterns and behavioral indicators.', icon: 'psychology', side: 'right' },
                                        { title: 'Deploy Support', desc: 'Automatically generate and deploy personalized intervention plans for counselors and teachers.', icon: 'target', side: 'left' },
                                    ].map((step, i) => (
                                        <div key={i} className={styles.step}>
                                            {step.side === 'left' && <div className={styles.stepLeft}><h3 className={styles.stepTitle}>{step.title}</h3><p className={styles.stepDesc}>{step.desc}</p></div>}
                                            {step.side === 'right' && <div className={styles.stepEmptyLeft} />}
                                            <div className={styles.stepIconWrap}><div className={styles.stepIconInner}><span className="material-symbols-outlined">{step.icon}</span></div></div>
                                            {step.side === 'right' && <div className={styles.stepRight}><h3 className={styles.stepTitle}>{step.title}</h3><p className={styles.stepDesc}>{step.desc}</p></div>}
                                            {step.side === 'left' && <div className={styles.stepEmptyRight} />}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══════════════════════════════════════════════════
                        CTA — School/District focused
                    ═══════════════════════════════════════════════════ */}
                    <section className={styles.ctaSection}>
                        <div className={styles.ctaInner}>
                            <div className={styles.ctaContent}>
                                <h2 className={styles.ctaTitle}>Ready to protect your students?</h2>
                                <p className={styles.ctaDesc}>
                                    Join 500+ school districts already deploying EduShield AI. Get a live demo tailored to your district&apos;s needs.
                                </p>
                                <div className={styles.ctaButtons}>
                                    <a href="/request-demo" className={styles.ctaPrimaryBtn}>Schedule a Demo</a>
                                    <a href="/about" className={styles.ctaSecondaryBtn}>
                                        Learn about us{' '}
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
