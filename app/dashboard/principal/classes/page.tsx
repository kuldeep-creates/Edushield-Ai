'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';
import styles from '../page.module.css';

/* ── Static demo data ───────────────────────────────── */
const CLASSES = [
    { id: 'c1', name: '10-A', subject: 'Mathematics', avg: 62, pass: 71, fail: 29, high: 8, med: 12, low: 22, eng: 74 },
    { id: 'c2', name: '10-B', subject: 'Mathematics', avg: 55, pass: 58, fail: 42, high: 14, med: 10, low: 18, eng: 61 },
    { id: 'c3', name: '9-A', subject: 'Science', avg: 70, pass: 82, fail: 18, high: 4, med: 9, low: 29, eng: 83 },
    { id: 'c4', name: '11-A', subject: 'English', avg: 67, pass: 76, fail: 24, high: 6, med: 11, low: 25, eng: 79 },
    { id: 'c5', name: '12-A', subject: 'Physics', avg: 51, pass: 52, fail: 48, high: 17, med: 13, low: 12, eng: 58 },
];

const SUBJECTS = [
    { name: 'Mathematics', avg: 58, difficulty: 82, failRate: 38 },
    { name: 'Physics', avg: 52, difficulty: 90, failRate: 46 },
    { name: 'Chemistry', avg: 61, difficulty: 75, failRate: 31 },
    { name: 'English', avg: 71, difficulty: 42, failRate: 18 },
    { name: 'History', avg: 68, difficulty: 38, failRate: 21 },
    { name: 'Biology', avg: 65, difficulty: 60, failRate: 27 },
];

const BATCHES = [
    { label: 'Current Batch 2024–25', total: 420, highRisk: 63, avgScore: 62 },
    { label: 'Previous Batch 2023–24', total: 398, highRisk: 51, avgScore: 67 },
];

const diffColor = (val: number) => val >= 75 ? '#ef4444' : val >= 50 ? '#f59e0b' : '#10b981';

