'use client';

import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

export default function ParentDashboard() {
    return (
        <div className={styles.container}>
            <DashboardNav role="parent" searchPlaceholder="Search child activity..." />

            <main className={styles.main}>
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Parent Overview</h1>
                        <p className={styles.pageSubtitle}>Monitor your child&apos;s academic progress and risk status in real-time.</p>
                    </div>
                    <button className={styles.reportBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                        Download Report
                    </button>
                </div>

                {/* Child Profile Banner */}
                <div className={styles.childBanner}>
                    <div className={styles.childAvatarWrap}>
                        <div className={styles.childAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=15")' }} />
                        <div className={styles.childStatusDot}></div>
                    </div>
                    <div className={styles.childInfo}>
                        <h2 className={styles.childName}>Alex Johnson</h2>
                        <p className={styles.childMeta}>Grade 10 · Science Stream · Roll No: 2024-DEL-4598</p>
                    </div>
                    <div className={styles.childRisk}>
                        <span className={styles.riskLabelLow}>Low Risk</span>
                        <p className={styles.riskSub}>AI Risk Score: 18/100</p>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className={styles.kpiGrid}>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: '#eff6ff', color: '#2563eb' }}>
                            <span className="material-symbols-outlined">school</span>
                        </div>
                        <div>
                            <p className={styles.kpiLabel}>Overall GPA</p>
                            <p className={styles.kpiValue}>3.8 / 4.0</p>
                        </div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: '#f0fdf4', color: '#16a34a' }}>
                            <span className="material-symbols-outlined">calendar_today</span>
                        </div>
                        <div>
                            <p className={styles.kpiLabel}>Attendance</p>
                            <p className={styles.kpiValue}>94%</p>
                        </div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: '#fff7ed', color: '#ea580c' }}>
                            <span className="material-symbols-outlined">assignment_late</span>
                        </div>
                        <div>
                            <p className={styles.kpiLabel}>Pending Tasks</p>
                            <p className={styles.kpiValue}>3</p>
                        </div>
                    </div>
                    <div className={styles.kpiCard}>
                        <div className={styles.kpiIcon} style={{ background: '#fdf4ff', color: '#9333ea' }}>
                            <span className="material-symbols-outlined">emoji_events</span>
                        </div>
                        <div>
                            <p className={styles.kpiLabel}>Rank in Class</p>
                            <p className={styles.kpiValue}>#4 / 42</p>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className={styles.twoCol}>
                    {/* Subject Grades */}
                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Subject Performance</h3>
                        <p className={styles.cardSub}>Current semester grades by subject</p>

                        <div className={styles.subjectList}>
                            {[
                                { name: 'Mathematics', grade: 92, status: 'up', color: '#2563eb' },
                                { name: 'Physics', grade: 84, status: 'flat', color: '#7c3aed' },
                                { name: 'Chemistry', grade: 88, status: 'up', color: '#0891b2' },
                                { name: 'Literature', grade: 76, status: 'down', color: '#ea580c' },
                                { name: 'History', grade: 95, status: 'up', color: '#16a34a' },
                            ].map((s) => (
                                <div key={s.name} className={styles.subjectRow}>
                                    <div className={styles.subjectMeta}>
                                        <span className={styles.subjectName}>{s.name}</span>
                                        <span className={styles.subjectGrade} style={{ color: s.color }}>{s.grade}%</span>
                                    </div>
                                    <div className={styles.subjectBar}>
                                        <div className={styles.subjectBarFill} style={{ width: `${s.grade}%`, backgroundColor: s.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Alerts + Teacher Notes */}
                    <div className={styles.rightCol}>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>AI Recommendations</h3>
                            <div className={styles.alertList}>
                                <div className={styles.alertItem} style={{ borderLeftColor: '#f59e0b' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: '20px' }}>priority_high</span>
                                    <div>
                                        <p className={styles.alertTitle}>Literature needs attention</p>
                                        <p className={styles.alertDesc}>Grade dropped 3% this week. Essay due Friday.</p>
                                    </div>
                                </div>
                                <div className={styles.alertItem} style={{ borderLeftColor: '#16a34a' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#16a34a', fontSize: '20px' }}>check_circle</span>
                                    <div>
                                        <p className={styles.alertTitle}>Math performance excellent</p>
                                        <p className={styles.alertDesc}>Scored 95 on last quiz. Keep encouraging!</p>
                                    </div>
                                </div>
                                <div className={styles.alertItem} style={{ borderLeftColor: '#2563eb' }}>
                                    <span className="material-symbols-outlined" style={{ color: '#2563eb', fontSize: '20px' }}>event</span>
                                    <div>
                                        <p className={styles.alertTitle}>Parent-Teacher Meeting</p>
                                        <p className={styles.alertDesc}>Scheduled: Monday, 3:00 PM. Physics teacher.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card} style={{ marginTop: '1.5rem' }}>
                            <h3 className={styles.cardTitle}>Upcoming Schedule</h3>
                            <div className={styles.scheduleList}>
                                {[
                                    { day: 'MON', event: 'Algebra II Quiz', sub: 'Mathematics' },
                                    { day: 'TUE', event: 'Lab Report Due', sub: 'Physics' },
                                    { day: 'FRI', event: 'Essay Draft', sub: 'Literature' },
                                ].map((item) => (
                                    <div key={item.day} className={styles.scheduleItem}>
                                        <div className={styles.scheduleDay}>{item.day}</div>
                                        <div>
                                            <p className={styles.scheduleEvent}>{item.event}</p>
                                            <p className={styles.scheduleSub}>{item.sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
