'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import styles from './page.module.css';
import DashboardNav from '@/components/DashboardNav';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface StudentProfile {
    regNo?: string;
    role?: string;
    socialLinks?: {
        email?: string;
        gmail?: string;
        github?: string;
        linkedin?: string;
        other?: string;
        website?: string;
    };
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
    maxAbsentStreakLength: number;
    subjects: Record<string, any>;
    socialLinks?: Record<string, string>;
    [key: string]: any;
}

interface ModelPrediction {
    student_id: string;
    subject_name: string;
    risk_probability: number;
    at_risk: boolean;
    risk_category: string;
    risk_label: string;
    recommendation: string;
    patches_applied?: string[];
}


export default function StudentDashboard() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [modelPredictions, setModelPredictions] = useState<ModelPrediction[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState<string>('Average');

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
        return <div className={styles.loadingScreen}>EduShield AI Generating Dashboard...</div>;
    }

    if (!studentData) {
        return <div className={styles.loadingScreen}>No academic data found.</div>;
    }

    // --- 1. A. Academic Risk Engine Calculations ---
    // Max risk across all subjects to denote overall risk category
    const maxRiskProb = modelPredictions.length > 0 ? Math.max(...modelPredictions.map(p => p.risk_probability)) : 0;
    const academicRiskScore = Math.round(maxRiskProb * 100);
    const academicHealthIndex = 100 - academicRiskScore;

    let riskCategory = "Healthy";
    if (academicRiskScore > 75) riskCategory = "Critical";
    else if (academicRiskScore > 40) riskCategory = "Caution";

    // --- 1. B. Weak Subject Detection ---
    const weakSubjects = modelPredictions
        .filter(p => p.risk_probability > 0.4)
        .sort((a, b) => b.risk_probability - a.risk_probability);

    // --- 1. C. Performance Trend Analysis (Graph Data) ---
    const subs = Object.values(studentData.subjects || {}) as any[];
    const subKeys = Object.keys(studentData.subjects || {});

    // Dynamically discover all actual exams taken (no dummy data or hardcoded limits)
    const availableExams = new Set<number>();
    subs.forEach(sub => {
        Object.keys(sub).forEach(key => {
            const match = key.match(/^exam_?(\d+)$/i);
            if (match && sub[key] !== undefined && sub[key] !== null && sub[key] !== "") {
                availableExams.add(parseInt(match[1], 10));
            }
        });
    });

    const sortedExams = Array.from(availableExams).sort((a, b) => a - b);

    const trendData = sortedExams.map(examNum => {
        let score = 0;

        if (selectedSubject === 'Average') {
            let total = 0;
            let count = 0;
            subs.forEach(s => {
                const val = s[`exam${examNum}`] ?? s[`exam_${examNum}`] ?? s[`Exam_${examNum}`];
                if (val !== undefined && val !== null && val !== "") {
                    total += Number(val);
                    count++;
                }
            });
            score = count > 0 ? Math.round(total / count) : 0;
        } else {
            const specificSub = studentData.subjects[selectedSubject];
            if (specificSub) {
                const val = specificSub[`exam${examNum}`] ?? specificSub[`exam_${examNum}`] ?? specificSub[`Exam_${examNum}`];
                score = val !== undefined && val !== null && val !== "" ? Number(val) : 0;
            }
        }

        return {
            name: `Ex${examNum}`,
            score: score
        };
    });

    // --- 1. D. Consistency Score ---
    // Calculate variance of average scores to find high fluctuations
    let consistencyScore = 100;
    if (trendData.length > 1) {
        const scores = trendData.map(d => d.score);
        const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
        const variance = scores.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / scores.length;
        const stdDev = Math.sqrt(variance);
        // Map stdDev to consistency score (0 stdDev = 100%, high stdDev = low consistency)
        consistencyScore = Math.max(0, 100 - Math.round(stdDev * 3));
    }

    // --- 1. E. AI Personalized Action Plan ---
    let actionPlan = [];
    if (weakSubjects.length > 0) {
        actionPlan.push({ icon: 'menu_book', title: `Focus on ${weakSubjects[0].subject_name}`, desc: `Review your lowest scoring topics in ${weakSubjects[0].subject_name} immediately.` });
    }
    if (weakSubjects.length > 1) {
        actionPlan.push({ icon: 'schedule', title: `Allocate time for ${weakSubjects[1].subject_name}`, desc: `Your momentum is dropping here. Dedicate 30 mins extra daily.` });
    } else if (consistencyScore < 70) {
        actionPlan.push({ icon: 'trending_up', title: `Stabilize your study routine`, desc: `Your scores fluctuate. Try to maintain a consistent daily study schedule.` });
    } else {
        actionPlan.push({ icon: 'emoji_events', title: `Maintain your momentum`, desc: `You are doing great! Keep up the current study habits.` });
    }
    if (studentData.overallAttendancePct < 90) {
        actionPlan.push({ icon: 'event_busy', title: `Improve Attendance`, desc: `Missing classes impacts grades. Try to avoid unnecessary absences.` });
    } else {
        actionPlan.push({ icon: 'groups', title: `Help a Peer`, desc: `Your attendance and scores are strong. Consider forming a study group to cement your knowledge.` });
    }

    return (
        <div className={styles.container}>
            <DashboardNav role="student" searchPlaceholder="Search metrics..." />

            <div className={styles.mainArea}>
                {/* ---------- STUDENT 360° PROFILE (Sidebar) ---------- */}
                <aside className={styles.sidebar}>
                    <div className={styles.card}>
                        <div className={styles.profileHero}>
                            <div className={styles.avatarWrap}>
                                <div className={styles.avatarInner}>
                                    {studentData?.name ? studentData.name.charAt(0) : 'S'}
                                </div>
                            </div>
                            <div className={styles.studentInfo}>
                                <h2>{studentData.name || userProfile?.regNo}</h2>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.2rem', fontFamily: 'monospace' }}>ID: {userProfile?.regNo}</p>
                                <p>Class {studentData.class || 'N/A'} • {studentData.stream || 'General'}</p>
                                <p style={{ marginTop: '0.2rem', color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>
                                    {studentData.schoolName || 'EDUSHIELD ACADEMY'}
                                </p>

                                {/* Social Links */}
                                {(() => {
                                    const socials = studentData?.socialLinks || userProfile?.socialLinks || {};
                                    const email = socials.email || socials.gmail;
                                    const github = socials.github;
                                    const linkedin = socials.linkedin;
                                    const other = socials.other || socials.website;

                                    if (!email && !github && !linkedin && !other) return null;

                                    return (
                                        <div className={styles.socialLinks}>
                                            {email && (
                                                <a href={email.startsWith('mailto:') ? email : `mailto:${email}`} target="_blank" rel="noreferrer" className={styles.socialIcon} title="Email">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>mail</span>
                                                </a>
                                            )}
                                            {github && (
                                                <a href={github} target="_blank" rel="noreferrer" className={styles.socialIcon} title="GitHub">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {linkedin && (
                                                <a href={linkedin} target="_blank" rel="noreferrer" className={styles.socialIcon} title="LinkedIn">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {other && (
                                                <a href={other} target="_blank" rel="noreferrer" className={styles.socialIcon} title="Website">
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>language</span>
                                                </a>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statItem}>
                                <div className={styles.statLabel}>Attendance</div>
                                <div className={styles.statValue}>{studentData.overallAttendancePct || 0}%</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statLabel}>Behavior</div>
                                <div className={styles.statValue}>{studentData.disciplineFlags || 0} Flags</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statLabel}>Days Absent</div>
                                <div className={styles.statValue}>{studentData.totalDaysAbsent || 0}</div>
                            </div>
                        </div>

                        {/* <div className={styles.riskGaugeArea} style={{ paddingTop: '1.5rem', marginTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            <span className={`${styles.riskLabel} ${styles[riskCategory]}`}>
                                {riskCategory}
                            </span>
                        </div> */}
                    </div>

                    {/* ACADEMIC RISK ENGINE SUMMARY */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader} style={{ marginBottom: 0 }}>
                            <h3 className={styles.sectionTitle} style={{ margin: 0 }}>
                                <span className="material-symbols-outlined">donut_large</span> Academic Risk
                            </h3>
                        </div>
                        <div className={styles.riskGaugeArea}>
                            <div className={`${styles.riskScore} ${styles[riskCategory]}`}>
                                {academicRiskScore}
                            </div>
                            <div className={styles.statLabel}>Risk Score (0-100)</div>

                            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                <span className={`${styles.riskLabel} ${styles[riskCategory]}`}>
                                    {riskCategory}
                                </span>
                            </div>
                        </div>
                        <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <div className={styles.statLabel}>Health Index</div>
                            <div className={styles.statValue} style={{ color: 'var(--primary)' }}>{academicHealthIndex}/100</div>
                        </div>
                    </div>

                    {/* WEAK SUBJECT DETECTION - Prototype specific box */}
                    {/* <div className={styles.card} style={{ backgroundColor: '#e2e8f0' }}>
                        <h3 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '1rem', color: '#1e293b' }}>
                            weak subjects
                        </h3>
                        {weakSubjects.length === 0 ? (
                            <p style={{ textAlign: 'center' }}>None</p>
                        ) : (
                            weakSubjects.map((sub, idx) => (
                                <div key={idx} style={{ textAlign: 'center', fontWeight: 'bold' }}>{sub.subject_name}</div>
                            ))
                        )}
                    </div> */}
                </aside>

                {/* ---------- MAIN DIAGNOSTICS CONTENT ---------- */}
                <main className={styles.content}>
                    {/* <div>
                        <h1 className={styles.pageTitle}>Dashboard Diagnostics</h1>
                        <p className={styles.pageSubtitle}>EduShield AI realtime engine analysis for the current academic term.</p>
                    </div> */}

                    <div className={styles.diagnosticGrid}>
                        {/* AI ACTIONABLE ROADMAP - Prototype match
                        <div className={styles.card} style={{ gridColumn: '1 / -1', backgroundColor: '#e2e8f0', minHeight: '300px' }}>
                            <h3 className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1e293b' }}>
                                Suggestions to improve academics
                            </h3>
                            <div className={styles.actionList}>
                                {actionPlan.map((action, idx) => (
                                    <div key={idx} className={styles.actionItem} style={{ marginBottom: '0.5rem', backgroundColor: '#f1f5f9', border: 'none', padding: '0.75rem', borderRadius: '0.25rem' }}>
                                        <div className={styles.actionText}>
                                            <p style={{ margin: 0, color: '#334155' }}>• {action.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        {/* 1. B. WEAK SUBJECT DETECTION */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div>
                                    <h3 className={styles.sectionTitle} style={{ margin: 0 }}>
                                        <span className="material-symbols-outlined" style={{ color: 'var(--critical)' }}>troubleshoot</span>
                                        Weak Subject Detection
                                    </h3>
                                </div>
                            </div>

                            {weakSubjects.length === 0 ? (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: '#10b981', opacity: 0.5 }}>check_circle</span>
                                    <p>No high-risk subjects detected. Perfect track record!</p>
                                </div>
                            ) : (
                                <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                                    {weakSubjects.map((subject, idx) => (
                                        <div key={idx} className={styles.weakSubjectItem}>
                                            <span className={`material-symbols-outlined ${styles.weakIcon}`}>priority_high</span>
                                            <div className={styles.weakDetails}>
                                                <h4>{subject.subject_name}</h4>
                                                <p>{subject.recommendation}</p>
                                                <div style={{ marginTop: '0.4rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    <span className={`${styles.flexBadge} ${subject.at_risk ? styles.badgeCritical : styles.badgeSuccess}`}>
                                                        {subject.risk_label}
                                                    </span>
                                                    {subject.patches_applied?.map((patch: string, i: number) => (
                                                        <span key={i} className={`${styles.flexBadge} ${styles.badgeWarning}`} title={patch}>
                                                            Patch trigger
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 1. D. CONSISTENCY SCORE */}
                        <div className={styles.card}>
                            <div className={styles.cardHeader}>
                                <h3 className={styles.sectionTitle} style={{ margin: 0 }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--accent)' }}>published_with_changes</span>
                                    Consistency Score
                                </h3>
                            </div>
                            <div className={styles.riskGaugeArea} style={{ paddingTop: '0' }}>
                                <div className={styles.riskScore} style={{ color: 'var(--primary)' }}>
                                    {consistencyScore}%
                                </div>
                                <div className={styles.statLabel}>Performance Stability Index</div>
                                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#334155', marginTop: '1rem', lineHeight: '1.5' }}>
                                    {consistencyScore > 80 ? "Exhibits high stability with minimal fluctuations across exams. A reliable learning pattern." :
                                        consistencyScore > 50 ? "Shows moderate fluctuations. Focus on maintaining a steady study routine to prevent unexpected score drops." :
                                            "High fluctuation detected. The AI notes alternating high and low performance peaks."}
                                </p>
                            </div>
                        </div>

                        {/* 1. C. PERFORMANCE TREND ANALYSIS */}
                        <div className={`${styles.card} ${styles.chartCard}`} style={{ gridColumn: '1 / -1' }}>
                            <div className={styles.cardHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 className={styles.sectionTitle} style={{ margin: 0 }}>
                                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>monitoring</span>
                                    Performance Trend Analysis
                                </h3>
                                <select
                                    value={selectedSubject}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    style={{ padding: '0.4rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', fontSize: '0.85rem', outline: 'none', backgroundColor: '#f8fafc', color: '#334155', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                                >
                                    <option value="Average">Overall Average</option>
                                    {subKeys.map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={styles.chartContainer}>
                                {trendData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                                                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                                            />
                                            <Area type="monotone" dataKey="score" name={selectedSubject === 'Average' ? 'Average Marks' : `${selectedSubject} Marks`} stroke="var(--primary)" strokeWidth={3} fill="url(#colorAvg)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No trend data available.</div>
                                )}
                            </div>
                        </div>



                    </div>
                </main>
            </div>

            {/* ---------- DASHBOARD FOOTER ---------- */}
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