export default function ClassIntelligencePage() {
    const router = useRouter();
    const [pageLoading, setPageLoading] = useState(true);
    const [selected, setSelected] = useState(CLASSES[0]);

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
            <DashboardNav role="principal" searchPlaceholder="Search classes..." />
            <main className={styles.mainContent}>
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleBlock}>
                        <h1 className={styles.pageTitle}>Class Intelligence</h1>
                        <p className={styles.pageSubtitle}>Performance, risk and engagement metrics per class.</p>
                    </div>
                </div>

                {/* A. Class Performance Overview */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>A. Class Performance Overview</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        {CLASSES.map(cls => (
                            <div
                                key={cls.id}
                                onClick={() => setSelected(cls)}
                                style={{
                                    backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.25rem',
                                    border: `2px solid ${selected.id === cls.id ? '#10b981' : '#e2e8f0'}`,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    boxShadow: selected.id === cls.id ? '0 4px 12px #10b98130' : '0 1px 3px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b', margin: 0 }}>Class {cls.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.2rem 0 0.75rem' }}>{cls.subject}</p>
                                    </div>
                                    <span style={{ fontSize: '1.75rem', fontWeight: 800, color: cls.avg >= 65 ? '#10b981' : cls.avg >= 55 ? '#f59e0b' : '#ef4444' }}>{cls.avg}%</span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#dcfce7', color: '#16a34a' }}>Pass {cls.pass}%</span>
                                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 700, backgroundColor: '#fee2e2', color: '#dc2626' }}>Fail {cls.fail}%</span>
                                </div>
                                <div style={{ marginTop: '0.75rem' }}>
                                    <div style={{ height: '6px', borderRadius: '9999px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${cls.pass}%`, backgroundColor: '#10b981', borderRadius: '9999px' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* B. Risk Heatmap */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>B. Risk Heatmap — High-Risk Count per Class</h2>
                    </div>
                    <div className={styles.tableCard}>
                        <table className={styles.teacherTable} style={{ width: '100%' }}>
                            <thead><tr>
                                <th>Class</th><th>Subject</th>
                                <th style={{ color: '#ef4444' }}>🔴 High Risk</th>
                                <th style={{ color: '#f59e0b' }}>🟡 Medium</th>
                                <th style={{ color: '#10b981' }}>🟢 Low Risk</th>
                                <th>Heatmap</th>
                            </tr></thead>
                            <tbody>
                                {CLASSES.map(cls => {
                                    const total = cls.high + cls.med + cls.low;
                                    return (
                                        <tr key={cls.id}>
                                            <td><strong>Class {cls.name}</strong></td>
                                            <td><span className={`${styles.subjectBadge} ${styles.math}`}>{cls.subject}</span></td>
                                            <td style={{ color: '#ef4444', fontWeight: 700 }}>{cls.high}</td>
                                            <td style={{ color: '#f59e0b', fontWeight: 700 }}>{cls.med}</td>
                                            <td style={{ color: '#10b981', fontWeight: 700 }}>{cls.low}</td>
                                            <td>
                                                <div style={{ display: 'flex', height: '12px', borderRadius: '9999px', overflow: 'hidden', width: '140px' }}>
                                                    <div style={{ width: `${(cls.high / total) * 100}%`, backgroundColor: '#ef4444' }} />
                                                    <div style={{ width: `${(cls.med / total) * 100}%`, backgroundColor: '#f59e0b' }} />
                                                    <div style={{ width: `${(cls.low / total) * 100}%`, backgroundColor: '#10b981' }} />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* C. Subject Difficulty Matrix */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>C. Subject Difficulty Matrix</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                        {SUBJECTS.map(s => (
                            <div key={s.name} style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                                <p style={{ fontWeight: 700, color: '#1e293b', margin: '0 0 0.5rem' }}>{s.name}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                    <span>Avg Score</span><strong style={{ color: '#1e293b' }}>{s.avg}%</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.25rem' }}>
                                    <span>Fail Rate</span><strong style={{ color: '#ef4444' }}>{s.failRate}%</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748b', marginBottom: '0.5rem' }}>
                                    <span>Difficulty Index</span><strong style={{ color: diffColor(s.difficulty) }}>{s.difficulty}/100</strong>
                                </div>
                                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#f1f5f9' }}>
                                    <div style={{ height: '100%', width: `${s.difficulty}%`, backgroundColor: diffColor(s.difficulty), borderRadius: '9999px', transition: 'width 0.5s' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* D. Engagement Score */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>D. Engagement Score</h2>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Attendance + Test Participation</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                        {CLASSES.map(cls => (
                            <div key={cls.id} style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <p style={{ fontWeight: 700, color: '#1e293b', margin: 0 }}>Class {cls.name}</p>
                                    <span style={{
                                        padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700,
                                        backgroundColor: cls.eng >= 80 ? '#dcfce7' : cls.eng >= 65 ? '#fef3c7' : '#fee2e2',
                                        color: cls.eng >= 80 ? '#16a34a' : cls.eng >= 65 ? '#d97706' : '#dc2626',
                                    }}>{cls.eng >= 80 ? 'High' : cls.eng >= 65 ? 'Medium' : 'Low'}</span>
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: cls.eng >= 80 ? '#10b981' : cls.eng >= 65 ? '#f59e0b' : '#ef4444', marginBottom: '0.5rem' }}>{cls.eng}%</div>
                                <div style={{ height: '8px', borderRadius: '9999px', backgroundColor: '#f1f5f9' }}>
                                    <div style={{ height: '100%', width: `${cls.eng}%`, backgroundColor: cls.eng >= 80 ? '#10b981' : cls.eng >= 65 ? '#f59e0b' : '#ef4444', borderRadius: '9999px' }} />
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.5rem 0 0' }}>Engagement Rating</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* E. Batch Comparison */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>E. Batch Comparison</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        {BATCHES.map((b, i) => (
                            <div key={i} style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.5rem', border: `2px solid ${i === 0 ? '#3b82f6' : '#e2e8f0'}` }}>
                                <p style={{ fontWeight: 700, color: i === 0 ? '#3b82f6' : '#64748b', margin: '0 0 1rem' }}>{b.label}</p>
                                {[
                                    { label: 'Total Students', value: b.total, color: '#3b82f6' },
                                    { label: 'High Risk Students', value: b.highRisk, color: '#ef4444' },
                                    { label: 'Avg Score', value: `${b.avgScore}%`, color: '#10b981' },
                                ].map(stat => (
                                    <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{stat.label}</span>
                                        <strong style={{ color: stat.color }}>{stat.value}</strong>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.5rem', border: '1px solid #e2e8f0', marginTop: '1rem' }}>
                        <p style={{ fontWeight: 700, color: '#1e293b', marginBottom: '1rem' }}>Section A vs Section B (Current Batch)</p>
                        {[
                            { label: 'Average Score', a: 64, b: 59 },
                            { label: 'High Risk %', a: 14, b: 22 },
                            { label: 'Engagement', a: 78, b: 68 },
                        ].map(row => (
                            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ textAlign: 'right', fontWeight: 600, color: '#3b82f6', fontSize: '0.9rem' }}>A: {row.a}</span>
                                <div style={{ position: 'relative' }}>
                                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.25rem' }}>{row.label}</p>
                                    <div style={{ display: 'flex', height: '10px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                                        <div style={{ width: `${row.a}%`, backgroundColor: '#3b82f6', opacity: 0.7 }} />
                                    </div>
                                    <div style={{ height: '10px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#f1f5f9', marginTop: '4px' }}>
                                        <div style={{ width: `${row.b}%`, backgroundColor: '#8b5cf6', opacity: 0.7 }} />
                                    </div>
                                </div>
                                <span style={{ fontWeight: 600, color: '#8b5cf6', fontSize: '0.9rem' }}>B: {row.b}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
