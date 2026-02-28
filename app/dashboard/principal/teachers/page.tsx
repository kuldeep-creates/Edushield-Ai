'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';
import styles from '../page.module.css';

const TEACHERS = [
    {
        id: 't1', name: 'Sarah Jenkins', img: 47, subjects: ['Mathematics', 'Statistics'],
        classes: ['10-A', '10-B', '11-A'],
        avgBefore: 54, avgAfter: 68, failRatio: 18, trend: 'up',
        interventions: { counseling: 8, extraClasses: 12, followups: 6 },
        results: [
            { class: '10-A', avg: 68, pass: 78 },
            { class: '10-B', avg: 61, pass: 65 },
            { class: '11-A', avg: 72, pass: 82 },
        ],
    },
    {
        id: 't2', name: 'Michael Ross', img: 11, subjects: ['Physics', 'Chemistry'],
        classes: ['11-A', '12-A'],
        avgBefore: 60, avgAfter: 58, failRatio: 36, trend: 'down',
        interventions: { counseling: 3, extraClasses: 5, followups: 2 },
        results: [
            { class: '11-A', avg: 57, pass: 61 },
            { class: '12-A', avg: 53, pass: 55 },
        ],
    },
    {
        id: 't3', name: 'Emily Chen', img: 5, subjects: ['History', 'Civics'],
        classes: ['9-A', '9-B', '10-A'],
        avgBefore: 63, avgAfter: 72, failRatio: 14, trend: 'up',
        interventions: { counseling: 11, extraClasses: 9, followups: 10 },
        results: [
            { class: '9-A', avg: 74, pass: 86 },
            { class: '9-B', avg: 69, pass: 79 },
        ],
    },
    {
        id: 't4', name: 'David Kim', img: 12, subjects: ['English', 'Literature'],
        classes: ['12-A', '11-A'],
        avgBefore: 65, avgAfter: 62, failRatio: 28, trend: 'flat',
        interventions: { counseling: 5, extraClasses: 7, followups: 4 },
        results: [
            { class: '12-A', avg: 63, pass: 70 },
            { class: '11-A', avg: 66, pass: 74 },
        ],
    },
];

const trendColor = (t: string) => t === 'up' ? '#10b981' : t === 'down' ? '#ef4444' : '#f59e0b';

