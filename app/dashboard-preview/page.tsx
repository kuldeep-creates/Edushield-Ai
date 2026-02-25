import styles from '../page.module.css';

export const metadata = {
    title: 'Dashboard Preview | EduShield AI',
};

export default function DashboardPreviewPage() {
    return (
        <div className={styles.page} style={{ backgroundColor: '#f1f5f9' }}>
            {/* Minimal App Header for inner Dashboard */}
            <header style={{
                height: '4rem',
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                padding: '0 1.5rem',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <a href="/" style={{ textDecoration: 'none', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>arrow_back</span>
                        <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Back to Site</span>
                    </a>
                    <div style={{ width: '1px', height: '1.5rem', backgroundColor: '#e2e8f0' }}></div>
                    <span style={{ fontWeight: 700, fontSize: '1.125rem', color: '#0f172a' }}>Global District View</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span className="material-symbols-outlined" style={{ color: '#64748b', fontSize: '1.25rem' }}>notifications</span>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.875rem' }}>
                        JD
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', height: 'calc(100vh - 4rem)' }}>
                {/* Left Sidebar Menu */}
                <aside style={{
                    width: '16rem',
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #e2e8f0',
                    padding: '1.5rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: '#eff6ff', color: 'var(--color-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>bar_chart</span>
                        Retention Metrics
                    </div>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', color: '#475569', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>groups</span>
                        Student Profiles
                    </div>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', color: '#475569', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>psychology</span>
                        Behavioral Alerts
                    </div>
                    <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', color: '#475569', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9375rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>settings</span>
                        Platform Settings
                    </div>
                </aside>

                {/* Main Dashboard Canvas */}
                <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.025em' }}>Student Retention Metrics</h1>
                            <p style={{ color: '#64748b', marginTop: '0.25rem' }}>Real-time analysis of dropout probabilities across District A.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button style={{ padding: '0.5rem 1rem', border: '1px solid #e2e8f0', borderRadius: '0.5rem', backgroundColor: 'white', color: '#0f172a', fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>calendar_today</span>
                                Last 30 Days
                            </button>
                            <button style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 500, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>download</span>
                                Export Data
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        {[
                            { title: 'Total Students Tracked', value: '24,592', change: '+2.4%', up: true },
                            { title: 'High Risk Alerts (Active)', value: '142', change: '-12%', up: true, danger: true },
                            { title: 'Intervention Success Rate', value: '78.4%', change: '+5.1%', up: true },
                            { title: 'Predicted Dropout Rate', value: '1.2%', change: '-0.3%', up: true },
                        ].map((kpi, i) => (
                            <div key={i} style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' }}>
                                <p style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>{kpi.title}</p>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: kpi.danger ? '#ef4444' : '#0f172a', margin: 0 }}>{kpi.value}</h2>
                                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 700, borderRadius: '9999px', padding: '0.125rem 0.5rem', backgroundColor: kpi.up ? '#ecfdf5' : '#fef2f2', color: kpi.up ? '#059669' : '#dc2626' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem', marginRight: '0.125rem' }}>
                                            {kpi.up ? 'trending_up' : 'trending_down'}
                                        </span>
                                        {kpi.change}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chart area mock */}
                    <div style={{ backgroundColor: '#ffffff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.5rem' }}>Risk Distribution by Grade Level</h3>

                        <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', gap: '2rem', padding: '2rem 1rem 0' }}>
                            {/* Dummy Bar Chart */}
                            {[15, 25, 45, 60, 50, 80, 40, 30].map((height, i) => (
                                <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '100%', height: `${height * 2.5}px`, backgroundColor: height > 65 ? '#ef4444' : height > 40 ? '#eab308' : 'var(--color-primary)', borderRadius: '0.25rem 0.25rem 0 0', opacity: 0.9, transition: 'height 1s ease' }}></div>
                                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Grade {5 + i}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
