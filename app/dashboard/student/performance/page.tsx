'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';

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
        return <div className={styles.loadingScreen}>Loading Performance Data...</div>;
    }

    if (!studentData) {
        return <div className={styles.loadingScreen}>No academic data found.</div>;
    }

    const subs = studentData.subjects || {};
    const subjectList = Object.keys(subs).map(subName => {
        const subData = subs[subName];
        const pred = modelPredictions.find(p => p.subject_name === subName);

        let insightClass = styles.aiInsightBox;
        let iconType = 'psychology';
        if (pred?.at_risk) {
            insightClass = `${styles.aiInsightBox} ${styles.criticalInsight}`;
            iconType = 'warning';
        } else if ((subData.scoreMomentum || 0) < 0) {
            insightClass = `${styles.aiInsightBox} ${styles.warningInsight}`;
            iconType = 'trending_down';
        } else {
            iconType = 'verified';
        }

        // Gather all exams for the history strip dynamically
        const availableExams: { num: number, score: number }[] = [];
        Object.keys(subData).forEach(key => {
            const match = key.match(/^exam_?(\d+)$/i);
            if (match && subData[key] !== undefined && subData[key] !== null && subData[key] !== "") {
                availableExams.push({ num: parseInt(match[1], 10), score: Number(subData[key]) });
            }
        });
        availableExams.sort((a, b) => a.num - b.num);

        return {
            name: subName,
            data: subData,
            prediction: pred,
            insightClass,
            iconType,
            availableExams
        };
    });

    return (
        <div className={styles.container}>
            <DashboardNav role="student" searchPlaceholder="Search subjects..." />

            <main className={styles.mainArea}>
                <div className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <h1>My Performance Portfolio</h1>
                        <p>Detailed breakdown of your academic metrics and AI-driven insights.</p>
                    </div>
                    <div className={styles.headerRight}>
                        <div className={styles.globalStat}>
                            <span className={styles.globalStatLabel}>Attendance</span>
                            <span className={styles.globalStatValue}>{studentData.overallAttendancePct}%</span>
                        </div>
                        <div className={styles.globalStat} style={{ marginLeft: '1.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid #e2e8f0' }}>
                            <span className={styles.globalStatLabel}>Tracked Subjects</span>
                            <span className={styles.globalStatValue}>{subjectList.length}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.subjectGrid}>
                    {subjectList.map((subject, idx) => (
                        <div key={idx} className={styles.subjectCard}>

                            {/* Card Header */}
                            <div className={styles.cardHeader}>
                                <div>
                                    <h2 className={styles.subjectName}>{subject.name}</h2>
                                    <div className={styles.badges} style={{ marginTop: '0.5rem' }}>
                                        <span className={`${styles.badge} ${subject.prediction?.at_risk ? styles.badgeCritical : styles.badgeSuccess}`}>
                                            {subject.prediction?.risk_label || 'Optimal'}
                                        </span>
                                        <span className={`${styles.badge} ${(subject.data.scoreMomentum || 0) < 0 ? styles.badgeWarning : styles.badgeNeutral}`}>
                                            {(subject.data.scoreMomentum || 0) > 0 ? '+' : ''}{subject.data.scoreMomentum || 0}% Momentum
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.latestScore}>
                                    {subject.data.latestScore || 0}<span className={styles.latestScoreSmall}>/100</span>
                                </div>
                            </div>

                            {/* Metrics Area */}
                            <div className={styles.metricsGrid}>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>Class Average</span>
                                    <span className={styles.metricValue}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#94a3b8' }}>groups</span>
                                        {subject.data.classAverage || '--'}
                                    </span>
                                </div>
                                <div className={styles.metricItem}>
                                    <span className={styles.metricLabel}>AI Risk Propensity</span>
                                    <span className={styles.metricValue} style={{ color: subject.prediction?.at_risk ? '#dc2626' : '#16a34a' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>stacked_line_chart</span>
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

                            {/* Historical Strip */}
                            {subject.availableExams.length > 0 && (
                                <div className={styles.historyList}>
                                    {subject.availableExams.map((exam, i) => (
                                        <div key={i} className={styles.historyItem}>
                                            <span className={styles.histLabel}>Test {exam.num}</span>
                                            <span className={styles.histScore}>{exam.score}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

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
                    <div className={styles.footerLinks}>
                        <a href="/support" className={styles.footerLink}>Help Center</a>
                        <a href="/privacy" className={styles.footerLink}>Privacy Policy</a>
                        <a href="/terms" className={styles.footerLink}>Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
