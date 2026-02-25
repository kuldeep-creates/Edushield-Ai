import fs from 'fs';
import path from 'path';
import styles from '../page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Development Report | EduShield AI',
};

export default function LatestProjectPage() {
    // Dynamically read from content directory so developers can edit the JSON without touching this codebase
    const filePath = path.join(process.cwd(), 'content', 'latest-project.json');
    let reportData: any = null;
    let errorMsg = null;

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        reportData = JSON.parse(fileContent);
    } catch (err: any) {
        errorMsg = err.message;
    }

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

                <main style={{ flex: 1, backgroundColor: '#f8fafc', padding: '4rem 1.5rem', minHeight: 'calc(100vh - 4rem)' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>

                        {errorMsg ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: '#ef4444' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '3rem', marginBottom: '1rem' }}>error</span>
                                <h2>Error Loading Report</h2>
                                <p>{errorMsg}</p>
                                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Make sure content/latest-project.json exists and is valid JSON.</p>
                            </div>
                        ) : (
                            <>
                                {/* Report Header */}
                                <div style={{ borderBottom: '1px solid #e2e8f0', padding: '3rem 3rem 2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <span style={{ backgroundColor: '#e0e7ff', color: '#4f46e5', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            {reportData.subtitle || 'Report'}
                                        </span>
                                        <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>calendar_today</span>
                                            {reportData.date}
                                        </span>
                                    </div>
                                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.2, marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
                                        {reportData.title}
                                    </h1>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>engineering</span>
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: '#1e293b' }}>{reportData.author}</p>
                                                <p style={{ margin: 0, fontSize: '0.8125rem', color: '#64748b' }}>Project Engineering</p>
                                            </div>
                                        </div>
                                        {reportData.status && (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.375rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}>
                                                <div style={{ width: '0.375rem', height: '0.375rem', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                                                {reportData.status}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Report Body */}
                                <div style={{ padding: '3rem' }}>

                                    {/* Overview Section */}
                                    {reportData.overview && (
                                        <div style={{ marginBottom: '3rem' }}>
                                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', display: 'inline-block' }}>Executive Overview</h2>
                                            <p style={{ color: '#334155', fontSize: '1.0625rem', lineHeight: 1.7 }}>
                                                {reportData.overview}
                                            </p>
                                        </div>
                                    )}

                                    {/* Highlights List */}
                                    {reportData.highlights && reportData.highlights.length > 0 && (
                                        <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', marginBottom: '3rem' }}>
                                            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span className="material-symbols-outlined" style={{ color: '#eab308' }}>stars</span>
                                                Key Highlights
                                            </h3>
                                            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#475569', lineHeight: 1.6 }}>
                                                {reportData.highlights.map((highlight: string, index: number) => (
                                                    <li key={index} style={{ marginBottom: '0.5rem' }}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Dynamic Sections */}
                                    {reportData.sections && reportData.sections.map((section: any, index: number) => (
                                        <div key={index} style={{ marginBottom: '2.5rem' }}>
                                            <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                                                {section.heading}
                                            </h3>
                                            <p style={{ color: '#475569', fontSize: '1.0625rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                                                {section.content}
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            </>
                        )}

                    </div>
                </main>

                <footer className={styles.footer} style={{ borderTop: '1px solid #e2e8f0', marginTop: '0' }}>
                    <div className={styles.footerInner} style={{ padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
                        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>© 2026 EduShield AI. Securely built for India.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