export default function TeacherIntelligencePage() {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    const [selected, setSelected] = useState(TEACHERS[0]);
    const [activeTab, setActiveTab] = useState<'profile' | 'interventions'>('profile');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push('/login'); return; }
            try {
                const snap = await getDoc(doc(db, 'users', user.uid));
                if (snap.exists() && snap.data().role !== 'principal') {
                    router.push(`/dashboard/${snap.data().role}`); return;
                }
            } catch { /* offline ok */ }
            setPageLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    if (pageLoading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #e2e8f0', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <style>{`@keyframes spin{100%{transform:rotate(360deg)}}`}</style>
        </div>
    );

    return (
        <div className={styles.container}>
            <DashboardNav role="principal" searchPlaceholder="Search teachers..." />
            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleBlock}>
                        <h1 className={styles.pageTitle}>Teacher Intelligence</h1>
                        <p className={styles.pageSubtitle}>Performance index, profiles, and intervention tracking.</p>
                    </div>
                </div>

                {/* A. Teacher Performance Index Cards */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>A. Teacher Performance Index</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                        {TEACHERS.map(t => {
                            const improvement = t.avgAfter - t.avgBefore;
                            return (
                                <div
                                    key={t.id}
                                    onClick={() => setSelected(t)}
                                    style={{
                                        backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.25rem',
                                        border: `2px solid ${selected.id === t.id ? '#10b981' : '#e2e8f0'}`,
                                        cursor: 'pointer', transition: 'all 0.2s',
                                        boxShadow: selected.id === t.id ? '0 4px 12px #10b98130' : '0 1px 3px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                        <img src={`https://i.pravatar.cc/150?img=${t.img}`} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} alt={t.name} />
                                        <div>
                                            <p style={{ fontWeight: 700, color: '#1e293b', margin: 0, fontSize: '0.9rem' }}>{t.name}</p>
                                            <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>{t.subjects.join(', ')}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', textAlign: 'center' }}>
                                        <div style={{ backgroundColor: '#f8fafc', borderRadius: '0.5rem', padding: '0.5rem' }}>
                                            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: improvement >= 0 ? '#10b981' : '#ef4444', margin: 0 }}>
                                                {improvement >= 0 ? '+' : ''}{improvement}
                                            </p>
                                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>Avg Δ</p>
                                        </div>
                                        <div style={{ backgroundColor: '#f8fafc', borderRadius: '0.5rem', padding: '0.5rem' }}>
                                            <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444', margin: 0 }}>{t.failRatio}%</p>
                                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>Fail Rate</p>
                                        </div>
                                        <div style={{ backgroundColor: '#f8fafc', borderRadius: '0.5rem', padding: '0.5rem' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', color: trendColor(t.trend), display: 'block' }}>
                                                trending_{t.trend}
                                            </span>
                                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: 0 }}>Trend</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* B + C. Teacher Profile + Interventions */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>{selected.name} — Detail View</h2>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {(['profile', 'interventions'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        padding: '0.375rem 0.875rem', borderRadius: '0.5rem', fontSize: '0.8rem',
                                        fontWeight: 600, border: '1px solid #e2e8f0', cursor: 'pointer',
                                        backgroundColor: activeTab === tab ? '#10b981' : '#fff',
                                        color: activeTab === tab ? '#fff' : '#475569',
                                    }}
                                >
                                    {tab === 'profile' ? 'B. Teacher Profile' : 'C. Intervention Tracking'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ backgroundColor: '#fff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
                        {activeTab === 'profile' ? (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                                    <img src={`https://i.pravatar.cc/150?img=${selected.img}`} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #10b981' }} alt={selected.name} />
                                    <div>
                                        <h3 style={{ margin: '0 0 0.25rem', color: '#1e293b' }}>{selected.name}</h3>
                                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Subjects: {selected.subjects.join(' · ')}</p>
                                        <p style={{ margin: '0.25rem 0 0', color: '#64748b', fontSize: '0.875rem' }}>Classes: {selected.classes.join(', ')}</p>
                                    </div>
                                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 0.25rem' }}>Avg Improvement</p>
                                        <p style={{ fontSize: '2rem', fontWeight: 800, color: trendColor(selected.trend), margin: 0 }}>
                                            {selected.avgAfter - selected.avgBefore >= 0 ? '+' : ''}{selected.avgAfter - selected.avgBefore}pts
                                        </p>
                                    </div>
                                </div>

                                <h4 style={{ color: '#475569', fontWeight: 700, marginBottom: '0.75rem' }}>Class Results Summary</h4>
                                <table className={styles.teacherTable} style={{ width: '100%' }}>
                                    <thead><tr><th>Class</th><th>Avg Score</th><th>Pass Rate</th><th>Performance Bar</th></tr></thead>
                                    <tbody>
                                        {selected.results.map(r => (
                                            <tr key={r.class}>
                                                <td><strong>Class {r.class}</strong></td>
                                                <td style={{ fontWeight: 700, color: r.avg >= 65 ? '#10b981' : '#f59e0b' }}>{r.avg}%</td>
                                                <td style={{ fontWeight: 700 }}>{r.pass}%</td>
                                                <td>
                                                    <div className={styles.activityWrap}>
                                                        <div className={styles.activityBarBg}>
                                                            <div className={styles.activityBarFill} style={{ width: `${r.avg}%`, backgroundColor: r.avg >= 65 ? '#10b981' : '#f59e0b' }} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div>
                                <h4 style={{ color: '#475569', fontWeight: 700, marginBottom: '1.25rem' }}>Intervention Activity — {selected.name}</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                                    {[
                                        { label: 'Counseling Sessions', value: selected.interventions.counseling, icon: 'psychology', color: '#8b5cf6' },
                                        { label: 'Extra Classes Assigned', value: selected.interventions.extraClasses, icon: 'menu_book', color: '#3b82f6' },
                                        { label: 'Follow-up Results', value: selected.interventions.followups, icon: 'task_alt', color: '#10b981' },
                                    ].map(item => (
                                        <div key={item.label} style={{ backgroundColor: '#f8fafc', borderRadius: '0.75rem', padding: '1.25rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: item.color }}>{item.icon}</span>
                                            <p style={{ fontSize: '2.5rem', fontWeight: 800, color: item.color, margin: '0.25rem 0' }}>{item.value}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ backgroundColor: '#f8fafc', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                                    <h5 style={{ color: '#475569', margin: '0 0 0.75rem' }}>Effectiveness Score</h5>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Overall Intervention Effectiveness</span>
                                        <strong style={{ color: '#10b981' }}>{Math.round((selected.interventions.followups / selected.interventions.counseling) * 100)}%</strong>
                                    </div>
                                    <div style={{ height: '10px', backgroundColor: '#e2e8f0', borderRadius: '9999px' }}>
                                        <div style={{ height: '100%', width: `${Math.round((selected.interventions.followups / selected.interventions.counseling) * 100)}%`, backgroundColor: '#10b981', borderRadius: '9999px', transition: 'width 0.5s' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
