'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export default function StudentDashboard() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [studentData, setStudentData] = useState<any>(null);
    const [modelPredictions, setModelPredictions] = useState<any[]>([]);
    const [isFetchingModel, setIsFetchingModel] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch user profile to get regNo
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const profile = userDoc.data();
                        setUserProfile(profile);

                        // Fetch real student data using regNo (Student_ID)
                        if (profile.regNo) {
                            const dataDoc = await getDoc(doc(db, 'studentData', profile.regNo));
                            if (dataDoc.exists()) {
                                const sData = dataDoc.data();
                                setStudentData(sData);

                                // Transform the fetched data for the EduShield AI Model
                                const subjectKeys = Object.keys(sData.subjects || {});
                                const records = subjectKeys.map(subName => {
                                    const sub = sData.subjects[subName];
                                    return {
                                        student_id: sData.studentId,
                                        subject_name: subName,
                                        exam_1: sub.exam1 || 0,
                                        exam_2: sub.exam2 || 0,
                                        exam_3: sub.exam3 || 0,
                                        exam_4: sub.exam4 || 0,
                                        exam_5: sub.exam5 || 0,
                                        exam_6: sub.exam6 || 0,
                                        latest_score: sub.latestScore || 0,
                                        score_momentum: sub.scoreMomentum || 0,
                                        overall_attendance_pct: sData.overallAttendancePct || 0,
                                        total_days_absent: sData.totalDaysAbsent || 0,
                                        max_absent_streak_length: sData.maxAbsentStreakLength || 0,
                                        days_enrolled: 180, // Default passing value
                                        discipline_flags: 0
                                    };
                                });

                                // Send the REAL batch of data to the Google Cloud Run Model
                                const cloudPayload = {
                                    records: records.length > 0 ? records : [
                                        // Fallback if records are empty for some reason
                                        { student_id: profile.regNo, subject_name: "General", exam_1: 50, latest_score: 50, score_momentum: 0, overall_attendance_pct: 80, total_days_absent: 5, max_absent_streak_length: 2 }
                                    ],
                                    apply_loophole_patches: true,
                                    holiday_factor: 1.0
                                };

                                fetch('https://edushield-ai-131338020960.asia-south2.run.app/predict/batch', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(cloudPayload)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data && data.results) {
                                            setModelPredictions(data.results);
                                        }
                                        setIsFetchingModel(false);
                                    })
                                    .catch(err => {
                                        console.error("AI Model Fetch Error:", err);
                                        setIsFetchingModel(false);
                                    });

                            } else {
                                console.log("No academic data found for this Student ID in DB.");
                                setIsFetchingModel(false);
                            }
                        } else {
                            setIsFetchingModel(false);
                        }
                    } else {
                        router.push('/login');
                    }
                } catch (err) {
                    console.error("Error fetching data:", err);
                    setIsFetchingModel(false);
                }
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const getPrediction = (subject: string) => {
        // Soft match since names might be slightly different like "Mathematics" vs "Math"
        return modelPredictions.find(p => p.subject_name.toLowerCase().includes(subject.toLowerCase()));
    };

    const overallRisk = modelPredictions.reduce((acc, p) => acc + (p.risk_probability || 0), 0) / (modelPredictions.length || 1);


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
                            <h2 className={styles.studentName}>{studentData ? studentData.name : (userProfile ? userProfile.regNo : 'Loading...')}</h2>
                            <span className={styles.studentMeta}>{studentData ? `Class ${studentData.class} • ${studentData.stream}` : 'Fetching Details...'}</span>
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
                            <span className={styles.healthBadge} style={{
                                backgroundColor: isFetchingModel ? 'var(--slate-800)' : (overallRisk > 0.4 ? 'var(--warning-dark)' : 'var(--success-dark)'),
                                color: isFetchingModel ? 'var(--slate-400)' : (overallRisk > 0.4 ? 'var(--warning)' : 'var(--success)')
                            }}>
                                {isFetchingModel ? 'Analyzing...' : (overallRisk > 0.4 ? 'At Risk' : 'Low Risk')}
                            </span>
                        </div>
                        <div className={styles.healthScoreWrap}>
                            <div className={styles.healthScore}>
                                {isFetchingModel ? '--' : Math.round(100 - (overallRisk * 100))}
                            </div>
                        </div>
                        <p className={styles.healthDesc}>
                            {isFetchingModel ? 'EduShield AI is analyzing your performance...' :
                                (overallRisk > 0.4 ? 'EduShield AI detected some risk factors in recent performance. Check your personalized plan.' : 'You\'re doing great! Keep it up to reach the honor roll.')}
                        </p>
                    </div>

                    {/* CTA Needs Help */}
                    <div className={styles.ctaCard}>
                        <h3 className={styles.ctaTitle}>Need Help?</h3>
                        <p className={styles.ctaDesc}>
                            Schedule a session with a tutor or chat with AI assistant.
                        </p>
                        <a href="https://gemini.google.com/u/2/app/e2aa1e35bc8fc5cf" target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>Get Support</a>
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
                                {getPrediction("Mathematics") && (
                                    <div style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: getPrediction("Mathematics")?.at_risk ? 'var(--warning)' : 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--slate-800)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>auto_awesome</span>
                                        EduShield AI: {getPrediction("Mathematics")?.risk_label} ({Math.round(getPrediction("Mathematics")?.risk_probability! * 100)}% Risk)
                                    </div>
                                )}
                                <div className={styles.subjectScoreArea}>
                                    <div className={styles.scoreGroup}>
                                        <span className={styles.label}>CURRENT GRADE</span>
                                        <span className={styles.value}>{studentData?.subjects?.['Mathematics']?.latestScore || 92}</span>
                                        <span className={styles.slash}>/100</span>
                                    </div>
                                    <div className={styles.miniChart}>
                                        {[1, 2, 3, 4, 5, 6].map(i => {
                                            const score = studentData?.subjects?.['Mathematics']?.[`exam${i}`] || 0;
                                            return score > 0 ? <div key={i} className={`${styles.bar} ${styles.math}`} style={{ height: `${score}%`, opacity: 0.3 + (i * 0.12) }}></div> : null;
                                        })}
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
                                            <h3>Science</h3>
                                            <p>Next: Lab Report</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.trendBadge} ${styles.flat}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_flat</span>
                                        {studentData?.subjects?.['Science']?.scoreMomentum || 0}%
                                    </div>
                                </div>
                                {getPrediction("Science") && (
                                    <div style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: getPrediction("Science")?.at_risk ? 'var(--warning)' : 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--slate-800)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>auto_awesome</span>
                                        EduShield AI: {getPrediction("Science")?.risk_label} ({Math.round(getPrediction("Science")?.risk_probability! * 100)}% Risk)
                                    </div>
                                )}
                                <div className={styles.subjectScoreArea}>
                                    <div className={styles.scoreGroup}>
                                        <span className={styles.label}>CURRENT GRADE</span>
                                        <span className={styles.value}>{studentData?.subjects?.['Science']?.latestScore || (studentData?.subjects?.['Physics']?.latestScore || 84)}</span>
                                        <span className={styles.slash}>/100</span>
                                    </div>
                                    <div className={styles.miniChart}>
                                        {[1, 2, 3, 4, 5, 6].map(i => {
                                            const score = studentData?.subjects?.['Science']?.[`exam${i}`] || studentData?.subjects?.['Physics']?.[`exam${i}`] || 0;
                                            return score > 0 ? <div key={i} className={`${styles.bar} ${styles.physics}`} style={{ height: `${score}%`, opacity: 0.3 + (i * 0.12) }}></div> : null;
                                        })}
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
                                            <h3>English</h3>
                                            <p>Next: Essay Draft</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.trendBadge} ${styles.down}`}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>trending_down</span>
                                        {studentData?.subjects?.['English']?.scoreMomentum || -3}%
                                    </div>
                                </div>
                                {getPrediction("English") && (
                                    <div style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem', color: getPrediction("English")?.at_risk ? 'var(--warning)' : 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--slate-800)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: getPrediction("English")?.at_risk ? '1px solid var(--warning-dark)' : 'none' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>auto_awesome</span>
                                        EduShield AI: {getPrediction("English")?.risk_label} ({Math.round(getPrediction("English")?.risk_probability! * 100)}% Risk)
                                    </div>
                                )}
                                <div className={styles.subjectScoreArea}>
                                    <div className={styles.scoreGroup}>
                                        <span className={styles.label}>CURRENT GRADE</span>
                                        <span className={styles.value}>{studentData?.subjects?.['English']?.latestScore || (studentData?.subjects?.['Literature']?.latestScore || 78)}</span>
                                        <span className={styles.slash}>/100</span>
                                    </div>
                                    <div className={styles.miniChart}>
                                        {[1, 2, 3, 4, 5, 6].map(i => {
                                            const score = studentData?.subjects?.['English']?.[`exam${i}`] || studentData?.subjects?.['Literature']?.[`exam${i}`] || 0;
                                            return score > 0 ? <div key={i} className={`${styles.bar} ${styles.literature}`} style={{ height: `${score}%`, opacity: 0.3 + (i * 0.12) }}></div> : null;
                                        })}
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
                                <p>Average scores over last 6 exams across all subjects.</p>
                            </div>
                            <div className={styles.chartTabs}>
                                <span className={`${styles.chartTab} ${styles.active}`}>Tests</span>
                                <span className={styles.chartTab}>Assignments</span>
                            </div>
                        </div>

                        <div className={styles.chartArea}>
                            {(() => {
                                const subs = studentData?.subjects ? (Object.values(studentData.subjects) as any[]) : [];
                                const numS = subs.length || 1;

                                // Determine the last exam index with any data
                                const lastExamIdx = [1, 2, 3, 4, 5, 6].reduce((found, i) =>
                                    subs.some(s => (s[`exam${i}`] || 0) > 0) ? i : found, 1
                                );

                                // Format data for Recharts
                                const chartData = Array.from({ length: lastExamIdx }, (_, i) => {
                                    const examNum = i + 1;
                                    const total = subs.reduce((acc, s) => acc + (s[`exam${examNum}`] || 0), 0);
                                    const avg = Math.round(total / numS);
                                    return {
                                        name: examNum === lastExamIdx ? 'Latest' : `Exam ${examNum}`,
                                        score: avg,
                                        fullName: `Exam ${examNum}`
                                    };
                                });

                                if (chartData.length === 0) return <div className={styles.noData}>No performance data available.</div>;

                                return (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--slate-100)" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'var(--slate-400)', fontSize: 12, fontWeight: 600 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                domain={[0, 100]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: 'var(--slate-400)', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#ffffff',
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                                itemStyle={{ color: 'var(--accent)', fontWeight: 700 }}
                                                labelStyle={{ color: 'var(--slate-500)', marginBottom: '4px' }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="score"
                                                stroke="var(--accent)"
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill="url(#colorScore)"
                                                animationDuration={1500}
                                                dot={{ r: 4, fill: '#fff', stroke: 'var(--accent)', strokeWidth: 2 }}
                                                activeDot={{ r: 6, strokeWidth: 0 }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                );
                            })()}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
