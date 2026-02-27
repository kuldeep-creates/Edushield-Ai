'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';
import styles from './page.module.css';

interface Prefs {
    emailAlerts: boolean;
    riskAlerts: boolean;
    weeklyReport: boolean;
    chatbotEnabled: boolean;
    language: string;
}

const DEFAULT_PREFS: Prefs = {
    emailAlerts: true,
    riskAlerts: true,
    weeklyReport: true,
    chatbotEnabled: true,
    language: 'en',
};

const LANG_LABELS: Record<string, string> = {
    en: 'English',
    hi: 'हिंदी (Hindi)',
    mr: 'मराठी (Marathi)',
    ta: 'தமிழ் (Tamil)',
    te: 'తెలుగు (Telugu)',
    kn: 'ಕನ್ನಡ (Kannada)',
};



export default function PreferencesPage() {
    const router = useRouter();
    const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
    const [isFetching, setIsFetching] = useState(true);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [uid, setUid] = useState<string | null>(null);
    const isFirstLoad = useRef(true);
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    /* ── Load prefs from Firestore ─────────── */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push('/login'); return; }
            setUid(user.uid);
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const loaded: Prefs = {
                        emailAlerts: data.emailAlerts ?? true,
                        riskAlerts: data.riskAlerts ?? true,
                        weeklyReport: data.weeklyReport ?? true,
                        chatbotEnabled: data.chatbotEnabled ?? true,
                        language: data.language || 'en',
                    };
                    setPrefs(loaded);
                }
            } catch {
                // silently fail — use defaults
            } finally {
                setIsFetching(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    /* ── Auto-save with debounce whenever prefs change ─── */
    const autoSave = useCallback(async (newPrefs: Prefs, userId: string) => {
        setSaveStatus('saving');
        try {
            await updateDoc(doc(db, 'users', userId), { ...newPrefs });
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } catch {
            setSaveStatus('idle');
        }
    }, []);

    useEffect(() => {
        // Skip the initial load trigger
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        if (!uid) return;

        // Debounce: wait 800ms after last change before saving
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            autoSave(prefs, uid);
        }, 800);

        return () => {
            if (saveTimer.current) clearTimeout(saveTimer.current);
        };
    }, [prefs, uid, autoSave]);

    /* ── Update a boolean pref ─────────────── */
    const toggle = (key: keyof Prefs) => {
        setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    };

    /* ── Update a string pref ──────────────── */
    const setPref = (key: keyof Prefs, value: string) => {
        setPrefs(prev => ({ ...prev, [key]: value }));
    };

    if (isFetching) {
        return (
            <div className={styles.loadingWrap}>
                <div className={styles.spinner} />
                <p>Loading preferences…</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <DashboardNav role="student" searchPlaceholder="Search..." />

            <main className={styles.main}>
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <div className={styles.headerLeft}>
                        <a href="/dashboard/student/account" className={styles.backBtn}>
                            <span className="material-symbols-outlined">arrow_back</span>
                        </a>
                        <div>
                            <h1 className={styles.pageTitle}>Preferences</h1>
                            <p className={styles.pageSubtitle}>Changes save automatically</p>
                        </div>
                    </div>

                    {/* Auto-save indicator */}
                    <div className={`${styles.saveIndicator} ${styles[saveStatus]}`}>
                        {saveStatus === 'saving' && (
                            <><div className={styles.dot} /> Saving…</>
                        )}
                        {saveStatus === 'saved' && (
                            <><span className="material-symbols-outlined">check_circle</span> Saved</>
                        )}
                        {saveStatus === 'idle' && (
                            <><span className="material-symbols-outlined">cloud_done</span> All changes saved</>
                        )}
                    </div>
                </div>

                <div className={styles.grid}>

                    {/* ── Notifications ─────────────────────── */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <span className="material-symbols-outlined">notifications</span>
                            </div>
                            <div>
                                <h2 className={styles.cardTitle}>Notifications</h2>
                                <p className={styles.cardSubtitle}>Choose what alerts you receive</p>
                            </div>
                        </div>
                        <div className={styles.toggleList}>
                            <ToggleRow
                                label="Email Alerts"
                                desc="Receive performance-related alerts via email"
                                value={prefs.emailAlerts}
                                onToggle={() => toggle('emailAlerts')}
                            />
                            <ToggleRow
                                label="Risk Score Alerts"
                                desc="Get notified when your dropout risk score increases significantly"
                                value={prefs.riskAlerts}
                                onToggle={() => toggle('riskAlerts')}
                            />
                            <ToggleRow
                                label="Weekly Performance Report"
                                desc="Receive a summarised weekly academic performance email every Monday"
                                value={prefs.weeklyReport}
                                onToggle={() => toggle('weeklyReport')}
                            />
                        </div>
                    </section>

                    {/* ── App Experience ─────────────────────── */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <span className="material-symbols-outlined">smart_toy</span>
                            </div>
                            <div>
                                <h2 className={styles.cardTitle}>AI Mentor Chatbot</h2>
                                <p className={styles.cardSubtitle}>Control the AI assistant on your dashboard</p>
                            </div>
                        </div>
                        <div className={styles.toggleList}>
                            <ToggleRow
                                label="Enable AI Mentor"
                                desc="Show the EduShield AI mentor chat button on your student dashboard"
                                value={prefs.chatbotEnabled}
                                onToggle={() => toggle('chatbotEnabled')}
                            />
                        </div>
                        {!prefs.chatbotEnabled && (
                            <div className={styles.infoChip}>
                                <span className="material-symbols-outlined">info</span>
                                AI Mentor is disabled. Enable it to get personalised academic advice.
                            </div>
                        )}
                    </section>

                    {/* ── Language & Region ─────────────────── */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <span className="material-symbols-outlined">language</span>
                            </div>
                            <div>
                                <h2 className={styles.cardTitle}>Language & Region</h2>
                                <p className={styles.cardSubtitle}>Set your preferred display language</p>
                            </div>
                        </div>
                        <div className={styles.langGrid}>
                            {Object.entries(LANG_LABELS).map(([code, label]) => (
                                <button
                                    key={code}
                                    className={`${styles.langCard} ${prefs.language === code ? styles.langCardActive : ''}`}
                                    onClick={() => setPref('language', code)}
                                >
                                    <span className={styles.langCode}>{code.toUpperCase()}</span>
                                    <span className={styles.langLabel}>{label}</span>
                                    {prefs.language === code && (
                                        <span className={styles.langCheck}>
                                            <span className="material-symbols-outlined">check</span>
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <p className={styles.hint}>Currently in English. Translations for other languages coming soon.</p>
                    </section>


                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <span className="material-symbols-outlined">link</span>
                            </div>
                            <div>
                                <h2 className={styles.cardTitle}>Related Settings</h2>
                                <p className={styles.cardSubtitle}>Other account settings you can manage</p>
                            </div>
                        </div>
                        <div className={styles.relatedLinks}>
                            <a href="/dashboard/student/account" className={styles.relatedLink}>
                                <span className="material-symbols-outlined">person</span>
                                <div>
                                    <strong>Account Profile</strong>
                                    <span>View and manage your profile info</span>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </a>
                            <a href="/dashboard/student/account#password" className={styles.relatedLink}>
                                <span className="material-symbols-outlined">lock</span>
                                <div>
                                    <strong>Change Password</strong>
                                    <span>Update your security password</span>
                                </div>
                                <span className="material-symbols-outlined">chevron_right</span>
                            </a>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}

/* ── Reusable Toggle Row ───────────────────────────────────── */
function ToggleRow({ label, desc, value, onToggle }: {
    label: string;
    desc: string;
    value: boolean;
    onToggle: () => void;
}) {
    return (
        <div className={styles.toggleRow}>
            <div className={styles.toggleInfo}>
                <strong>{label}</strong>
                <span>{desc}</span>
            </div>
            <button
                className={`${styles.toggle} ${value ? styles.toggleOn : ''}`}
                onClick={onToggle}
                aria-label={`Toggle ${label}`}
                type="button"
                role="switch"
                aria-checked={value}
            >
                <span className={styles.toggleThumb} />
            </button>
        </div>
    );
}
