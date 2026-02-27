'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential, signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import DashboardNav from '@/components/DashboardNav';
import styles from './page.module.css';

interface StudentProfile {
    name: string;
    email: string;
    regNo: string;
    school: string;
    role: string;
    createdAt: string;
    grade?: string;
}

export default function AccountPage() {
    const router = useRouter();
    const [profile, setProfile] = useState<StudentProfile | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    // Password change state
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [pwdMsg, setPwdMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [pwdLoading, setPwdLoading] = useState(false);

    // Notification / preference state
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [riskAlerts, setRiskAlerts] = useState(true);
    const [savedPrefs, setSavedPrefs] = useState(false);

    // Edit Profile modal state
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState('');
    const [editGrade, setEditGrade] = useState('');
    const [editSaving, setEditSaving] = useState(false);
    const [editMsg, setEditMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Scroll to hash section after data loads (e.g. #password from nav link)
    useEffect(() => {
        if (!isFetching && typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash) {
                // Small timeout to let React finish painting the DOM
                setTimeout(() => {
                    const el = document.querySelector(hash);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Highlight the section briefly
                        (el as HTMLElement).style.transition = 'box-shadow 0.3s ease';
                        (el as HTMLElement).style.boxShadow = '0 0 0 3px rgba(59,130,246,0.4)';
                        setTimeout(() => {
                            (el as HTMLElement).style.boxShadow = '';
                        }, 2000);
                    }
                }, 150);
            }
        }
    }, [isFetching]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) { router.push('/login'); return; }
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    const regNo = data.regNo || '';

                    // Try to get actual student name from academic data
                    let resolvedName = data.name || '';
                    if (!resolvedName && regNo) {
                        try {
                            const sDataDoc = await getDoc(doc(db, 'studentData', regNo));
                            if (sDataDoc.exists()) {
                                const sData = sDataDoc.data();
                                resolvedName = sData.name || sData.studentName || sData.student_name || '';
                                // Cache it back to users doc so we don't need to fetch next time
                                if (resolvedName) {
                                    await updateDoc(doc(db, 'users', user.uid), { name: resolvedName });
                                }
                            }
                        } catch {
                            // silently fail — name will show as email prefix
                        }
                    }

                    // Last resort: use email prefix as display name
                    if (!resolvedName) {
                        resolvedName = (data.email || user.email || '').split('@')[0];
                    }

                    setProfile({
                        name: resolvedName,
                        email: data.email || user.email || '',
                        regNo: regNo || '—',
                        school: data.school || '—',
                        role: data.role || 'student',
                        createdAt: data.createdAt || '',
                        grade: data.grade || '',
                    });
                }
            } catch {
                // silently fail
            } finally {
                setIsFetching(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPwdMsg(null);
        if (newPwd !== confirmPwd) { setPwdMsg({ type: 'error', text: 'New passwords do not match.' }); return; }
        if (newPwd.length < 6) { setPwdMsg({ type: 'error', text: 'Password must be at least 6 characters.' }); return; }

        setPwdLoading(true);
        try {
            const user = auth.currentUser!;
            const cred = EmailAuthProvider.credential(user.email!, currentPwd);
            await reauthenticateWithCredential(user, cred);
            await updatePassword(user, newPwd);
            setPwdMsg({ type: 'success', text: 'Password updated successfully! ✓' });
            setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '';
            if (msg.includes('wrong-password') || msg.includes('invalid-credential')) {
                setPwdMsg({ type: 'error', text: 'Current password is incorrect.' });
            } else {
                setPwdMsg({ type: 'error', text: 'Failed to update password. Please try again.' });
            }
        } finally {
            setPwdLoading(false);
        }
    };

    const handleSavePreferences = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, 'users', user.uid), { emailAlerts, riskAlerts });
            }
            setSavedPrefs(true);
            setTimeout(() => setSavedPrefs(false), 3000);
        } catch {
            // silently fail
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    const openEditModal = () => {
        setEditName(profile?.name || '');
        setEditGrade(profile?.grade || '');
        setEditMsg(null);
        setEditMode(true);
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editName.trim()) { setEditMsg({ type: 'error', text: 'Name cannot be empty.' }); return; }
        setEditSaving(true);
        setEditMsg(null);
        try {
            const user = auth.currentUser;
            if (user) {
                await updateDoc(doc(db, 'users', user.uid), {
                    name: editName.trim(),
                    grade: editGrade.trim(),
                });
                setProfile(prev => prev ? { ...prev, name: editName.trim(), grade: editGrade.trim() } : prev);
                setEditMsg({ type: 'success', text: 'Profile updated successfully! ✓' });
                setTimeout(() => setEditMode(false), 1200);
            }
        } catch {
            setEditMsg({ type: 'error', text: 'Failed to save. Please try again.' });
        } finally {
            setEditSaving(false);
        }
    };

    const joinDate = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
        : '—';

    const initials = profile?.name
        ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : 'ST';

    if (isFetching) {
        return (
            <div className={styles.loadingWrap}>
                <div className={styles.spinner} />
                <p>Loading your account…</p>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <DashboardNav role="student" searchPlaceholder="Search..." />

            <main className={styles.main}>
                {/* Page Header */}
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>My Account</h1>
                    <p className={styles.pageSubtitle}>Manage your profile, security, and preferences</p>
                </div>

                <div className={styles.grid}>
                    {/* ── LEFT: Profile Card ─────────────────── */}
                    <div className={styles.sidebar}>
                        <div className={styles.profileCard}>
                            <div className={styles.avatarRing}>
                                <div className={styles.avatar}>{initials}</div>
                            </div>
                            <h2 className={styles.profileName}>{profile?.name || 'Student'}</h2>
                            <p className={styles.profileRole}>
                                <span className={styles.rolePill}>
                                    <span className="material-symbols-outlined">school</span>
                                    {profile?.school || 'School'}
                                </span>
                            </p>
                            <div className={styles.statsRow}>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Student ID</span>
                                    <span className={styles.statVal}>{profile?.regNo}</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statLabel}>Joined</span>
                                    <span className={styles.statVal}>{joinDate}</span>
                                </div>
                            </div>

                        </div>

                        {/* Quick Links */}
                        <div className={styles.quickLinks}>
                            <a href="/dashboard/student" className={styles.quickLink}>
                                <span className="material-symbols-outlined">dashboard</span>
                                Dashboard
                            </a>
                            <a href="/dashboard/student/performance" className={styles.quickLink}>
                                <span className="material-symbols-outlined">monitoring</span>
                                My Performance
                            </a>
                            <a href="/dashboard/student/action-plan" className={styles.quickLink}>
                                <span className="material-symbols-outlined">rocket_launch</span>
                                AI Action Plan
                            </a>
                        </div>
                    </div>

                    {/* ── RIGHT: Settings Panels ─────────────── */}
                    <div className={styles.content}>
                        {/* Profile Info */}
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined">person</span>
                                <h3>Profile Information</h3>
                            </div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Full Name</span>
                                    <span className={styles.infoVal}>{profile?.name || '—'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Email Address</span>
                                    <span className={styles.infoVal}>{profile?.email || '—'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Registration No.</span>
                                    <span className={styles.infoVal}>{profile?.regNo || '—'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Institution</span>
                                    <span className={styles.infoVal}>{profile?.school || '—'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Role</span>
                                    <span className={styles.infoVal} style={{ textTransform: 'capitalize' }}>{profile?.role || 'student'}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.infoLabel}>Account Created</span>
                                    <span className={styles.infoVal}>{joinDate}</span>
                                </div>
                            </div>
                        </section>

                        {/* Change Password */}
                        <section id="password" className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined">lock</span>
                                <h3>Change Password</h3>
                            </div>
                            <form className={styles.pwdForm} onSubmit={handleChangePassword}>
                                {pwdMsg && (
                                    <div className={`${styles.alert} ${styles[pwdMsg.type]}`}>
                                        {pwdMsg.text}
                                    </div>
                                )}
                                <div className={styles.fieldGroup}>
                                    <label>Current Password</label>
                                    <input
                                        type="password"
                                        value={currentPwd}
                                        onChange={e => setCurrentPwd(e.target.value)}
                                        placeholder="Enter current password"
                                        required
                                    />
                                </div>
                                <div className={styles.fieldRow}>
                                    <div className={styles.fieldGroup}>
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            value={newPwd}
                                            onChange={e => setNewPwd(e.target.value)}
                                            placeholder="Min. 6 characters"
                                            required
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={confirmPwd}
                                            onChange={e => setConfirmPwd(e.target.value)}
                                            placeholder="Repeat new password"
                                            required
                                        />
                                    </div>
                                </div>
                                <button type="submit" className={styles.saveBtn} disabled={pwdLoading}>
                                    {pwdLoading ? 'Updating…' : 'Update Password'}
                                </button>
                            </form>
                        </section>

                        {/* Notifications */}
                        <section className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined">notifications</span>
                                <h3>Notification Preferences</h3>
                            </div>
                            <div className={styles.toggleList}>
                                <div className={styles.toggleRow}>
                                    <div className={styles.toggleInfo}>
                                        <strong>Email Alerts</strong>
                                        <span>Receive weekly performance summary emails</span>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${emailAlerts ? styles.toggleOn : ''}`}
                                        onClick={() => setEmailAlerts(!emailAlerts)}
                                        aria-label="Toggle email alerts"
                                    >
                                        <span className={styles.toggleThumb} />
                                    </button>
                                </div>
                                <div className={styles.toggleRow}>
                                    <div className={styles.toggleInfo}>
                                        <strong>Risk Alerts</strong>
                                        <span>Get notified if your risk score rises significantly</span>
                                    </div>
                                    <button
                                        className={`${styles.toggle} ${riskAlerts ? styles.toggleOn : ''}`}
                                        onClick={() => setRiskAlerts(!riskAlerts)}
                                        aria-label="Toggle risk alerts"
                                    >
                                        <span className={styles.toggleThumb} />
                                    </button>
                                </div>
                            </div>
                            <button className={styles.saveBtn} onClick={handleSavePreferences} disabled={savedPrefs}>
                                {savedPrefs ? 'Preferences Saved ✓' : 'Save Preferences'}
                            </button>
                        </section>

                        {/* Danger Zone */}
                        <section className={`${styles.card} ${styles.dangerCard}`}>
                            <div className={styles.cardHeader}>
                                <span className="material-symbols-outlined" style={{ color: '#ef4444' }}>warning</span>
                                <h3 style={{ color: '#ef4444' }}>Danger Zone</h3>
                            </div>
                            <p className={styles.dangerText}>
                                Signing out will end your current session. Your academic data will remain securely stored.
                            </p>
                            <button className={styles.dangerBtn} onClick={handleLogout}>
                                <span className="material-symbols-outlined">logout</span>
                                Sign Out of EduShield
                            </button>
                        </section>
                    </div>
                </div>
            </main>

            {/* ── Edit Profile Modal ─────────────────────────────── */}
            {editMode && (
                <div className={styles.modalOverlay} onClick={() => setEditMode(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>
                                <span className="material-symbols-outlined">edit</span>
                            </div>
                            <div>
                                <h2 className={styles.modalTitle}>Edit Profile</h2>
                                <p className={styles.modalSubtitle}>Update your display name and grade</p>
                            </div>
                            <button className={styles.modalClose} onClick={() => setEditMode(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <form className={styles.modalForm} onSubmit={handleSaveProfile}>
                            {editMsg && (
                                <div className={`${styles.alert} ${styles[editMsg!.type]}`}>
                                    {editMsg!.text}
                                </div>
                            )}

                            <div className={styles.modalAvatar}>
                                <div className={styles.modalAvatarRing}>
                                    <div className={styles.modalAvatarInner}>{initials}</div>
                                </div>
                            </div>

                            <div className={styles.fieldGroup}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    placeholder="Your full name"
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label>Class / Grade</label>
                                <input
                                    type="text"
                                    value={editGrade}
                                    onChange={e => setEditGrade(e.target.value)}
                                    placeholder="e.g. Class 10 - A"
                                />
                            </div>

                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className={styles.saveBtn} disabled={editSaving}>
                                    {editSaving ? 'Saving…' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
