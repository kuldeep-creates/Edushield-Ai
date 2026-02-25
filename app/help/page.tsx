import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Help Center & Support | EduShield AI',
    description: 'Find answers to frequently asked questions about EduShield AI. Support resources for students, teachers, and school administrators to help navigate the academic early warning system.',
    keywords: [
        'EduShield Support',
        'Help Center EdTech',
        'Education Software FAQ',
        'Student Dashboard Help',
        'Teacher Analytics Guide',
        'SIS Integration Support',
        'DPDP Compliance Help',
        'EduShield Training Resources',
        'Academic Risk Score Help',
        'School Admin Support India',
        'How to use EduShield AI',
        'Student Success Platform Guide',
        'Troubleshooting EduShield',
        'EduShield App Support',
        'EdTech Customer Service India',
        'NEP 2020 Dashboard Guide',
        'Educational Data Analytics Tutorial',
        'School Security FAQ',
        'Parent Access EduShield',
        'Privacy Policy Help India'
    ],
    openGraph: {
        title: 'EduShield AI Help Center - Supporting Your Success',
        description: 'Need help? Browse our comprehensive guides and FAQs designed for educators and students.',
        url: 'https://edushield.ai/help',
        siteName: 'EduShield AI',
        images: [{ url: '/help-og.png' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Support and Resources | EduShield AI',
        description: 'Get the most out of EduShield AI with our detailed user guides and support portal.',
    }
};

const categories = [
    { title: 'For Students', icon: 'person', links: ['Activating your account', 'Understanding your risk score', 'Setting academic goals', 'Privacy of your data'] },
    { title: 'For Teachers', icon: 'menu_book', links: ['Inputting behavioral remarks', 'Viewing classroom trends', 'Generating intervention alerts', 'Student profile walkthrough'] },
    { title: 'Administrator', icon: 'admin_panel_settings', links: ['SIS/ERP integration steps', 'Managing staff permissions', 'State compliance reporting', 'Data security protocols'] },
    { title: 'Account & Billing', icon: 'payments', links: ['Subscription renewals', 'Adding more students', 'Updating school profile', 'Invoice access'] },
];

export default function HelpPage() {
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
                    {/* Search Hero */}
                    <div style={{ backgroundColor: '#0f172a', padding: '6rem 1.5rem', textAlign: 'center', color: '#ffffff' }}>
                        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '2rem' }}>How can we help you?</h1>
                        <div style={{ maxWidth: '40rem', margin: '0 auto', position: 'relative' }}>
                            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>search</span>
                            <input
                                type="text"
                                placeholder="Search for guides, scores, integrations..."
                                style={{ width: '100%', padding: '1.25rem 1.5rem 1.25rem 3.5rem', borderRadius: '1rem', border: 'none', fontSize: '1.125rem', backgroundColor: '#1e293b', color: '#ffffff', outline: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                            />
                        </div>
                    </div>

                    {/* Support Grid */}
                    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                            {categories.map((cat, i) => (
                                <div key={i} style={{ backgroundColor: '#f8fafc', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid #e2e8f0' }}>
                                    <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: '#ffffff', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>{cat.icon}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>{cat.title}</h3>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {cat.links.map((link, j) => (
                                            <li key={j}><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.2s' }}>{link}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Direct Contact */}
                        <div style={{ marginTop: '5rem', backgroundColor: '#eff6ff', borderRadius: '2rem', padding: '4rem 2rem', textAlign: 'center', border: '1px solid #dbeafe' }}>
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem' }}>Still need help?</h2>
                            <p style={{ color: '#1e40af', maxWidth: '30rem', margin: '0 auto 2.5rem', fontSize: '1.125rem' }}>
                                Our support team is available Monday to Friday, 9:00 AM - 6:00 PM IST.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="mailto:support@edushield.ai" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#3b82f6', color: '#ffffff', padding: '1rem 2rem', borderRadius: '0.75rem', fontWeight: 700, textDecoration: 'none' }}>
                                    <span className="material-symbols-outlined">mail</span>
                                    Email Support
                                </a>
                                <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#ffffff', color: '#0f172a', padding: '1rem 2rem', borderRadius: '0.75rem', fontWeight: 700, textDecoration: 'none', border: '1px solid #dbeafe' }}>
                                    <span className="material-symbols-outlined">support_agent</span>
                                    Live Chat
                                </a>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
