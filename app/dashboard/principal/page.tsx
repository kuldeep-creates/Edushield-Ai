'use client';

import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

export default function PrincipalDashboard() {
    return (
        <div className={styles.container}>
            {/* Header / Nav */}
            <DashboardNav role="principal" searchPlaceholder="Search insights..." />

            <main className={styles.mainContent}>
                {/* Page Title Area */}
                <div className={styles.pageHeader}>
                    <div className={styles.pageTitleBlock}>
                        <h1 className={styles.pageTitle}>Institutional Strategic Insights</h1>
                        <p className={styles.pageSubtitle}>
                            High-level overview of teacher efficacy, student retention metrics, and predictive dropout modeling.
                        </p>
                    </div>
                    <button className={styles.downloadBtn}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                        <span>Download Institutional Report</span>
                    </button>
                </div>

                {/* Teacher Performance Section */}
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
                                    {/* Sarah Jenkins */}
                                    <tr>
                                        <td>
                                            <div className={styles.teacherProfile}>
                                                <div className={styles.teacherAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=47")' }}></div>
                                                <span className={styles.teacherName}>Sarah Jenkins</span>
                                            </div>
                                        </td>
                                        <td><span className={styles.tdText}>10th</span></td>
                                        <td><span className={`${styles.subjectBadge} ${styles.math}`}>Math</span></td>
                                        <td><span className={`material-symbols-outlined ${styles.trendIcon} ${styles.up}`}>trending_up</span></td>
                                        <td>
                                            <div className={styles.activityWrap}>
                                                <div className={styles.activityBarBg}>
                                                    <div className={styles.activityBarFill} style={{ width: '85%', backgroundColor: 'var(--primary)' }}></div>
                                                </div>
                                                <span className={styles.activityScore}>85</span>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Michael Ross */}
                                    <tr>
                                        <td>
                                            <div className={styles.teacherProfile}>
                                                <div className={styles.teacherAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=11")' }}></div>
                                                <span className={styles.teacherName}>Michael Ross</span>
                                            </div>
                                        </td>
                                        <td><span className={styles.tdText}>11th</span></td>
                                        <td><span className={`${styles.subjectBadge} ${styles.physics}`}>Physics</span></td>
                                        <td><span className={`material-symbols-outlined ${styles.trendIcon} ${styles.flat}`}>trending_flat</span></td>
                                        <td>
                                            <div className={styles.activityWrap}>
                                                <div className={styles.activityBarBg}>
                                                    <div className={styles.activityBarFill} style={{ width: '60%', backgroundColor: '#f59e0b' }}></div>
                                                </div>
                                                <span className={styles.activityScore}>60</span>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Emily Chen */}
                                    <tr>
                                        <td>
                                            <div className={styles.teacherProfile}>
                                                <div className={styles.teacherAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=5")' }}></div>
                                                <span className={styles.teacherName}>Emily Chen</span>
                                            </div>
                                        </td>
                                        <td><span className={styles.tdText}>9th</span></td>
                                        <td><span className={`${styles.subjectBadge} ${styles.history}`}>History</span></td>
                                        <td><span className={`material-symbols-outlined ${styles.trendIcon} ${styles.up}`}>trending_up</span></td>
                                        <td>
                                            <div className={styles.activityWrap}>
                                                <div className={styles.activityBarBg}>
                                                    <div className={styles.activityBarFill} style={{ width: '92%', backgroundColor: 'var(--primary)' }}></div>
                                                </div>
                                                <span className={styles.activityScore}>92</span>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* David Kim */}
                                    <tr>
                                        <td>
                                            <div className={styles.teacherProfile}>
                                                <div className={styles.teacherAvatar} style={{ backgroundImage: 'url("https://i.pravatar.cc/150?img=12")' }}></div>
                                                <span className={styles.teacherName}>David Kim</span>
                                            </div>
                                        </td>
                                        <td><span className={styles.tdText}>12th</span></td>
                                        <td><span className={`${styles.subjectBadge} ${styles.english}`}>English</span></td>
                                        <td><span className={`material-symbols-outlined ${styles.trendIcon} ${styles.down}`}>trending_down</span></td>
                                        <td>
                                            <div className={styles.activityWrap}>
                                                <div className={styles.activityBarBg}>
                                                    <div className={styles.activityBarFill} style={{ width: '45%', backgroundColor: '#ef4444' }}></div>
                                                </div>
                                                <span className={styles.activityScore}>45</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Dropout Intelligence Section */}
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
                        {/* Line Chart Card */}
                        <div className={`${styles.chartCard} ${styles.colSpan2}`}>
                            <div className={styles.cardTop}>
                                <div>
                                    <h3 className={styles.cardH3}>School-wide Risk Trends</h3>
                                    <p className={styles.cardP}>Predictive analysis of dropout probability over the current academic term.</p>
                                </div>
                                <div className={styles.chartLegend}>
                                    <span className={styles.legendItem}>
                                        <span className={styles.legendDot} style={{ backgroundColor: 'var(--primary)' }}></span>
                                        High Risk
                                    </span>
                                    <span className={styles.legendItem}>
                                        <span className={styles.legendDot} style={{ backgroundColor: '#cbd5e1' }}></span>
                                        Avg Baseline
                                    </span>
                                </div>
                            </div>

                            {/* Simplified CSS Chart */}
                            <div className={styles.mockChartArea}>
                                <div className={styles.gridLines}>
                                    <div className={styles.gridLine}></div>
                                    <div className={styles.gridLine}></div>
                                    <div className={styles.gridLine}></div>
                                    <div className={styles.gridLine}></div>
                                </div>

                                {/* Bars representing weeks */}
                                {[30, 35, 32, 45, 52, 48, 60, 65, 55, 50].map((h, i) => (
                                    <div
                                        key={i}
                                        className={styles.chartBar}
                                        style={{ height: `${h}%`, backgroundColor: `rgba(19, 77, 236, ${Math.max(0.2, h / 100)})` }}
                                    >
                                        <div className={styles.tooltip}>Week {i + 1}</div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.chartX}>
                                <span>Week 1</span>
                                <span>Week 5</span>
                                <span>Week 10</span>
                            </div>
                        </div>

                        {/* Vulnerability Clusters */}
                        <div className={styles.chartCard}>
                            <h3 className={styles.cardH3}>Grade-level Vulnerability</h3>
                            <p className={styles.cardP} style={{ marginBottom: '1.5rem' }}>Classes flagged for immediate attention.</p>

                            <div className={styles.clusterList}>
                                {/* Cluster 1 */}
                                <div className={styles.clusterItem}>
                                    <div className={`${styles.clusterIconWrap} ${styles.red}`}>
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <div className={styles.clusterContent}>
                                        <div className={styles.clusterTop}>
                                            <span className={styles.clusterName}>10th Grade Math</span>
                                            <span className={`${styles.clusterTag} ${styles.red}`}>Critical</span>
                                        </div>
                                        <p className={styles.clusterDesc}>32% students marked &apos;At Risk&apos;</p>
                                        <div className={styles.clusterProgressBarBg}>
                                            <div className={`${styles.clusterProgressBarFill} ${styles.red}`} style={{ width: '32%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cluster 2 */}
                                <div className={styles.clusterItem}>
                                    <div className={`${styles.clusterIconWrap} ${styles.orange}`}>
                                        <span className="material-symbols-outlined">priority_high</span>
                                    </div>
                                    <div className={styles.clusterContent}>
                                        <div className={styles.clusterTop}>
                                            <span className={styles.clusterName}>9th Grade History</span>
                                            <span className={`${styles.clusterTag} ${styles.orange}`}>Monitor</span>
                                        </div>
                                        <p className={styles.clusterDesc}>18% students marked &apos;At Risk&apos;</p>
                                        <div className={styles.clusterProgressBarBg}>
                                            <div className={`${styles.clusterProgressBarFill} ${styles.orange}`} style={{ width: '18%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Cluster 3 */}
                                <div className={styles.clusterItem}>
                                    <div className={`${styles.clusterIconWrap} ${styles.blue}`}>
                                        <span className="material-symbols-outlined">info</span>
                                    </div>
                                    <div className={styles.clusterContent}>
                                        <div className={styles.clusterTop}>
                                            <span className={styles.clusterName}>11th Grade Science</span>
                                            <span className={`${styles.clusterTag} ${styles.blue}`}>Stable</span>
                                        </div>
                                        <p className={styles.clusterDesc}>5% students marked &apos;At Risk&apos;</p>
                                        <div className={styles.clusterProgressBarBg}>
                                            <div className={`${styles.clusterProgressBarFill} ${styles.blue}`} style={{ width: '5%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className={styles.viewFullBtn}>View Full Vulnerability Report</button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
