'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

export default function TeacherDashboard() {
    const [students, setStudents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch static mock records and run them through our real Python backend
        const fetchPredictions = async () => {
            try {
                const payload = {
                    records: [
                        { student_id: '49201', subject_name: 'Math', unit_test_1: 35.0, score_momentum: -15.0, overall_attendance_pct: 64.0, total_days_absent: 32, max_absent_streak_length: 12 },
                        { student_id: '49205', subject_name: 'Math', unit_test_1: 45.0, score_momentum: -22.0, overall_attendance_pct: 78.0, total_days_absent: 20, max_absent_streak_length: 5 },
                        { student_id: '49212', subject_name: 'Math', unit_test_1: 65.0, score_momentum: -5.0, overall_attendance_pct: 88.0, total_days_absent: 11, max_absent_streak_length: 3 },
                        { student_id: '49230', subject_name: 'Math', unit_test_1: 95.0, score_momentum: 2.0, overall_attendance_pct: 98.0, total_days_absent: 1, max_absent_streak_length: 1 },
                        { student_id: '49245', subject_name: 'Math', unit_test_1: 80.0, score_momentum: -2.0, overall_attendance_pct: 85.0, total_days_absent: 14, max_absent_streak_length: 4 }
                    ],
                    apply_loophole_patches: true,
                    holiday_factor: 1.0
                };

                const res = await fetch("http://127.0.0.1:8000/predict/batch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });
                const data = await res.json();

                // Map the api results to UI profiles
                const profiles: Record<string, any> = {
                    '49201': { name: 'Marcus Johnson', img: '11', attendance: '64%' },
                    '49205': { name: 'Sarah Lee', img: '5', attendance: '78%' },
                    '49212': { name: 'David Kim', img: '12', attendance: '88%' },
                    '49230': { name: 'Emily Rose', img: '9', attendance: '98%' },
                    '49245': { name: 'James Tyler', img: '33', attendance: '85%' },
                };

                const dynamicStudents = data.results.map((r: any) => ({
                    ...r,
                    ...profiles[r.student_id]
                }));

                // Sort by highest risk first
                dynamicStudents.sort((a: any, b: any) => b.risk_probability - a.risk_probability);
                setStudents(dynamicStudents);
            } catch (error) {
                console.error("Failed to load predictions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPredictions();
    }, []);

    return (
        <div className={styles.container}>
            {/* ---------- NAVIGATION BAR ---------- */}
            <DashboardNav role="teacher" searchPlaceholder="Search student, class, or alert..." />

            <div className={styles.mainArea}>
                {/* ---------- TOP STATS ROW ---------- */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Total Students</span>
                            <span className={`material-symbols-outlined ${styles.statIcon}`}>groups</span>
                        </div>
                        <div className={styles.statValue}>142</div>
                        <div className={styles.statSub}>Enrolled active</div>
                    </div>

                    <div className={`${styles.statCard} ${styles.borderRed}`}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>High Risk</span>
                            <span className={`material-symbols-outlined ${styles.statIcon} ${styles.red}`}>warning</span>
                        </div>
                        <div className={styles.statValue}>12</div>
                        <div className={`${styles.statSub} ${styles.textRed}`}>+2 since yesterday</div>
                    </div>

                    <div className={`${styles.statCard} ${styles.borderYellow}`}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Moderate Risk</span>
                            <span className={`material-symbols-outlined ${styles.statIcon} ${styles.yellow}`}>info</span>
                        </div>
                        <div className={styles.statValue}>28</div>
                        <div className={`${styles.statSub} ${styles.textYellow}`}>Needs monitoring</div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Avg Performance</span>
                            <span className={`material-symbols-outlined ${styles.statIcon} ${styles.blue}`}>trending_up</span>
                        </div>
                        <div className={styles.statValue}>76%</div>
                        <div className={`${styles.statSub} ${styles.textGreen}`}>↑ 1.2%</div>
                    </div>
                </div>

                {/* ---------- DASHBOARD GRID ---------- */}
                <div className={styles.dashGrid}>

                    {/* ===== LEFT COLUMN ===== */}
                    <div className={styles.colLeft}>
                        {/* Donut Chart Card */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Risk Distribution</h3>
                            <p className={styles.cardSubtitle}>Current semester analysis</p>

                            <div className={styles.donutWrap}>
                                <svg viewBox="0 0 100 100" className={styles.donutSvg}>
                                    {/* Green: 72% */}
                                    <circle className={`${styles.donutCircle} ${styles.donutGreen}`} cx="50" cy="50" r="40" strokeDasharray="226 251" />
                                    {/* Yellow: 20% */}
                                    <circle className={`${styles.donutCircle} ${styles.donutYellow}`} cx="50" cy="50" r="40" strokeDasharray="62 251" strokeDashoffset="-226" />
                                    {/* Red: 8% */}
                                    <circle className={`${styles.donutCircle} ${styles.donutRed}`} cx="50" cy="50" r="40" strokeDasharray="25 251" strokeDashoffset="-288" />
                                </svg>
                                <div className={styles.donutCenter}>
                                    <span className={styles.donutNum}>142</span>
                                    <span className={styles.donutLabel}>Students</span>
                                </div>
                            </div>

                            <div className={styles.legendList}>
                                <div className={styles.legendItem}>
                                    <div className={styles.legendLeft}>
                                        <div className={`${styles.legendDot} ${styles.green}`}></div>
                                        <span>Low Risk</span>
                                    </div>
                                    <span className={styles.legendValue}>72%</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <div className={styles.legendLeft}>
                                        <div className={`${styles.legendDot} ${styles.yellow}`}></div>
                                        <span>Moderate</span>
                                    </div>
                                    <span className={styles.legendValue}>20%</span>
                                </div>
                                <div className={styles.legendItem}>
                                    <div className={styles.legendLeft}>
                                        <div className={`${styles.legendDot} ${styles.red}`}></div>
                                        <span>High Risk</span>
                                    </div>
                                    <span className={styles.legendValue}>8%</span>
                                </div>
                            </div>
                        </div>

                        {/* Trend Card */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Performance Trend</h3>
                            <p className={styles.cardSubtitle}>Last 12 Weeks avg</p>

                            <svg className={styles.miniTrendSvg} viewBox="0 0 200 100" preserveAspectRatio="none">
                                <polyline className={styles.trendLine} points="0,80 30,90 60,60 90,70 120,40 150,20 200,40" />
                                <circle className={styles.trendPoint} cx="60" cy="60" r="3" />
                                <circle className={styles.trendPoint} cx="90" cy="70" r="3" />
                                <circle className={styles.trendPoint} cx="120" cy="40" r="3" />
                                <circle className={styles.trendPoint} cx="150" cy="20" r="3" />
                            </svg>
                        </div>
                    </div>

                    {/* ===== MID COLUMN ===== */}
                    <div className={styles.colMid}>
                        {/* Main Data Table */}
                        <div className={styles.card}>
                            <div className={styles.tableHeaderArea}>
                                <div>
                                    <h3 className={styles.cardTitle}>At-Risk Student List</h3>
                                    <p className={styles.cardSubtitle} style={{ marginBottom: 0 }}>Students requiring immediate attention</p>
                                </div>
                                <div className={styles.tableHeaderBtns}>
                                    <button className={styles.btnOutline}>Export CSV</button>
                                    <button className={styles.btnSolid}>Bulk Action</button>
                                </div>
                            </div>

                            <div className={styles.dataTableWrap}>
                                <table className={styles.dataTable}>
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th>RISK SCORE</th>
                                            <th>DROPOUT %</th>
                                            <th>WEAK SUBJECTS</th>
                                            <th>ATTENDANCE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>Loading realtime model predictions...</td>
                                            </tr>
                                        ) : (
                                            students.map((student) => (
                                                <tr key={student.student_id}>
                                                    <td>
                                                        <div className={styles.userCell}>
                                                            <div className={styles.userAvatar} style={{ backgroundImage: `url("https://i.pravatar.cc/150?img=${student.img}")` }}></div>
                                                            <div className={styles.userInfo}>
                                                                <span className={styles.userName}>{student.name}</span>
                                                                <span className={styles.userId}>ID: {student.student_id}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className={styles.riskScoreWrap}>
                                                            <span className={`${styles.riskScoreNum} ${student.at_risk ? styles.red : styles.green}`}>
                                                                {Math.round(student.risk_probability * 100)}
                                                            </span>
                                                            <div className={styles.riskBarBg}>
                                                                <div className={`${styles.riskBarFill} ${student.at_risk ? styles.red : styles.green}`} style={{ width: `${Math.round(student.risk_probability * 100)}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={`${styles.badge} ${student.at_risk ? styles.red : styles.green}`}>
                                                            {student.risk_label}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className={styles.subjectPillWrap}>
                                                            <span className={styles.subjectPill}>{student.subject_name}</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className={styles.attendanceText}>{student.attendance}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Subject Difficulty Snapshot */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Subject Difficulty Snapshot</h3>

                            <div className={styles.snapshotGrid}>
                                <div className={styles.snapItem}>
                                    <div className={styles.snapHeader}>
                                        <span className={styles.snapSub}>Mathematics</span>
                                        <span className={`${styles.snapStatus} ${styles.red}`}>Critical</span>
                                    </div>
                                    <div className={styles.snapMeta}>
                                        <span>Avg: 62%</span>
                                        <span>15 struggling</span>
                                    </div>
                                    <div className={styles.snapBar}>
                                        <div className={`${styles.snapBarFill} ${styles.red}`}></div>
                                    </div>
                                </div>

                                <div className={styles.snapItem}>
                                    <div className={styles.snapHeader}>
                                        <span className={styles.snapSub}>Physics</span>
                                        <span className={`${styles.snapStatus} ${styles.yellow}`}>Warn</span>
                                    </div>
                                    <div className={styles.snapMeta}>
                                        <span>Avg: 71%</span>
                                        <span>8 struggling</span>
                                    </div>
                                    <div className={styles.snapBar}>
                                        <div className={`${styles.snapBarFill} ${styles.yellow}`}></div>
                                    </div>
                                </div>

                                <div className={styles.snapItem}>
                                    <div className={styles.snapHeader}>
                                        <span className={styles.snapSub}>Literature</span>
                                        <span className={`${styles.snapStatus} ${styles.green}`}>Good</span>
                                    </div>
                                    <div className={styles.snapMeta}>
                                        <span>Avg: 85%</span>
                                        <span>2 struggling</span>
                                    </div>
                                    <div className={styles.snapBar}>
                                        <div className={`${styles.snapBarFill} ${styles.green}`}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN ===== */}
                    <div className={styles.colRight}>
                        {/* Alerts Card */}
                        <div className={`${styles.card} ${styles.alertsCard}`}>
                            <div className={styles.alertHeader}>
                                <span className={`material-symbols-outlined ${styles.alertIcon}`}>notifications_active</span>
                                <h3 className={styles.alertTitle}>Urgent AI Alerts</h3>
                            </div>

                            <div className={styles.alertList}>
                                <div className={styles.alertItem}>
                                    <div className={styles.alertAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=11")' }}></div>
                                    <div className={styles.alertContent}>
                                        <span className={styles.alertName}>Tom H.</span>
                                        <p className={styles.alertDesc}>Sudden attendance drop (-15% this week). AI flags potential health issue.</p>
                                        <span className={styles.alertTime}>2 hours ago</span>
                                    </div>
                                </div>

                                <div className={styles.alertItem}>
                                    <div className={styles.alertAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }}></div>
                                    <div className={styles.alertContent}>
                                        <span className={styles.alertName}>Alice W.</span>
                                        <p className={styles.alertDesc}>Failed 3 consecutive math quizzes. Intervention recommended.</p>
                                        <span className={styles.alertTime}>5 hours ago</span>
                                    </div>
                                </div>
                            </div>

                            <button className={styles.alertsMoreBtn}>View All Alerts</button>
                        </div>

                        {/* Recent Interventions */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Recent Interventions</h3>

                            <div className={styles.timeline}>
                                <div className={`${styles.timelineItem} ${styles.upcoming}`}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timeTitle}>Parent Call: Marcus J.</div>
                                    <div className={styles.timeDesc}>Scheduled for tomorrow, 2PM.</div>
                                    <span className={styles.timeBadge}>Upcoming</span>
                                </div>

                                <div className={`${styles.timelineItem} ${styles.completed}`}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timeTitle}>Tutoring: Sarah Lee</div>
                                    <div className={styles.timeDesc}>Completed session on Algebra basics.</div>
                                    <span className={styles.timeBadge}>Completed</span>
                                </div>

                                <div className={`${styles.timelineItem} ${styles.pending}`}>
                                    <div className={styles.timelineDot}></div>
                                    <div className={styles.timeTitle}>Counseling Referral</div>
                                    <div className={styles.timeDesc}>Submitted for David K.</div>
                                    <span className={styles.timeBadge}>Pending</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
