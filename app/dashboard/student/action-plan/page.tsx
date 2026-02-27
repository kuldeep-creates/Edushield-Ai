'use client';

import { useState, useEffect, useRef } from 'react';
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

interface Recommendation {
    subject: string;
    steps: string[];
    quickWin: string;
    encouragement: string;
    icon: string;
    color: string;
    badge: string;
}

export default function AIActionPlanPage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [isFetching, setIsFetching] = useState(true);
    const [activeTab, setActiveTab] = useState<'suggestions' | 'missions'>('suggestions');
    const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});
    const [committedMissions, setCommittedMissions] = useState<Record<string, boolean>>({});
    const [snackbar, setSnackbar] = useState<{ subject: string; tip: string; color: string; visible: boolean } | null>(null);
    const snackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollToSubject = (subjectId: string) => {
        const el = document.getElementById(`rec-${subjectId}`);
        if (el) {
            // Offset for the sticky header
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Briefly highlight the card
            el.style.transition = 'box-shadow 0.3s ease';
            el.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.3)';
            setTimeout(() => {
                el.style.boxShadow = '';
            }, 2000);
        }
    };
    const showSnackbar = (subject: string, tip: string, color: string) => {
        if (snackTimer.current) clearTimeout(snackTimer.current);
        setSnackbar({ subject, tip, color, visible: true });
        snackTimer.current = setTimeout(() => {
            setSnackbar(prev => prev ? { ...prev, visible: false } : null);
        }, 4000);
    };

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
                                            generatePlan(sData, data.results);
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

    const generatePlan = (data: StudentData, predictions: ModelPrediction[]) => {

        // ── MISSIONS ──────────────────────────────────────────────────────
        const generated: Mission[] = [];
        let missionCounter = 1;

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
                    { title: "Review Assessment Errors", desc: `Identify top 3 mistaken topics from the latest ${sub.subject_name} exam and rewrite corrected solutions.` },
                    { title: "Schedule Teacher Consult", desc: "Book a 15-minute 1-on-1 session with your teacher to close your foundation gaps this week." },
                    { title: "Daily Practice Minimum", desc: "Solve at least 5 past-paper questions from this subject every day until the next assessment." }
                ]
            });
        });

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
                        { title: "Break the Slide", desc: `Your score dropped ${Math.abs(subData.scoreMomentum)}%. Re-read the last chapter and note every unfamiliar concept.` },
                        { title: "20-Minute Daily Revision", desc: `Spend 20 focused minutes on ${key} every day — even weekends — until momentum reverses.` },
                        { title: "Submit Overdue Work", desc: "Check if any assignments are incomplete or missing and submit them this week." }
                    ]
                });
            }
        });

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
                    { title: "10-Day Perfect Streak", desc: "Attend all classes for the next 10 consecutive school days without any absence." },
                    { title: "Recover Lost Lectures", desc: `Collect notes from classmates for the ${data.totalDaysAbsent} days missed so you don't fall behind.` },
                    { title: "Morning Routine Fix", desc: "Set your alarm 30 minutes earlier and prepare your bags the night before to eliminate morning chaos." }
                ]
            });
        }

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
                    { title: "Peer Mentorship", desc: "Help explain a difficult concept to a classmate — teaching is the best way to deepen your own knowledge." },
                    { title: "Advanced Placement Prep", desc: "Attempt 2 questions from the higher-level syllabus this week to get ahead of the curve." }
                ]
            });
        }

        setMissions(generated);

        // ── RICH ACTIONABLE SUGGESTIONS (Academic Blueprint) ─────────────
        const recs: Recommendation[] = [];

        predictions.forEach(p => {
            const subData = data.subjects?.[p.subject_name] || {};
            const momentum = subData.scoreMomentum ?? 0;

            if (p.at_risk || p.risk_probability >= 0.40) {
                recs.push({
                    subject: p.subject_name,
                    badge: `${Math.round(p.risk_probability * 100)}% risk`,
                    steps: [
                        `List every topic you got wrong in the last ${p.subject_name} exam and re-solve them.`,
                        `Practice 5 past-paper questions daily — focus on question types you repeatedly miss.`,
                        `Ask your teacher for a 10-minute doubt-clearing session this week.`,
                        `Create a summary sheet of key formulas / definitions to review every morning.`
                    ],
                    quickWin: `Open your ${p.subject_name} textbook right now and solve 2 practice examples before bed.`,
                    encouragement: `Consistent daily effort — even just 20 minutes — can move you out of the risk zone in 2 weeks.`,
                    icon: 'crisis_alert',
                    color: '#dc2626'
                });
            } else if (momentum <= -5) {
                recs.push({
                    subject: p.subject_name,
                    badge: `Losing momentum`,
                    steps: [
                        `Re-read the last chapter and highlight every concept that feels unclear.`,
                        `Spend 20 focused minutes on ${p.subject_name} every evening this week.`,
                        `Group-study with 1–2 classmates to spot gaps you might be missing alone.`,
                        `Review your last graded work and understand why you lost each mark.`
                    ],
                    quickWin: `Re-read your last class notes and write down 3 things you didn't fully understand.`,
                    encouragement: `Small daily sessions stop the slide fast — a week of consistency will show on your next test.`,
                    icon: 'trending_down',
                    color: '#f59e0b'
                });
            } else if (p.risk_probability < 0.20) {
                recs.push({
                    subject: p.subject_name,
                    badge: `Strong`,
                    steps: [
                        `Attempt higher-difficulty questions beyond your syllabus to build challenge resilience.`,
                        `Teach a concept from this subject to a classmate — it forces deeper understanding.`,
                        `Build a revision sheet with the most common exam question types and practice weekly.`
                    ],
                    quickWin: `Try one advanced problem from ${p.subject_name} today that you've never attempted before.`,
                    encouragement: `You're excelling here — aim for mastery, not just a passing score!`,
                    icon: 'workspace_premium',
                    color: '#16a34a'
                });
            }
        });

        if (data.overallAttendancePct < 85) {
            recs.push({
                subject: 'Attendance',
                badge: `${data.overallAttendancePct.toFixed(0)}% — Below target`,
                steps: [
                    `Set a morning alarm 30 minutes earlier to avoid being late or skipping.`,
                    `Ask a friend to commute to school with you — accountability makes it easier.`,
                    `Collect notes for the ${data.totalDaysAbsent} missed days so you don't fall behind in content.`,
                    `Talk to your class teacher if there's a specific reason — they can help more than you think.`
                ],
                quickWin: `Commit to attending all classes for the next 5 consecutive school days without exception.`,
                encouragement: `Attendance is the single biggest factor in academic success — every day you show up counts!`,
                icon: 'event_busy',
                color: '#9333ea'
            });
        }

        if (data.disciplineFlags > 0) {
            recs.push({
                subject: 'Focus & Behaviour',
                badge: `${data.disciplineFlags} flag(s) recorded`,
                steps: [
                    `Sit in the front two rows — it naturally increases focus and reduces distractions.`,
                    `Start each class by writing one learning goal: "Today I want to understand ___."`,
                    `Put your phone on silent and face-down during class hours.`,
                    `Speak to your counsellor or a trusted teacher — they're on your side.`
                ],
                quickWin: `Choose one class today and commit to paying 100% attention from start to finish.`,
                encouragement: `Every class is a fresh start — one focused day builds the habit for the next.`,
                icon: 'flag',
                color: '#f97316'
            });
        }

        if (recs.length === 0) {
            recs.push({
                subject: '🌟 Outstanding Performance',
                badge: 'All systems green',
                steps: [
                    `Keep a weekly revision schedule — 30 minutes per subject prevents forgetting.`,
                    `Start building an exam folder with key notes, formulas, and common questions.`,
                    `Pick your favourite subject and aim for the top 5 in class.`,
                    `Set 3 academic goals for the end of the term and track them weekly.`
                ],
                quickWin: `Write down 3 academic goals you want to achieve by end of term — right now.`,
                encouragement: `You're on a great path — keep the momentum and aim even higher!`,
                icon: 'verified',
                color: '#16a34a'
            });
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
        <>
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
                    </div>

                    {/* Tabs */}
                    <div className={styles.tabContainer}>
                        <button
                            className={`${styles.tabBtn} ${activeTab === 'suggestions' ? styles.tabBtnActive : ''}`}
                            onClick={() => setActiveTab('suggestions')}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>lightbulb</span>
                            Academic Blueprint
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

                        {/* ── ACADEMIC BLUEPRINT (Suggestions) ── */}
                        {activeTab === 'suggestions' && (
                            <div className={styles.tabContentFadeIn}>
                                <div className={styles.sectionTitle}>Academic Blueprint</div>

                                <div className={styles.blueprintLayout}>
                                    {/* Sidebar Navigation */}
                                    <div className={styles.blueprintSidebar}>
                                        {recommendations.map((rec, idx) => (
                                            <button
                                                key={`nav-${idx}`}
                                                className={styles.blueprintSidebarBtn}
                                                onClick={() => scrollToSubject(rec.subject)}
                                                style={{ borderLeft: `4px solid ${rec.color}` }}
                                            >
                                                <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', color: rec.color }}>{rec.icon}</span>
                                                {rec.subject}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Recommendation Cards */}
                                    <div className={styles.recommendationsList}>
                                        {recommendations.map((rec, idx) => (
                                            <div
                                                key={idx}
                                                id={`rec-${rec.subject}`}
                                                className={styles.recCard}
                                                style={{ '--rec-color': rec.color } as React.CSSProperties}
                                            >
                                                {/* Card Header */}
                                                <div className={styles.recCardHeader}>
                                                    <div className={styles.recIconWrap}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '1.6rem', color: rec.color }}>{rec.icon}</span>
                                                    </div>
                                                    <div className={styles.recHeaderText}>
                                                        <h4 className={styles.recSubjectTitle}>{rec.subject}</h4>
                                                        <span className={styles.recBadge} style={{ background: rec.color + '22', color: rec.color, border: `1px solid ${rec.color}44` }}>
                                                            {rec.badge}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Steps */}
                                                <div className={styles.recSteps}>
                                                    <p className={styles.recStepsLabel}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>checklist</span>
                                                        Steps to improve:
                                                    </p>
                                                    <ul className={styles.recStepsList}>
                                                        {rec.steps.map((step, i) => (
                                                            <li key={i} className={styles.recStep}>
                                                                <span className={styles.recStepNum}>{i + 1}</span>
                                                                {step}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Quick Win */}
                                                <div className={styles.recQuickWin}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: '#f59e0b' }}>bolt</span>
                                                    <div>
                                                        <strong>Quick win today:</strong> {rec.quickWin}
                                                    </div>
                                                </div>

                                                {/* Encouragement */}
                                                <div className={styles.recEncouragement}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>favorite</span>
                                                    {rec.encouragement}
                                                </div>

                                                {/* Got it button */}
                                                <button
                                                    className={styles.gotItBtn}
                                                    style={{ borderColor: rec.color + '66', color: rec.color }}
                                                    onClick={() => showSnackbar(
                                                        rec.subject,
                                                        rec.quickWin,
                                                        rec.color
                                                    )}
                                                >
                                                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>done</span>
                                                    Got it — remind me!
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── TACTICAL MISSIONS ── */}
                        {activeTab === 'missions' && (
                            <div className={styles.tabContentFadeIn}>
                                <div className={styles.sectionTitle}>Active Directives</div>
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

                        {/* CTA */}
                        <div className={styles.chatbotCTA}>
                            <div className={styles.chatbotText}>
                                <h3>Want personalised advice?</h3>
                                <p>These suggestions are generated from your live academic data. For a deeper conversation, specific topic help, or to build a study schedule — talk to the EduShield AI Mentor directly.</p>
                            </div>
                            <button className={styles.chatbotActionBtn} onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}>
                                Talk to AI Mentor
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* ── SNACKBAR ── */}
            {
                snackbar && (
                    <div
                        className={`${styles.snackbar} ${snackbar.visible ? styles.snackbarVisible : styles.snackbarHide}`}
                        style={{ borderLeft: `4px solid ${snackbar.color}` }}
                    >
                        <div className={styles.snackbarIcon} style={{ background: snackbar.color + '22' }}>
                            <span className="material-symbols-outlined" style={{ color: snackbar.color, fontSize: '1.2rem' }}>bolt</span>
                        </div>
                        <div className={styles.snackbarContent}>
                            <strong className={styles.snackbarSubject}>{snackbar.subject}</strong>
                            <span className={styles.snackbarTip}>{snackbar.tip}</span>
                        </div>
                        <button className={styles.snackbarClose} onClick={() => setSnackbar(null)}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>close</span>
                        </button>
                    </div>
                )}
        </>
    );
}
