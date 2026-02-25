import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Partner Ecosystem | Grow with EduShield AI',
    description: 'Join the EduShield Partner Network. We collaborate with school ERP providers, educational NGOs, and government agencies to build a unified student success layer for Indian education.',
    keywords: [
        'EduShield Partner Network',
        'ERP Integration Partner',
        'EdTech Partnerships India',
        'Govt. Education Partner',
        'Educational NGO Collaboration',
        'EduShield API Access',
        'Data Success Partner',
        'B2B EdTech India',
        'School Success Ecosystem',
        'Educational Data Pipelines',
        'Platform Partnership India',
        'Strategic EdTech Alliances',
        'Partnering with EduShield AI',
        'Institutional Growth Partners',
        'EduShield Developer Program',
        'Educational Analytics API',
        'Digital Transformation Partner',
        'NEP 2020 Implementation Partner',
        'Indian Education System Integration',
        'Student Risk Engine API Partner'
    ],
    openGraph: {
        title: 'EduShield AI Partner Program - Let’s Scale Success Together',
        description: 'Collaborate with the leading academic risk engine in India. Open APIs and specialized workflows for ERP and LMS providers.',
        url: 'https://edushield.ai/partners',
        siteName: 'EduShield AI',
        images: [{ url: '/partners-og.png' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Partner with EduShield AI',
        description: 'Empower your school management system with predictive AI layers. Learn about our developer and channel partnerships.',
    }
};

const partnerTypes = [
    { title: 'ERP/LMS Providers', icon: 'integration_instructions', desc: 'Add a predictive layer to your existing software. We provide secure API endpoints to pull data and push AI risk scores back into your dashboard.' },
    { title: 'Educational NGOs', icon: 'diversity_3', desc: 'Scale your social impact. Use our analytics to track dropout risks in rural school networks and deploy your field volunteers more effectively.' },
    { title: 'Resellers & Consultants', icon: 'handshake', desc: 'Expand your portfolio. Introduce India’s first academic risk engine to your network of schools and colleges with our white-label options.' },
    { title: 'Govt. Contractors', icon: 'account_balance', desc: 'Fulfill state-level digital transformation mandates with a DPDP-compliant, NEP-aligned analytics engine ready for mass deployment.' },
];

export default function PartnersPage() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.headerInner}>
                        <div className={styles.headerRow}>
                            <a href="/" className={styles.brand}>
                                <div className={styles.brandIcon}><span className="material-symbols-outlined">shield_person</span></div>
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

                <main style={{ backgroundColor: '#ffffff' }}>
                    {/* Partner Hero */}
                    <div style={{ padding: '8rem 1.5rem', textAlign: 'center', maxWidth: '64rem', margin: '0 auto' }}>
                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            A Unified Ecosystem for <br />
                            <span style={{ background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Student Success.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6, marginBottom: '3rem' }}>
                            No single platform can solve education failure alone. We partner with the biggest players in the Indian education landscape to build a collaborative safety net for every student.
                        </p>
                        <a href="/contact" style={{ display: 'inline-flex', backgroundColor: '#0f172a', color: '#ffffff', padding: '1.125rem 2.5rem', borderRadius: '1rem', fontWeight: 800, textDecoration: 'none', fontSize: '1.125rem' }}>Become a Partner</a>
                    </div>

                    {/* Partnership Tracks */}
                    <div style={{ backgroundColor: '#f8fafc', padding: '6rem 1.5rem' }}>
                        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
                            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>Partnership Tracks</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                                {partnerTypes.map((track, i) => (
                                    <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '1.5rem', padding: '3rem 2rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', color: '#059669', marginBottom: '1.5rem', display: 'block' }}>{track.icon}</span>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>{track.title}</h3>
                                        <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '1rem' }}>{track.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Developer Section */}
                    <div style={{ padding: '10rem 1.5rem', textAlign: 'center', maxWidth: '50rem', margin: '0 auto' }}>
                        <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '9999px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.875rem', fontWeight: 700, marginBottom: '2rem' }}>DEVELOPER API</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>Build on the risk engine.</h2>
                        <p style={{ color: '#64748b', fontSize: '1.125rem', lineHeight: 1.7, marginBottom: '3.5rem' }}>
                            Our developer center provides full documentation, sandbox environments, and real-time monitoring for your production pipelines. Build custom tools on top of India's most accurate student risk scores.
                        </p>
                        <div style={{ backgroundColor: '#1e293b', borderRadius: '1.5rem', padding: '2rem', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.875rem', fontFamily: 'monospace', lineHeight: 1.5 }}>
                                <span style={{ color: '#818cf8' }}>GET</span> /api/v1/students/<span style={{ color: '#38bdf8' }}>{'{student_id}'}</span>/risk-score <br />
                                <span style={{ color: '#10b981' }}>// Result: 87.4% (Critical Warning)</span> <br />
                                <span style={{ color: '#818cf8' }}>{'{'}</span> <br />
                                &nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"prediction"</span>: <span style={{ color: '#f87171' }}>"FailProbability"</span>, <br />
                                &nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"confidence"</span>: <span style={{ color: '#38bdf8' }}>0.912</span>, <br />
                                &nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"suggested_intervention"</span>: <span style={{ color: '#38bdf8' }}>"Remedial_Tier_1"</span> <br />
                                <span style={{ color: '#818cf8' }}>{'}'}</span>
                            </div>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(30,41,59,0) 0%, rgba(30,41,59,1) 90%)' }} />
                        </div>
                        <a href="/login" style={{ marginTop: '2rem', display: 'inline-block', color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Explore API Documentation →</a>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
