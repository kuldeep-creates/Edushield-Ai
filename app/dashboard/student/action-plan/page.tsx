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

interface Mission {
    id: string;
    title: string;
    type: 'Critical' | 'Warning' | 'Maintenance' | 'Behavioral';
    icon: string;
    iconColorClass: string;
    priorityClass: string;
    priorityLabel: string;
    tasks: { title: string; desc: string; }[];
    points: number;
}

export default function AIActionPlanPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [recommendations, setRecommendations] = useState<{ subject: string; text: string; icon: string; color: string }[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [activeTab, setActiveTab] = useState<'suggestions' | 'missions'>('suggestions');
    const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
    const [committedMissions, setCommittedMissions] = useState<Record<string, boolean>>({});

    const toggleTask = (missionId: string, taskIdx: number) => {
        setCheckedTasks(prev => ({
            ...prev,
            [`${missionId}-${taskIdx}`]: !prev[`${missionId}-${taskIdx}`]
        }));
    };

    const commitMission = (missionId: string) => {
        setCommittedMissions(prev => ({
            ...prev,
            [missionId]: true
        }));
    };

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
                                        if (data?.results) {
                                            generateMissions(sData, data.results);
                                        }
                                    })
                                    .catch(() => setIsFetching(false))
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
                } catch {
                    setIsFetching(false);
                }
            } else {
                router.push('/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    const generateMissions = (data: StudentData, predictions: ModelPrediction[]) => {
        const generated: Mission[] = [];
        let missionCounter = 1;

        // 1. Critical Weak Subjects
        const criticalSubjects = predictions.filter(p => p.risk_probability >= 0.40);
        criticalSubjects.forEach(sub => {
            generated.push({
                id: `m${missionCounter++}`,
                title: `Rescue Operation: ${sub.subject_name}`,
                type: 'Critical',
                icon: 'warning',
                iconColorClass: styles.iconRed,
                priorityClass: styles.priHigh,
                priorityLabel: 'High Priority',
                points: 500,
                tasks: [
                    { title: "Review Assessment Errors", desc: `Identify top 3 mistaked topics from the latest ${sub.subject_name} exam.` },
                    { title: "Schedule Teacher Consult", desc: "Book a 15-minute 1-on-1 session to discuss your foundation gaps." },
                    { title: "Practice Minimum Baseline", desc: "Score above 45% on the next mock quiz to exit the critical zone." }
                ]
            });
        });

        // 2. Momentum Crashing Subjects (Not critical, but falling)
        const slippingSubjects = predictions.filter(p => p.risk_probability < 0.40);
        Object.keys(data.subjects || {}).forEach(key => {
            const subData = data.subjects[key];
            if ((subData.scoreMomentum || 0) <= -5 && !criticalSubjects.find(c => c.subject_name === key)) {
                generated.push({
                    id: `m${missionCounter++}`,
                    title: `Momentum Fix: ${key}`,
                    type: 'Warning',
                    icon: 'trending_down',
                    iconColorClass: styles.iconYellow,
                    priorityClass: styles.priMed,
                    priorityLabel: 'Medium Priority',
                    points: 300,
                    tasks: [
                        { title: "Break the Slide", desc: `Your momentum dropped by ${Math.abs(subData.scoreMomentum)}%. Review the last chapter covered.` },
                        { title: "Submit Overdue Work", desc: "Ensure no assignments are missing this week." }
                    ]
                });
            }
        });

        // 3. Behavioral / Attendance Checks
        if (data.overallAttendancePct < 85) {
            generated.push({
                id: `m${missionCounter++}`,
                title: `Attendance Fortification`,
                type: 'Behavioral',
                icon: 'calendar_month',
                iconColorClass: styles.iconPurple,
                priorityClass: styles.priHigh,
                priorityLabel: 'High Priority',
                points: 400,
                tasks: [
                    { title: "Perfect Streak Challenge", desc: "Attend all classes for the next 10 consecutive school days." },
                    { title: "Recover Lost Lectures", desc: `Collect notes for the ${data.totalDaysAbsent} days you have missed recently.` }
                ]
            });
        }

        // 4. Maintenance / Advanced (If they are doing well)
        if (criticalSubjects.length === 0 && data.overallAttendancePct >= 90) {
            generated.push({
                id: `m${missionCounter++}`,
                title: `Elite Mastery Pursuit`,
                type: 'Maintenance',
                icon: 'military_tech',
                iconColorClass: styles.iconBlue,
                priorityClass: styles.priLow,
                priorityLabel: 'Optional Builder',
                points: 200,
                tasks: [
                    { title: "Peer Mentorship", desc: "Help explain a difficult concept to a classmate in a study group." },
                    { title: "Advanced Placement Prep", desc: "Attempt 2 questions from the higher-level syllabus this week." }
                ]
            });
        }

        setMissions(generated);

        // --- GENERATE RAW RECOMMENDATIONS ---
        const recs: { subject: string; text: string; icon: string; color: string }[] = [];
        predictions.forEach(p => {
            if (p.at_risk || p.risk_probability >= 0.40) {
                recs.push({ subject: p.subject_name, text: p.recommendation || `Critical risk identified. Immediate action required.`, icon: 'warning', color: '#dc2626' });
            } else if (data.subjects[p.subject_name]?.scoreMomentum <= -5) {
                recs.push({ subject: p.subject_name, text: p.recommendation || `Momentum is dropping. Review recent material.`, icon: 'trending_down', color: '#f59e0b' });
            }
        });

        if (data.overallAttendancePct < 85) {
            recs.push({ subject: 'Attendance', text: 'Low attendance is negatively impacting your baseline. Try to avoid missing days to stabilize scores.', icon: 'event_busy', color: '#9333ea' });
        }

        if (recs.length === 0) {
            recs.push({ subject: 'General Overview', text: 'All systems optimal. Keep up the consistent study habits and review material weekly. Outstanding performance.', icon: 'verified', color: '#16a34a' });
        }
        setRecommendations(recs);
    };

    if (isFetching) {
        return (
            <div className={styles.loadingScreen}>
                <p>EduShield AI Generation in Progress...</p>
            </div>
        );
    }

    if (!studentData) {
        return <div className={styles.loadingScreen}>No academic data found.</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.bgOrb1}></div>
            <div className={styles.bgOrb2}></div>

            <DashboardNav role="student" searchPlaceholder="Search action plans..." />

            <main className={styles.mainArea}>
                {/* Hero Box */}
                <div className={styles.heroBox}>
                    <div className={styles.heroBadge}>
                        <span className="material-symbols-outlined">auto_awesome</span>
                        EduShield Native Intelligence
                    </div>
                    <h1 className={styles.heroTitle}>Your Tactical Action Plan</h1>
                    {/* <p className={styles.heroDesc}>
                        A precision-engineered academic roadmap. Our AI analyzes your neuro-academic momentum to generate high-yield missions directly aimed at optimizing your future trajectory.
                    </p> */}
                </div>

                {/* --- MODERN SWITCHABLE TABS --- */}
                <div className={styles.tabContainer}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'suggestions' ? styles.tabBtnActive : ''}`}
                        onClick={() => setActiveTab('suggestions')}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>blur_on</span>
                        AI Suggestions
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'missions' ? styles.tabBtnActive : ''}`}
                        onClick={() => setActiveTab('missions')}
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>track_changes</span>
                        Tactical Missions
                    </button>
                </div>

                <div className={styles.fullWidthSection}>
                    {/* --- SUGGESTIONS TAB CONTENT --- */}
                    {activeTab === 'suggestions' && (
                        <div className={styles.tabContentFadeIn}>
                            <div className={styles.sectionTitle}>
                                Academic Blueprint
                            </div>

                            <div className={styles.recommendationsList}>
                                {recommendations.map((rec, idx) => (
                                    <div key={idx} className={styles.recItemModern} style={{ '--rec-color': rec.color } as React.CSSProperties}>
                                        <div className={styles.recIconWrap}>
                                            <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: rec.color }}>{rec.icon}</span>
                                        </div>
                                        <div className={styles.recTextWrap}>
                                            <h4 className={styles.recSubjectTitle}>{rec.subject}</h4>
                                            <p className={styles.recDescText}>{rec.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- MISSIONS TAB CONTENT --- */}
                    {activeTab === 'missions' && (
                        <div className={styles.tabContentFadeIn}>
                            <div className={styles.sectionTitle}>
                                Active Directives
                            </div>

                            {missions.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: '#3b82f6', marginBottom: '1.5rem' }}>verified</span>
                                    <h3>No Tactical Missions Required</h3>
                                    <p>You are operating at peak efficiency. Maintain your current pace.</p>
                                </div>
                            ) : (
                                <div className={styles.grid}>
                                    {missions.map((mission) => (
                                        <div key={mission.id} className={styles.card}>
                                            <div className={styles.cardHeader}>
                                                <div className={`${styles.iconWrap} ${mission.iconColorClass}`}>
                                                    <span className="material-symbols-outlined">{mission.icon}</span>
                                                </div>
                                                <div className={styles.headerInfo}>
                                                    <span className={`${styles.priorityBadge} ${mission.priorityClass}`}>
                                                        {mission.priorityLabel}
                                                    </span>
                                                    <h2>{mission.title}</h2>
                                                </div>
                                            </div>

                                            <div className={styles.taskList}>
                                                {mission.tasks.map((task, idx) => (
                                                    <div key={idx} className={styles.taskItem}>
                                                        <div
                                                            className={`${styles.taskCheck} ${checkedTasks[`${mission.id}-${idx}`] ? styles.taskCheckActive : ''}`}
                                                            onClick={() => toggleTask(mission.id, idx)}
                                                        >
                                                            <span className={`material-symbols-outlined ${styles.checkIcon}`}>check</span>
                                                        </div>
                                                        <div>
                                                            <span className={styles.taskTitle}>{task.title}</span>
                                                            <span className={styles.taskContent}>{task.desc}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={styles.cardFooter}>
                                                <div className={styles.points}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1.5rem' }}>electric_bolt</span>
                                                    +{mission.points} Energy
                                                </div>
                                                <button
                                                    className={`${styles.actionBtn} ${committedMissions[mission.id] ? styles.actionBtnSuccess : ''}`}
                                                    onClick={() => commitMission(mission.id)}
                                                    disabled={committedMissions[mission.id]}
                                                >
                                                    {committedMissions[mission.id] ? (
                                                        <>Committed <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>check_circle</span></>
                                                    ) : (
                                                        <>Commit <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>rocket_launch</span></>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- CHATBOT CALL TO ACTION --- */}
                    <div className={styles.chatbotCTA}>
                        <div className={styles.chatbotText}>
                            <h3>Hyper-Personalization Awaits</h3>
                            <p>These heuristics are generated instantly securely on client-side via AI predictive analytics. For dynamic dialogue, context-aware tutoring, or to ask a specific question, launch the EduShield Agent directly below.</p>
                        </div>
                        <button className={styles.chatbotActionBtn} onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}>
                            Talk to AI Assistant
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
