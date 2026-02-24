'use client';

import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

export default function TeacherDashboard() {
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
                                        {/* Row 1 */}
                                        <tr>
                                            <td>
                                                <div className={styles.userCell}>
                                                    <div className={styles.userAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=11")' }}></div>
                                                    <div className={styles.userInfo}>
                                                        <span className={styles.userName}>Marcus Johnson</span>
                                                        <span className={styles.userId}>ID: 49201</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.riskScoreWrap}>
                                                    <span className={`${styles.riskScoreNum} ${styles.red}`}>92</span>
                                                    <div className={styles.riskBarBg}>
                                                        <div className={`${styles.riskBarFill} ${styles.red}`} style={{ width: '92%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${styles.red}`}>High<br />(85%)</span>
                                            </td>
                                            <td>
                                                <div className={styles.subjectPillWrap}>
                                                    <span className={styles.subjectPill}>Math</span>
                                                    <span className={styles.subjectPill}>Physics</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.attendanceText}>64%</span>
                                            </td>
                                        </tr>

                                        {/* Row 2 */}
                                        <tr>
                                            <td>
                                                <div className={styles.userCell}>
                                                    <div className={styles.userAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }}></div>
                                                    <div className={styles.userInfo}>
                                                        <span className={styles.userName}>Sarah Lee</span>
                                                        <span className={styles.userId}>ID: 49205</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.riskScoreWrap}>
                                                    <span className={`${styles.riskScoreNum} ${styles.red}`}>88</span>
                                                    <div className={styles.riskBarBg}>
                                                        <div className={`${styles.riskBarFill} ${styles.red}`} style={{ width: '88%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${styles.red}`}>High<br />(78%)</span>
                                            </td>
                                            <td>
                                                <div className={styles.subjectPillWrap}>
                                                    <span className={styles.subjectPill}>History</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.attendanceText}>71%</span>
                                            </td>
                                        </tr>

                                        {/* Row 3 */}
                                        <tr>
                                            <td>
                                                <div className={styles.userCell}>
                                                    <div className={styles.userAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=12")' }}></div>
                                                    <div className={styles.userInfo}>
                                                        <span className={styles.userName}>David Kim</span>
                                                        <span className={styles.userId}>ID: 49212</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.riskScoreWrap}>
                                                    <span className={`${styles.riskScoreNum} ${styles.yellow}`}>65</span>
                                                    <div className={styles.riskBarBg}>
                                                        <div className={`${styles.riskBarFill} ${styles.yellow}`} style={{ width: '65%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${styles.yellow}`}>Med<br />(45%)</span>
                                            </td>
                                            <td>
                                                <div className={styles.subjectPillWrap}>
                                                    <span className={styles.subjectPill}>Chem</span>
                                                    <span className={styles.subjectPill}>Bio</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.attendanceText}>88%</span>
                                            </td>
                                        </tr>

                                        {/* Row 4 */}
                                        <tr>
                                            <td>
                                                <div className={styles.userCell}>
                                                    <div className={styles.userAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=9")' }}></div>
                                                    <div className={styles.userInfo}>
                                                        <span className={styles.userName}>Emily Rose</span>
                                                        <span className={styles.userId}>ID: 49230</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.riskScoreWrap}>
                                                    <span className={`${styles.riskScoreNum} ${styles.green}`}>22</span>
                                                    <div className={styles.riskBarBg}>
                                                        <div className={`${styles.riskBarFill} ${styles.green}`} style={{ width: '22%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${styles.green}`}>Low<br />(5%)</span>
                                            </td>
                                            <td>
                                                <div className={styles.subjectPillWrap}>
                                                    <span className={styles.subjectPill} style={{ fontStyle: 'italic', color: '#94a3b8', border: 'none', background: 'none' }}>None</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.attendanceText}>98%</span>
                                            </td>
                                        </tr>

                                        {/* Row 5 */}
                                        <tr>
                                            <td>
                                                <div className={styles.userCell}>
                                                    <div className={styles.userAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=33")' }}></div>
                                                    <div className={styles.userInfo}>
                                                        <span className={styles.userName}>James Tyler</span>
                                                        <span className={styles.userId}>ID: 49245</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.riskScoreWrap}>
                                                    <span className={`${styles.riskScoreNum} ${styles.yellow}`}>58</span>
                                                    <div className={styles.riskBarBg}>
                                                        <div className={`${styles.riskBarFill} ${styles.yellow}`} style={{ width: '58%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`${styles.badge} ${styles.yellow}`}>Med<br />(38%)</span>
                                            </td>
                                            <td>
                                                <div className={styles.subjectPillWrap}>
                                                    <span className={styles.subjectPill}>English</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.attendanceText}>82%</span>
                                            </td>
                                        </tr>

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
