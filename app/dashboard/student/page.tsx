'use client';

import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

export default function StudentDashboard() {
    return (
        <div className={styles.container}>
            {/* ---------- NAVIGATION BAR ---------- */}
            <DashboardNav role="student" searchPlaceholder="Search courses, assignments..." />

            <div className={styles.mainArea}>
                {/* ---------- LEFT SIDEBAR ---------- */}
                <aside className={styles.sidebar}>
                    {/* Profile Summary */}
                    <div className={styles.sidebarCard}>
                        <div className={styles.profileSummary}>
                            <div className={styles.avatarLargeWrap}>
                                <div className={styles.avatarLarge}></div>
                                <div className={styles.statusIndicator}>
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                            </div>
                            <h2 className={styles.studentName}>Alex Student</h2>
                            <span className={styles.studentMeta}>Grade 10 • Science Stream</span>
                        </div>

                        {/* Navigation Menu */}
                        <nav className={styles.sideNav}>
                            <a href="#" className={`${styles.sideNavItem} ${styles.sideNavItemActive}`}>
                                <span className={`material-symbols-outlined ${styles.sideNavItemIcon}`}>grid_view</span>
                                Overview
                            </a>
                            <a href="#" className={styles.sideNavItem}>
                                <span className={`material-symbols-outlined ${styles.sideNavItemIcon}`}>school</span>
                                My Grades
                            </a>
                            <a href="#" className={styles.sideNavItem}>
                                <span className={`material-symbols-outlined ${styles.sideNavItemIcon}`}>calendar_today</span>
                                Schedule
                            </a>
                            <a href="#" className={styles.sideNavItem}>
                                <span className={`material-symbols-outlined ${styles.sideNavItemIcon}`}>insights</span>
                                Reports
                            </a>
                        </nav>
                    </div>

                    {/* Academic Health Score */}
                    <div className={styles.sidebarCard}>
                        <div className={styles.healthHeader}>
                            <span className={styles.healthTitle}>Academic Health</span>
                            <span className={styles.healthBadge}>Low Risk</span>
                        </div>
                        <div className={styles.healthScoreWrap}>
                            <div className={styles.healthScore}>85</div>
                        </div>
                        <p className={styles.healthDesc}>
                            You&apos;re doing great! Keep it up to reach the honor roll.
                        </p>
                    </div>

                    {/* CTA Needs Help */}
                    <div className={styles.ctaCard}>
                        <h3 className={styles.ctaTitle}>Need Help?</h3>
                        <p className={styles.ctaDesc}>
                            Schedule a session with a tutor or chat with AI assistant.
                        </p>
                        <a href="#" className={styles.ctaBtn}>Get Support</a>
                    </div>
                </aside>

                {/* ---------- MAIN CONTENT ---------- */}
                <main className={styles.content}>

                    {/* Header */}
                    <div className={styles.contentHeader}>
                        <div>
                            <h1 className={styles.pageTitle}>Academic Overview</h1>
                            <p className={styles.pageSubtitle}>Here is what&apos;s happening with your courses today.</p>
                        </div>
                        <select className={styles.termSelect}>
                            <option>Current Semester</option>
                            <option>Last Semester</option>
                        </select>
                    </div>

                    {/* Personalized Improvement Plan */}
                    <div className={styles.planCard}>
                        <div className={styles.planHeader}>
                            <span className={`material-symbols-outlined ${styles.planIcon}`}>auto_awesome</span>
                            <span className={styles.planTitle}>Your Personalized Improvement Plan</span>
                        </div>
                        <div className={styles.planGrid}>
                            <div className={styles.planItem}>
                                <span className={`material-symbols-outlined ${styles.planItemIcon}`} style={{ color: 'var(--warning)' }}>priority_high</span>
                                <div className={styles.planItemContent}>
                                    <h4>Focus on Algebra</h4>
                                    <p>Review quadratic equations before Friday&apos;s quiz.</p>
                                </div>
                            </div>
                            <div className={styles.planItem}>
                                <span className={`material-symbols-outlined ${styles.planItemIcon}`} style={{ color: 'var(--accent)' }}>edit_document</span>
                                <div className={styles.planItemContent}>
                                    <h4>Physics Lab Report</h4>
                                    <p>Draft conclusion section. Due in 2 days.</p>
                                </div>
                            </div>
                            <div className={styles.planItem}>
                                <span className={`material-symbols-outlined ${styles.planItemIcon}`} style={{ color: 'var(--success)' }}>trending_up</span>
                                <div className={styles.planItemContent}>
                                    <h4>Maintain History Streak</h4>
                                    <p>You scored 95% last time! Keep the momentum.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subject Performance */}
                    <div>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Subject Performance</h2>
                            <a href="#" className={styles.sectionLink}>
                                View all subjects
                                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>arrow_forward</span>
                            </a>
                        </div>
                        <div className={styles.subjectGrid}>

                            {/* Math Card */}
                            <div className={styles.subjectCard}>
                                <div className={styles.subjectHeader}>
                                    <div className={styles.subjectInfo}>
                                        <div className={`${styles.subjectIconWrap} ${styles.math}`}>
                                            <span className="material-symbols-outlined">calculate</span>
                                        </div>
                                        <div className={styles.subjectDetails}>
                                            <h3>Mathematics</h3>
                                            <p>Next: Algebra II Quiz</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.trendBadge} ${styles.up}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_up</span>
                                        +5%
                                    </div>
                                </div>
                                <div className={styles.subjectScoreArea}>
                                    <div className={styles.scoreGroup}>
                                        <span className={styles.label}>CURRENT GRADE</span>
                                        <span className={styles.value}>92</span>
                                        <span className={styles.slash}>/100</span>
                                    </div>
                                    <div className={styles.miniChart}>
                                        <div className={`${styles.bar} ${styles.math}`} style={{ height: '30%', opacity: 0.3 }}></div>
                                        <div className={`${styles.bar} ${styles.math}`} style={{ height: '50%', opacity: 0.5 }}></div>
                                        <div className={`${styles.bar} ${styles.math}`} style={{ height: '40%', opacity: 0.4 }}></div>
                                        <div className={`${styles.bar} ${styles.math}`} style={{ height: '60%', opacity: 0.6 }}></div>
                                        <div className={`${styles.bar} ${styles.math}`} style={{ height: '100%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Physics Card */}
                            <div className={styles.subjectCard}>
                                <div className={styles.subjectHeader}>
                                    <div className={styles.subjectInfo}>
                                        <div className={`${styles.subjectIconWrap} ${styles.physics}`}>
                                            <span className="material-symbols-outlined">science</span>
                                        </div>
                                        <div className={styles.subjectDetails}>
                                            <h3>Physics</h3>
                                            <p>Next: Lab Report</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.trendBadge} ${styles.flat}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_flat</span>
                                        0%
                                    </div>
                                </div>
                                <div className={styles.subjectScoreArea}>
                                    <div className={styles.scoreGroup}>
                                        <span className={styles.label}>CURRENT GRADE</span>
                                        <span className={styles.value}>84</span>
                                        <span className={styles.slash}>/100</span>
                                    </div>
                                    <div className={styles.miniChart}>
                                        <div className={`${styles.bar} ${styles.physics}`} style={{ height: '60%', opacity: 0.3 }}></div>
                                        <div className={`${styles.bar} ${styles.physics}`} style={{ height: '70%', opacity: 0.4 }}></div>
                                        <div className={`${styles.bar} ${styles.physics}`} style={{ height: '75%', opacity: 0.5 }}></div>
                                        <div className={`${styles.bar} ${styles.physics}`} style={{ height: '80%', opacity: 0.6 }}></div>
                                        <div className={`${styles.bar} ${styles.physics}`} style={{ height: '85%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Literature Card */}
                            <div className={styles.subjectCard}>
                                <div className={styles.subjectHeader}>
                                    <div className={styles.subjectInfo}>
                                        <div className={`${styles.subjectIconWrap} ${styles.literature}`}>
                                            <span className="material-symbols-outlined">menu_book</span>
                                        </div>
                                        <div className={styles.subjectDetails}>
                                            <h3>Literature</h3>
                                            <p>Next: Essay Draft</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.trendBadge} ${styles.down}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_down</span>
                                        -3%
                                    </div>
                                </div>
                                <div className={styles.subjectScoreArea}>
                                    <div className={styles.scoreGroup}>
                                        <span className={styles.label}>CURRENT GRADE</span>
                                        <span className={styles.value}>78</span>
                                        <span className={styles.slash}>/100</span>
                                    </div>
                                    <div className={styles.miniChart}>
                                        <div className={`${styles.bar} ${styles.literature}`} style={{ height: '90%', opacity: 0.3 }}></div>
                                        <div className={`${styles.bar} ${styles.literature}`} style={{ height: '85%', opacity: 0.4 }}></div>
                                        <div className={`${styles.bar} ${styles.literature}`} style={{ height: '80%', opacity: 0.5 }}></div>
                                        <div className={`${styles.bar} ${styles.literature}`} style={{ height: '60%', opacity: 0.6 }}></div>
                                        <div className={`${styles.bar} ${styles.literature}`} style={{ height: '75%' }}></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Trend Chart */}
                    <div className={styles.chartCard}>
                        <div className={styles.chartHeader}>
                            <div className={styles.chartTitles}>
                                <h3>Performance Trend</h3>
                                <p>Average scores over last 5 assessments across all subjects.</p>
                            </div>
                            <div className={styles.chartTabs}>
                                <span className={`${styles.chartTab} ${styles.active}`}>Tests</span>
                                <span className={styles.chartTab}>Assignments</span>
                            </div>
                        </div>

                        <div className={styles.chartArea}>
                            {/* SVG Chart Background Lines */}
                            <div className={styles.chartLines}>
                                {[100, 80, 60, 40, 20].map((val) => (
                                    <div key={val} className={styles.chartLineGroup}>
                                        <span className={styles.chartLineValue}>{val}</span>
                                        <div className={styles.chartLine}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Using simple SVG to draw the lines matching the image */}
                            <svg className={styles.chartSvg} preserveAspectRatio="none" viewBox="0 0 400 100">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                {/* Grey Previous Line */}
                                <polyline
                                    className={styles.svgLinePrev}
                                    points="100,75 200,60 300,10"
                                />

                                {/* Area Fill */}
                                <polygon
                                    className={styles.svgArea}
                                    points="50,80 150,70 250,80 350,30 400,30 400,100 50,100"
                                />

                                {/* Blue Active Line */}
                                <polyline
                                    className={styles.svgLine}
                                    points="50,80 150,70 250,80 350,30 400,30"
                                />

                                {/* Points */}
                                <circle cx="50" cy="80" r="4" className={styles.svgPoint} />
                                <circle cx="150" cy="70" r="4" className={styles.svgPoint} />
                                <circle cx="250" cy="80" r="4" className={styles.svgPoint} />
                                <circle cx="350" cy="30" r="4" className={styles.svgPoint} />
                                <circle cx="400" cy="30" r="4" className={styles.svgPoint} />
                            </svg>

                            {/* X-Axis Labels */}
                            <div className={styles.chartXAxis}>
                                <span className={styles.xLabel}>Test 1</span>
                                <span className={styles.xLabel}>Test 2</span>
                                <span className={styles.xLabel}>Test 3</span>
                                <span className={styles.xLabel}>Test 4</span>
                                <span className={styles.xLabel} style={{ color: 'var(--slate-800)' }}>Latest</span>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
