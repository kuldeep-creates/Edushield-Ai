import styles from '../page.module.css';
import Footer from '../../components/Footer';

export const metadata = {
    title: 'Terms of Service | EduShield AI',
    description: 'Read the Terms of Service for EduShield AI.',
};

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: `By accessing or using the EduShield AI platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you are accessing the Service on behalf of a school, district, or state education department, you represent that you have authority to bind that institution to these Terms. If you do not agree to these Terms, please do not use the Service.`,
    },
    {
        title: '2. Description of Service',
        content: `EduShield AI provides an AI-powered academic early warning system designed for educational institutions. The Service includes predictive risk modeling, attendance and behavioral analysis, intervention recommendation tools, and UDISE+ compliance reporting. The platform is built to operate within the framework of India's NEP 2020 and the Digital Personal Data Protection (DPDP) Act, 2023.`,
    },
    {
        title: '3. Eligibility & User Roles',
        content: `Access to EduShield AI is restricted to authorized institutions and their designated personnel, including District Admins, School Principals, Teachers, Parents, and Students. Each user account is tied to a specific role with role-specific permissions. Verified institutional email addresses or school-issued student IDs are required to activate an account. Sharing of login credentials is strictly prohibited.`,
    },
    {
        title: '4. Data Ownership & Privacy',
        content: `All student data uploaded or generated through the Service remains the exclusive property of the originating school or district. EduShield AI acts solely as a data processor, not a data controller. We do not sell, rent, or share personally identifiable information (PII) with any third party other than as required by law. Our processing of student data is governed by our Privacy Policy and the DPDP Act, 2023. All PII is salted, hashed, and anonymized before any machine learning model training.`,
    },
    {
        title: '5. Acceptable Use',
        content: `You agree to use the Service only for lawful purposes and in accordance with these Terms. You must not: (a) attempt to access any other user's account or data; (b) probe or scan the platform for vulnerabilities; (c) upload malicious code or attempt any form of denial-of-service attack; (d) use the Service to discriminate against students based on caste, religion, gender, or economic status; (e) export or share student data outside the platform without proper authorization.`,
    },
    {
        title: '6. Intellectual Property',
        content: `All content, models, code, algorithms, and design elements of the EduShield AI platform are the intellectual property of EduShield AI Pvt. Ltd. and are protected under Indian Copyright Law and international treaties. You are granted a limited, non-exclusive, non-transferable license to use the Service for its intended purpose only. No part of the platform may be reverse-engineered, reproduced, or used for commercial purposes without explicit written consent.`,
    },
    {
        title: '7. Limitation of Liability',
        content: `EduShield AI provides predictive insights as decision-support tools. The AI output is intended to supplement, not replace, the professional judgment of educators and administrators. EduShield AI Pvt. Ltd. shall not be liable for any decisions made solely on the basis of AI recommendations. In no event shall our aggregate liability exceed the fees paid by the institution in the three months preceding the claim.`,
    },
    {
        title: '8. Termination',
        content: `We reserve the right to suspend or terminate access to the Service if an institution or user is found to be in violation of these Terms, has provided false information during onboarding, or has engaged in conduct that is harmful to students or the platform. Upon termination, the institution retains the right to export their data in a machine-readable format within 30 days.`,
    },
    {
        title: '9. Changes to Terms',
        content: `EduShield AI may revise these Terms from time to time. We will notify registered institutions of any material changes via email at least 30 days before they take effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms.`,
    },
    {
        title: '10. Governing Law & Disputes',
        content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India. We encourage resolution through good-faith negotiation before initiating formal proceedings.`,
    },
];

export default function TermsPage() {
    return (
        <div className={styles.page}>
            <div className={styles.wrapper}>

                {/* HEADER */}
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

                <main style={{ flex: 1, backgroundColor: '#f8fafc' }}>

                    {/* Hero banner */}
                    <section style={{ backgroundColor: '#0f172a', padding: '4rem 1.5rem', textAlign: 'center' }}>
                        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#94a3b8' }}>gavel</span>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#94a3b8' }}>Last updated: February 26, 2026</span>
                            </div>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: '#f1f5f9', letterSpacing: '-0.03em', marginBottom: '1rem' }}>Terms of Service</h1>
                            <p style={{ fontSize: '1.0625rem', color: '#94a3b8', lineHeight: 1.7 }}>
                                Please read these terms carefully before using EduShield AI. By accessing our platform, schools, educators, and administrators agree to the conditions below.
                            </p>
                        </div>
                    </section>

                    {/* Document body */}
                    <section style={{ padding: '4rem 1.5rem', maxWidth: '56rem', margin: '0 auto' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {sections.map((s, i) => (
                                <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>{s.title}</h2>
                                    <p style={{ color: '#475569', fontSize: '0.9375rem', lineHeight: 1.75, margin: 0 }}>{s.content}</p>
                                </div>
                            ))}
                        </div>

                        {/* Related links */}
                        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f1f5f9', borderRadius: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                            <span style={{ color: '#64748b', fontSize: '0.9375rem', fontWeight: 500, alignSelf: 'center' }}>Related Policies:</span>
                            <a href="/security" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>lock</span> Security & Privacy
                            </a>
                            <a href="/contact" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9375rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>mail</span> Contact Us
                            </a>
                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </div>
    );
}
