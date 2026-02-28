'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';
import styles from './page.module.css';

interface PrincipalProfile {
    name: string;
    email: string;
    school: string;
    district: string;
    mobile?: string;
    schoolAddress?: string;
}

interface StudentSummary {
    regNo: string;
    name: string;
    risk?: string;
    riskScore?: number;
    grade?: string;
}

export default function PrincipalDashboard() {
    const router = useRouter();
    const [profile, setProfile] = useState<PrincipalProfile | null>(null);
    const [students, setStudents] = useState<StudentSummary[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push('/login'); return; }

            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.role !== 'principal') {
                        router.push(`/dashboard/${data.role || 'student'}`);
                        return;
                    }
                    setProfile({
                        name: data.name || user.email?.split('@')[0] || 'Principal',
                        email: data.email || user.email || '',
                        school: data.school || 'Your School',
                        district: data.district || '',
                        mobile: data.mobile || '',
                        schoolAddress: data.schoolAddress || '',
                    });

                    // Fetch students from the school
                    if (data.school) {
                        fetchStudents(data.school);
                    } else {
                        setDataLoading(false);
                    }
                }
            } catch {
                // Firestore offline — use auth data
                setProfile({
                    name: user.email?.split('@')[0] || 'Principal',
                    email: user.email || '',
                    school: 'School data unavailable',
                    district: '',
                });
                setDataLoading(false);
            } finally {
                setIsFetching(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const fetchStudents = async (school: string) => {
        setDataLoading(true);
        try {
            const snap = await getDocs(query(collection(db, 'users'), where('school', '==', school), where('role', '==', 'student')));
            const list: StudentSummary[] = snap.docs.map(d => {
                const data = d.data();
                return {
                    regNo: data.regNo || d.id,
                    name: data.name || data.email?.split('@')[0] || 'Unknown',
                    risk: data.riskLevel || 'Unknown',
                    riskScore: data.riskScore || null,
                    grade: data.grade || '—',
                };
            });
            setStudents(list);
        } catch {
            setStudents([]);
        } finally {
            setDataLoading(false);
        }
    };

    const highRisk = students.filter(s => s.risk === 'High' || (s.riskScore && s.riskScore > 0.7));
    const mediumRisk = students.filter(s => s.risk === 'Medium' || (s.riskScore && s.riskScore > 0.4 && s.riskScore <= 0.7));
    const lowRisk = students.filter(s => s.risk === 'Low' || (s.riskScore && s.riskScore <= 0.4));

    const getRiskColor = (risk?: string, score?: number) => {
        if (risk === 'High' || (score && score > 0.7)) return { bg: '#fee2e2', color: '#dc2626', label: 'High Risk' };
        if (risk === 'Medium' || (score && score > 0.4)) return { bg: '#fef3c7', color: '#d97706', label: 'Medium' };
        return { bg: '#dcfce7', color: '#16a34a', label: 'Low Risk' };
    };

    if (isFetching) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '0.75rem', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Loading Principal Dashboard...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <DashboardNav role="principal" searchPlaceholder="Search students, teachers..." />

            <main className={styles.mainContent}>
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleBlock}>
                        <h1 className={styles.pageTitle}>
                            Welcome, {profile?.name}
                        </h1>
                        <p className={styles.pageSubtitle}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>school</span>
                            {' '}{profile?.school}{profile?.district ? ` · ${profile.district}` : ''}
                        </p>
                    </div>
                    <button className={styles.downloadBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                        <span>Download Institutional Report</span>
                    </button>
                </div>

                {/* Stats Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Total Students', value: dataLoading ? '...' : students.length, icon: 'groups', color: '#3b82f6' },
                        { label: 'High Risk', value: dataLoading ? '...' : highRisk.length, icon: 'warning', color: '#ef4444' },
                        { label: 'Medium Risk', value: dataLoading ? '...' : mediumRisk.length, icon: 'priority_high', color: '#f59e0b' },
                        { label: 'Low Risk / Safe', value: dataLoading ? '...' : lowRisk.length, icon: 'check_circle', color: '#10b981' },
                    ].map((stat) => (
                        <div key={stat.label} style={{ backgroundColor: '#fff', borderRadius: '0.75rem', padding: '1.25rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                <span className="material-symbols-outlined" style={{ color: stat.color, fontSize: '1.5rem' }}>{stat.icon}</span>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                            </div>
                            <p style={{ fontSize: '2.25rem', fontWeight: 800, color: stat.color, margin: 0 }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Student Risk Table */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Student Risk Overview</h2>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                            {dataLoading ? 'Loading...' : `${students.length} students from ${profile?.school}`}
                        </span>
                    </div>

                    <div className={styles.tableCard}>
                        {dataLoading ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                <div style={{ width: '32px', height: '32px', border: '3px solid #e2e8f0', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 0.75rem' }} />
                                Loading student data...
                            </div>
                        ) : students.length === 0 ? (
                            <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>person_off</span>
                                <p style={{ fontWeight: 600 }}>No students linked to your school yet.</p>
                                <p style={{ fontSize: '0.85rem' }}>Students activate their accounts using their Registration ID.</p>
                            </div>
                        ) : (
                            <div className={styles.tableContainer}>
                                <table className={styles.teacherTable}>
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Reg. No.</th>
                                            <th>Grade</th>
                                            <th>Risk Level</th>
                                            <th>Risk Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((s) => {
                                            const riskCfg = getRiskColor(s.risk, s.riskScore);
                                            return (
                                                <tr key={s.regNo}>
                                                    <td>
                                                        <div className={styles.teacherProfile}>
                                                            <div className={styles.teacherAvatar} style={{
                                                                background: `linear-gradient(135deg, ${riskCfg.color}40, ${riskCfg.color}80)`,
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                color: riskCfg.color, fontWeight: 700, fontSize: '0.75rem'
                                                            }}>
                                                                {s.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)}
                                                            </div>
                                                            <span className={styles.teacherName}>{s.name}</span>
                                                        </div>
                                                    </td>
                                                    <td><span className={styles.tdText} style={{ fontFamily: 'monospace' }}>{s.regNo}</span></td>
                                                    <td><span className={styles.tdText}>{s.grade}</span></td>
                                                    <td>
                                                        <span style={{ padding: '0.25rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, backgroundColor: riskCfg.bg, color: riskCfg.color }}>
                                                            {riskCfg.label}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {s.riskScore != null ? (
                                                            <div className={styles.activityWrap}>
                                                                <div className={styles.activityBarBg}>
                                                                    <div className={styles.activityBarFill} style={{ width: `${Math.round(s.riskScore * 100)}%`, backgroundColor: riskCfg.color }} />
                                                                </div>
                                                                <span className={styles.activityScore}>{Math.round(s.riskScore * 100)}%</span>
                                                            </div>
                                                        ) : <span className={styles.tdText}>—</span>}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>

                {/* Teacher Performance Section (static) */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Teacher Performance Overview</h2>
                        <button className={styles.sectionLink}>View All Faculty</button>
                    </div>
                    <div className={styles.tableCard}>
                        <div className={styles.tableContainer}>
                            <table className={styles.teacherTable}>
                                <thead>
                                    <tr>
                                        <th>Teacher Name</th>
                                        <th>Grade</th>
                                        <th>Subject</th>
                                        <th>Trend</th>
                                        <th style={{ width: '33%' }}>Intervention Activity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Sarah Jenkins', img: 47, grade: '10th', subject: 'Math', subjectClass: 'math', trend: 'up', score: 85 },
                                        { name: 'Michael Ross', img: 11, grade: '11th', subject: 'Physics', subjectClass: 'physics', trend: 'flat', score: 60 },
                                        { name: 'Emily Chen', img: 5, grade: '9th', subject: 'History', subjectClass: 'history', trend: 'up', score: 92 },
                                        { name: 'David Kim', img: 12, grade: '12th', subject: 'English', subjectClass: 'english', trend: 'down', score: 45 },
                                    ].map((t) => (
                                        <tr key={t.name}>
                                            <td>
                                                <div className={styles.teacherProfile}>
                                                    <div className={styles.teacherAvatar} style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${t.img}")` }} />
                                                    <span className={styles.teacherName}>{t.name}</span>
                                                </div>
                                            </td>
                                            <td><span className={styles.tdText}>{t.grade}</span></td>
                                            <td><span className={`${styles.subjectBadge} ${styles[t.subjectClass]}`}>{t.subject}</span></td>
                                            <td><span className={`material-symbols-outlined ${styles.trendIcon} ${styles[t.trend]}`}>trending_{t.trend}</span></td>
                                            <td>
                                                <div className={styles.activityWrap}>
                                                    <div className={styles.activityBarBg}>
                                                        <div className={styles.activityBarFill} style={{ width: `${t.score}%`, backgroundColor: t.score >= 80 ? '#10b981' : t.score >= 60 ? '#f59e0b' : '#ef4444' }} />
                                                    </div>
                                                    <span className={styles.activityScore}>{t.score}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Dropout Intelligence */}
                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Dropout Intelligence</h2>
                        <div className={styles.selectWrap}>
                            <select className={styles.filterSelect}>
                                <option>This Semester</option>
                                <option>Last Semester</option>
                                <option>Academic Year</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.twoColGrid}>
                        <div className={`${styles.chartCard} ${styles.colSpan2}`}>
                            <div className={styles.cardTop}>
                                <div>
                                    <h3 className={styles.cardH3}>School-wide Risk Trends</h3>
                                    <p className={styles.cardP}>Predictive analysis of dropout probability over the current academic term.</p>
                                </div>
                                <div className={styles.chartLegend}>
                                    <span className={styles.legendItem}><span className={styles.legendDot} style={{ backgroundColor: '#ef4444' }} />High Risk</span>
                                    <span className={styles.legendItem}><span className={styles.legendDot} style={{ backgroundColor: '#cbd5e1' }} />Avg Baseline</span>
                                </div>
                            </div>
                            <div className={styles.mockChartArea}>
                                <div className={styles.gridLines}>
                                    <div className={styles.gridLine} /><div className={styles.gridLine} /><div className={styles.gridLine} /><div className={styles.gridLine} />
                                </div>
                                {[30, 35, 32, 45, 52, 48, 60, 65, 55, 50].map((h, i) => (
                                    <div key={i} className={styles.chartBar} style={{ height: `${h}%`, backgroundColor: `rgba(239, 68, 68, ${Math.max(0.3, h / 100)})` }}>
                                        <div className={styles.tooltip}>Week {i + 1}</div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.chartX}>
                                <span>Week 1</span><span>Week 5</span><span>Week 10</span>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h3 className={styles.cardH3}>Grade-level Vulnerability</h3>
                            <p className={styles.cardP} style={{ marginBottom: '1.5rem' }}>Classes flagged for immediate attention.</p>
                            <div className={styles.clusterList}>
                                {[
                                    { name: '10th Grade Math', icon: 'warning', variant: 'red', tag: 'Critical', desc: '32% students marked \'At Risk\'', pct: 32 },
                                    { name: '9th Grade History', icon: 'priority_high', variant: 'orange', tag: 'Monitor', desc: '18% students marked \'At Risk\'', pct: 18 },
                                    { name: '11th Grade Science', icon: 'info', variant: 'blue', tag: 'Stable', desc: '5% students marked \'At Risk\'', pct: 5 },
                                ].map((c) => (
                                    <div key={c.name} className={styles.clusterItem}>
                                        <div className={`${styles.clusterIconWrap} ${styles[c.variant]}`}>
                                            <span className="material-symbols-outlined">{c.icon}</span>
                                        </div>
                                        <div className={styles.clusterContent}>
                                            <div className={styles.clusterTop}>
                                                <span className={styles.clusterName}>{c.name}</span>
                                                <span className={`${styles.clusterTag} ${styles[c.variant]}`}>{c.tag}</span>
                                            </div>
                                            <p className={styles.clusterDesc}>{c.desc}</p>
                                            <div className={styles.clusterProgressBarBg}>
                                                <div className={`${styles.clusterProgressBarFill} ${styles[c.variant]}`} style={{ width: `${c.pct}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className={styles.viewFullBtn}>View Full Vulnerability Report</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
