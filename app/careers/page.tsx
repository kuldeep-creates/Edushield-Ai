import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Careers | Join the EduShield AI Mission',
    description: 'Build the future of Indian education. Join our team of AI researchers, data scientists, and educational experts to help prevent student failure at scale. Explore open roles at EduShield AI.',
    keywords: [
        'EduShield Careers',
        'EdTech Jobs India',
        'AI Jobs Bengaluru',
        'Data Science Education Jobs',
        'Software Engineer EdTech',
        'Educational Researcher Jobs',
        'Machine Learning Careers India',
        'EdTech Startup Hiring',
        'EduShield AI Team',
        'Building the Future of Education',
        'Academic Success Careers',
        'Impact-focused Tech Jobs',
        'School Analytics Jobs',
        'Early Warning System Developers',
        'Python Developer EdTech India',
        'Product Manager Educational AI',
        'Student Success Mission Jobs',
        'Bengaluru Startup Hiring',
        'Innovative EdTech Careers',
        'NEP 2020 Platform Developer'
    ],
    openGraph: {
        title: 'Work at EduShield AI - Impact 250M+ Students',
        description: 'We are hiring! Join a team dedicated to using AI to solve the massive failure and dropout challenges in Indian schools.',
        url: 'https://edushield.ai/careers',
        siteName: 'EduShield AI',
        images: [{ url: '/careers-og.png' }],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Careers at EduShield AI',
        description: 'Be part of the most ambitious EdTech project in the country. View our open positions.',
    }
};

const values = [
    { title: 'Student-First', desc: 'Every line of code we write is aimed at ensuring a child stays in school and succeeds.' },
    { title: 'Data Rigor', desc: 'We value mathematical precision and scientific verification over hype and empty promises.' },
    { title: 'Radical Privacy', desc: 'We believe student privacy is a human right. We are strict about data localization and anonymity.' },
    { title: 'Scale Mindset', desc: 'We build for India. Our solutions must work for the smallest village school as well as the largest urban district.' },
];

const jobs = [
    { title: 'Senior AI Research Engineer', team: 'Machine Learning', type: 'Full-time', location: 'Bengaluru / Remote' },
    { title: 'Full Stack Engineer (Next.js/Node)', team: 'Product', type: 'Full-time', location: 'Remote / Bengaluru' },
    { title: 'Data Scientist (Educational Metrics)', team: 'Analytics', type: 'Full-time', location: 'Remote' },
    { title: 'Lead Counselor & User Advocate', team: 'Education', type: 'Full-time', location: 'Bengaluru' },
];

export default function CareersPage() {
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

                <main>
                    {/* Mission Hero */}
                    <section style={{ position: 'relative', overflow: 'hidden', padding: '10rem 1.5rem', backgroundColor: '#0f172a', color: '#ffffff', textAlign: 'center' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)' }} />
                        <div style={{ position: 'relative', zIndex: 1, maxWidth: '56rem', margin: '0 auto' }}>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '2rem' }}>
                                Strengthen the nation <br />
                                <span style={{ color: '#38bdf8' }}>through AI.</span>
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '40rem', margin: '0 auto 3rem' }}>
                                Join EduShield AI and help us build the technology that prevents student failure for millions across India.
                            </p>
                            <a href="#jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#ffffff', color: '#0f172a', padding: '1.125rem 2.5rem', borderRadius: '1rem', fontWeight: 800, textDecoration: 'none', fontSize: '1rem' }}>
                                View Open Roles
                                <span className="material-symbols-outlined">arrow_downward</span>
                            </a>
                        </div>
                    </section>

                    {/* Values */}
                    <section style={{ padding: '6rem 1.5rem', maxWidth: '80rem', margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>Our Core Values</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            {values.map((v, i) => (
                                <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '1.5rem', padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>{v.title}</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6 }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Jobs List */}
                    <section id="jobs" style={{ padding: '6rem 1.5rem', backgroundColor: '#f8fafc' }}>
                        <div style={{ maxWidth: '60rem', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '3rem', textAlign: 'center' }}>Open Positions</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {jobs.map((job, i) => (
                                    <div key={i} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', transition: 'box-shadow 0.2s' }}>
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>{job.title}</h4>
                                            <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>{job.team} · {job.type} · {job.location}</p>
                                        </div>
                                        <a href="#" style={{ color: '#3b82f6', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                                            Apply Now
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chevron_right</span>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
