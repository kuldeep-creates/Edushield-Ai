'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';
import { AreaChart, Area, ResponsiveContainer, Tooltip as RechartsTooltip, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface StudentProfile {
    regNo?: string;
    role?: string;
    [key: string]: any;
}

interface StudentData {
    studentId: string;
    name: string;
    class?: string;
    stream?: string;
    schoolName?: string;
    overallAttendancePct: number;
    disciplineFlags: number;
    totalDaysAbsent: number;
    subjects: Record<string, any>;
    [key: string]: any;
}

interface ModelPrediction {
    subject_name: string;
    risk_probability: number;
    at_risk: boolean;
    risk_category: string;
    risk_label: string;
    recommendation: string;
}

export default function MyPerformancePage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [modelPredictions, setModelPredictions] = useState<ModelPrediction[]>([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const profile = userDoc.data() as StudentProfile;
                        setUserProfile(profile);

                        if (profile.regNo) {
                            const dataDoc = await getDoc(doc(db, 'studentData', profile.regNo));
                            if (dataDoc.exists()) {
                                const sData = dataDoc.data() as StudentData;
                                setStudentData(sData);

                                // Fetch predictions
                                const subjectKeys = Object.keys(sData.subjects || {});
                                const records = subjectKeys.map(subName => {
                                    const sub = sData.subjects[subName];
                                    return {
                                        student_id: sData.studentId || profile.regNo,
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
                                        days_enrolled: 180,
                                        discipline_flags: sData.disciplineFlags || 0
                                    };
                                });

                                const cloudPayload = {
                                    records: records.length > 0 ? records : [{ student_id: profile.regNo, subject_name: "General", exam_1: 50, latest_score: 50, score_momentum: 0, overall_attendance_pct: 80, total_days_absent: 5, max_absent_streak_length: 2 }],
                                    apply_loophole_patches: true,
                                    holiday_factor: 1.0
                                };

                                const apiUrl = process.env.NEXT_PUBLIC_AI_API_URL
                                    ? `${process.env.NEXT_PUBLIC_AI_API_URL}/predict/batch`
                                    : 'https://edushield-ai-131338020960.asia-south2.run.app/predict/batch';

                                fetch(apiUrl, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(cloudPayload)
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        if (data?.results) setModelPredictions(data.results);
                                    })
                                    .catch(err => console.error("AI Error:", err))
                                    .finally(() => setIsFetching(false));
                            } else {
                                setIsFetching(false);
                            }
                        } else {
                            setIsFetching(false);
                        }
                    } else {
                        router.push('/login');
                    }
                } catch (err) {
                    console.error("Data error:", err);
                    setIsFetching(false);
                }
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    if (isFetching) {
        return (
            <div className={styles.loadingScreen}>
                <div className={styles.loader}></div>
                <p>Analyzing Performance Data...</p>
            </div>
        );
    }

    if (!studentData) {
        return <div className={styles.loadingScreen}>No academic data found.</div>;
    }

    const subs = studentData.subjects || {};

    // Build Subject List & Metadata
    const subjectList = Object.keys(subs).map(subName => {
        const subData = subs[subName];
        const pred = modelPredictions.find(p => p.subject_name === subName);

        let insightClass = styles.aiInsightBox;
        let iconType = 'psychology';
        if (pred?.at_risk || (pred?.risk_probability || 0) >= 0.40) {
            insightClass = `${styles.aiInsightBox} ${styles.criticalInsight}`;
            iconType = 'warning';
        } else if ((subData.scoreMomentum || 0) < 0) {
            insightClass = `${styles.aiInsightBox} ${styles.warningInsight}`;
            iconType = 'trending_down';
        } else {
            insightClass = `${styles.aiInsightBox} ${styles.successInsight}`;
            iconType = 'verified';
        }

        // Gather all exams for the history strip dynamically
        const availableExams: { num: string, score: number }[] = [];
        Object.keys(subData).forEach(key => {
            const match = key.match(/^exam_?(\d+)$/i);
            if (match && subData[key] !== undefined && subData[key] !== null && subData[key] !== "") {
                availableExams.push({ num: `Exam ${match[1]}`, score: Number(subData[key]) });
            }
        });
        availableExams.sort((a, b) => parseInt(a.num.replace('Exam ', '')) - parseInt(b.num.replace('Exam ', '')));

        return {
            name: subName,
            data: subData,
            prediction: pred,
            insightClass,
            iconType,
            availableExams
        };
    });

    // Global Stats Calculation
    let sumScore = 0;
    let sumMomentum = 0;
    let highRiskCount = 0;
    subjectList.forEach(s => {
        sumScore += (s.data.latestScore || 0);
        sumMomentum += (s.data.scoreMomentum || 0);
        if (s.prediction?.at_risk || (s.prediction?.risk_probability || 0) >= 0.40) highRiskCount++;
    });

    const averageScore = subjectList.length > 0 ? Math.round(sumScore / subjectList.length) : 0;
    const averageMomentum = subjectList.length > 0 ? (sumMomentum / subjectList.length).toFixed(1) : 0;

    // Action Plan String
    let quickAction = "You are on a perfect streak, keep it up!";
    if (highRiskCount > 0) quickAction = `You have ${highRiskCount} subject(s) requiring immediate attention to avoid failure.`;
    else if (Number(averageMomentum) < -2) quickAction = "Your general momentum is slipping. Review recent topics to restabilize.";

    // Badge Logic
    const earnedBadges = [];
    if (studentData?.overallAttendancePct >= 95) {
        earnedBadges.push({ id: 'att', name: 'Attendance Elite', icon: 'event_available', color: '#10b981', desc: 'Over 95% attendance' });
    }
    if (Number(averageMomentum) > 0) {
        earnedBadges.push({ id: 'mom', name: 'Momentum Builder', icon: 'trending_up', color: '#f59e0b', desc: 'Positive recent growth' });
    }
    const highSubjects = subjectList.filter(s => s.data.latestScore >= 90);
    if (highSubjects.length > 0) {
        earnedBadges.push({ id: 'mas', name: 'Scholarly Master', icon: 'workspace_premium', color: '#8b5cf6', desc: `90+ Score Reached` });
    }
    const consistentSubjects = subjectList.filter(s => s.data.consistencyScore >= 90);
    if (consistentSubjects.length > 0) {
        earnedBadges.push({ id: 'consist', name: 'Consistency King', icon: 'bolt', color: '#3b82f6', desc: 'Stellar stability' });
    }
    if (earnedBadges.length === 0) {
        earnedBadges.push({ id: 'start', name: 'Rising Star', icon: 'star', color: '#64748b', desc: 'Keep learning to earn more' });
    }

    return (
        <div className={styles.container}>
            <DashboardNav role="student" searchPlaceholder="Search subjects..." />

            <main className={styles.mainArea}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <h1>Systematic Performance Tracking</h1>
                        <p>A next-generation AI breakdown of your academic trajectory.</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.aiBadgeHero}>
                            <span className="material-symbols-outlined">robot_2</span>
                            Powered by EduShield AI Core
                        </div>
                    </div>
                </div>

                {/* --- HERO OVERVIEW DASHBOARD --- */}
                <div className={styles.heroGrid}>
                    <div className={`${styles.heroCard} ${styles.heroScoreCard}`}>
                        <div className={styles.heroCardHeader}>Global Average</div>
                        <div className={styles.heroCardValue}>{averageScore}<span className={styles.heroSmall}>/100</span></div>
                        <div className={styles.heroSubText}>Over {subjectList.length} total subjects</div>
                    </div>

                    <div className={`${styles.heroCard} ${Number(averageMomentum) < 0 ? styles.heroCardWarn : styles.heroCardSuccess}`}>
                        <div className={styles.heroCardHeader}>Net Momentum</div>
                        <div className={styles.heroCardValue}>{Number(averageMomentum) > 0 ? '+' : ''}{averageMomentum}<span className={styles.heroSmall}>%</span></div>
                        <div className={styles.heroSubText}>Compared to prior histories</div>
                    </div>

                    <div className={`${styles.heroCard} ${styles.heroActionCard}`}>
                        <div className={styles.heroActionHeader}>
                            <span className="material-symbols-outlined">electric_bolt</span> AI Directive
                        </div>
                        <p className={styles.heroActionText}>{quickAction}</p>
                    </div>
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                    <h2><span className="material-symbols-outlined">emoji_events</span> Honors & Achievements</h2>
                </div>
                <div className={styles.badgesContainer}>
                    {earnedBadges.map(badge => (
                        <div key={badge.id} className={styles.badgeBox} style={{ '--badge-hex': badge.color } as React.CSSProperties}>
                            <div className={styles.badgeIconWrap} style={{ background: badge.color }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: 'white' }}>{badge.icon}</span>
                            </div>
                            <div className={styles.badgeInfo}>
                                <h4>{badge.name}</h4>
                                <p>{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                    <h2><span className="material-symbols-outlined">radar</span> Advanced Analytics Grid</h2>
                </div>

                <div className={styles.analyticsGrid}>
                    {/* Mastery Radar */}
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsHeader}>
                            <h3>360° Mastery Radar</h3>
                            <p>Your academic shape and balance across all subjects.</p>
                        </div>
                        <div className={styles.radarContainer}>
                            <ResponsiveContainer width="100%" height={250}>
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subjectList.map(s => ({ subject: s.name, score: s.data.latestScore || 0, fullMark: 100 }))}>
                                    <PolarGrid stroke="#e2e8f0" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Score" dataKey="score" stroke="#3b82f6" strokeWidth={2} fill="#3b82f6" fillOpacity={0.3} />
                                    <RechartsTooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Behavioral & Attendance */}
                    <div className={styles.analyticsCard}>
                        <div className={styles.analyticsHeader}>
                            <h3>Behavioral & Consistency Matrix</h3>
                            <p>Non-academic metrics affecting your AI Risk Propensity.</p>
                        </div>
                        <div className={styles.behaviorGrid}>
                            <div className={styles.behaviorBox}>
                                <div className={styles.bIconWrap} style={{ background: '#dcfce7', color: '#16a34a' }}>
                                    <span className="material-symbols-outlined">how_to_reg</span>
                                </div>
                                <div className={styles.bData}>
                                    <div className={styles.bLabel}>Overall Attendance</div>
                                    <div className={styles.bValue}>{studentData.overallAttendancePct}%</div>
                                </div>
                            </div>

                            <div className={styles.behaviorBox}>
                                <div className={styles.bIconWrap} style={{ background: '#fee2e2', color: '#dc2626' }}>
                                    <span className="material-symbols-outlined">gavel</span>
                                </div>
                                <div className={styles.bData}>
                                    <div className={styles.bLabel}>Discipline Flags</div>
                                    <div className={styles.bValue}>{studentData.disciplineFlags}</div>
                                </div>
                            </div>

                            <div className={styles.behaviorBox}>
                                <div className={styles.bIconWrap} style={{ background: '#fef08a', color: '#ca8a04' }}>
                                    <span className="material-symbols-outlined">calendar_month</span>
                                </div>
                                <div className={styles.bData}>
                                    <div className={styles.bLabel}>Total Days Absent</div>
                                    <div className={styles.bValue}>{studentData.totalDaysAbsent}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
                    <h2><span className="material-symbols-outlined">insights</span> Subject Deep Dives</h2>
                </div>

                <div className={styles.subjectGrid}>
                    {subjectList.map((subject, idx) => (
                        <div key={idx} className={styles.subjectCard}>

                            {/* Card Header */}
                            <div className={styles.cardHeader}>
                                <div>
                                    <h2 className={styles.subjectName}>{subject.name}</h2>
                                    <div className={styles.badges} style={{ marginTop: '0.6rem' }}>
                                        <span className={`${styles.badge} ${(subject.prediction?.risk_probability || 0) >= 0.40 ? styles.badgeCritical : styles.badgeSuccess}`}>
                                            {subject.prediction?.risk_label || 'Optimal Security'}
                                        </span>
                                        <span className={`${styles.badge} ${(subject.data.scoreMomentum || 0) < 0 ? styles.badgeWarning : styles.badgeInfo}`}>
                                            {(subject.data.scoreMomentum || 0) > 0 ? '+' : ''}{subject.data.scoreMomentum || 0}% Momentum
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.latestScoreContainer}>
                                    <div className={styles.latestScore}>
                                        {subject.data.latestScore || 0}
                                    </div>
                                    <div className={styles.latestScoreLabel}>Latest Score</div>
                                </div>
                            </div>

                            {/* Area Chart History Strip */}
                            {subject.availableExams.length > 0 && (
                                <div className={styles.miniChartContainer}>
                                    <ResponsiveContainer width="100%" height={80}>
                                        <AreaChart data={subject.availableExams} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id={`colorScore${idx}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor={((subject.prediction?.risk_probability || 0) >= 0.40) ? "#ef4444" : "#3b82f6"} stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor={((subject.prediction?.risk_probability || 0) >= 0.40) ? "#ef4444" : "#3b82f6"} stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <RechartsTooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '0.8rem' }}
                                                labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                                            />
                                            <YAxis domain={[0, 100]} hide />
                                            <Area
                                                type="monotone"
                                                dataKey="score"
                                                stroke={((subject.prediction?.risk_probability || 0) >= 0.40) ? "#ef4444" : "#3b82f6"}
                                                strokeWidth={3}
                                                fillOpacity={1}
                                                fill={`url(#colorScore${idx})`}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {/* Metrics Area */}
                            <div className={styles.metricsGrid}>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Class Avg</span>
                                    <span className={styles.metricValue}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: '#94a3b8' }}>groups</span>
                                        {subject.data.classAverage || '--'}
                                    </span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>AI Risk Propensity</span>
                                    <span className={styles.metricValue} style={{ color: ((subject.prediction?.risk_probability || 0) >= 0.40) ? '#dc2626' : '#16a34a' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>stacked_line_chart</span>
                                        {Math.round((subject.prediction?.risk_probability || 0) * 100)}%
                                    </span>
                                </div>
                            </div>

                            {/* AI Insight Box */}
                            <div className={subject.insightClass}>
                                <span className={`material-symbols-outlined ${styles.aiIcon}`}>{subject.iconType}</span>
                                <p className={styles.aiInsightText}>
                                    {subject.prediction?.recommendation || 'Excellent performance pattern. Maintain your current study habits and review materials consistently.'}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLeft}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>shield</span>
                        <span style={{ fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>EduShield AI</span>
                        <span style={{ color: '#94a3b8', margin: '0 0.5rem' }}>|</span>
                        <span style={{ color: '#64748b' }}>&copy; {new Date().getFullYear()} All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
