import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Pricing & Plans | EduShield AI',
    description: 'Transparent pricing for schools, districts, and state governments. EduShield AI provides flexible, scale-based plans designed to fit the unique needs of the Indian education system, from single campuses to statewide deployments.',
    keywords: [
        'EduShield AI Pricing',
        'EdTech Cost India',
        'School Software Pricing',
        'Academic Early Warning System Cost',
        'AI for Schools Pricing',
        'Student Success Platform Fees',
        'Educational Analytics Pricing',
        'NEP 2020 Software Cost',
        'Predictive Analytics for Schools Price',
        'Institutional EdTech Plans India',
        'EduShield Enterprise Pricing',
        'District Wide EdTech Cost',
        'SaaS For Schools India',
        'Affordable EdTech Solutions',
        'Predictive Success Engine Pricing',
        'Educational Intervention Software Cost',
        'AI Dashboard Fees for Teachers',
        'Student Risk Monitoring Price',
        'School Data Analytics Cost',
        'India EdTech Market Pricing'
    ],
    openGraph: {
        title: 'EduShield AI Pricing - Scalable Solutions for Every Institution',
        description: 'From local schools to state-wide government bodies, find the perfectly scaled plan for your academic success journey.',
        url: 'https://edushield.ai/pricing',
        siteName: 'EduShield AI',
        images: [{ url: '/pricing-og.png' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Transparent Pricing for EduShield AI',
        description: 'See how EduShield AI fits your school budget while delivering industry-leading academic risk monitoring.',
    }
};

export default function PricingPage() {
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

                <main style={{ backgroundColor: '#f8fafc', padding: '6rem 1.5rem' }}>
                    <div style={{ maxWidth: '80rem', margin: '0 auto', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>Plans for Every Scale</h1>
                        <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '42rem', margin: '0 auto 4rem' }}>
                            We believe high-quality academic risk monitoring should be available to every school in India.
                            Select a plan that matches your institutional scale.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
                            {/* Standard Plan */}
                            <div style={{ backgroundColor: '#ffffff', borderRadius: '1.5rem', border: '1px solid #e2e8f0', padding: '3rem 2rem', textAlign: 'left', position: 'relative' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Campus Essential</h3>
                                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Ideal for single-campus schools focusing on board exam success.</p>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2rem' }}>Custom <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ annually</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {['Up to 1,500 students', 'Early Warning Alerts', 'SIS/ERP Integration', 'Standard NEP Dashboards', 'Email Support'].map((f, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#475569' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#10b981', fontSize: '1.25rem' }}>check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/request-demo" style={{ display: 'block', textAlign: 'center', padding: '1rem', backgroundColor: '#f1f5f9', color: '#0f172a', borderRadius: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>Get Quote</a>
                            </div>

                            {/* Pro Plan */}
                            <div style={{ backgroundColor: '#ffffff', borderRadius: '1.5rem', border: '2px solid #3b82f6', padding: '3rem 2rem', textAlign: 'left', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', backgroundColor: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700 }}>MOST POPULAR</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>District Pro</h3>
                                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Perfect for school groups and districts requiring deep multi-branch sync.</p>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2rem' }}>Custom <span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/ annually</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        'Unlimited students & branches',
                                        'NLP Behavioral Sentiment',
                                        'Advanced Counselor Triage',
                                        'Custom Intervention Flows',
                                        '24/7 Priority Support',
                                        'White-labeled Portals'
                                    ].map((f, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#475569' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#3b82f6', fontSize: '1.25rem' }}>check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/request-demo" style={{ display: 'block', textAlign: 'center', padding: '1rem', backgroundColor: '#3b82f6', color: '#ffffff', borderRadius: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>Contact Sales</a>
                            </div>

                            {/* State Plan */}
                            <div style={{ backgroundColor: '#0f172a', borderRadius: '1.5rem', padding: '3rem 2rem', textAlign: 'left', color: '#ffffff' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>State Enterprise</h3>
                                <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>For government bodies and state-wide digital transformation initiatives.</p>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Tender <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ per project</span></div>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        'State-wide macro analytics',
                                        'UDISE+ Automated Sync',
                                        'Govt. Policy Impact Tools',
                                        'On-premise deployment option',
                                        'Unlimited Staff Accounts',
                                        'Dedicated Project Manager'
                                    ].map((f, i) => (
                                        <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#cbd5e1' }}>
                                            <span className="material-symbols-outlined" style={{ color: '#8b5cf6', fontSize: '1.25rem' }}>verified</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a href="/contact" style={{ display: 'block', textAlign: 'center', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', borderRadius: '0.75rem', fontWeight: 700, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>Contact Governance Team</a>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#ffffff', borderRadius: '2rem', padding: '4rem 2rem', border: '1px solid #e2e8f0' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '3rem' }}>Frequently Asked Questions</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', textAlign: 'left' }}>
                                {[
                                    { q: 'Is there a setup fee?', a: 'Setting up EduShield normally takes 48 hours for standard SIS systems. We charge a one-time onboarding fee that covers data ingestion and staff training.' },
                                    { q: 'Do you offer non-profit discounts?', a: 'Yes! NGOs operating in rural India are eligible for up to 50% discount on the Campus Essential plan.' },
                                    { q: 'Is our data secure with you?', a: '100%. We are DPDP compliant. All data stays in India and is encrypted with military-grade AES-256 standards.' },
                                    { q: 'How is the billing cycle managed?', a: 'Billing is typically handled annually, matching the Indian academic session (April - March).' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <h4 style={{ fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>{item.q}</h4>
                                        <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>{item.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
